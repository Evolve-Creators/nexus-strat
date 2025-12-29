import React from 'react';
import InteractiveNode from '../InteractiveNode';
import { Framework } from '../../../types';
import { Landmark, TrendingUp, Users, Cpu, Leaf, Gavel } from 'lucide-react';

interface PestelDiagramProps {
    framework: Framework;
    content: Record<string, string[]>;
    interactive?: boolean;
    showDescriptions?: boolean;
    onContentChange?: (sectionId: string, content: string[]) => void;
}

export default function PestelDiagram({
    framework,
    content,
    interactive = false,
    showDescriptions = true,
    onContentChange
}: PestelDiagramProps) {

    const handleContentChange = (id: string, newContent: string[]) => {
        onContentChange?.(id, newContent);
    };

    const iconMap: Record<string, React.ReactNode> = {
        political: <Landmark size={40} />,
        economic: <TrendingUp size={40} />,
        social: <Users size={40} />,
        technological: <Cpu size={40} />,
        environmental: <Leaf size={40} />,
        legal: <Gavel size={40} />
    };

    return (
        <div className="w-full h-full flex flex-col items-center bg-zinc-950 p-8 overflow-auto font-sans text-zinc-100">
            {/* Main Container */}
            <div className="w-full max-w-4xl flex flex-col gap-6">

                {/* Red Header Strip - Themed */}
                <div className="bg-red-950/30 border border-red-900/50 backdrop-blur-md py-4 px-6 rounded-t-xl shadow-2xl mb-4 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-red-900/10 to-transparent pointer-events-none"></div>
                    <h2 className="text-3xl font-bold text-red-500 text-center uppercase tracking-[0.2em] drop-shadow-sm">PESTEL Analysis</h2>
                </div>

                {/* Vertical List Items */}
                <div className="flex flex-col gap-8">
                    {framework.sections.map(section => (
                        <div key={section.id} className="flex gap-6 items-start group">

                            {/* Left Icon Column */}
                            <div className="w-24 flex flex-col items-center pt-2">
                                <div className="p-4 rounded-full border-2 border-red-500 text-red-500 bg-red-950/20 shadow-[0_0_15px_rgba(239,68,68,0.2)] group-hover:scale-110 transition-transform duration-300">
                                    {iconMap[section.id] || <div className="w-10 h-10" />}
                                </div>
                            </div>

                            {/* Right Content Column */}
                            <div className="flex-1 flex flex-col gap-2">
                                {/* Title Strip - Gray background as per reference */}
                                <div className="bg-zinc-800 border-l-4 border-zinc-600 py-1 px-4 rounded-r-md">
                                    <h3 className="text-lg font-bold text-zinc-100 uppercase tracking-wide">
                                        {section.name}
                                    </h3>
                                </div>

                                {/* Description Box - Dotted look */}
                                <div className="border border-dashed border-zinc-700 bg-zinc-900/50 rounded-lg p-4 relative">
                                    {showDescriptions && (
                                        <>
                                            <div className="text-sm text-zinc-400 mb-3 italic">
                                                {section.description}
                                            </div>

                                            {/* Questions if available */}
                                            {section.questions && (
                                                <div className="mb-3 text-xs text-zinc-500 space-y-1">
                                                    {section.questions.map((q, i) => (
                                                        <div key={i}>• {q}</div>
                                                    ))}
                                                </div>
                                            )}
                                        </>
                                    )}

                                    {/* Interactive Input */}
                                    <div className="mt-2">
                                        <InteractiveNode
                                            id={section.id}
                                            initialContent={content[section.id] || []}
                                            onUpdate={(c) => handleContentChange(section.id, c)}
                                            isInteractive={interactive}
                                            placeholder={`Add ${section.name} factors...`}
                                            style={{ color: '#e4e4e7' }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
