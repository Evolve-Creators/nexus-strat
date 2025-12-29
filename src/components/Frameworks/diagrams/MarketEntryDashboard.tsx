import React from 'react';
import InteractiveNode from '../InteractiveNode';
import { Framework } from '../../../types';
import { ChevronRight, ChevronDown, ArrowRight } from 'lucide-react';

interface Props {
    framework: Framework;
    content: Record<string, string[]>;
    interactive?: boolean;
    showDescriptions?: boolean;
    onContentChange?: (sectionId: string, content: string[]) => void;
}

export default function MarketEntryDashboard({ content, interactive, showDescriptions = true, onContentChange }: Props) {

    const handleUpdate = (id: string, c: string[]) => {
        onContentChange?.(id, c);
    };

    // PDF-style Row Layout Helper
    const RowLayout = ({ title, children, heightClass = "min-h-[250px]" }: { title: string, children: React.ReactNode, heightClass?: string }) => (
        <div className={`flex w-full border border-zinc-800 rounded-lg overflow-hidden bg-zinc-950/30 ${heightClass}`}>
            {/* Left Label (Red Column) */}
            <div className="w-16 md:w-24 bg-red-900/20 border-r border-red-500/30 flex items-center justify-center p-4">
                <span className="text-red-400 font-bold uppercase tracking-widest text-xs md:text-sm -rotate-90 whitespace-nowrap">
                    {title}
                </span>
            </div>
            {/* Right Content */}
            <div className="flex-1 p-6 relative">
                {children}
            </div>
        </div>
    );

    return (
        <div className="w-full min-w-[1000px] p-8 font-sans text-zinc-200 flex flex-col gap-8">

            {/* Title Block */}
            <div className="flex justify-center mb-4">
                <div className="bg-zinc-900/80 border border-emerald-500/30 text-emerald-100 font-bold py-2 px-8 rounded-full shadow-lg text-xl tracking-wide">
                    Market Entry Framework
                </div>
            </div>

            {/* === ROW 1: RISKS INVOLVED === */}
            <RowLayout title="Risks Involved" heightClass="min-h-[350px]">
                <div className="flex flex-col h-full items-center justify-center gap-6">
                    {/* Top Level: Risks */}
                    <div className="bg-zinc-800 px-6 py-2 rounded border border-zinc-600 text-sm font-bold text-white mb-4">
                        Risks
                    </div>

                    {/* Level 2: Internal vs External */}
                    <div className="grid grid-cols-2 gap-20 w-full max-w-4xl relative">
                        {/* Connecting Lines would go here ideally with SVG, doing simple border hack for now */}
                        <div className="absolute top-[-1rem] left-1/4 right-1/4 h-4 border-t border-l border-r border-zinc-600 rounded-t-lg"></div>

                        {/* Internal Branch */}
                        <div className="flex flex-col items-center gap-4">
                            <div className="bg-zinc-900 px-4 py-1.5 rounded border border-zinc-700 text-xs font-bold text-zinc-300">Internal</div>
                            <div className="bg-zinc-950/50 p-3 rounded border border-zinc-800/50 text-[10px] text-zinc-400 w-full text-center">
                                {showDescriptions && (
                                    <ul className="space-y-1">
                                        <li>• Constraints</li>
                                        <li>• Resources</li>
                                        <li>• Capabilities</li>
                                    </ul>
                                )}
                                <InteractiveNode id="risk-internal" initialContent={content['risk-internal'] || []} onUpdate={c => handleUpdate('risk-internal', c)} isInteractive={interactive} placeholder="Add constraints..." />
                            </div>
                        </div>

                        {/* External Branch */}
                        <div className="flex flex-col items-center gap-4">
                            <div className="bg-zinc-900 px-4 py-1.5 rounded border border-zinc-700 text-xs font-bold text-zinc-300">External</div>

                            {/* External Splits into Industry vs Macro */}
                            <div className="grid grid-cols-2 gap-8 w-full mt-2 relative">
                                <div className="absolute top-[-0.5rem] left-1/4 right-1/4 h-2 border-t border-l border-r border-zinc-700 rounded-t"></div>

                                {/* Industry Level */}
                                <div className="flex flex-col gap-2">
                                    <div className="text-[10px] text-center font-bold text-zinc-500 uppercase">Industry Level</div>
                                    <div className="grid grid-cols-2 gap-2">
                                        {showDescriptions && ['Customers', 'Competitors', 'Barriers', 'Suppliers'].map(item => (
                                            <div key={item} className="bg-zinc-950 border border-zinc-800 p-2 rounded text-[9px] text-zinc-400 text-center">
                                                {item}
                                            </div>
                                        ))}
                                    </div>
                                    <InteractiveNode id="risk-industry" initialContent={content['risk-industry'] || []} onUpdate={c => handleUpdate('risk-industry', c)} isInteractive={interactive} />
                                </div>

                                {/* Macro Factors */}
                                <div className="flex flex-col gap-2">
                                    <div className="text-[10px] text-center font-bold text-zinc-500 uppercase">Macro Factors</div>
                                    <div className="bg-zinc-950 border border-zinc-800 p-2 rounded text-[9px] text-zinc-400 text-left pl-4">
                                        {showDescriptions && (
                                            <ul className="space-y-1 list-disc">
                                                <li>PESTEL Analysis</li>
                                                <li>Regulations</li>
                                                <li>Currency</li>
                                            </ul>
                                        )}
                                    </div>
                                    <InteractiveNode id="risk-macro" initialContent={content['risk-macro'] || []} onUpdate={c => handleUpdate('risk-macro', c)} isInteractive={interactive} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </RowLayout>

            {/* === ROW 2: MARKET SIZE & SHARE === */}
            <RowLayout title="Market Size & Share" heightClass="min-h-[180px]">
                <div className="flex flex-col h-full justify-center gap-6">
                    <div className="flex flex-col md:flex-row items-center gap-4 bg-zinc-900/50 p-4 rounded-lg border border-zinc-800">
                        <div className="font-bold text-emerald-400 text-sm uppercase whitespace-nowrap">Economic Feasibility:</div>
                        <div className="font-mono text-zinc-100 text-sm md:text-base text-center w-full">
                            Market Size <span className="text-zinc-500">×</span> Market Share <span className="text-zinc-500">×</span> (Price - Variable Cost) <span className="text-zinc-500">-</span> Fixed Cost
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <div className="flex-1 bg-zinc-950 border border-zinc-800 p-3 rounded">
                            <div className="text-[10px] uppercase text-zinc-500 font-bold mb-2">Market Size Estimation (Guesstimate)</div>
                            <InteractiveNode id="feas-size" initialContent={content['feas-size'] || []} onUpdate={c => handleUpdate('feas-size', c)} isInteractive={interactive} placeholder="Calculate Total Market Size..." />
                        </div>
                        <div className="flex-1 bg-zinc-950 border border-zinc-800 p-3 rounded">
                            <div className="text-[10px] uppercase text-zinc-500 font-bold mb-2">Achievable Market Share</div>
                            <InteractiveNode id="feas-share" initialContent={content['feas-share'] || []} onUpdate={c => handleUpdate('feas-share', c)} isInteractive={interactive} placeholder="Estimate share %..." />
                        </div>
                    </div>
                </div>
            </RowLayout>

            {/* === ROW 3: MODES OF ENTRY === */}
            <RowLayout title="Modes of Entry">
                <div className="h-full flex flex-col justify-center">
                    <div className="grid grid-cols-4 gap-4 text-xs">
                        {/* Header Row */}
                        <div className="col-span-1 font-bold text-zinc-500 uppercase text-[10px] flex items-end pb-2">Strategy</div>
                        <div className="col-span-1 font-bold text-zinc-300 bg-zinc-800/50 p-2 rounded text-center">Organic</div>
                        <div className="col-span-1 font-bold text-zinc-300 bg-zinc-800/50 p-2 rounded text-center">Joint Venture</div>
                        <div className="col-span-1 font-bold text-zinc-300 bg-zinc-800/50 p-2 rounded text-center">Acquisition</div>

                        {/* Advantages Row */}
                        <div className="col-span-1 font-bold text-emerald-500 uppercase text-[10px] flex items-center">Advantages</div>
                        <div className="col-span-1 bg-zinc-950/50 p-3 rounded border border-zinc-800/50 text-[10px] text-zinc-400">
                            {showDescriptions && (
                                <ul className="list-disc list-inside space-y-1">
                                    <li>Retain Control</li>
                                    <li>Brand Image</li>
                                    <li>Experience Curve</li>
                                </ul>
                            )}
                        </div>
                        <div className="col-span-1 bg-zinc-950/50 p-3 rounded border border-zinc-800/50 text-[10px] text-zinc-400">
                            {showDescriptions && (
                                <ul className="list-disc list-inside space-y-1">
                                    <li>Less Investment</li>
                                    <li>Local Expertise</li>
                                    <li>Scale & Scope</li>
                                </ul>
                            )}
                        </div>
                        <div className="col-span-1 bg-zinc-950/50 p-3 rounded border border-zinc-800/50 text-[10px] text-zinc-400">
                            {showDescriptions && (
                                <ul className="list-disc list-inside space-y-1">
                                    <li>Extend Scope</li>
                                    <li>Produce Synergy</li>
                                    <li>Fast Entry</li>
                                </ul>
                            )}
                        </div>

                        {/* Disadvantages Row */}
                        <div className="col-span-1 font-bold text-red-500 uppercase text-[10px] flex items-center">Disadvantages</div>
                        <div className="col-span-1 bg-zinc-950/50 p-3 rounded border border-zinc-800/50 text-[10px] text-zinc-400">
                            {showDescriptions && (
                                <ul className="list-disc list-inside space-y-1">
                                    <li>High Capex</li>
                                    <li>High Commitment</li>
                                    <li>Slow Growth</li>
                                </ul>
                            )}
                        </div>
                        <div className="col-span-1 bg-zinc-950/50 p-3 rounded border border-zinc-800/50 text-[10px] text-zinc-400">
                            {showDescriptions && (
                                <ul className="list-disc list-inside space-y-1">
                                    <li>Limited Control</li>
                                    <li>Brand Dilution</li>
                                    <li>Profits Shared</li>
                                </ul>
                            )}
                        </div>
                        <div className="col-span-1 bg-zinc-950/50 p-3 rounded border border-zinc-800/50 text-[10px] text-zinc-400">
                            {showDescriptions && (
                                <ul className="list-disc list-inside space-y-1">
                                    <li>Significant Inv.</li>
                                    <li>Brand Threat</li>
                                    <li>Integration Issues</li>
                                </ul>
                            )}
                        </div>
                    </div>
                </div>
            </RowLayout>

        </div>
    );
}
