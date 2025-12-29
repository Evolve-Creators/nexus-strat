import { Framework } from '../../../types';
import InteractiveNode from '../InteractiveNode';

interface MatrixDiagramProps {
    framework: Framework;
    content: Record<string, string[]>;
    interactive?: boolean;
    showLabels?: boolean;
    onContentChange?: (sectionId: string, content: string[]) => void;
}

export default function MatrixDiagram({
    framework,
    content,
    interactive = false,
    onContentChange
}: MatrixDiagramProps) {
    const isAnsoff = framework.id.includes('ansoff');

    // Config: Ansoff (Product vs Market) | BCG (Share vs Growth)
    const config = isAnsoff ? {
        xAxis: { low: 'Existing', high: 'New', label: 'Products' },
        yAxis: { low: 'Existing', high: 'New', label: 'Markets' },
        quadrants: [
            { id: 'market-penetration', name: 'Penetration', sub: 'Exist/Exist', color: 'border-emerald-500 text-emerald-500', area: 'q1' },
            { id: 'product-development', name: 'Product Dev', sub: 'Exist/New', color: 'border-amber-500 text-amber-500', area: 'q2' },
            { id: 'market-development', name: 'Market Dev', sub: 'New/Exist', color: 'border-blue-500 text-blue-500', area: 'q3' },
            { id: 'diversification', name: 'Diversification', sub: 'New/New', color: 'border-red-500 text-red-500', area: 'q4' },
        ]
    } : {
        xAxis: { low: 'Low', high: 'High', label: 'Relative Market Share' },
        yAxis: { low: 'Low', high: 'High', label: 'Market Growth Rate' },
        quadrants: [
            { id: 'stars', name: 'Stars', sub: 'High Growth, High Share', color: 'border-yellow-500 text-yellow-500', area: 'q1' },
            { id: 'question-marks', name: 'Question Marks', sub: 'High Growth, Low Share', color: 'border-orange-500 text-orange-500', area: 'q2' },
            { id: 'cash-cows', name: 'Cash Cows', sub: 'Low Growth, High Share', color: 'border-emerald-500 text-emerald-500', area: 'q3' },
            { id: 'dogs', name: 'Dogs', sub: 'Low Growth, Low Share', color: 'border-red-600 text-red-600', area: 'q4' },
        ]
    };

    return (
        <div className="w-full max-w-[700px] mx-auto p-4 aspect-square grid grid-cols-[50px_1fr_1fr] grid-rows-[50px_1fr_1fr] gap-2">

            {/* Corner (Empty) */}
            <div></div>

            {/* X-Axis Header */}
            <div className="col-span-2 bg-zinc-900 border border-zinc-900 rounded-lg flex flex-col items-center justify-center p-2">
                <div className="text-xs font-bold text-zinc-400 uppercase tracking-widest">{config.xAxis.label}</div>
                <div className="w-full flex justify-between px-8 text-[10px] text-zinc-600 mt-1 uppercase">
                    <span>{isAnsoff ? config.xAxis.low : 'High'}</span>
                    <span>{isAnsoff ? config.xAxis.high : 'Low'}</span>
                </div>
            </div>

            {/* Y-Axis Sidebar */}
            <div className="row-span-2 bg-zinc-900 border border-zinc-900 rounded-lg flex flex-col items-center justify-center p-2">
                <div className="writing-vertical-rl rotate-180 text-xs font-bold text-zinc-400 uppercase tracking-widest">
                    {config.yAxis.label}
                </div>
                <div className="h-full flex flex-col justify-between py-8 writing-vertical-rl rotate-180 text-[10px] text-zinc-600 mt-2 uppercase">
                    <span>{config.yAxis.high}</span>
                    <span>{config.yAxis.low}</span>
                </div>
            </div>

            {/* Quadrants */}
            {config.quadrants.map((quad) => (
                <div
                    key={quad.id}
                    className={`
                        bg-zinc-900/50 hover:bg-zinc-800/80 transition-colors
                        border-2 border-t-4 ${quad.color} border-zinc-900
                        rounded-xl p-4 flex flex-col relative overflow-hidden group
                    `}
                >
                    <div className="flex justify-between items-start mb-4 z-10">
                        <h3 className={`font-bold text-sm ${quad.color.split(' ')[1]}`}>{quad.name}</h3>
                        <span className="text-[10px] bg-zinc-950/50 px-2 py-1 rounded text-zinc-500">{quad.sub}</span>
                    </div>

                    <div className="flex-1 overflow-y-auto z-10">
                        <InteractiveNode
                            id={quad.id}
                            initialContent={content[quad.id] || []}
                            onUpdate={(c) => onContentChange?.(quad.id, c)}
                            isInteractive={interactive}
                            placeholder="Add items..."
                            style={{ color: '#d4d4d8', fontSize: '12px' }}
                        />
                    </div>
                </div>
            ))}
        </div>
    );
}
