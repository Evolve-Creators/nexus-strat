import { useState } from 'react';
import { ArrowLeft, BookOpen, Calculator, Info, Lightbulb, PanelRightOpen, PanelRightClose } from 'lucide-react';
import { Framework } from '../../types';
import FrameworkDiagram from './FrameworkDiagram';

interface FrameworkDetailViewProps {
    framework: Framework;
    onBack: () => void;
}

export default function FrameworkDetailView({ framework, onBack }: FrameworkDetailViewProps) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    return (
        <div className="h-full flex flex-col bg-canvas text-primary transition-colors duration-300">
            {/* Header */}
            <div className="flex items-center gap-4 p-6 bg-zinc-950 sticky top-0 z-20 border-b-0 shadow-none">
                <button
                    onClick={onBack}
                    className="p-2 hover:bg-hover rounded-full transition-colors text-muted hover:text-primary"
                >
                    <ArrowLeft size={20} />
                </button>
                <div>
                    <h1 className="text-xl font-bold text-primary">{framework.name}</h1>
                    <p className="text-xs text-muted">{framework.description}</p>
                </div>
                <div className="ml-auto flex gap-2 items-center">
                    <span className="px-3 py-1 bg-card border border-border rounded-full text-xs text-muted capitalize mr-4">
                        {framework.category?.replace('-', ' ')}
                    </span>
                    <button
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="p-2 hover:bg-hover rounded-lg text-muted hover:text-primary transition-colors"
                        title={isSidebarOpen ? "Collapse Sidebar" : "Expand Sidebar"}
                    >
                        {isSidebarOpen ? <PanelRightClose size={20} /> : <PanelRightOpen size={20} />}
                    </button>
                </div>
            </div>

            <div className="flex-1 overflow-hidden flex flex-row relative">

                {/* Visual / Diagram Area (Main Focus) */}
                <div className="flex-1 bg-canvas relative overflow-auto h-full w-full">
                    {/* Centered Scrollable Container */}
                    <div className="min-h-full min-w-full flex items-start justify-center p-8">
                        <div className="w-full max-w-[1200px] bg-zinc-900/20 backdrop-blur-2xl border border-zinc-950 rounded-2xl p-4 md:p-8 shadow-2xl relative">
                            {/* Diagram Component */}
                            <FrameworkDiagram
                                framework={framework}
                                content={{}}
                                interactive={false}
                                showLabels={true}
                            />
                        </div>
                    </div>
                </div>

                {/* Info Sidebar (Rich Content) - Collapsible */}
                <div
                    className={`
                        border-l border-zinc-950 bg-card/60 overflow-y-auto 
                        transition-all duration-300 ease-in-out
                        ${isSidebarOpen ? 'w-[400px] p-6 opacity-100' : 'w-0 p-0 opacity-0 overflow-hidden'}
                    `}
                >
                    <div className="space-y-8 w-[350px]"> {/* Fixed width inner container prevents reflow during transition */}

                        {/* Explanation */}
                        {framework.explanation && (
                            <section>
                                <div className="flex items-center gap-2 mb-3 text-emerald-400">
                                    <BookOpen size={18} />
                                    <h3 className="font-bold text-sm uppercase tracking-wider">Concept</h3>
                                </div>
                                <p className="text-muted text-sm leading-relaxed whitespace-pre-wrap">
                                    {framework.explanation}
                                </p>
                            </section>
                        )}

                        {/* Preliminary Questions (New) */}
                        {framework.sections.find(s => s.id === 'preliminary') && (
                            <section>
                                <div className="flex items-center gap-2 mb-3 text-purple-400">
                                    <Info size={18} />
                                    <h3 className="font-bold text-sm uppercase tracking-wider">Preliminary Questions</h3>
                                </div>
                                <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
                                    <ul className="space-y-2 text-sm text-purple-600 dark:text-purple-300 list-disc list-inside">
                                        {framework.sections.find(s => s.id === 'preliminary')?.questions?.map((q, i) => (
                                            <li key={i}>{q}</li>
                                        ))}
                                    </ul>
                                </div>
                            </section>
                        )}

                        {/* Equations */}
                        {framework.equations && framework.equations.length > 0 && (
                            <section>
                                <div className="flex items-center gap-2 mb-3 text-blue-400">
                                    <Calculator size={18} />
                                    <h3 className="font-bold text-sm uppercase tracking-wider">Key Equations</h3>
                                </div>
                                <div className="bg-card border border-border rounded-lg p-4 space-y-2">
                                    {framework.equations.map((eq, i) => (
                                        <div key={i} className="font-mono text-xs text-muted border-b border-border/50 last:border-0 pb-2 last:pb-0">
                                            {eq}
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Usage */}
                        {framework.usage && (
                            <section>
                                <div className="flex items-center gap-2 mb-3 text-amber-400">
                                    <Lightbulb size={18} />
                                    <h3 className="font-bold text-sm uppercase tracking-wider">When to Use</h3>
                                </div>
                                <div className="bg-amber-900/10 border border-amber-900/30 rounded-lg p-4 text-sm text-amber-200/80">
                                    {framework.usage}
                                </div>
                            </section>
                        )}

                        {/* Sections List (Quick Ref) */}
                        <section>
                            <div className="flex items-center gap-2 mb-3 text-zinc-500">
                                <Info size={18} />
                                <h3 className="font-bold text-sm uppercase tracking-wider">Components</h3>
                            </div>
                            <ul className="space-y-2">
                                {framework.sections.map(section => (
                                    <li key={section.id} className="text-xs text-muted flex gap-2">
                                        <span className="text-accent">•</span>
                                        <span>
                                            <strong className="text-primary">{section.name}</strong>
                                            {section.description && <span className="text-muted"> - {section.description}</span>}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
}
