import { Framework } from '../../../types';
import InteractiveNode from '../InteractiveNode';

interface ConcentricDiagramProps {
    framework: Framework;
    content: Record<string, string[]>;
    interactive?: boolean;
    showLabels?: boolean;
    showDescriptions?: boolean;
    onContentChange?: (sectionId: string, content: string[]) => void;
}

export default function ConcentricDiagram({
    framework,
    content,
    interactive = false,
    showDescriptions = true,
    onContentChange
}: ConcentricDiagramProps) {
    const sections = framework.sections; // Expected: TAM, SAM, SOM in order

    // Helper to get section data safely
    const getSection = (index: number) => sections[index] || { id: `section-${index}`, name: 'Section', description: '' };

    const tam = getSection(0);
    const sam = getSection(1);
    const som = getSection(2);

    return (
        <div className="w-full h-full flex flex-col items-center justify-start relative aspect-square max-w-[650px] mx-auto p-4 select-none gap-2">

            {/* 1. TAM (Top Section) - Widest */}
            <div className="w-full h-[33%] relative flex flex-col items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-b from-sky-900/20 to-sky-900/5 border border-sky-500/30 rounded-t-xl clip-trapezoid-top backdrop-blur-sm transition-all hover:bg-sky-900/30 hover:border-sky-500/50"></div>
                <div className="z-10 flex flex-col items-center w-full px-4 text-center">
                    <div className="flex flex-col items-center gap-0.5 mb-2 pointer-events-auto">
                        <h4 className="text-xl font-bold text-sky-400 tracking-widest drop-shadow-md">{tam.name}</h4>
                        {showDescriptions && <span className="text-[10px] text-sky-300/80 uppercase tracking-widest font-medium">The market that exists</span>}
                    </div>
                    {interactive && (
                        <div className="nodrag w-[90%] z-50 pointer-events-auto">
                            <InteractiveNode
                                id={tam.id}
                                initialContent={content[tam.id] || []}
                                onUpdate={(c) => onContentChange?.(tam.id, c)}
                                isInteractive={interactive}
                                placeholder="Add market details..."
                                style={{ fontSize: '13px', color: '#7dd3fc', textAlign: 'center', opacity: 0.9 }}
                            />
                        </div>
                    )}
                </div>
            </div>

            {/* 2. SAM (Middle Section) - Medium Width */}
            <div className="w-[75%] h-[33%] relative flex flex-col items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 to-blue-900/5 border-x border-b border-blue-500/30 backdrop-blur-sm transition-all hover:bg-blue-900/30 hover:border-blue-500/50"></div>
                <div className="z-10 flex flex-col items-center w-full px-4 text-center">
                    <div className="flex flex-col items-center gap-0.5 mb-2 pointer-events-auto">
                        <h4 className="text-xl font-bold text-blue-300 tracking-widest drop-shadow-md">{sam.name}</h4>
                        {showDescriptions && <span className="text-[10px] text-blue-200/80 uppercase tracking-widest font-medium">The market that is accessible</span>}
                    </div>
                    {interactive && (
                        <div className="nodrag w-[90%] z-50 pointer-events-auto">
                            <InteractiveNode
                                id={sam.id}
                                initialContent={content[sam.id] || []}
                                onUpdate={(c) => onContentChange?.(sam.id, c)}
                                isInteractive={interactive}
                                placeholder="Add serviceable details..."
                                style={{ fontSize: '13px', color: '#93c5fd', textAlign: 'center', opacity: 0.9 }}
                            />
                        </div>
                    )}
                </div>
            </div>

            {/* 3. SOM (Bottom Section) - Narrowest */}
            <div className="w-[50%] h-[33%] relative flex flex-col items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-b from-indigo-900/20 to-indigo-900/5 border-x border-b border-indigo-500/30 rounded-b-xl backdrop-blur-sm transition-all hover:bg-indigo-900/30 hover:border-indigo-500/50"></div>
                <div className="z-10 flex flex-col items-center w-full px-4 text-center">
                    <div className="flex flex-col items-center gap-0.5 mb-2 pointer-events-auto">
                        <h4 className="text-xl font-bold text-indigo-200 tracking-widest drop-shadow-md">{som.name}</h4>
                        {showDescriptions && <span className="text-[10px] text-indigo-200/70 uppercase tracking-widest font-medium">The market that is winnable</span>}
                    </div>
                    {interactive && (
                        <div className="nodrag w-[90%] z-50 pointer-events-auto">
                            <InteractiveNode
                                id={som.id}
                                initialContent={content[som.id] || []}
                                onUpdate={(c) => onContentChange?.(som.id, c)}
                                isInteractive={interactive}
                                placeholder="Add obtainable share..."
                                style={{ fontSize: '13px', color: '#c7d2fe', textAlign: 'center', opacity: 0.9 }}
                            />
                        </div>
                    )}
                </div>
            </div>

        </div>
    );
}
