import React from 'react';
import InteractiveNode from '../InteractiveNode';
import { Framework } from '../../../types';
import { ChevronRight } from 'lucide-react';

interface Props {
    framework: Framework;
    content: Record<string, string[]>;
    interactive?: boolean;
    showDescriptions?: boolean;
    onContentChange?: (sectionId: string, content: string[]) => void;
}

export default function ProfitabilityDashboard({ content, interactive, showDescriptions = true, onContentChange }: Props) {

    const handleUpdate = (id: string, c: string[]) => {
        onContentChange?.(id, c);
    };

    // Styles
    const cardBase = "bg-zinc-900/40 backdrop-blur-md border border-zinc-900 rounded p-6 text-center relative shadow-sm h-full flex flex-col min-h-[180px]";
    const headerTitle = "text-xs md:text-sm font-bold text-primary uppercase tracking-wider mb-3 border-b border-zinc-900 pb-2";
    const subLabel = "text-[10px] text-muted uppercase tracking-widest font-bold block mb-1 text-left";
    const listStyle = "text-left text-[11px] text-muted space-y-2 mb-3 list-disc list-inside leading-snug break-words";
    const equationStyle = "text-[10px] text-emerald-500/80 font-mono mt-2 text-center bg-zinc-900/50 backdrop-blur-sm p-2 rounded border border-white/5 break-words";

    return (
        <div className="w-full min-w-[1400px] p-12 font-sans text-primary">

            {/* Title Block */}
            <div className="flex justify-center mb-10">
                <div className="bg-gradient-to-r from-red-900/40 to-red-800/40 text-red-100 font-bold py-3 px-10 rounded-xl shadow-lg border border-red-500/50 text-xl tracking-wide flex items-center gap-3">
                    <span>Profit = Revenue - Cost</span>
                </div>
            </div>

            {/* ================= REVENUE SECTION ================= */}
            <div className="mb-16 relative bg-zinc-900/10 backdrop-blur-sm rounded-xl p-8 border border-zinc-900">
                <div className="absolute -top-4 left-6 bg-zinc-900/90 backdrop-blur px-3 py-1 text-red-500 font-bold text-lg flex items-center gap-3 border border-zinc-900 rounded shadow-sm">
                    REVENUE <span className="text-muted text-xs font-normal uppercase tracking-wider">(Drivers & Equations)</span>
                </div>

                {/* TOP DRIVERS ROW */}
                <div className="grid grid-cols-3 gap-10 mt-6 mb-6">
                    <div className={`${cardBase} border-t-2 border-t-red-500`}>
                        <div className={headerTitle}>Selling Price per Unit</div>
                        {showDescriptions && <div className="text-[11px] text-muted mb-2 italic">Standard vs. Discounted Pricing</div>}
                        <InteractiveNode id="rev-price" initialContent={content['rev-price'] || []} onUpdate={c => handleUpdate('rev-price', c)} isInteractive={interactive} placeholder="Price breakdown..." />
                    </div>
                    <div className={`${cardBase} border-t-2 border-t-red-500`}>
                        <div className={headerTitle}>Number of Units Sold</div>
                        {showDescriptions && <div className="text-[11px] text-muted mb-2 italic">Volume = Mkt Size x Mkt Share</div>}
                        <InteractiveNode id="rev-units" initialContent={content['rev-units'] || []} onUpdate={c => handleUpdate('rev-units', c)} isInteractive={interactive} placeholder="Volume drivers..." />
                    </div>
                    <div className={`${cardBase} border-t-2 border-t-red-500`}>
                        <div className={headerTitle}>Product Mix</div>
                        {showDescriptions && <div className="text-[11px] text-muted mb-2 italic">High Margin vs. Low Margin SKU</div>}
                        <InteractiveNode id="rev-mix" initialContent={content['rev-mix'] || []} onUpdate={c => handleUpdate('rev-mix', c)} isInteractive={interactive} placeholder="Mix details..." />
                    </div>
                </div>

                {/* BRIDGES (Supply / Demand) */}
                <div className="grid grid-cols-12 gap-0 mb-8 h-8 relative">
                    {/* Supply Bridge (Span Cols 1-8) */}
                    <div className="col-span-8 flex justify-center relative border-r border-zinc-900">
                        <div className="absolute top-0 w-[50%] h-5 border-l border-r border-t border-zinc-900 rounded-t-lg -z-10 mt-3"></div>
                        <div className="bg-card px-4 py-1 rounded-full border border-zinc-900 text-[10px] font-bold text-muted z-10 shadow-sm uppercase tracking-wide">Supply Factors</div>
                    </div>

                    <div className="absolute inset-0 pointer-events-none">
                        {/* Demand Bridge (Span Cols 5-12) */}
                        <div className="absolute left-[50%] right-[16%] top-3 h-5 border-l border-r border-t border-zinc-900 rounded-t-lg"></div>
                        <div className="absolute left-[66%] top-2 -translate-x-1/2 bg-card px-4 py-1 rounded-full border border-zinc-900 text-[10px] font-bold text-muted uppercase tracking-wide">Demand Factors</div>
                    </div>
                </div>


                {/* DETAILED BREAKDOWN ROW */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

                    {/* -- SUPPLY SIDE DETAILS -- */}
                    <div className="bg-zinc-900/10 backdrop-blur-sm border border-zinc-900 rounded-xl p-8">
                        <div className="text-center text-xs font-bold text-red-500 uppercase tracking-widest mb-6 border-b border-zinc-900 pb-2">Value Chain Configuration</div>

                        <div className="space-y-6">
                            {/* Primary */}
                            <div>
                                <div className="text-[10px] text-muted font-bold uppercase mb-2">Primary Activities</div>
                                <div className="grid grid-cols-4 gap-4">
                                    {['Procurement', 'Manufacturing', 'Distribution', 'Post-Sales'].map((p, i) => (
                                        <div key={i} className="bg-zinc-900/40 backdrop-blur border border-zinc-900 p-2 rounded text-center hover:border-red-500/50 transition-colors">
                                            <div className="text-[9px] text-primary font-bold leading-tight">{p}</div>
                                            <div className="mt-1 h-[1px] w-4 bg-red-900/50 mx-auto mb-1"></div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Secondary */}
                            <div>
                                <div className="text-[10px] text-muted font-bold uppercase mb-2">Secondary Activities</div>
                                <div className="grid grid-cols-3 gap-4">
                                    {['SG&A / Overhead', 'Infrastructure / IT', 'Human Capital'].map((s, i) => (
                                        <div key={i} className="bg-zinc-900/40 backdrop-blur border border-zinc-900 p-2 rounded text-center text-[9px] text-muted">
                                            {s}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* -- DEMAND (CUSTOMER) SIDE DETAILS -- */}
                    <div className="bg-zinc-900/10 backdrop-blur-sm border border-zinc-900 rounded-xl p-8">
                        <div className="text-center text-xs font-bold text-red-500 uppercase tracking-widest mb-6 border-b border-zinc-900 pb-2">Customer / Market Analysis</div>

                        <div className="grid grid-cols-2 gap-8 h-full">
                            {/* Customer Journey Segments */}
                            <div className="col-span-1">
                                <div className="bg-zinc-900/40 backdrop-blur border border-zinc-900 rounded-lg p-4 h-full">
                                    <div className="text-[10px] text-primary font-bold mb-3 border-b border-zinc-900 pb-2"># of Customers Breakdown</div>
                                    <div className="space-y-3">
                                        <div>
                                            <span className={subLabel}>Pre-Service</span>
                                            <div className="text-[10px] text-muted pl-2 border-l-2 border-zinc-800">Awareness • Accessibility • Marketing Reach</div>
                                        </div>
                                        <div>
                                            <span className={subLabel}>During Service</span>
                                            <div className="text-[10px] text-muted pl-2 border-l-2 border-zinc-800">Customer Experience • Speed • Ease of Use</div>
                                        </div>
                                        <div>
                                            <span className={subLabel}>Post-Service</span>
                                            <div className="text-[10px] text-muted pl-2 border-l-2 border-zinc-800">Retention Rates • Referrals • Churn Analysis</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Order Metrics / Equations */}
                            <div className="col-span-1 flex flex-col gap-4">
                                <div className="bg-zinc-900/40 backdrop-blur border border-zinc-900 rounded-lg p-4 flex-1">
                                    <div className="text-[10px] text-primary font-bold mb-1">Average Order Value</div>
                                    {showDescriptions && <div className={equationStyle}>Price/Unit × Units/Order</div>}
                                    <InteractiveNode id="dem-amt" initialContent={content['dem-amt'] || []} onUpdate={c => handleUpdate('dem-amt', c)} isInteractive={interactive} minimal />
                                </div>
                                <div className="bg-zinc-900/40 backdrop-blur border border-zinc-900 rounded-lg p-4 flex-1">
                                    <div className="text-[10px] text-primary font-bold mb-1">Order Frequency</div>
                                    {showDescriptions && <div className={equationStyle}>Orders / Year / Customer</div>}
                                    <InteractiveNode id="dem-freq" initialContent={content['dem-freq'] || []} onUpdate={c => handleUpdate('dem-freq', c)} isInteractive={interactive} minimal />
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>


            {/* ================= COST SECTION ================= */}
            <div className="relative bg-zinc-900/10 backdrop-blur-sm rounded-xl p-8 border border-zinc-900 mt-12">
                <div className="absolute -top-4 left-6 bg-zinc-900/90 backdrop-blur px-3 py-1 text-red-500 font-bold text-lg flex items-center gap-3 border border-zinc-900 rounded shadow-sm">
                    COST <span className="text-muted text-xs font-normal uppercase tracking-wider">(Activity Based Costing)</span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-14 mt-10">

                    {/* Primary Activities Flow (Span 3) */}
                    <div className="lg:col-span-3 grid grid-cols-4 gap-14">
                        {/* 1. Procurement */}
                        <div className="flex flex-col relative h-full">
                            <div className="bg-card-foreground text-card text-[10px] font-bold px-3 py-1.5 rounded-t border-b-2 border-red-500 tracking-wide text-center truncate">PROCURING RAW MAT.</div>
                            <div className="bg-zinc-900/40 backdrop-blur border border-zinc-900 p-3 rounded-b flex-1 flex flex-col min-h-[220px]">
                                {showDescriptions && (
                                    <ul className={listStyle}>
                                        <li>Raw Material Unit Costs</li>
                                        <li>Supplier Contract Terms</li>
                                        <li>Inbound Transport</li>
                                    </ul>
                                )}
                                <div className="mt-auto">
                                    {showDescriptions && <div className={equationStyle}>#Suppliers × Contract Value × Duration</div>}
                                </div>
                            </div>
                            <div className="absolute -right-10 top-[50%] -translate-y-1/2 text-muted hidden md:flex items-center justify-center bg-zinc-900/40 border border-zinc-900 rounded-full w-8 h-8 z-10">
                                <ChevronRight size={18} />
                            </div>
                        </div>

                        {/* 2. Manufacturing */}
                        <div className="flex flex-col relative h-full">
                            <div className="bg-card-foreground text-card text-[10px] font-bold px-3 py-1.5 rounded-t border-b-2 border-red-500 tracking-wide text-center">MANUFACTURING</div>
                            <div className="bg-zinc-900/40 backdrop-blur border border-zinc-900 p-3 rounded-b flex-1 flex flex-col min-h-[220px]">
                                {showDescriptions && (
                                    <ul className={listStyle}>
                                        <li>Plant Maintenance Costs</li>
                                        <li>Idle Capacity & Downtime</li>
                                        <li>Setup Costs</li>
                                    </ul>
                                )}
                                <div className="mt-auto">
                                    {showDescriptions && <div className={equationStyle}>Material Wastage + Equipment Wear</div>}
                                </div>
                            </div>
                            <div className="absolute -right-10 top-[50%] -translate-y-1/2 text-muted hidden md:flex items-center justify-center bg-zinc-900/40 border border-zinc-900 rounded-full w-8 h-8 z-10">
                                <ChevronRight size={18} />
                            </div>
                        </div>

                        {/* 3. Distribution */}
                        <div className="flex flex-col relative h-full">
                            <div className="bg-card-foreground text-card text-[10px] font-bold px-3 py-1.5 rounded-t border-b-2 border-red-500 tracking-wide text-center">DISTRIBUTION</div>
                            <div className="bg-zinc-900/40 backdrop-blur border border-zinc-900 p-3 rounded-b flex-1 flex flex-col min-h-[220px]">
                                {showDescriptions && (
                                    <ul className={listStyle}>
                                        <li>Warehousing & Storage</li>
                                        <li>Outbound Logistics</li>
                                        <li>Channel Margins</li>
                                    </ul>
                                )}
                                {showDescriptions && (
                                    <div className="space-y-1">
                                        <div className={equationStyle}>Distributor Count × Size × Freq</div>
                                        <div className={equationStyle}>Retail Margin × Sales Vol (Tier)</div>
                                    </div>
                                )}
                            </div>
                            <div className="absolute -right-10 top-[50%] -translate-y-1/2 text-zinc-600 hidden md:flex items-center justify-center bg-zinc-950 border border-zinc-900 rounded-full w-8 h-8 z-10">
                                <ChevronRight size={18} />
                            </div>
                        </div>

                        {/* 4. Sales/Service */}
                        <div className="flex flex-col h-full">
                            <div className="bg-card-foreground text-card text-[10px] font-bold px-3 py-1.5 rounded-t border-b-2 border-red-500 tracking-wide text-center">POST-SALES</div>
                            <div className="bg-zinc-900/40 backdrop-blur border border-zinc-900 p-3 rounded-b flex-1 flex flex-col min-h-[220px]">
                                {showDescriptions && (
                                    <ul className={listStyle}>
                                        <li>Spare Parts Consumption</li>
                                        <li>Waste from Repairs</li>
                                        <li>Inefficiencies / Defects</li>
                                    </ul>
                                )}
                                <div className="mt-auto">
                                    {showDescriptions && <div className={equationStyle}>No. Customers × Svc Freq × Cost</div>}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Supporting List (Span 1) */}
                    <div className="lg:col-span-1 border-l-2 border-dashed border-zinc-900 pl-8 flex flex-col justify-center">
                        <div className="bg-zinc-900/40 backdrop-blur border border-zinc-900 rounded-xl p-4 h-full">
                            <div className="text-[10px] text-muted font-bold uppercase mb-4 text-center border-b border-zinc-900 pb-2">Supporting Activities</div>
                            {showDescriptions && (
                                <div className="space-y-3">
                                    {['R&D (Research)', 'Financing & Debt', 'Branding & Mktg', 'Human Capital', 'SG&A (General)'].map((item, i) => (
                                        <div key={i} className="flex items-center justify-between bg-zinc-900/40 backdrop-blur px-3 py-2 rounded border border-zinc-900 hover:border-red-500/30 transition-colors">
                                            <span className="text-[10px] font-bold text-primary">{item}</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                            <div className="mt-6 p-2 bg-zinc-900/40 backdrop-blur rounded border border-zinc-900 text-center">
                                <div className="text-[9px] text-muted italic mb-1">Human Capital Eq:</div>
                                <div className="text-[9px] text-emerald-500/80 font-mono break-words">Capacity × Utilization × Rate</div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    );
}
