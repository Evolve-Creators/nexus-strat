import React from 'react';
import { Framework } from '../../../types';
import InteractiveNode from '../InteractiveNode';
import { Package, Tag, MapPin, Megaphone } from 'lucide-react';

interface Marketing4PsDiagramProps {
    framework: Framework;
    content: Record<string, string[]>;
    interactive?: boolean;
    showDescriptions?: boolean;
    onContentChange?: (sectionId: string, content: string[]) => void;
}

const Marketing4PsDiagram: React.FC<Marketing4PsDiagramProps> = ({
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    framework,
    content,
    interactive = false,
    onContentChange
}) => {

    const handleContentChange = (sectionId: string, newContent: string[]) => {
        if (onContentChange) {
            onContentChange(sectionId, newContent);
        }
    };

    const sections = [
        { id: 'product', icon: Package, color: 'red' },
        { id: 'price', icon: Tag, color: 'red' },
        { id: 'place', icon: MapPin, color: 'red' },
        { id: 'promotion', icon: Megaphone, color: 'red' }
    ];

    return (
        <div className="w-full h-full p-8 font-sans overflow-auto bg-zinc-950 text-zinc-300 flex flex-col items-center">

            <h2 className="text-2xl font-light text-red-500 mb-12 tracking-[0.3em] uppercase opacity-80 border-b border-zinc-900 pb-4 w-full max-w-4xl text-center">
                4P's of Marketing
            </h2>

            <div className="flex flex-col gap-6 w-full max-w-5xl">
                {sections.map((section) => {
                    const Icon = section.icon;
                    // Find actual section data to get the name if available, else capitalize ID
                    const sectionData = framework.sections.find(s => s.id === section.id);
                    const title = sectionData ? sectionData.name : section.id;

                    return (
                        <div key={section.id} className="flex items-center w-full h-[100px] gap-0 group">

                            {/* 1. ICON (Neon Circle) */}
                            <div className="w-24 h-24 rounded-full bg-zinc-950 flex items-center justify-center z-20 border border-red-500/30 shadow-[0_0_15px_rgba(220,38,38,0.2)] group-hover:shadow-[0_0_25px_rgba(220,38,38,0.4)] group-hover:border-red-500/60 transition-all duration-300 relative shrink-0 -mr-6">
                                <Icon size={32} className="text-red-500 group-hover:text-red-400 transition-colors" strokeWidth={1.5} />
                            </div>

                            {/* 2. TITLE (Dark Glass) */}
                            <div className="w-[200px] h-[80px] bg-zinc-900/80 backdrop-blur-sm flex items-center pl-10 pr-6 relative z-10 clip-path-chevron-right border-y border-l border-zinc-900 group-hover:border-red-900/30 transition-colors">
                                <span className="text-zinc-300 font-bold text-xl tracking-tight group-hover:text-red-400 transition-colors">{title}</span>
                            </div>

                            {/* 3. CONTENT (Arrow Container - Sleek) */}
                            <div className="flex-1 h-[80px] ml-[-20px] relative z-0">
                                {/* The Arrow Shape Wrapper */}
                                <div className="absolute inset-0 bg-zinc-900/40 backdrop-blur-sm border-y border-r border-zinc-900 group-hover:border-red-500/20 flex items-center pl-14 pr-12 clip-path-arrow-right-long transition-all duration-300">

                                    <div className="w-full text-zinc-400 text-sm font-medium leading-tight group-hover:text-zinc-300 transition-colors">
                                        <InteractiveNode
                                            id={section.id}
                                            initialContent={content[section.id] || []}
                                            onUpdate={(c: string[]) => handleContentChange(section.id, c)}
                                            isInteractive={interactive}
                                            placeholder="Add details..."
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* CSS for Clip Paths (Injecting here for scope) */}
            <style>{`
                .clip-path-chevron-right {
                    clip-path: polygon(0% 0%, 85% 0%, 100% 50%, 85% 100%, 0% 100%);
                }
                .clip-path-arrow-right-long {
                    clip-path: polygon(0% 0%, 95% 0%, 100% 50%, 95% 100%, 0% 100%, 5% 50%);
                }
            `}</style>
        </div>
    );
};

export default Marketing4PsDiagram;
