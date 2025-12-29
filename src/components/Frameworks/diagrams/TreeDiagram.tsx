import { Framework } from '../../../types';
import InteractiveNode from '../InteractiveNode';

interface TreeDiagramProps {
    framework: Framework;
    content: Record<string, string[]>;
    interactive?: boolean;
    showDescriptions?: boolean;
    onContentChange?: (sectionId: string, content: string[]) => void;
}

// Recursive Node Component
const TreeNode = ({
    section,
    content,
    interactive,
    onContentChange,
    depth = 0
}: {
    section: any,
    content: Record<string, string[]>,
    interactive: boolean,
    onContentChange?: (id: string, c: string[]) => void,
    depth?: number
}) => {
    const hasChildren = section.children && section.children.length > 0;
    const isRoot = depth === 0;

    return (
        <div className="flex flex-col items-center mx-2 relative">

            {/* Connector entering node (if not root) */}
            {!isRoot && (
                <div className="w-px h-8 bg-zinc-800"></div>
            )}

            {/* Node Card */}
            <div className={`
                relative z-10 flex flex-col gap-2 p-3 min-w-[180px] max-w-[220px] rounded-lg border transition-all
                ${isRoot
                    ? 'bg-zinc-900/80 backdrop-blur-md border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.1)]'
                    : 'bg-zinc-900/40 backdrop-blur-sm border-zinc-800 hover:border-zinc-700'}
            `}>
                <div className={`
                    text-center font-bold text-sm border-b border-zinc-800 pb-1 mb-1
                    ${isRoot ? 'text-white border-emerald-500/20' : 'text-zinc-300 border-zinc-800'}
                `}>
                    {section.name}
                </div>

                <InteractiveNode
                    id={section.id}
                    initialContent={content[section.id] || []}
                    onUpdate={(c) => onContentChange?.(section.id, c)}
                    isInteractive={interactive}
                    placeholder={isRoot ? "Root issue..." : "Details..."}
                    style={{ fontSize: '11px', color: isRoot ? '#e2e8f0' : '#a1a1aa' }}
                />
            </div>

            {/* Recursion / Children */}
            {hasChildren && (
                <div className="flex flex-col items-center">
                    {/* Access Line (Down from parent) */}
                    <div className="w-px h-8 bg-zinc-800"></div>

                    {/* Horizontal Connector Bar */}
                    <div className="relative flex justify-center pt-0">

                        {/* The Horizontal Line spanning first to last child center */}
                        {section.children.length > 1 && (
                            <div className="absolute top-0 left-0 right-0 h-px bg-zinc-800 marker-line">
                                {/* Requires JS calc or smart CSS to offset. 
                                    Using a pseudo-element on the children container is easier usually.
                                    Here we'll use a visual simplification: A full width line masked?
                                    No, let's just make the line span 100% of this container logic 
                                    and rely on the padding of the children to inset it? 
                                    Actually, standard "Flex Tree" approach:
                                    Line above each child, except first (left-half transparent) and last (right-half transparent).
                                */}
                            </div>
                        )}

                        <div className="flex items-start">
                            {section.children.map((child: any, index: number) => {
                                const isFirst = index === 0;
                                const isLast = index === section.children.length - 1;
                                const isOnly = section.children.length === 1;

                                return (
                                    <div key={child.id} className="flex flex-col items-center relative">
                                        {/* Horizontal Connectors above child */}
                                        {!isOnly && (
                                            <div className="absolute top-0 w-full h-px">
                                                {/* Left segment */}
                                                <div className={`absolute top-0 left-0 w-1/2 h-full ${isFirst ? 'bg-transparent' : 'bg-zinc-800'}`}></div>
                                                {/* Right segment */}
                                                <div className={`absolute top-0 right-0 w-1/2 h-full ${isLast ? 'bg-transparent' : 'bg-zinc-800'}`}></div>
                                            </div>
                                        )}

                                        <TreeNode
                                            section={child}
                                            content={content}
                                            interactive={interactive}
                                            onContentChange={onContentChange}
                                            depth={depth + 1}
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default function TreeDiagram({
    framework,
    content,
    interactive = false,
    showDescriptions = true,
    onContentChange
}: TreeDiagramProps) {
    return (
        <div className="w-full h-full overflow-auto p-12 bg-zinc-950 flex justify-center">
            <div className="flex gap-12">
                {framework.sections.map(section => (
                    <TreeNode
                        key={section.id}
                        section={section}
                        content={content}
                        interactive={interactive}
                        onContentChange={onContentChange}
                        depth={0}
                    />
                ))}
            </div>
        </div>
    );
}
