import { memo, createRef } from 'react';
import { Handle, Position, NodeProps, NodeResizer } from '@xyflow/react';
import { X, Download } from 'lucide-react';
import FrameworkDiagram from '../../Frameworks/FrameworkDiagram';
import { Framework } from '../../../types';

export type FrameworkNodeData = {
    framework: Framework;
    content: Record<string, any>;
    onDelete?: () => void;
    onUpdateContent?: (sectionId: string, content: any) => void;
};

function FrameworkNode({ data, selected }: NodeProps<any>) {
    const nodeRef = createRef<HTMLDivElement>();

    const downloadNode = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (!nodeRef.current) return;

        import('html-to-image').then((htmlToImage) => {
            htmlToImage.toPng(nodeRef.current!, {
                backgroundColor: '#09090b',
                style: { transform: 'none' } // Reset transform to avoid scaling issues in export
            })
                .then((dataUrl) => {
                    const link = document.createElement('a');
                    link.download = `${data.framework.name.replace(/\s+/g, '-').toLowerCase()}.png`;
                    link.href = dataUrl;
                    link.click();
                });
        });
    };

    return (
        <div
            ref={nodeRef}
            className={`
                group relative bg-zinc-900 border rounded-2xl overflow-hidden
                transition-shadow duration-300 min-w-[500px] min-h-[400px] flex flex-col h-full w-full
                ${selected ? 'border-emerald-500 shadow-[0_0_30px_rgba(16,185,129,0.3)]' : 'border-zinc-700 shadow-lg'}
            `}
        >
            <NodeResizer minWidth={500} minHeight={400} isVisible={selected} lineClassName="border-emerald-500" handleClassName="h-3 w-3 bg-emerald-500 border-2 border-white rounded" />

            {/* Handles for connections */}
            {/* Handles for connections - Increased z-index to ensure they are clickable */}
            {/* All handles are sources to allow dragging FROM anywhere. ConnectionMode.Loose allows source-to-source. */}
            <Handle id="top" type="source" position={Position.Top} className="!w-6 !h-6 !bg-zinc-400 hover:!bg-emerald-500 transition-colors z-50 opacity-0 group-hover:opacity-100 rounded-full border-2 border-zinc-900" />
            <Handle id="bottom" type="source" position={Position.Bottom} className="!w-6 !h-6 !bg-zinc-400 hover:!bg-emerald-500 transition-colors z-50 opacity-0 group-hover:opacity-100 rounded-full border-2 border-zinc-900" />
            <Handle id="left" type="source" position={Position.Left} className="!w-6 !h-6 !bg-zinc-400 hover:!bg-emerald-500 transition-colors z-50 opacity-0 group-hover:opacity-100 rounded-full border-2 border-zinc-900" />
            <Handle id="right" type="source" position={Position.Right} className="!w-6 !h-6 !bg-zinc-400 hover:!bg-emerald-500 transition-colors z-50 opacity-0 group-hover:opacity-100 rounded-full border-2 border-zinc-900" />

            {/* Header */}
            <div className="flex items-center justify-between p-3 border-b border-zinc-800 bg-zinc-900/90 backdrop-blur grab-handle cursor-grab active:cursor-grabbing">
                <div className="flex items-center gap-2">
                    <span className="w-2 h-8 bg-emerald-500 rounded-full"></span>
                    <h3 className="font-bold text-zinc-100">{data.framework.name}</h3>
                </div>
                <div className="flex items-center gap-1">
                    <button
                        onClick={downloadNode}
                        className="p-1.5 rounded-lg hover:bg-emerald-500/10 text-zinc-500 hover:text-emerald-500 transition-colors nodrag"
                        title="Download Framework Image"
                    >
                        <Download size={16} />
                    </button>
                    <button
                        onClick={(e) => {
                            e.stopPropagation(); // Prevent selection when clicking delete
                            if (window.confirm('Delete this framework?')) {
                                data.onDelete?.();
                            }
                        }}
                        className="p-1.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white transition-colors nodrag"
                        title="Delete Framework"
                    >
                        <X size={16} />
                    </button>
                </div>
            </div>

            {/* Content Body */}
            <div className="flex-1 relative bg-zinc-950/50 p-4 nodrag cursor-default overflow-auto">
                <FrameworkDiagram
                    framework={data.framework}
                    content={data.content}
                    interactive={true}
                    onContentChange={data.onUpdateContent}
                    showLabels={true}
                    showDescriptions={false}
                />
            </div>
        </div>
    );
}

export default memo(FrameworkNode);
