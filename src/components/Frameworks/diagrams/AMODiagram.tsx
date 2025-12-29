import React from 'react';
import InteractiveNode from '../InteractiveNode';
import { Framework } from '../../../types';

interface AMODiagramProps {
    framework: Framework;
    content: Record<string, string[]>;
    interactive?: boolean;
    showDescriptions?: boolean;
    onContentChange?: (sectionId: string, content: string[]) => void;
}

export default function AMODiagram({
    framework,
    content,
    interactive = false,
    showDescriptions = true,
    onContentChange
}: AMODiagramProps) {

    const handleContentChange = (id: string, newContent: string[]) => {
        onContentChange?.(id, newContent);
    };

    // Columns config
    const columns = [
        { id: 'ability', label: 'Ability', color: 'orange' },
        { id: 'motivation', label: 'Motivation', color: 'orange' },
        { id: 'opportunity', label: 'Opportunity', color: 'orange' },
    ];

    return (
        <div className="w-full h-full p-8 bg-zinc-950 font-sans flex flex-col items-center relative overflow-hidden">
            {/* Neon Background Glow */}
            <div className="absolute top-0 left-1/4 w-1/2 h-1/2 bg-orange-600/10 blur-[120px] rounded-full pointer-events-none" />

            {/* Neon Title */}
            <h2 className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-200 text-3xl font-light tracking-[0.2em] uppercase border-b border-orange-900/50 pb-4 mb-8 z-10 drop-shadow-[0_0_10px_rgba(249,115,22,0.5)]">
                {framework.name}
            </h2>

            {showDescriptions && (
                <p className="text-orange-300/60 italic mb-8 -mt-4 text-center z-10">
                    Ref: "Used to assess employee productivity due to HR practices"
                </p>
            )}

            <div className="flex flex-row gap-6 w-full max-w-5xl h-[500px] z-10">
                {columns.map((col) => {
                    const section = framework.sections.find(s => s.id === col.id);
                    const defaultPoints = section?.examples || [];

                    return (
                        <div
                            key={col.id}
                            className="flex-1 flex flex-col h-full bg-zinc-900/80 backdrop-blur-md border border-orange-500/30 rounded-xl overflow-hidden group hover:border-orange-500 hover:shadow-[0_0_20px_rgba(249,115,22,0.2)] transition-all duration-300"
                        >
                            {/* Neon Header */}
                            <div className="bg-orange-500/10 p-5 text-center border-b border-orange-500/30 group-hover:bg-orange-500/20 transition-colors">
                                <h3 className="text-orange-400 text-xl font-bold tracking-widest uppercase drop-shadow-[0_0_5px_rgba(249,115,22,0.8)] group-hover:text-orange-300">
                                    {col.label}
                                </h3>
                            </div>

                            {/* Content Area */}
                            <div className="flex-1 p-6 bg-transparent overflow-y-auto custom-scrollbar flex flex-col gap-4">
                                {/* Static List from Data */}
                                {showDescriptions && defaultPoints.length > 0 && (
                                    <ul className="list-disc list-outside ml-4 space-y-3 mb-4 border-b border-orange-900/30 pb-4">
                                        {defaultPoints.map((point, i) => (
                                            <li key={i} className="text-zinc-300 text-sm leading-relaxed marker:text-orange-500">
                                                {point}
                                            </li>
                                        ))}
                                    </ul>
                                )}

                                {/* Interactive Area */}
                                <InteractiveNode
                                    id={col.id}
                                    initialContent={content[col.id] || []}
                                    onUpdate={(c) => handleContentChange(col.id, c)}
                                    isInteractive={interactive}
                                    placeholder={`Add ${col.label} factors...`}
                                    style={{ color: '#fed7aa', fontSize: '14px', lineHeight: '1.6', textShadow: '0 0 5px rgba(253, 186, 116, 0.3)' }} // orange-200
                                />
                            </div>
                        </div>
                    );
                })}
            </div>

            <style>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: rgba(39, 39, 42, 0.5);
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(249, 115, 22, 0.5); /* orange-500 */
                    border-radius: 2px;
                    box-shadow: 0 0 5px rgba(249, 115, 22, 0.5);
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: rgba(249, 115, 22, 0.8);
                }
            `}</style>
        </div>
    );
}
