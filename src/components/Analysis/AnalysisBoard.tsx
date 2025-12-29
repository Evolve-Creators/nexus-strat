import { useState, useCallback, useRef, useEffect } from 'react';
import {
    ReactFlow,
    ReactFlowProvider,
    addEdge,
    useNodesState,
    useEdgesState,
    Controls,
    Background,
    Connection,
    Edge,
    Node,
    MarkerType,
    ReactFlowInstance,
    Panel,
    MiniMap,
    NodeTypes,
    BackgroundVariant,
    ConnectionMode
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import FrameworkNode from './nodes/FrameworkNode';
import StickyNoteNode from './nodes/StickyNoteNode';
import ImageNode from './nodes/ImageNode';
import { Framework } from '../../types';
import { v4 as uuidv4 } from 'uuid';
import { Save, StickyNote, Trash2, Download } from 'lucide-react';

const nodeTypes = {
    frameworkNode: FrameworkNode,
    stickyNote: StickyNoteNode,
    imageNode: ImageNode,
} as any;

const defaultEdgeOptions = {
    type: 'smoothstep',
    markerEnd: {
        type: MarkerType.ArrowClosed,
        color: '#71717a', // zinc-500
    },
    style: {
        strokeWidth: 2,
        stroke: '#71717a',
    },
    interactionWidth: 20,
};

interface AnalysisBoardProps {
    frameworks: Framework[];
    projectId: string;
    onBack: () => void;
}

// Separate component to use ReactFlow hooks if needed, or keeping it simple
const AnalysisBoardContent = ({ frameworks, projectId, onBack }: AnalysisBoardProps) => {
    const reactFlowWrapper = useRef<HTMLDivElement>(null);
    const [nodes, setNodes, onNodesChange] = useNodesState<Node>([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
    const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance | null>(null);
    const [isSaved, setIsSaved] = useState(true);

    const storageKey = `analysis-flow-${projectId}`;

    // Initial Load
    useEffect(() => {
        const savedFlow = localStorage.getItem(storageKey);
        if (savedFlow) {
            const flow = JSON.parse(savedFlow);
            setNodes(flow.nodes || []);
            setEdges(flow.edges || []);
        } else {
            // Clear if new empty project
            setNodes([]);
            setEdges([]);
        }
    }, [projectId, setNodes, setEdges, storageKey]);

    // Auto Save (Debounced)
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (nodes.length > 0 || edges.length > 0) { // Save even if empty to persist cleared state if needed
                const flow = { nodes, edges };
                localStorage.setItem(storageKey, JSON.stringify(flow));
                setIsSaved(true);
            }
        }, 1000); // Faster save

        setIsSaved(false);
        return () => clearTimeout(timeoutId);
    }, [nodes, edges, storageKey]);

    // Paste Handling
    useEffect(() => {
        const handlePaste = (event: ClipboardEvent) => {
            const items = event.clipboardData?.items;
            if (!items) return;

            for (const item of items) {
                if (item.type.indexOf('image') !== -1) {
                    const blob = item.getAsFile();
                    if (!blob) continue;

                    const reader = new FileReader();
                    reader.onload = (e) => {
                        const src = e.target?.result as string;
                        if (src && reactFlowInstance) {
                            const id = uuidv4();
                            const viewport = reactFlowInstance.getViewport();
                            // Paste at center of view
                            const position = {
                                x: (-viewport.x + (window.innerWidth / 2)) / viewport.zoom,
                                y: (-viewport.y + (window.innerHeight / 2)) / viewport.zoom
                            };

                            const newNode: Node = {
                                id,
                                type: 'imageNode',
                                position,
                                data: {
                                    src,
                                    onDelete: () => deleteNode(id),
                                },
                                // Set initial size if possible, or let NodeResizer handle
                                style: { width: 300, height: 200 }
                            };
                            setNodes((nds) => nds.concat(newNode));
                        }
                    };
                    reader.readAsDataURL(blob);
                }
            }
        };

        window.addEventListener('paste', handlePaste);
        return () => window.removeEventListener('paste', handlePaste);
    }, [reactFlowInstance, setNodes]);

    const onConnect = useCallback(
        (params: Connection) => setEdges((eds) => addEdge(params, eds)),
        [setEdges],
    );

    const onDragOver = useCallback((event: React.DragEvent) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);

    const onDrop = useCallback(
        (event: React.DragEvent) => {
            event.preventDefault();

            if (!reactFlowWrapper.current || !reactFlowInstance) return;

            const type = event.dataTransfer.getData('application/reactflow/type');
            if (!type) return;

            const position = reactFlowInstance.screenToFlowPosition({
                x: event.clientX,
                y: event.clientY,
            });

            const newNode: Node = {
                id: uuidv4(),
                type,
                position,
                data: {}, // Initial data
            };

            if (type === 'frameworkNode') {
                const frameworkId = event.dataTransfer.getData('application/reactflow/frameworkId');
                const framework = frameworks.find(f => f.id === frameworkId);
                if (framework) {
                    newNode.data = {
                        framework,
                        content: {},
                        onDelete: () => deleteNode(newNode.id),
                        onUpdateContent: (sectionId: string, content: any) => {
                            setNodes((nds: Node[]) => nds.map((n) => {
                                if (n.id === newNode.id) {
                                    const newContent = { ...n.data.content, [sectionId]: content };
                                    return {
                                        ...n,
                                        data: { ...n.data, content: newContent }
                                    }
                                }
                                return n;
                            }));
                        }
                    };
                }
            } else if (type === 'stickyNote') {
                newNode.data = {
                    text: '',
                    color: '#fef08a',
                    onDelete: () => deleteNode(newNode.id),
                    onChange: (text: string) => updateNodeData(newNode.id, { text }),
                    onColorChange: (color: string) => updateNodeData(newNode.id, { color }),
                };
            }

            setNodes((nds: Node[]) => nds.concat(newNode));
        },
        [reactFlowInstance, frameworks, setNodes],
    );

    const deleteNode = useCallback((id: string) => {
        setNodes((nds: Node[]) => nds.filter((n) => n.id !== id));
        setEdges((eds) => eds.filter((e) => e.source !== id && e.target !== id));
    }, [setNodes, setEdges]);

    const updateNodeData = useCallback((id: string, dataUpdate: any) => {
        setNodes((nds: Node[]) => nds.map((node) => {
            if (node.id === id) {
                return { ...node, data: { ...node.data, ...dataUpdate } };
            }
            return node;
        }));
    }, [setNodes]);

    // Handle initial hydration of callbacks for loaded nodes
    useEffect(() => {
        setNodes((nds) => nds.map(node => {
            if (node.type === 'frameworkNode' && !node.data.onDelete) {
                return {
                    ...node,
                    data: {
                        ...node.data,
                        onDelete: () => deleteNode(node.id),
                        onUpdateContent: (sectionId: string, content: any) => {
                            setNodes((currentNodes: Node[]) => currentNodes.map((n) => {
                                if (n.id === node.id) {
                                    const newContent = { ...n.data.content, [sectionId]: content };
                                    return {
                                        ...n,
                                        data: { ...n.data, content: newContent }
                                    }
                                }
                                return n;
                            }));
                        }
                    }
                }
            }
            if (node.type === 'stickyNote' && !node.data.onDelete) {
                return {
                    ...node,
                    data: {
                        ...node.data,
                        onDelete: () => deleteNode(node.id),
                        onChange: (text: string) => updateNodeData(node.id, { text }),
                        onColorChange: (color: string) => updateNodeData(node.id, { color }),
                    }
                }
            }
            if (node.type === 'imageNode' && !node.data.onDelete) {
                return {
                    ...node,
                    data: {
                        ...node.data,
                        onDelete: () => deleteNode(node.id)
                    }
                }
            }
            return node;
        }));
    }, [deleteNode, updateNodeData]);

    const addStickyNote = () => {
        const id = uuidv4();
        let position = { x: 400, y: 100 };

        if (reactFlowInstance) {
            const viewport = reactFlowInstance.getViewport();
            position = {
                x: (-viewport.x + 500) / viewport.zoom,
                y: (-viewport.y + 300) / viewport.zoom
            };
        }

        const newNode: Node = {
            id,
            type: 'stickyNote',
            position,
            data: {
                text: '',
                color: '#fef08a',
                onDelete: () => deleteNode(id),
                onChange: (text: string) => updateNodeData(id, { text }),
                onColorChange: (color: string) => updateNodeData(id, { color }),
            },
        };
        setNodes((nds: Node[]) => nds.concat(newNode));
    };

    const [isClearing, setIsClearing] = useState(false);

    const clearCanvas = () => {
        setNodes([]);
        setEdges([]);
        localStorage.removeItem(storageKey);
        setIsClearing(false);
    };

    const downloadImage = () => {
        if (!reactFlowWrapper.current) return;

        // Dynamic import to avoid SSR/bundling issues if any, or just direct if library is robust
        import('html-to-image').then((htmlToImage) => {
            const viewport = reactFlowWrapper.current?.querySelector('.react-flow__viewport') as HTMLElement;
            if (!viewport) return;

            htmlToImage.toPng(viewport, {
                backgroundColor: '#09090b', // zinc-950
                width: viewport.scrollWidth,
                height: viewport.scrollHeight,
                style: {
                    width: '100%',
                    height: '100%',
                    transform: `translate(${0}px, ${0}px) scale(1)`
                }
            })
                .then((dataUrl) => {
                    const link = document.createElement('a');
                    link.download = 'whiteboard-analysis.png';
                    link.href = dataUrl;
                    link.click();
                })
                .catch((err) => {
                    console.error('Failed to export image', err);
                    alert('Failed to export image.');
                });
        });
    };

    return (
        <div className="w-full h-full flex flex-col relative" ref={reactFlowWrapper}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onInit={setReactFlowInstance}
                onDrop={onDrop}
                onDragOver={onDragOver}
                nodeTypes={nodeTypes}
                defaultEdgeOptions={defaultEdgeOptions}
                fitView
                className="bg-zinc-950"
                deleteKeyCode={['Backspace', 'Delete']}
                connectionMode={ConnectionMode.Loose}
            >
                <Background gap={20} color="#3f3f46" variant={BackgroundVariant.Dots} size={1} />
                <Controls className="bg-zinc-800 border-zinc-700 fill-zinc-400" />
                <MiniMap
                    nodeColor={(n: Node) => {
                        if (n.type === 'frameworkNode') return '#10b981';
                        if (n.type === 'stickyNote') return n.data.color || '#fef08a';
                        if (n.type === 'imageNode') return '#3b82f6';
                        return '#fff';
                    }}
                    className="bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden"
                    maskColor="rgba(0, 0, 0, 0.7)"
                />

                {/* Back Button Panel */}
                <Panel position="top-left" className="m-2">
                    <button
                        onClick={onBack}
                        className="flex items-center gap-2 px-3 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-lg shadow-lg border border-zinc-700 transition"
                    >
                        <span>← Dashboard</span>
                    </button>
                </Panel>

                <Panel position="top-right" className="flex gap-2">
                    <button
                        draggable
                        onDragStart={(event) => {
                            event.dataTransfer.setData('application/reactflow/type', 'stickyNote');
                            event.dataTransfer.effectAllowed = 'move';
                        }}
                        onClick={addStickyNote}
                        className="flex items-center gap-2 px-3 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-100 rounded-lg shadow-lg border border-zinc-700 transition cursor-grab active:cursor-grabbing"
                    >
                        <StickyNote size={16} className="text-yellow-400" />
                        <span>Add Note</span>
                    </button>
                    <button
                        onClick={downloadImage}
                        className="flex items-center gap-2 px-3 py-2 bg-zinc-800 hover:bg-zinc-700 text-blue-400 rounded-lg shadow-lg border border-zinc-700 transition"
                        title="Download as PNG"
                    >
                        <Download size={16} />
                        <span>Export</span>
                    </button>
                    {isClearing ? (
                        <div className="flex gap-1 bg-zinc-800 rounded-lg shadow-lg border border-red-900/50 p-0.5">
                            <button
                                onClick={clearCanvas}
                                className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-md text-xs font-bold transition flex items-center gap-1"
                            >
                                <Trash2 size={12} /> Confirm
                            </button>
                            <button
                                onClick={() => setIsClearing(false)}
                                className="px-3 py-1.5 hover:bg-zinc-700 text-zinc-400 rounded-md text-xs transition"
                            >
                                Cancel
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={() => setIsClearing(true)}
                            className="flex items-center gap-2 px-3 py-2 bg-zinc-800 hover:bg-zinc-700 text-red-400 rounded-lg shadow-lg border border-zinc-700 transition"
                        >
                            <Trash2 size={16} />
                            <span>Clear</span>
                        </button>
                    )}
                    <div className="flex items-center gap-2 px-3 py-2 bg-zinc-900/80 backdrop-blur text-xs text-zinc-400 rounded-lg border border-zinc-700">
                        {isSaved ? <span className="text-emerald-500 flex items-center gap-1"><Save size={12} /> Saved</span> : 'Saving...'}
                    </div>
                </Panel>
            </ReactFlow>
        </div>
    );
};

export default function AnalysisBoard(props: AnalysisBoardProps) {
    return (
        <ReactFlowProvider>
            <AnalysisBoardContent {...props} />
        </ReactFlowProvider>
    );
}
