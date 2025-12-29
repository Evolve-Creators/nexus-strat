
import InteractiveNode from '../InteractiveNode';
import { Framework } from '../../../types';

interface CustomerJourneyDiagramProps {
    framework: Framework;
    content: Record<string, string[]>;
    interactive?: boolean;
    showDescriptions?: boolean;
    onContentChange?: (sectionId: string, content: string[]) => void;
}

export default function CustomerJourneyDiagram({
    content,
    interactive = false,
    onContentChange
}: CustomerJourneyDiagramProps) {
    const handleContentChange = (id: string, newContent: string[]) => {
        onContentChange?.(id, newContent);
    };

    return (
        <div className="w-full h-full p-8 font-sans overflow-x-auto bg-zinc-950 text-zinc-300">

            <div className="flex flex-col min-w-[1200px] h-full items-center">

                <h2 className="text-2xl font-light text-cyan-400 mb-8 tracking-[0.3em] uppercase opacity-80">
                    Customer Journey Map
                </h2>

                {/* Main Process Flow */}
                <div className="flex flex-row gap-1 w-full max-w-7xl">

                    {/* PHASE 1: PRE-PURCHASE */}
                    <div className="flex-1 min-w-[350px] flex flex-col relative">
                        {/* Chevron Header */}
                        <div className="relative h-14 bg-zinc-900 flex items-center justify-center z-30 group overflow-hidden">
                            {/* Arrow Shape Mask */}
                            <div className="absolute inset-0 bg-gradient-to-r from-zinc-900 to-zinc-800 clip-path-arrow-right"></div>
                            {/* Neon Border Line */}
                            <div className="absolute bottom-0 left-0 w-full h-[2px] bg-cyan-500/50 shadow-[0_0_10px_rgba(6,182,212,0.5)] z-40"></div>

                            <div className="relative z-50 text-cyan-400 font-bold tracking-widest uppercase">Pre-Purchase</div>
                        </div>

                        {/* Connector Line */}
                        <div className="w-[1px] h-8 bg-zinc-700 mx-auto"></div>
                        <div className="w-[80%] h-[1px] bg-zinc-700 mx-auto -mt-[1px]"></div>
                        <div className="flex justify-around w-[80%] mx-auto">
                            <div className="w-[1px] h-4 bg-zinc-700"></div>
                            <div className="w-[1px] h-4 bg-zinc-700"></div>
                        </div>


                        {/* Content Area */}
                        <div className="flex gap-4 p-4 pt-0">
                            {/* Need Node */}
                            <div className="w-1/3 flex flex-col gap-2">
                                <div className="bg-red-900/40 border border-red-500/30 p-2 text-center rounded-sm">
                                    <div className="text-red-400 font-bold uppercase text-xs tracking-wider">Need</div>
                                </div>
                                <div className="bg-zinc-900/60 p-2 border border-zinc-800 flex-1 min-h-[60px] rounded-sm">
                                    <InteractiveNode id="need" initialContent={content['need'] || []} onUpdate={(c) => handleContentChange('need', c)} isInteractive={interactive} />
                                </div>
                            </div>

                            {/* 4A Framework */}
                            <div className="flex-1 flex flex-col gap-2">
                                <div className="bg-red-900/40 border border-red-500/30 p-2 text-center rounded-sm">
                                    <div className="text-red-400 font-bold uppercase text-xs tracking-wider">4A Framework</div>
                                </div>
                                <div className="flex flex-col gap-1">
                                    {['awareness', 'affordability', 'availability', 'accessibility'].map(sub => (
                                        <div key={sub} className="bg-zinc-800/80 border-l-2 border-zinc-600 p-2 text-sm hover:border-cyan-400 transition-colors">
                                            <div className="text-[10px] text-zinc-500 uppercase font-bold mb-1">{sub}</div>
                                            <InteractiveNode id={sub} initialContent={content[sub] || []} onUpdate={(c) => handleContentChange(sub, c)} isInteractive={interactive} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* PHASE 2: DURING PURCHASE */}
                    <div className="flex-1 min-w-[350px] flex flex-col relative">
                        {/* Chevron Header */}
                        <div className="relative h-14 flex items-center justify-center z-20 -ml-4 pl-6 w-[calc(100%+16px)]">
                            <div className="absolute inset-0 bg-gradient-to-r from-zinc-900 to-zinc-800 clip-path-arrow-right shadow-xl"></div>
                            {/* Neon Border Line */}
                            <div className="absolute bottom-0 left-0 w-[95%] h-[2px] bg-cyan-500/50 shadow-[0_0_10px_rgba(6,182,212,0.5)] z-40"></div>
                            <div className="relative z-50 text-cyan-400 font-bold tracking-widest uppercase">During Purchase</div>
                        </div>

                        {/* Connector Line */}
                        <div className="w-[1px] h-8 bg-zinc-700 mx-auto"></div>
                        <div className="w-[80%] h-[1px] bg-zinc-700 mx-auto -mt-[1px]"></div>
                        <div className="flex justify-around w-[80%] mx-auto">
                            <div className="w-[1px] h-4 bg-zinc-700"></div>
                            <div className="w-[1px] h-4 bg-zinc-700"></div>
                        </div>

                        {/* Content Area */}
                        <div className="flex gap-4 p-4 pt-0">
                            {/* Purchase Journey */}
                            <div className="flex-1 flex flex-col gap-2">
                                <div className="bg-red-900/40 border border-red-500/30 p-2 text-center rounded-sm">
                                    <div className="text-red-400 font-bold uppercase text-xs tracking-wider">Purchase Journey</div>
                                </div>
                                <div className="flex flex-col gap-1">
                                    {['in-store', 'apps-online', 'omni-channel'].map(sub => (
                                        <div key={sub} className="bg-zinc-800/80 border-l-2 border-zinc-600 p-2 text-sm hover:border-cyan-400 transition-colors">
                                            <div className="text-[10px] text-zinc-500 uppercase font-bold mb-1">{sub}</div>
                                            <InteractiveNode id={sub} initialContent={content[sub] || []} onUpdate={(c) => handleContentChange(sub, c)} isInteractive={interactive} />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* 5 Senses */}
                            <div className="flex-1 flex flex-col gap-2">
                                <div className="bg-red-900/40 border border-red-500/30 p-2 text-center rounded-sm">
                                    <div className="text-red-400 font-bold uppercase text-xs tracking-wider">5 Senses</div>
                                </div>
                                <div className="flex flex-col gap-1">
                                    {['vision', 'hearing', 'smell', 'taste', 'touch'].map(sub => (
                                        <div key={sub} className="bg-zinc-800/80 border-l-2 border-zinc-600 p-2 text-sm hover:border-cyan-400 transition-colors">
                                            <div className="text-[10px] text-zinc-500 uppercase font-bold mb-1">{sub}</div>
                                            <InteractiveNode id={sub} initialContent={content[sub] || []} onUpdate={(c) => handleContentChange(sub, c)} isInteractive={interactive} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* PHASE 3: POST PURCHASE */}
                    <div className="flex-1 min-w-[450px] flex flex-col relative">
                        {/* Chevron Header */}
                        <div className="relative h-14 flex items-center justify-center z-10 -ml-4 pl-6 w-[calc(100%+16px)]">
                            <div className="absolute inset-0 bg-gradient-to-r from-zinc-900 to-zinc-800 clip-path-arrow-right shadow-xl"></div>
                            {/* Neon Border Line */}
                            <div className="absolute bottom-0 left-0 w-[92%] h-[2px] bg-cyan-500/50 shadow-[0_0_10px_rgba(6,182,212,0.5)] z-40"></div>
                            <div className="relative z-50 text-cyan-400 font-bold tracking-widest uppercase">Post Purchase</div>
                        </div>

                        {/* Connector Line */}
                        <div className="w-[1px] h-8 bg-zinc-700 mx-auto"></div>
                        <div className="w-[85%] h-[1px] bg-zinc-700 mx-auto -mt-[1px]"></div>
                        <div className="flex justify-around w-[90%] mx-auto">
                            <div className="w-[1px] h-4 bg-zinc-700"></div>
                            <div className="w-[1px] h-4 bg-zinc-700"></div>
                            <div className="w-[1px] h-4 bg-zinc-700"></div>
                        </div>

                        {/* Content Area */}
                        <div className="flex gap-2 p-4 pt-0">
                            {/* After Sales */}
                            <div className="flex-1 flex flex-col gap-2">
                                <div className="bg-red-900/40 border border-red-500/30 p-2 text-center rounded-sm h-10 flex items-center justify-center">
                                    <div className="text-red-400 font-bold uppercase text-[10px] tracking-wider leading-tight">After Sales Service</div>
                                </div>
                                <div className="bg-zinc-900/50 p-2 border border-red-900/30 text-center rounded-sm">
                                    <div className="text-[10px] text-red-400 uppercase mb-1">Repair & Maint.</div>
                                    <InteractiveNode id="repair-maint" initialContent={content['repair-maint'] || []} onUpdate={(c) => handleContentChange('repair-maint', c)} isInteractive={interactive} />
                                </div>
                            </div>

                            {/* Loyalty */}
                            <div className="flex-1 flex flex-col gap-2">
                                <div className="bg-red-900/40 border border-red-500/30 p-2 text-center rounded-sm h-10 flex items-center justify-center">
                                    <div className="text-red-400 font-bold uppercase text-[10px] tracking-wider leading-tight">Loyalty Programs</div>
                                </div>
                                <div className="bg-zinc-900/50 p-2 border-l-2 border-zinc-700 h-full">
                                    <InteractiveNode id="loyalty" initialContent={content['loyalty'] || []} onUpdate={(c) => handleContentChange('loyalty', c)} isInteractive={interactive} />
                                </div>
                            </div>

                            {/* Returns */}
                            <div className="flex-1 flex flex-col gap-2">
                                <div className="bg-red-900/40 border border-red-500/30 p-2 text-center rounded-sm h-10 flex items-center justify-center">
                                    <div className="text-red-400 font-bold uppercase text-[10px] tracking-wider leading-tight">Returns / Exchange</div>
                                </div>
                                <div className="bg-zinc-900/50 p-2 border border-red-900/30 text-center rounded-sm">
                                    <div className="text-[10px] text-red-400 uppercase mb-1">Guarantees</div>
                                    <InteractiveNode id="guarantees" initialContent={content['guarantees'] || []} onUpdate={(c) => handleContentChange('guarantees', c)} isInteractive={interactive} />
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
