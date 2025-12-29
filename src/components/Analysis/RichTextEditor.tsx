import { useState, useRef, useEffect } from 'react';
import {
    Bold, Italic, Underline, List, ListOrdered, CheckSquare,
    Type, Highlighter, Palette
} from 'lucide-react';

interface RichTextEditorProps {
    initialContent?: string;
    onChange?: (html: string) => void;
    placeholder?: string;
}

const PASTEL_COLORS = [
    { name: 'None', value: 'transparent' },
    { name: 'Pink', value: '#fce7f3' },    // pink-100
    { name: 'Blue', value: '#dbeafe' },    // blue-100
    { name: 'Green', value: '#dcfce7' },   // green-100
    { name: 'Yellow', value: '#fef9c3' },  // yellow-100
    { name: 'Purple', value: '#f3e8ff' },  // purple-100
    { name: 'Orange', value: '#ffedd5' },  // orange-100
];

export default function RichTextEditor({
    initialContent = '',
    onChange,
    placeholder = 'Start typing your notes...'
}: RichTextEditorProps) {
    const editorRef = useRef<HTMLDivElement>(null);
    const [activeFormats, setActiveFormats] = useState<string[]>([]);
    const [showColorPicker, setShowColorPicker] = useState(false);

    useEffect(() => {
        if (editorRef.current && initialContent && editorRef.current.innerHTML !== initialContent) {
            editorRef.current.innerHTML = initialContent;
        }
    }, []); // Only on mount/change if needed, but careful with loops

    const handleInput = () => {
        if (editorRef.current && onChange) {
            onChange(editorRef.current.innerHTML);
        }
        checkFormats();
    };

    const checkFormats = () => {
        // Simple check for active commands
        const formats = [];
        if (document.queryCommandState('bold')) formats.push('bold');
        if (document.queryCommandState('italic')) formats.push('italic');
        if (document.queryCommandState('underline')) formats.push('underline');
        if (document.queryCommandState('insertUnorderedList')) formats.push('ul');
        if (document.queryCommandState('insertOrderedList')) formats.push('ol');
        setActiveFormats(formats);
    };

    const execCmd = (command: string, value: string | undefined = undefined) => {
        document.execCommand(command, false, value);
        if (editorRef.current) editorRef.current.focus();
        checkFormats();
        handleInput();
    };

    const applyHighlight = (color: string) => {
        execCmd('hiliteColor', color);
        if (color !== 'transparent') {
            execCmd('foreColor', '#000000');
        }
        setShowColorPicker(false);
    };

    const ToolbarButton = ({
        icon: Icon,
        active,
        onClick,
        title
    }: { icon: any, active?: boolean, onClick: () => void, title: string }) => (
        <button
            onClick={(e) => { e.preventDefault(); onClick(); }}
            className={`
                p-2 rounded hover:bg-zinc-700 transition-colors
                ${active ? 'bg-zinc-700 text-white' : 'text-zinc-400'}
            `}
            title={title}
        >
            <Icon size={16} />
        </button>
    );

    return (
        <div className="flex flex-col h-full border border-zinc-700 rounded-lg overflow-hidden bg-zinc-900">
            {/* Toolbar */}
            <div className="flex items-center gap-1 p-2 bg-zinc-900 border-b border-zinc-800 flex-wrap">
                <ToolbarButton
                    icon={Bold}
                    active={activeFormats.includes('bold')}
                    onClick={() => execCmd('bold')}
                    title="Bold"
                />
                <ToolbarButton
                    icon={Italic}
                    active={activeFormats.includes('italic')}
                    onClick={() => execCmd('italic')}
                    title="Italic"
                />
                <ToolbarButton
                    icon={Underline}
                    active={activeFormats.includes('underline')}
                    onClick={() => execCmd('underline')}
                    title="Underline"
                />

                <div className="w-px h-4 bg-zinc-700 mx-2" />

                <ToolbarButton
                    icon={List}
                    active={activeFormats.includes('ul')}
                    onClick={() => execCmd('insertUnorderedList')}
                    title="Bullet List"
                />
                <ToolbarButton
                    icon={ListOrdered}
                    active={activeFormats.includes('ol')}
                    onClick={() => execCmd('insertOrderedList')}
                    title="Numbered List"
                />

                <div className="w-px h-4 bg-zinc-700 mx-2" />

                {/* Color Picker Helper */}
                <div className="relative">
                    <ToolbarButton
                        icon={Highlighter}
                        active={showColorPicker}
                        onClick={() => setShowColorPicker(!showColorPicker)}
                        title="Highlight Color"
                    />
                    {showColorPicker && (
                        <div className="absolute top-full left-0 mt-2 bg-zinc-800 border border-zinc-600 rounded-lg p-2 flex gap-2 shadow-xl z-50">
                            {PASTEL_COLORS.map(c => (
                                <button
                                    key={c.name}
                                    onClick={() => applyHighlight(c.value)}
                                    className="w-6 h-6 rounded-full border border-zinc-500 hover:scale-110 transition-transform"
                                    style={{ background: c.value }}
                                    title={c.name}
                                />
                            ))}
                        </div>
                    )}
                </div>

                <div className="ml-auto text-xs text-zinc-500 px-2">
                    Rich Text
                </div>
            </div>

            {/* Editor Area */}
            <div
                ref={editorRef}
                contentEditable
                onInput={handleInput}
                onSelect={checkFormats}
                className="flex-1 p-4 outline-none overflow-y-auto text-zinc-300 [&>ul]:list-disc [&>ul]:pl-5 [&>ol]:list-decimal [&>ol]:pl-5"
                style={{ minHeight: '200px' }}
                suppressContentEditableWarning={true}
            />

            {(!editorRef.current?.innerText || editorRef.current.innerText === '\n') && (
                <div className="absolute top-[3.5rem] left-5 text-zinc-600 pointer-events-none select-none">
                    {placeholder}
                </div>
            )}
        </div>
    );
}
