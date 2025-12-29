import React from 'react';
import InteractiveNode from '../InteractiveNode';
import { Framework } from '../../../types';
import { Network } from 'lucide-react';

interface Props {
    framework: Framework;
    content: Record<string, string[]>;
    interactive?: boolean;
    showDescriptions?: boolean;
    onContentChange?: (sectionId: string, content: string[]) => void;
}

export default function GrowthDashboard({ content, interactive, showDescriptions = true, onContentChange }: Props) {

    const handleUpdate = (id: string, c: string[]) => {
        onContentChange?.(id, c);
    };

    // Node Component
    const Node = ({ title, id, children, type = 'leaf', note }: { title: string, id?: string, children?: React.ReactNode, type?: 'root' | 'category' | 'leaf', note?: string }) => {
        const bgClass = type === 'root' || type === 'category'
            ? 'bg-zinc-800 text-white border-2 border-emerald-500/50'
            : 'bg-zinc-900 text-zinc-200 border border-zinc-700';

        const textClass = type === 'root' || type === 'category'
            ? 'font-bold uppercase tracking-wider text-emerald-400'
            : 'font-semibold text-zinc-300';

        return (
            <div className="flex flex-col items-center relative group">
                <div className={`p-3 rounded-xl shadow-lg min-w-[140px] text-center z-10 ${bgClass} transition-transform hover:scale-105 hover:border-emerald-500 hover:shadow-emerald-500/20`}>
                    <div className={`text-[10px] md:text-xs mb-1 ${textClass}`}>{title}</div>
                    {id && (
                        <div className="text-[10px] text-left w-full">
                            <InteractiveNode
                                id={id}
                                initialContent={content[id] || []}
                                onUpdate={c => handleUpdate(id, c)}
                                isInteractive={interactive}
                                placeholder="..."
                                style={{ color: '#e4e4e7' }}
                            />
                        </div>
                    )}
                </div>

                {showDescriptions && note && (
                    <div className="absolute top-full mt-4 p-2 border border-dashed border-emerald-500/50 text-[9px] text-emerald-400 bg-emerald-950/30 rounded max-w-[150px]">
                        {note}
                    </div>
                )}

                {children && (
                    <div className="flex flex-col items-center w-full">
                        <div className="h-6 w-px bg-zinc-700 group-hover:bg-emerald-500/50 transition-colors"></div>
                        <div className="flex w-full justify-center relative">
                            <div className="w-full flex justify-center gap-4 relative pt-4">
                                <div className="absolute top-0 left-10 right-10 h-px bg-zinc-700 group-hover:bg-emerald-500/50 transition-colors"></div>
                                {children}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    };

    const VLine = () => <div className="h-6 w-px bg-zinc-700 mx-auto"></div>;

    return (
        <div className="w-full min-w-[2000px] p-8 font-sans text-zinc-200 bg-zinc-950 overflow-x-auto">
            <div className="flex items-center gap-3 mb-8 pb-4 border-b border-zinc-800">
                <div className="p-2 bg-emerald-500/10 rounded-lg">
                    <Network className="text-emerald-500" />
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-white">Growth Strategy Framework</h2>
                    <p className="text-zinc-500 text-sm">Framework for analyzing growth opportunities</p>
                </div>
            </div>

            <div className="flex flex-col items-center">
                <Node title="Growth" type="root" />
                <VLine />

                <div className="flex gap-32 relative pt-4 w-full justify-center">
                    <div className="absolute top-0 left-[35%] right-[35%] h-px bg-zinc-700"></div>

                    {/* LEFT: CORE ACTIVITIES */}
                    <div className="flex flex-col items-center flex-1">
                        <Node title="Core Activities" type="category" />
                        <VLine />

                        <div className="flex gap-24 relative pt-4 w-full justify-center items-start">
                            <div className="absolute top-0 left-[25%] right-[25%] h-px bg-zinc-700"></div>

                            {/* INORGANIC */}
                            <div className="flex flex-col items-center">
                                <Node title="Inorganic" type="category" />
                                <div className="mt-4 flex gap-4 items-start pt-4 border-t border-zinc-700">
                                    <div className="flex flex-col gap-4">
                                        <Node title="Mergers & Acquisitions" id="ma" />
                                        <Node title="Joint Venture" id="jv" />
                                        <Node title="Develop E2E Skills" id="e2e" />
                                    </div>
                                </div>
                            </div>

                            {/* ORGANIC - New Nested Structure */}
                            <div className="flex flex-col items-center flex-grow">
                                <Node title="Organic" type="category" />

                                <div className="mt-4 flex justify-center gap-12 pt-4 border-t border-zinc-700">

                                    {/* 1. Product Mix (Leaf) */}
                                    <div className="flex flex-col gap-2 w-[140px]">
                                        <Node title="Product Mix" id="product-mix" />
                                    </div>

                                    {/* 2. No of Users (Parent) */}
                                    <div className="flex flex-col items-center">
                                        <Node title="No of Users" id="no-users" />
                                        <div className="mt-4 pt-4 border-t border-zinc-700 relative w-full flex justify-center gap-8">
                                            {/* Line helper for No of Users children */}
                                            <div className="absolute top-0 left-[25%] right-[25%] h-px bg-zinc-700"></div>

                                            {/* Child A: Market Size */}
                                            <div className="flex flex-col items-center">
                                                <div className="relative">
                                                    <VLine />
                                                    <Node title="Market Size" id="market-size" note="Can be analyzed using Ansoff matrix components" />
                                                </div>
                                            </div>

                                            {/* Child B: Market Share */}
                                            <div className="flex flex-col items-center">
                                                <VLine />
                                                <Node title="Market Share" id="market-share" />
                                                {/* Market Share Children */}
                                                <div className="pt-4 flex flex-col gap-2 pl-4 border-l border-zinc-700/50 mt-4">
                                                    <Node title="Improve Journey" id="customer-journey" />
                                                    <Node title="Branding" id="branding" />
                                                    <Node title="Distribution" id="distribution" />
                                                    <Node title="Retention" id="retention" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* 3. Profit per User (Parent) */}
                                    <div className="flex flex-col items-center min-w-[320px]">
                                        <Node title="Profit per User" id="profit-per-user" />

                                        <div className="flex gap-8 mt-4 pt-4 border-t border-zinc-700 w-full justify-center relative">
                                            <div className="absolute top-0 left-[25%] right-[25%] h-px bg-zinc-700"></div>

                                            {/* Revenue / User */}
                                            <div className="flex flex-col items-center">
                                                <VLine />
                                                <div className="p-2 border border-zinc-700 rounded bg-zinc-800 text-white font-bold text-xs mb-2">Revenue/User</div>

                                                <div className="flex gap-4 pt-2 relative">
                                                    <div className="absolute top-0 left-[25%] right-[25%] h-px bg-zinc-700"></div>

                                                    {/* Price per Unit */}
                                                    <div className="flex flex-col items-center">
                                                        <VLine />
                                                        <Node title="Price per Unit" id="price-unit" />
                                                        <div className="pt-2">
                                                            <Node title="Elasticity of Demand" id="elasticity" />
                                                        </div>
                                                    </div>

                                                    {/* Number of Units */}
                                                    <div className="flex flex-col items-center">
                                                        <VLine />
                                                        <Node title="Number of Units" id="num-units-user" />
                                                        <div className="pt-2 flex flex-col gap-2">
                                                            <Node title="Bundling" id="bundling" />
                                                            <Node title="Price Discrimination" id="price-discrimination" />
                                                            <Node title="Cross Selling" id="cross-selling" />
                                                            <Node title="Upselling" id="upselling" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Cost / User */}
                                            <div className="flex flex-col items-center">
                                                <VLine />
                                                <div className="p-2 border border-zinc-700 rounded bg-zinc-800 text-white font-bold text-xs mb-2">Cost/User</div>

                                                <div className="flex gap-4 pt-2 relative">
                                                    <div className="absolute top-0 left-[25%] right-[25%] h-px bg-zinc-700"></div>

                                                    {/* Fixed Costs */}
                                                    <div className="flex flex-col items-center">
                                                        <VLine />
                                                        <Node title="Fixed Costs" id="fixed-costs" />
                                                    </div>

                                                    {/* Variable Costs */}
                                                    <div className="flex flex-col items-center">
                                                        <VLine />
                                                        <Node title="Variable Costs" id="variable-costs" />
                                                        <div className="mt-2 text-[10px] text-zinc-400 border border-dashed border-zinc-600 p-1 rounded max-w-[100px] text-center bg-zinc-900">
                                                            Value chain Analysis, Process Innovation
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT: NON-CORE ACTIVITIES */}
                    <div className="flex flex-col items-center w-72">
                        <Node title="Non-Core Activities" type="category" />
                        <VLine />
                        <div className="flex flex-col gap-4 pt-4 border-t border-zinc-700 w-full items-center">
                            <Node title="Lease/Rent Out" id="lease" />
                            <Node title="Advertising Revenue" id="advertising" />
                            <Node title="Value Added Services" id="vas" />
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
