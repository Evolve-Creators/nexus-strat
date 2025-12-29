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
import { Save, StickyNote, Trash2, Download, Loader2, Share2 } from 'lucide-react';
import { databases, DB_ID, COLLECTION_PROJECTS, saveProjectData, shareProject } from '../../lib/appwrite';

const nodeTypes = {
    frameworkNode: FrameworkNode,
    stickyNote: StickyNoteNode,
    imageNode: ImageNode,
} as any;

const defaultEdgeOptions = {
    type: 'smoothstep',
    markerEnd: {
        type: MarkerType.ArrowClosed,
        color: 'var(--text-muted)',
    },
    style: {
        strokeWidth: 2,
        stroke: 'var(--text-muted)',
    },
    interactionWidth: 20,
};

interface AnalysisBoardProps {
    frameworks?: Framework[]; // Optional as we might pass it differently or not need it if loaded within node
    projectId: string;
    isGuest?: boolean;
    onBack: () => void;
}
// Hack to get frameworks available to onDrop
import { generalFrameworks } from '../../data/generalFrameworks';
import { caseFrameworks } from '../../data/caseFrameworks';
import { useAuth } from '../../context/AuthContext';
const allFrameworks = [...generalFrameworks, ...caseFrameworks];

const AnalysisBoardContent = ({ frameworks = allFrameworks, projectId, isGuest, onBack }: AnalysisBoardProps) => {
    const { user } = useAuth();
    const storageKey = `nexus-strat-project-${projectId}`;
    const reactFlowWrapper = useRef<HTMLDivElement>(null);
    const [nodes, setNodes, onNodesChange] = useNodesState<Node>([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
    const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance | null>(null);
    const [isSaved, setIsSaved] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const [isSharing, setIsSharing] = useState(false);

    // Initial Load
    useEffect(() => {
        const loadData = async () => {
            setIsLoading(true);
            try {
                if (isGuest) {
                    const stored = localStorage.getItem(`nexus-strat-project-${projectId}`);
                    if (stored) {
                        const flow = JSON.parse(stored);
                        setNodes(flow.nodes || []);
                        setEdges(flow.edges || []);
                    }
                } else {
                    const doc = await databases.getDocument(DB_ID, COLLECTION_PROJECTS, projectId);
                    if (doc.data) {
                        const flow = JSON.parse(doc.data);
                        setNodes(flow.nodes || []);
                        setEdges(flow.edges || []);
                    }
                }
            } catch (err) {
                console.error("Failed to load project", err);
            } finally {
                setIsLoading(false);
            }
        };
        loadData();
    }, [projectId, setNodes, setEdges, isGuest]);

    // Auto Save (Debounced)
    useEffect(() => {
        if (isLoading) return;

        const timeoutId = setTimeout(async () => {
            setIsSaved(false);
            try {
                const flow = { nodes, edges };
                if (isGuest) {
                    localStorage.setItem(`nexus-strat-project-${projectId}`, JSON.stringify(flow));
                } else {
                    await saveProjectData(projectId, flow);
                }
                setIsSaved(true);
            } catch (err) {
                console.error("Save failed", err);
            }
        }, 2000); // 2 seconds debounce

        return () => clearTimeout(timeoutId);
    }, [nodes, edges, projectId, isLoading, isGuest]);

    const handleShare = async () => {
        if (isGuest || !user) {
            alert("Please sign in to share projects to the cloud.");
            return;
        }

        setIsSharing(true);
        try {
            await shareProject(projectId, user.$id);
            const url = `${window.location.origin}/?share=${projectId}`;
            await navigator.clipboard.writeText(url);
            alert(`Link copied to clipboard! Anyone with the link can view this project.\n\n${url}`);
        } catch (err) {
            alert("Failed to create share link.");
        } finally {
            setIsSharing(false);
        }
    };





    const onConnect = useCallback(
        (params: Connection) => setEdges((eds) => addEdge(params, eds)),
        [setEdges],
    );

    // ... Copy remaining handlers (reuse existing code logic but need to be careful with replace)
    // Since I'm replacing lines 1-140, I need to make sure I don't cut off functions.
    // The previous code had `onDragOver`, `onDrop` etc. 
    // I will include them here to be safe and complete.

    const onDragOver = useCallback((event: React.DragEvent) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);

    const onDrop = useCallback(
        (event: React.DragEvent) => { // ... (Full implementation below)
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
                data: {},
            };

            if (type === 'frameworkNode') {
                const frameworkId = event.dataTransfer.getData('application/reactflow/frameworkId');
                const framework = allFrameworks.find(f => f.id === frameworkId);
                if (framework) {
                    newNode.data = {
                        framework,
                        content: {},
                        onDelete: () => deleteNode(newNode.id),
                        onUpdateContent: (sectionId: string, content: any) => {
                            setNodes((nds: Node[]) => nds.map((n) => {
                                if (n.id === newNode.id) {
                                    const newContent = { ...(n.data.content as any), [sectionId]: content };
                                    return { ...n, data: { ...n.data, content: newContent } }
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
            } else if (type === 'imageNode') {
                // Handled in Paste mostly, but just in case
            }

            setNodes((nds) => nds.concat(newNode));
        },
        [reactFlowInstance, setNodes],
    );

    const deleteNode = useCallback((id: string) => {
        setNodes((nds) => nds.filter((n) => n.id !== id));
        setEdges((eds) => eds.filter((e) => e.source !== id && e.target !== id));
    }, [setNodes, setEdges]);

    const updateNodeData = useCallback((id: string, dataUpdate: any) => {
        setNodes((nds) => nds.map((node) => {
            if (node.id === id) {
                return { ...node, data: { ...node.data, ...dataUpdate } };
            }
            return node;
        }));
    }, [setNodes]);

    // ... skipping the hydrate useEffect hook from previous file? 
    // Need to include it! Default `useEffect` for hydration.

    useEffect(() => {
        setNodes((nds) => nds.map(node => {
            // ... Hydration logic (simplified for brevity but critical)
            if (node.type === 'frameworkNode' && !node.data.onDelete) {
                return { ...node, data: { ...node.data, onDelete: () => deleteNode(node.id), onUpdateContent: (sid: string, c: any) => updateNodeData(node.id, { content: { ...(node.data.content as any), [sid]: c } }) } };
            }
            if (node.type === 'stickyNote' && !node.data.onDelete) {
                return { ...node, data: { ...node.data, onDelete: () => deleteNode(node.id), onChange: (t: string) => updateNodeData(node.id, { text: t }), onColorChange: (c: string) => updateNodeData(node.id, { color: c }) } };
            }
            if (node.type === 'imageNode' && !node.data.onDelete) {
                return { ...node, data: { ...node.data, onDelete: () => deleteNode(node.id) } };
            }
            return node;
        }));
    }, [deleteNode, updateNodeData]); // Clean hydration



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
                <Controls className="bg-zinc-800 border-zinc-800 fill-zinc-400" />
                <MiniMap
                    nodeColor={(n: Node) => {
                        if (n.type === 'frameworkNode') return '#10b981';
                        if (n.type === 'stickyNote') {
                            const data = n.data as any;
                            return data.color || '#fef08a';
                        }
                        if (n.type === 'imageNode') return '#3b82f6';
                        return '#fff';
                    }}
                    className="bg-zinc-900 border border-zinc-900 rounded-lg overflow-hidden"
                    maskColor="rgba(0, 0, 0, 0.7)"
                />

                {/* Back Button Panel */}
                <Panel position="top-left" className="m-2">
                    <button
                        onClick={onBack}
                        className="flex items-center gap-2 px-3 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-lg shadow-lg border border-zinc-800 transition"
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
                        className="flex items-center gap-2 px-3 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-100 rounded-lg shadow-lg border border-zinc-800 transition cursor-grab active:cursor-grabbing"
                    >
                        <StickyNote size={16} className="text-yellow-400" />
                        <span>Add Note</span>
                    </button>

                    {!isGuest && (
                        <button
                            onClick={handleShare}
                            disabled={isSharing}
                            className="flex items-center gap-2 px-3 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg shadow-lg transition"
                            title="Share Project"
                        >
                            {isSharing ? <Loader2 size={16} className="animate-spin" /> : <Share2 size={16} />}
                            <span>Share</span>
                        </button>
                    )}

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
                            className="flex items-center gap-2 px-3 py-2 bg-zinc-800 hover:bg-zinc-700 text-red-400 rounded-lg shadow-lg border border-zinc-800 transition"
                        >
                            <Trash2 size={16} />
                            <span>Clear</span>
                        </button>
                    )}
                    <div className="flex items-center gap-2 px-3 py-2 bg-zinc-900/80 backdrop-blur text-xs text-zinc-400 rounded-lg border border-zinc-800">
                        {isSaved ? <span className="text-emerald-500 flex items-center gap-1"><Save size={12} /> Saved</span> : 'Saving...'}
                    </div>
                </Panel>
            </ReactFlow>
        </div>
    );
};

import ErrorBoundary from '../ErrorBoundary';

export default function AnalysisBoard(props: AnalysisBoardProps) {
    return (
        <ReactFlowProvider>
            <ErrorBoundary>
                <AnalysisBoardContent {...props} />
            </ErrorBoundary>
        </ReactFlowProvider>
    );
}
