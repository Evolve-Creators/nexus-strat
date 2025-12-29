import { memo, useState, useRef, useEffect } from 'react';
import { Handle, Position, NodeProps } from '@xyflow/react';
import { X, Palette, Bold, Italic, List, ListOrdered, Highlighter } from 'lucide-react';

export type StickyNoteData = {
    label?: string;
    text: string; // Store HTML content here
    color: string;
    onDelete?: () => void;
    onChange?: (text: string) => void;
    onColorChange?: (color: string) => void;
};

const COLORS = [
    { name: 'Yellow', value: '#fef08a' }, // yellow-200
    { name: 'Green', value: '#bbf7d0' }, // green-200
    { name: 'Blue', value: '#bfdbfe' }, // blue-200
    { name: 'Pink', value: '#fbcfe8' }, // pink-200
    { name: 'Orange', value: '#fed7aa' }, // orange-200
    { name: 'White', value: '#ffffff' },
    { name: 'Dark', value: '#1f2937' }, // zinc-800
];

function StickyNoteNode({ data, selected }: NodeProps<any>) {
    const [showPalette, setShowPalette] = useState(false);
    const contentRef = useRef<HTMLDivElement>(null);
    const isDark = data.color === '#1f2937';

    // Sync initial content
    useEffect(() => {
        if (contentRef.current && contentRef.current.innerHTML !== data.text) {
            // Only update if significantly different to avoid cursor jumping, 
            // but strictly for initial load or external updates:
            if (!contentRef.current.innerText.trim() && data.text) {
                contentRef.current.innerHTML = data.text;
            }
        }
    }, []);

    const handleInput = () => {
        if (contentRef.current && data.onChange) {
            data.onChange(contentRef.current.innerHTML);
        }
    };

    const execCmd = (command: string, value?: string) => {
        document.execCommand(command, false, value);
        contentRef.current?.focus();
        handleInput();
    };

    const ToolbarButton = ({ icon: Icon, onClick, active }: any) => (
        <button
            onMouseDown={(e) => { e.preventDefault(); onClick(); }}
            className={`p-1 rounded hover:bg-black/10 ${isDark ? 'hover:bg-white/20' : ''} ${active ? 'bg-black/10' : ''} transition-colors`}
        >
            <Icon size={12} />
        </button>
    );

    return (
        <div
            className={`
                group relative w-64 min-h-[180px] p-4 rounded-md shadow-md text-sm
                transition-shadow duration-200 flex flex-col font-medium
                ${selected ? 'shadow-xl ring-2 ring-emerald-500' : 'shadow-md'}
            `}
            style={{
                background: data.color || '#fef08a',
                color: isDark ? '#e5e7eb' : '#1f2937'
            }}
        >
            {/* All handles are sources to allow dragging FROM anywhere. ConnectionMode.Loose allows source-to-source. */}
            <Handle id="top" type="source" position={Position.Top} className="!w-6 !h-6 !bg-zinc-400 hover:!bg-emerald-500 transition-colors z-50 opacity-0 group-hover:opacity-100 rounded-full border-2 border-zinc-900" />
            <Handle id="bottom" type="source" position={Position.Bottom} className="!w-6 !h-6 !bg-zinc-400 hover:!bg-emerald-500 transition-colors z-50 opacity-0 group-hover:opacity-100 rounded-full border-2 border-zinc-900" />
            <Handle id="left" type="source" position={Position.Left} className="!w-6 !h-6 !bg-zinc-400 hover:!bg-emerald-500 transition-colors z-50 opacity-0 group-hover:opacity-100 rounded-full border-2 border-zinc-900" />
            <Handle id="right" type="source" position={Position.Right} className="!w-6 !h-6 !bg-zinc-400 hover:!bg-emerald-500 transition-colors z-50 opacity-0 group-hover:opacity-100 rounded-full border-2 border-zinc-900" />

            {/* Toolbar - Visible on hover or select */}
            <div className={`absolute top-2 left-2 flex gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity ${selected ? 'opacity-100' : ''}`}>
                <ToolbarButton icon={Bold} onClick={() => execCmd('bold')} />
                <ToolbarButton icon={Italic} onClick={() => execCmd('italic')} />
                <ToolbarButton icon={List} onClick={() => execCmd('insertUnorderedList')} />
                <ToolbarButton icon={ListOrdered} onClick={() => execCmd('insertOrderedList')} />
                <ToolbarButton icon={Highlighter} onClick={() => execCmd('hiliteColor', '#fef08a')} />
            </div>

            {/* Actions - Color & Delete */}
            <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="relative">
                    <button
                        onClick={() => setShowPalette(!showPalette)}
                        className={`p-1 rounded hover:bg-black/10 ${isDark ? 'hover:bg-white/20' : 'hover:bg-black/10'}`}
                    >
                        <Palette size={14} />
                    </button>
                    {showPalette && (
                        <div className="absolute top-full right-0 mt-1 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 p-2 rounded shadow-xl flex gap-1 z-50">
                            {COLORS.map(c => (
                                <button
                                    key={c.name}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        data.onColorChange?.(c.value);
                                        setShowPalette(false);
                                    }}
                                    className="w-5 h-5 rounded-full border border-black/10"
                                    style={{ background: c.value }}
                                    title={c.name}
                                />
                            ))}
                        </div>
                    )}
                </div>

                <button
                    onClick={data.onDelete}
                    className={`p-1 rounded hover:bg-black/10 text-red-500 hover:text-red-600 ${isDark ? 'hover:bg-white/20' : 'hover:bg-black/10'}`}
                >
                    <X size={14} />
                </button>
            </div>

            {/* Editable Content */}
            <div
                ref={contentRef}
                contentEditable
                className="nodrag mt-6 flex-1 outline-none font-sans leading-relaxed min-h-[100px] cursor-text empty:before:content-[attr(data-placeholder)] empty:before:text-black/30"
                onInput={handleInput}
                onMouseDown={(e) => e.stopPropagation()}
                suppressContentEditableWarning={true}
                data-placeholder="Type your note..."
                style={{
                    // Basic reset for contentEditable
                    whiteSpace: 'pre-wrap',
                    wordBreak: 'break-word',
                    fontFamily: 'Inter, sans-serif'
                }}
            />
        </div>
    );
}

export default memo(StickyNoteNode);
