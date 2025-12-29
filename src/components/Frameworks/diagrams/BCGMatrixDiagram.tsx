
import InteractiveNode from '../InteractiveNode';
import { Framework } from '../../../types';
import { Star, HelpCircle, CircleDollarSign, AlertTriangle } from 'lucide-react';

interface BCGMatrixDiagramProps {
    framework: Framework;
    content: Record<string, string[]>;
    interactive?: boolean;
    showDescriptions?: boolean;
    onContentChange?: (sectionId: string, content: string[]) => void;
}

export default function BCGMatrixDiagram({
    framework,
    content,
    interactive = false,
    showDescriptions = true,
    onContentChange
}: BCGMatrixDiagramProps) {

    const handleContentChange = (id: string, newContent: string[]) => {
        onContentChange?.(id, newContent);
    };

    // Quadrants config
    // Star -> Star
    // Question Mark -> HelpCircle
    // Cash Cow -> CircleDollarSign
    // Dog -> AlertTriangle (closest to "Problem/Dog" without custom SVG)
    const quadrants = [
        { id: 'star', label: 'STAR', icon: Star, color: 'emerald', gridArea: '1 / 1 / 2 / 2' },
        { id: 'question-mark', label: 'QUESTION MARK', icon: HelpCircle, color: 'emerald', gridArea: '1 / 2 / 2 / 3' },
        { id: 'cash-cow', label: 'CASH COW', icon: CircleDollarSign, color: 'emerald', gridArea: '2 / 1 / 3 / 2' },
        { id: 'dog', label: 'DOG', icon: AlertTriangle, color: 'emerald', gridArea: '2 / 2 / 3 / 3' },
    ];

    return (
        <div className="w-full h-full p-8 bg-zinc-950 font-sans flex flex-col items-center justify-center relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-emerald-900/10 blur-[120px] rounded-full pointer-events-none" />

            {/* Title */}
            <h2 className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-green-200 text-3xl font-light tracking-[0.2em] uppercase border-b border-zinc-900 pb-4 mb-4 z-10 drop-shadow-[0_0_10px_rgba(16,185,129,0.5)]">
                {framework.name}
            </h2>

            {/* Main Container including Axis Labels */}
            <div className="relative w-full max-w-4xl h-[600px] grid grid-cols-[40px_1fr_1fr] grid-rows-[40px_1fr_1fr] gap-4 z-10">

                {/* Top X-Axis Labels */}
                {/* Corner (Empty) */}
                <div />
                {/* High Share */}
                <div className="flex items-center justify-center pb-2 bg-zinc-900/50 rounded-t border-b border-emerald-900">
                    <span className="text-emerald-500 font-bold tracking-widest text-sm uppercase">High Share</span>
                </div>
                {/* Low Share */}
                <div className="flex items-center justify-center pb-2 bg-zinc-900/50 rounded-t border-b border-emerald-900">
                    <span className="text-emerald-500 font-bold tracking-widest text-sm uppercase">Low Share</span>
                </div>

                {/* Left Y-Axis Labels - SIMPLIFIED */}
                {/* High Growth */}
                <div className="flex items-center justify-center pr-2 bg-zinc-900/50 rounded-l border-r border-emerald-900">
                    <span className="text-emerald-500 font-bold tracking-widest text-sm uppercase writing-vertical-lr rotate-180">High Growth</span>
                </div>
                {/* Quadrant 1: Star */}
                {renderQuadrant(quadrants[0])}
                {/* Quadrant 2: Question Mark */}
                {renderQuadrant(quadrants[1])}


                {/* Low Growth */}
                <div className="flex items-center justify-center pr-2 bg-zinc-900/50 rounded-l border-r border-emerald-900">
                    <span className="text-emerald-500 font-bold tracking-widest text-sm uppercase writing-vertical-lr rotate-180">Low Growth</span>
                </div>
                {/* Quadrant 3: Cash Cow */}
                {renderQuadrant(quadrants[2])}
                {/* Quadrant 4: Dog */}
                {renderQuadrant(quadrants[3])}

            </div>

            <style>{`
                .writing-vertical-lr {
                    writing-mode: vertical-lr;
                }
                .custom-scrollbar::-webkit-scrollbar {
                    width: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(16, 185, 129, 0.2); 
                    border-radius: 2px;
                }
            `}</style>
        </div>
    );

    function renderQuadrant(quad: typeof quadrants[0]) {
        const section = framework.sections.find(s => s.id === quad.id);
        const defaultPoints = section?.examples || [];
        const Icon = quad.icon;

        return (
            <div className={`relative bg-zinc-900/80 backdrop-blur-md border border-zinc-900 rounded-xl overflow-hidden group hover:border-emerald-500 hover:shadow-[0_0_20px_rgba(16,185,129,0.2)] transition-all duration-300 flex flex-col p-4`}>
                {/* Header Icon + Label */}
                <div className="flex flex-row items-center justify-between border-b border-zinc-900 pb-3 mb-3">
                    <h3 className="text-emerald-400 text-xl font-bold tracking-widest uppercase drop-shadow-[0_0_5px_rgba(16,185,129,0.8)]">
                        {quad.label}
                    </h3>
                    <div className="text-red-500/80 drop-shadow-md">
                        <Icon size={32} strokeWidth={2.5} />
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto custom-scrollbar">
                    {showDescriptions && defaultPoints.length > 0 && (
                        <ul className="list-disc list-outside ml-4 space-y-2 mb-4">
                            {defaultPoints.map((point, i) => (
                                <li key={i} className="text-zinc-300 text-sm leading-relaxed marker:text-emerald-500">
                                    {point}
                                </li>
                            ))}
                        </ul>
                    )}

                    <InteractiveNode
                        id={quad.id}
                        initialContent={content[quad.id] || []}
                        onUpdate={(c) => handleContentChange(quad.id, c)}
                        isInteractive={interactive}
                        placeholder={`Add ${quad.label} factors...`}
                        style={{ color: '#a7f3d0', fontSize: '13px' }} // emerald-200
                    />
                </div>
            </div>
        );
    }
}
