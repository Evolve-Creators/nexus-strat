import React from 'react';
import InteractiveNode from '../InteractiveNode';
import { Framework } from '../../../types';
import { Network } from 'lucide-react';

interface SwotDiagramProps {
    framework: Framework;
    content: Record<string, string[]>;
    interactive?: boolean;
    showDescriptions?: boolean;
    onContentChange?: (sectionId: string, content: string[]) => void;
}

const SwotDiagram: React.FC<SwotDiagramProps> = ({
    framework,
    content,
    interactive = false,
    onContentChange,
    showDescriptions = true
}) => {
    // Helper to get section data
    const getSection = (id: string) => framework.sections.find(s => s.id === id);

    const categories = [
        { id: 'strengths', title: 'Strengths', icon: 'S', accent: 'border-emerald-500' },
        { id: 'weaknesses', title: 'Weaknesses', icon: 'W', accent: 'border-orange-500' },
        { id: 'opportunities', title: 'Opportunities', icon: 'O', accent: 'border-blue-500' },
        { id: 'threats', title: 'Threats', icon: 'T', accent: 'border-red-600' }
    ];

    const handleUpdate = (id: string, newContent: string[]) => {
        onContentChange?.(id, newContent);
    };

    return (
        <div className="w-full h-full flex flex-col items-center p-8 bg-zinc-950 font-sans text-zinc-200 overflow-auto">
            {/* Header */}
            <div className="flex items-center gap-3 mb-8 pb-4 border-b border-zinc-800 w-full max-w-6xl">
                <div className="p-2 bg-emerald-500/10 rounded-lg">
                    <Network className="text-emerald-500" />
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-white">SWOT Analysis</h2>
                    <p className="text-zinc-500 text-sm">Strategic planning and competitive analysis</p>
                </div>
            </div>

            <div className="flex gap-4 w-full max-w-6xl h-[800px]">
                {/* Left Sidebar: Axis Labels */}
                <div className="flex flex-col w-12 h-full gap-4 py-8">
                    {/* Internal Label - Spans top half */}
                    <div className="flex-1 flex items-center justify-center relative border-l-2 border-zinc-700">
                        <div className="absolute -left-4 transform -rotate-90 text-zinc-500 font-bold tracking-[0.2em] text-xs whitespace-nowrap flex items-center gap-2">
                            INTERNAL
                        </div>
                    </div>

                    {/* External Label - Spans bottom half */}
                    <div className="flex-1 flex items-center justify-center relative border-l-2 border-zinc-700">
                        <div className="absolute -left-4 transform -rotate-90 text-zinc-500 font-bold tracking-[0.2em] text-xs whitespace-nowrap flex items-center gap-2">
                            EXTERNAL
                        </div>
                    </div>
                </div>

                {/* Main 2x2 Grid */}
                <div className="grid grid-cols-2 grid-rows-2 gap-4 flex-1 h-full">
                    {categories.map((cat) => {
                        const sectionData = getSection(cat.id);
                        return (
                            <div
                                key={cat.id}
                                className={`bg-zinc-900 border border-zinc-700 rounded-xl p-6 flex flex-col hover:border-zinc-500 transition-colors shadow-sm relative group overflow-hidden`}
                            >
                                {/* Header */}
                                <div className={`flex items-center gap-3 mb-3 pb-2 border-b border-zinc-800 ${cat.accent.replace('border-', 'text-')}`}>
                                    <h3 className="text-lg font-bold uppercase tracking-wider">{cat.title}</h3>
                                </div>

                                {/* Questions / Description Helper */}
                                {showDescriptions && sectionData && (sectionData.questions || sectionData.description) && (
                                    <div className="mb-4 bg-zinc-950/50 p-3 rounded border border-zinc-800/50">
                                        {sectionData.description && (
                                            <p className="text-xs text-zinc-400 mb-2 italic">{sectionData.description}</p>
                                        )}
                                        {sectionData.questions && sectionData.questions.length > 0 && (
                                            <ul className="list-disc list-inside text-[10px] text-zinc-500 space-y-1">
                                                {sectionData.questions.map((q, i) => (
                                                    <li key={i}>{q}</li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                )}

                                {/* Content Input */}
                                <div className="flex-1 overflow-y-auto custom-scrollbar">
                                    <InteractiveNode
                                        id={cat.id}
                                        initialContent={content[cat.id] || []}
                                        onUpdate={(c) => handleUpdate(cat.id, c)}
                                        isInteractive={interactive}
                                        placeholder={`Add key ${cat.title.toLowerCase()}...`}
                                        style={{ color: '#e4e4e7' }}
                                    />
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default SwotDiagram;
