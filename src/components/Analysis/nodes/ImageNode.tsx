import { memo } from 'react';
import { Handle, Position, NodeProps, NodeResizer } from '@xyflow/react';
import { X } from 'lucide-react';

export type ImageNodeData = {
    src: string;
    alt?: string;
    onDelete?: () => void;
};

function ImageNode({ data, selected }: NodeProps<any>) {
    return (
        <div
            className={`
                group relative bg-transparent
                ${selected ? 'ring-2 ring-emerald-500 rounded-lg' : ''}
            `}
        >
            <NodeResizer
                color="#10b981"
                isVisible={selected}
                minWidth={100}
                minHeight={100}
                keepAspectRatio={true}
            />

            {/* Handles for connections */}
            {/* All handles are sources to allow dragging FROM anywhere. ConnectionMode.Loose allows source-to-source. */}
            <Handle id="top" type="source" position={Position.Top} className="!w-4 !h-4 !bg-zinc-400 hover:!bg-emerald-500 transition-colors z-50 opacity-0 group-hover:opacity-100 rounded-full border-2 border-zinc-900" />
            <Handle id="bottom" type="source" position={Position.Bottom} className="!w-4 !h-4 !bg-zinc-400 hover:!bg-emerald-500 transition-colors z-50 opacity-0 group-hover:opacity-100 rounded-full border-2 border-zinc-900" />
            <Handle id="left" type="source" position={Position.Left} className="!w-4 !h-4 !bg-zinc-400 hover:!bg-emerald-500 transition-colors z-50 opacity-0 group-hover:opacity-100 rounded-full border-2 border-zinc-900" />
            <Handle id="right" type="source" position={Position.Right} className="!w-4 !h-4 !bg-zinc-400 hover:!bg-emerald-500 transition-colors z-50 opacity-0 group-hover:opacity-100 rounded-full border-2 border-zinc-900" />

            {/* Custom Delete Button */}
            <button
                onClick={data.onDelete}
                className={`
                    absolute -top-3 -right-3 p-1 rounded-full bg-red-500 text-white shadow-lg 
                    hover:bg-red-600 transition-all z-50 opacity-0 group-hover:opacity-100
                `}
                title="Delete Image"
            >
                <X size={12} />
            </button>

            {/* Image Render */}
            <img
                src={data.src}
                alt={data.alt || 'Pasted Image'}
                className="w-full h-full object-contain rounded-lg shadow-lg pointer-events-none select-none"
                draggable={false}
            />
        </div>
    );
}

export default memo(ImageNode);
