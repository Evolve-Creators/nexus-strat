
import InteractiveNode from '../InteractiveNode';
import { Framework } from '../../../types';
import { User, Monitor, Package, Settings } from 'lucide-react';

interface FourMDiagramProps {
    framework: Framework;
    content: Record<string, string[]>;
    interactive?: boolean;
    showDescriptions?: boolean;
    onContentChange?: (sectionId: string, content: string[]) => void;
}

export default function FourMDiagram({
    framework,
    content,
    interactive = false,
    showDescriptions = true,
    onContentChange
}: FourMDiagramProps) {

    const handleContentChange = (id: string, newContent: string[]) => {
        onContentChange?.(id, newContent);
    };

    // Columns config with Icons
    // Man -> User
    // Machine -> Monitor (or Cog/Cpu?) Monitor looks good for "Machine/Tech"
    // Material -> Package
    // Method -> Settings (Process)
    const rows = [
        { id: 'man', label: 'Man', icon: User, color: 'cyan' },
        { id: 'machine', label: 'Machine', icon: Monitor, color: 'cyan' },
        { id: 'material', label: 'Material', icon: Package, color: 'cyan' },
        { id: 'method', label: 'Method', icon: Settings, color: 'cyan' },
    ];

    return (
        <div className="w-full h-full p-8 bg-zinc-950 font-sans flex flex-col items-center justify-center relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-cyan-900/10 blur-[100px] rounded-full pointer-events-none" />

            {/* Title */}
            <h2 className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-200 text-3xl font-light tracking-[0.2em] uppercase border-b border-cyan-900/50 pb-4 mb-12 z-10 drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]">
                {framework.name}
            </h2>

            <div className="flex flex-col gap-6 w-full max-w-5xl z-10">
                {rows.map((row) => {
                    const section = framework.sections.find(s => s.id === row.id);

                    const description = section?.description || '';

                    const Icon = row.icon;

                    return (
                        <div key={row.id} className="flex flex-row items-center w-full group h-32">
                            {/* Icon Circle */}
                            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-cyan-500 to-teal-600 flex flex-col items-center justify-center shadow-[0_0_20px_rgba(34,211,238,0.4)] z-20 border-4 border-zinc-900 group-hover:scale-110 transition-transform duration-300">
                                <Icon size={40} className="text-white drop-shadow-md" />
                            </div>

                            {/* Label Box (Chevron Start) */}
                            <div className="w-48 h-20 bg-zinc-800 -ml-6 pl-10 pr-6 flex items-center justify-center clip-path-chevron-left shadow-lg relative z-10 border-zinc-900">
                                <h3 className="text-lg font-bold text-cyan-100 tracking-wider">
                                    {row.label}
                                </h3>
                            </div>

                            {/* Description Box (Chevron Body) */}
                            <div className="flex-1 h-24 -ml-4 pl-12 pr-12 bg-zinc-900/80 backdrop-blur-md border-y border-r border-zinc-900 rounded-r-xl flex items-center relative overflow-hidden group-hover:border-cyan-500/60 group-hover:shadow-[0_0_15px_rgba(34,211,238,0.1)] transition-all">
                                {/* Dashed Outline Effect inside */}
                                <div className="absolute inset-2 border border-dashed border-cyan-500/20 rounded-lg pointer-events-none" />

                                <div className="flex-1 overflow-y-auto custom-scrollbar p-2 h-full flex flex-col justify-center">
                                    {/* Description Text */}
                                    {showDescriptions && description && (
                                        <p className="text-zinc-400 text-sm italic mb-1">{description}</p>
                                    )}

                                    {/* Interactive Input */}
                                    <InteractiveNode
                                        id={row.id}
                                        initialContent={content[row.id] || []}
                                        onUpdate={(c) => handleContentChange(row.id, c)}
                                        isInteractive={interactive}
                                        placeholder={`Add ${row.label} details...`}
                                        style={{ color: '#bae6fd', fontSize: '13px' }} // blue-200
                                    />
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            <style>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(34, 211, 238, 0.4); 
                    border-radius: 2px;
                }
                /* Approximate Chevron clip path attempt if CSS generic doesn't work, but standard rectangle with overlap is safer for responsive. 
                   Reference image shows standard rectangle bars with arrows. 
                   Let's stick to standard flex shapes with negative margins for visual overlap like "arrow". 
                */
            `}</style>
        </div>
    );
}
