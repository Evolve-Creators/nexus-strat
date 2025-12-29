import React, { useState, useEffect, useRef } from 'react';

interface InteractiveNodeProps {
    id: string;
    initialContent: string[];
    placeholder?: string;
    onUpdate: (content: string[]) => void;
    isInteractive?: boolean;
    style?: React.CSSProperties;
    minimal?: boolean;
}

export default function InteractiveNode({
    id: _id,
    initialContent,
    placeholder = "Add content...",
    onUpdate,
    isInteractive = true,
    style,
    minimal = false
}: InteractiveNodeProps) {
    const [content, setContent] = useState<string[]>(initialContent);
    const [isEditing, setIsEditing] = useState(false);
    const inputRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        setContent(initialContent);
    }, [initialContent]);

    const handleBlur = () => {
        setIsEditing(false);
        onUpdate(content); // Persist on blur
    };

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const lines = e.target.value.split('\n');
        setContent(lines);
    };

    if (isEditing && isInteractive) {
        return (
            <div style={style} className="nodrag relative z-50">
                <textarea
                    ref={inputRef}
                    value={content.join('\n')}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`w-full ${minimal ? 'min-w-[100px] p-1 text-[10px]' : 'min-w-[150px] p-2 text-xs'} bg-slate-800 text-white border border-blue-500 rounded leading-relaxed focus:outline-none shadow-xl`}
                    autoFocus
                    rows={Math.max(3, content.length)}
                    placeholder={placeholder}
                />
            </div>
        );
    }

    return (
        <div
            onClick={() => isInteractive && setIsEditing(true)}
            style={style}
            className={`nodrag ${minimal ? 'min-w-[100px] min-h-[24px] p-0.5' : 'min-w-[150px] min-h-[40px] p-1'} rounded cursor-pointer transition-colors ${content.length === 0 ? 'text-slate-500 italic' : 'text-slate-200'
                } hover:bg-slate-800/50`}
        >
            {content.length > 0 ? (
                <ul className="list-disc list-inside text-xs leading-relaxed">
                    {content.map((line, i) => (
                        <li key={i}>{line}</li>
                    ))}
                </ul>
            ) : (
                <span className="text-xs">{placeholder}</span>
            )}
        </div>
    );
}
