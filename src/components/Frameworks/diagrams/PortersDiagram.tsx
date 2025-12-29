import React from 'react';
import InteractiveNode from '../InteractiveNode';
import { Framework } from '../../../types';
import { Users, Factory, Swords, Shuffle, DoorOpen } from 'lucide-react';

interface PortersDiagramProps {
    framework: Framework;
    content: Record<string, string[]>;
    interactive?: boolean;
    showDescriptions?: boolean;
    onContentChange?: (sectionId: string, content: string[]) => void;
}

export default function PortersDiagram({
    framework,
    content,
    interactive = false,
    showDescriptions = true,
    onContentChange
}: PortersDiagramProps) {

    const handleContentChange = (id: string, newContent: string[]) => {
        onContentChange?.(id, newContent);
    };

    // Define columns in specific order
    const columns = [
        { id: 'buyer-power', icon: Users, label: 'Bargaining\nPower of Buyers', header: 'BPOB increases with,' },
        { id: 'supplier-power', icon: Factory, label: 'Bargaining Power\nof Suppliers', header: 'BPOS increases with,' },
        { id: 'rivalry', icon: Swords, label: 'Competitive\nRivalry', header: 'RIVALRY increases with,' },
        { id: 'substitution', icon: Shuffle, label: 'Threat of\nSubstitution', header: 'TOS increases with,' },
        { id: 'new-entrants', icon: DoorOpen, label: 'Threat of New\nEntrants', header: 'TONE increases with,' },
    ];

    return (
        <div className="w-full h-full p-4 flex flex-col items-center bg-zinc-950 font-sans overflow-auto">
            <h2 className="text-yellow-500 mb-8 text-2xl font-light tracking-[0.2em] uppercase opacity-90 border-b border-zinc-900 pb-4">
                Porter's Industry 5 Forces
            </h2>

            <div className="flex flex-row gap-4 w-full h-full max-w-[1400px]">
                {columns.map((col, index) => {
                    const Icon = col.icon;
                    // Get static data for this section (examples)
                    const sectionData = framework.sections.find(s => s.id === col.id);
                    const defaultPoints = sectionData?.examples || [];

                    return (
                        <React.Fragment key={col.id}>
                            <div className="flex-1 flex flex-col items-center group h-full min-w-[220px]">

                                {/* 1. ICON (Neon Yellow Circle) */}
                                <div className="w-24 h-24 rounded-full bg-zinc-950 flex items-center justify-center z-20 border border-yellow-500/30 shadow-[0_0_15px_rgba(234,179,8,0.2)] group-hover:shadow-[0_0_25px_rgba(234,179,8,0.4)] group-hover:border-yellow-500/60 transition-all duration-300 relative">
                                    <Icon size={36} className="text-yellow-500 group-hover:text-yellow-300 transition-colors" strokeWidth={1.5} />
                                </div>

                                {/* 2. TITLE */}
                                <div className="text-center mt-4 mb-2 h-12 flex items-center justify-center">
                                    <h3 className="text-zinc-300 font-bold text-sm uppercase whitespace-pre-line leading-tight group-hover:text-yellow-400 transition-colors">
                                        {col.label}
                                    </h3>
                                </div>

                                {/* 3. CONNECTION (Dashed Line) */}
                                <div className="h-8 w-px border-l-2 border-dashed border-yellow-500/30 group-hover:border-yellow-500/60 transition-colors"></div>

                                {/* 4. CONTENT BOX */}
                                <div className="w-full flex-1 flex flex-col bg-zinc-900/40 backdrop-blur-sm border border-zinc-900 group-hover:border-yellow-500/30 rounded-lg overflow-hidden transition-all duration-300 mt-0">
                                    {/* Red/Yellow Header Box */}
                                    <div className="bg-yellow-700/20 border-b border-yellow-900/30 p-2 text-center">
                                        <span className="text-yellow-500 text-xs font-bold uppercase tracking-wide">
                                            {col.header}
                                        </span>
                                    </div>

                                    {/* List Content */}
                                    <div className="flex-1 p-3 overflow-y-auto custom-scrollbar flex flex-col gap-2">
                                        {/* Static Examples List */}
                                        {showDescriptions && defaultPoints.length > 0 && (
                                            <ul className="list-disc list-outside ml-4 space-y-1 mb-4 border-b border-zinc-900/50 pb-2">
                                                {defaultPoints.map((point, i) => (
                                                    <li key={i} className="text-zinc-400 text-xs leading-relaxed">
                                                        {point}
                                                    </li>
                                                ))}
                                            </ul>
                                        )}

                                        {/* Interactive Input */}
                                        <InteractiveNode
                                            id={col.id}
                                            initialContent={content[col.id] || []}
                                            onUpdate={(c) => handleContentChange(col.id, c)}
                                            isInteractive={interactive}
                                            placeholder="Add notes..."
                                            style={{ color: '#fbbf24', fontSize: '13px', lineHeight: '1.6' }}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Connector Arrows */}
                            {index < columns.length - 1 && (
                                <div className="flex flex-col pt-10 px-2 justify-start h-full">
                                    {/* Logic: 0,1 point right. 2,3 point left (towards rivalry at 2) */}
                                    {(index === 0 || index === 1) && (
                                        <div className="text-yellow-600/50 text-2xl font-bold transform translate-y-2">
                                            ➔
                                        </div>
                                    )}
                                    {(index === 2 || index === 3) && (
                                        <div className="text-yellow-600/50 text-2xl font-bold transform translate-y-2 rotate-180">
                                            ➔
                                        </div>
                                    )}
                                </div>
                            )}
                        </React.Fragment>
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
                    background: rgba(234, 179, 8, 0.3);
                    border-radius: 2px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: rgba(234, 179, 8, 0.5);
                }
            `}</style>
        </div>
    );
}
