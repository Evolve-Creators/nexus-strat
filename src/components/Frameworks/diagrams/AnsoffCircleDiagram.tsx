import { TrendingUp, Search, Zap, ArrowRight, RefreshCw } from 'lucide-react';
import { Framework } from '../../../types';
import InteractiveNode from '../InteractiveNode';

interface Props {
    framework: Framework;
    content: Record<string, string[]>;
    interactive?: boolean;
    onContentChange?: (sectionId: string, content: string[]) => void;
    showDescriptions?: boolean;
}

export default function AnsoffCircleDiagram({ framework, content, interactive, onContentChange, showDescriptions = true }: Props) {
    const handleUpdate = (id: string, c: string[]) => {
        onContentChange?.(id, c);
    };

    const getSection = (id: string) => framework.sections.find(s => s.id === id);

    const quadrants = [
        {
            id: 'market-development',
            icon: <TrendingUp className="w-8 h-8 text-emerald-400 mb-2" />,
            pos: 'top-left',
            bg: 'bg-zinc-900/80',
            border: 'border-l-4 border-t-4 border-emerald-600 rounded-tl-[3rem]',
            shadow: 'shadow-[inset_10px_10px_20px_rgba(16,185,129,0.05)]'
        },
        {
            id: 'diversification',
            icon: <Search className="w-8 h-8 text-emerald-400 mb-2" />,
            pos: 'top-right',
            bg: 'bg-zinc-900/80',
            border: 'border-r-4 border-t-4 border-emerald-800 rounded-tr-[3rem]',
            shadow: 'shadow-[inset_-10px_10px_20px_rgba(16,185,129,0.05)]'
        },
        {
            id: 'market-penetration',
            icon: <ArrowRight className="w-8 h-8 text-emerald-400 mb-2 rotate-[-45deg]" />,
            pos: 'bottom-left',
            bg: 'bg-zinc-900/80',
            border: 'border-l-4 border-b-4 border-emerald-500 rounded-bl-[3rem]',
            shadow: 'shadow-[inset_10px_-10px_20px_rgba(16,185,129,0.05)]'
        },
        {
            id: 'product-development',
            icon: <Zap className="w-8 h-8 text-emerald-400 mb-2" />,
            pos: 'bottom-right',
            bg: 'bg-zinc-900/80',
            border: 'border-r-4 border-b-4 border-emerald-700 rounded-br-[3rem]',
            shadow: 'shadow-[inset_-10px_-10px_20px_rgba(16,185,129,0.05)]'
        }
    ];

    return (
        <div className="w-full h-full flex flex-col items-center bg-zinc-950 p-8 overflow-auto font-sans text-zinc-100">

            {/* 1. Header Section */}
            <div className="w-full max-w-5xl mb-12 relative shrink-0">
                <div className="bg-emerald-950/30 border border-emerald-900/50 backdrop-blur-md py-6 px-8 rounded-2xl shadow-2xl relative overflow-hidden flex flex-col items-center">
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/10 via-transparent to-emerald-900/10 pointer-events-none"></div>
                    <h2 className="text-3xl font-bold text-emerald-500 text-center uppercase tracking-[0.2em] drop-shadow-lg z-10">Ansoff Matrix</h2>
                    <div className="text-sm text-emerald-500/60 font-mono mt-2 tracking-widest uppercase">Growth Strategy Framework</div>
                </div>
            </div>

            {/* 2. Main Layout Container (Flex Row: Left Axis | Grid) */}
            <div className="flex items-center gap-6 pl-24">

                {/* --- Left Axis Group --- */}
                <div className="flex items-center h-[650px] shrink-0 gap-4">

                    {/* A. MARKETS LABEL (Standalone) */}
                    <div className="bg-zinc-950 border border-emerald-900/50 py-8 px-4 rounded-full shadow-lg flex items-center justify-center h-full">
                        <span className="[writing-mode:vertical-lr] rotate-180 text-sm font-bold text-emerald-500 tracking-[0.4em] uppercase">Markets</span>
                    </div>

                    {/* B. SCALE (New/Existing) */}
                    <div className="bg-zinc-950/50 border border-zinc-800 py-6 px-1 rounded-full flex flex-col items-center h-[90%] justify-between">
                        <span className="[writing-mode:vertical-lr] rotate-180 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">New</span>
                        {/* Line connector */}
                        <div className="w-px bg-zinc-800 absolute left-1/2 top-10 bottom-10 -z-10"></div>
                        <span className="[writing-mode:vertical-lr] rotate-180 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Existing</span>
                    </div>

                </div>

                {/* --- Grid Container --- */}
                <div className="relative pt-16"> {/* Top padding for Top Axis space */}

                    {/* TOP AXIS: PRODUCTS (Absolute relative to Grid Container) */}
                    <div className="absolute top-0 left-0 right-0 flex justify-center z-10">
                        <div className="bg-zinc-950 border border-emerald-900/50 px-10 py-3 rounded-full shadow-lg flex flex-col items-center min-w-[350px]">
                            <span className="text-xs font-bold text-emerald-500 tracking-[0.3em] uppercase mb-2">Products</span>
                            <div className="flex text-[10px] items-center text-zinc-500 font-bold uppercase relative w-full justify-between px-2 gap-48">
                                <span>Existing</span>
                                <div className="h-px bg-zinc-800 absolute top-1/2 left-10 right-10 -z-10"></div>
                                <span>New</span>
                            </div>
                        </div>
                    </div>

                    {/* --- Grid Layout (Adjusted Height & Padding) --- */}
                    <div className="grid grid-cols-2 gap-8 w-[950px] h-[850px] relative">

                        {quadrants.map((q) => {
                            const section = getSection(q.id);
                            const isLeft = q.pos.includes('left');
                            const isTop = q.pos.includes('top');

                            return (
                                <div key={q.id} className={`relative ${q.bg} ${q.border} ${q.shadow} p-10 flex flex-col overflow-hidden transition-all duration-500 hover:bg-zinc-900 hover:scale-[1.01] hover:z-10 group`}>

                                    {/* Corner Icon */}
                                    <div className={`absolute ${isTop ? 'top-6' : 'bottom-6'} ${isLeft ? 'left-6' : 'right-6'} opacity-20 transition-opacity group-hover:opacity-100`}>
                                        {q.icon}
                                    </div>

                                    {/* Content Wrapper - REDUCED SAFE ZONES (pt-24/pb-24) to keep titles visible */}
                                    <div className={`flex flex-col h-full ${isLeft ? 'items-start text-left mr-36' : 'items-end text-right ml-36'
                                        } ${isTop ? 'justify-start pb-24' : 'justify-end pt-24'}`}>

                                        {/* Title */}
                                        <h3 className="text-xl font-bold text-zinc-200 uppercase mb-4 tracking-wide group-hover:text-emerald-400 transition-colors z-10 relative">
                                            {section?.name?.replace(/ Strategy| Case/g, '')}
                                        </h3>

                                        {/* List Items */}
                                        {showDescriptions && (
                                            <div className="space-y-3 mb-6 flex-1 z-10 relative">
                                                {section?.examples?.map((ex, i) => (
                                                    <div key={i} className={`flex items-start gap-3 text-xs text-zinc-400 leading-relaxed ${!isLeft && 'flex-row-reverse'}`}>
                                                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-900/50 mt-1.5 shrink-0 group-hover:bg-emerald-500 transition-colors"></div>
                                                        <span dangerouslySetInnerHTML={{ __html: ex.replace(/(Typical|Diversification|A derived|Product Launch)(.*Case)/, '<strong class="text-zinc-200">$1$2</strong>') }}></span>
                                                    </div>
                                                ))}
                                            </div>
                                        )}

                                        {/* Notes Section */}
                                        <div className={`w-full max-w-[280px] border-t border-dashed border-zinc-800 pt-3 z-10 relative ${!isLeft && 'self-end'}`}>
                                            <div className={`text-[10px] font-bold text-zinc-600 uppercase mb-2 ${!isLeft && 'text-right'}`}>Analysis Notes</div>
                                            <InteractiveNode
                                                id={q.id}
                                                initialContent={content[q.id] || []}
                                                onUpdate={(c) => handleUpdate(q.id, c)}
                                                isInteractive={interactive}
                                                placeholder="Add point..."
                                                style={{ color: '#d4d4d8', fontSize: '13px', textAlign: isLeft ? 'left' : 'right' }}
                                            />
                                        </div>

                                    </div>
                                </div>
                            );
                        })}

                        {/* --- Central Circle Overlay --- */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[260px] h-[260px] rounded-full z-20 shadow-[0_0_80px_rgba(0,0,0,0.95)] ring-8 ring-zinc-950 bg-zinc-950 flex flex-col items-center justify-center">

                            {/* Sectors */}
                            <div className="absolute inset-2 rounded-full overflow-hidden">
                                <div className="w-full h-full relative">
                                    <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-emerald-900 border-r border-b border-zinc-800 flex items-center justify-center">
                                        <span className="text-[9px] font-bold text-emerald-100 uppercase text-center leading-tight opacity-90">Market<br />Development</span>
                                    </div>
                                    <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-emerald-700 border-l border-b border-zinc-800 flex items-center justify-center">
                                        <span className="text-[9px] font-bold text-emerald-100 uppercase text-center leading-tight opacity-90">Diversi-<br />fication</span>
                                    </div>
                                    <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-emerald-800 border-r border-t border-zinc-800 flex items-center justify-center">
                                        <span className="text-[9px] font-bold text-emerald-100 uppercase text-center leading-tight opacity-90">Market<br />Penetration</span>
                                    </div>
                                    <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-emerald-600 border-l border-t border-zinc-800 flex items-center justify-center">
                                        <span className="text-[9px] font-bold text-emerald-100 uppercase text-center leading-tight opacity-90">Product<br />Development</span>
                                    </div>
                                </div>
                            </div>

                            {/* Center Icon */}
                            <div className="absolute w-16 h-16 bg-zinc-900 rounded-full border-4 border-zinc-950 flex items-center justify-center shadow-lg z-30">
                                <RefreshCw className="w-6 h-6 text-emerald-500 animate-[spin_12s_linear_infinite]" />
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
}
