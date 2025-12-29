import React from 'react';
import { Framework } from '../../../types';
import InteractiveNode from '../InteractiveNode';

interface FiveCDiagramProps {
    framework: Framework;
    content: Record<string, string[]>;
    interactive?: boolean;
    showDescriptions?: boolean;
    onContentChange?: (sectionId: string, content: string[]) => void;
}

const FiveCDiagram: React.FC<FiveCDiagramProps> = ({
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    framework,
    content,
    interactive = false,
    showDescriptions = true,
    onContentChange
}) => {

    const handleContentChange = (sectionId: string, newContent: string[]) => {
        if (onContentChange) {
            onContentChange(sectionId, newContent);
        }
    };

    // Helper to render a generic C card
    const renderCard = (sectionId: string, title: string, subtitle?: string) => {
        // Find the section data from framework definition if needed, or just use hardcoded title
        // We use the passed keys to look up content

        return (
            <div className="flex flex-col h-full bg-zinc-900/40 backdrop-blur-md border border-zinc-800 hover:border-cyan-500/30 transition-all duration-300 rounded-lg overflow-hidden group">
                {/* Header */}
                <div className="bg-zinc-900/60 px-4 py-3 border-b border-zinc-800 flex flex-col items-center justify-center relative">
                    <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <h3 className="text-lg font-bold text-zinc-100 tracking-wide">{title}</h3>
                    {showDescriptions && subtitle && <span className="text-[10px] text-zinc-500 uppercase tracking-widest mt-1">{subtitle}</span>}
                </div>

                {/* Content */}
                <div className="p-4 flex-1 min-h-[160px]">
                    <InteractiveNode
                        id={sectionId}
                        initialContent={content[sectionId] || []}
                        onUpdate={(c: string[]) => handleContentChange(sectionId, c)}
                        isInteractive={interactive}
                    />
                </div>
            </div>
        );
    };

    return (
        <div className="w-full h-full p-8 font-sans overflow-auto bg-zinc-950 text-zinc-300 flex flex-col items-center">

            <h2 className="text-2xl font-light text-cyan-400 mb-12 tracking-[0.3em] uppercase opacity-80 border-b border-zinc-800 pb-4 w-full max-w-5xl text-center">
                5C's of Marketing
            </h2>

            <div className="flex flex-col gap-8 w-full max-w-6xl">

                {/* Top Row: 3 Columns */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {renderCard('company', 'Company', 'Internal Analysis')}
                    {renderCard('customer', 'Customer', 'Target Audience')}
                    {renderCard('competitor', 'Competitor', 'Market Landscape')}
                </div>

                {/* Bottom Row: 2 Columns Centered */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full md:w-2/3 mx-auto">
                    {renderCard('collaboration', 'Collaboration', 'Partners & Alliances')}
                    {renderCard('context', 'Context', 'External Environment')}
                </div>

            </div>
        </div>
    );
};

export default FiveCDiagram;
