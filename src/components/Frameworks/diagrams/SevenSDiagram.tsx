import React from 'react';
import InteractiveNode from '../InteractiveNode';
import { Framework } from '../../../types';

interface SevenSDiagramProps {
    framework: Framework;
    content: Record<string, string[]>;
    interactive?: boolean;
    showDescriptions?: boolean;
    onContentChange?: (sectionId: string, content: string[]) => void;
}

export default function SevenSDiagram({
    framework,
    content,
    interactive = false,
    showDescriptions = true,
    onContentChange
}: SevenSDiagramProps) {

    const handleContentChange = (id: string, newContent: string[]) => {
        onContentChange?.(id, newContent);
    };

    // ... (rest of configuration omitted for brevity, keeping same logic)

    // Circle config
    const circleRadius = 60; // Size of the circles
    const orbitRadius = 180; // Distance from center
    const center = { x: 400, y: 350 }; // Moved center down slightly to help with title overlap

    // Positions for 6 outer circles (0 degrees is typically right)
    const positions = [
        { id: 'style', angle: -90, label: 'Style', description: 'Leadership & Management style' },
        { id: 'skills', angle: -30, label: 'Skills', description: 'Employee capabilities' },
        { id: 'systems', angle: 30, label: 'Systems', description: 'Activities and processes' },
        { id: 'structure', angle: 90, label: 'Structure', description: 'Company organization' },
        { id: 'staff', angle: 150, label: 'Staff', description: 'Employees of the company' },
        { id: 'strategy', angle: 210, label: 'Strategy', description: 'Growth plan' },
    ];

    // Helper to calculate coords
    const getCoords = (angleDeg: number, radius: number) => {
        const angleRad = (angleDeg * Math.PI) / 180;
        return {
            x: center.x + radius * Math.cos(angleRad),
            y: center.y + radius * Math.sin(angleRad)
        };
    };

    // Layout Data
    const nodes = [
        // Center Node
        {
            id: 'shared-values',
            x: center.x,
            y: center.y,
            label: 'Shared\nValues',
            description: 'Core beliefs & mission',
            isCenter: true
        },
        // Outer Nodes
        ...positions.map(p => ({
            ...p,
            ...getCoords(p.angle, orbitRadius),
            isCenter: false
        }))
    ];

    return (
        <div className="min-w-[900px] h-[700px] bg-zinc-950 relative flex items-center justify-center font-sans">
            {/* Title moved to absolute top-2 to prevent overlap */}
            <h2 className="absolute top-2 text-purple-500 text-2xl font-light tracking-[0.2em] uppercase opacity-90 border-b border-zinc-900 pb-4 z-10 w-full max-w-2xl text-center">
                McKinsey 7S Framework
            </h2>

            <svg className="absolute inset-0 w-full h-full pointer-events-none">
                {/* Specific Cross Connections requested by User: Style-Staff, Style-Systems, Staff-Systems */}
                {(() => {
                    const findNode = (id: string) => nodes.find(n => n.id === id);
                    const crossLinks = [
                        // User Requested: Style connected to Staff and Systems
                        { from: findNode('style'), to: findNode('staff') },
                        { from: findNode('style'), to: findNode('systems') },
                        // "They are also interconnected" -> Staff to Systems
                        { from: findNode('staff'), to: findNode('systems') },

                        // Standard Hard-S Triangle (Strategy-Structure-Systems)
                        { from: findNode('strategy'), to: findNode('structure') },
                        { from: findNode('strategy'), to: findNode('systems') },
                        { from: findNode('structure'), to: findNode('systems') },
                    ];

                    return crossLinks.map((link, i) => {
                        if (!link.from || !link.to) return null;
                        return (
                            <line
                                key={`cross-${i}`}
                                x1={link.from.x} y1={link.from.y}
                                x2={link.to.x} y2={link.to.y}
                                stroke="#581c87"
                                strokeWidth="2"
                                opacity="0.6"
                            />
                        );
                    });
                })()}

                {/* Standard Connections (Center-Outer and Ring) */}
                {nodes.map((node, i) => {
                    if (node.isCenter) return null;

                    // Center to Outer
                    const centerNode = nodes[0];
                    const nextIndex = (i === nodes.length - 1) ? 1 : i + 1;
                    const nextNode = nodes[nextIndex];

                    return (
                        <g key={`con-group-${i}`}>
                            <line
                                x1={node.x} y1={node.y}
                                x2={centerNode.x} y2={centerNode.y}
                                stroke="#581c87"
                                strokeWidth="2"
                            />
                            <line
                                x1={node.x} y1={node.y}
                                x2={nextNode.x} y2={nextNode.y}
                                stroke="#581c87"
                                strokeWidth="2"
                            />
                        </g>
                    );
                })}
            </svg>

            {/* Render Nodes */}
            {nodes.map((node) => (
                <View
                    key={node.id}
                    node={node}
                    content={content}
                    interactive={interactive}
                    onContentChange={handleContentChange}
                    showDescriptions={showDescriptions}
                />
            ))}
        </div>
    );
}

// Helper component for clean render loop
const View = ({ node, content, interactive, onContentChange, showDescriptions = true }: any) => {
    // Determine description position based on angle
    // angles: -90 (top), -30 (tr), 30 (br), 90 (b), 150 (bl), 210 (tl)
    let descClass = "";
    if (node.angle === -90) descClass = "-top-16 left-1/2 -translate-x-1/2 text-center w-48"; // Top
    else if (node.angle === 90) descClass = "-bottom-16 left-1/2 -translate-x-1/2 text-center w-48"; // Bottom
    else if (node.angle > -90 && node.angle < 90) descClass = "left-full ml-4 top-1/2 -translate-y-1/2 text-left w-40"; // Right side
    else descClass = "right-full mr-4 top-1/2 -translate-y-1/2 text-right w-40"; // Left side

    // Manual adjustments for corner nodes to prevent overlapping lines
    if (node.id === 'strategy') descClass = "-top-12 right-full mr-2 text-right w-40";
    if (node.id === 'staff') descClass = "-bottom-12 right-full mr-2 text-right w-40";
    if (node.id === 'skills') descClass = "-top-12 left-full ml-2 text-left w-40";
    if (node.id === 'systems') descClass = "-bottom-12 left-full ml-2 text-left w-40";

    return (
        <div
            className="absolute flex flex-col items-center justify-center group"
            style={{
                left: node.x,
                top: node.y,
                width: 120,
                height: 120, // 2 * radius
                transform: 'translate(-50%, -50%)',
            }}
        >
            {/* Circle */}
            <div
                className={`
                    w-full h-full rounded-full flex items-center justify-center text-center p-2 z-20 transition-all duration-300
                    ${node.isCenter
                        ? 'bg-purple-600 border-4 border-purple-400 shadow-[0_0_30px_rgba(168,85,247,0.5)] scale-110'
                        : 'bg-purple-900/80 border-2 border-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.3)] hover:scale-110 hover:bg-purple-800 hover:shadow-[0_0_25px_rgba(168,85,247,0.6)]'
                    }
                `}
            >
                <h3 className="text-white font-bold text-sm tracking-wide leading-tight">
                    {node.label}
                </h3>
            </div>

            {/* External Description */}
            {!node.isCenter && showDescriptions && (
                <div
                    className={`
                        absolute text-xs text-zinc-400 pointer-events-none transition-all duration-300 opacity-80 group-hover:opacity-100 group-hover:text-purple-200
                        ${descClass}
                    `}
                >
                    <span className="bg-zinc-900/80 backdrop-blur px-2 py-1 rounded border border-purple-900/50 block shadow-lg">
                        {node.description}
                    </span>
                </div>
            )}

            {/* Interactive Input Popup */}
            <div className="absolute top-full mt-2 w-40 z-30 opacity-0 group-hover:opacity-100 transition-opacity bg-zinc-900 border border-purple-500/30 rounded p-2 pointer-events-none group-hover:pointer-events-auto">
                <InteractiveNode
                    id={node.id}
                    initialContent={content[node.id] || []}
                    onUpdate={(c: string[]) => onContentChange(node.id, c)}
                    isInteractive={interactive}
                    placeholder="Details..."
                    style={{ color: '#e9d5ff', fontSize: '11px' }}
                />
            </div>
        </div>
    );
};
