import React from 'react';
import { Plus, Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

interface SidebarProps {
    activeFramework: string | null;
    onSelect: (id: string | null) => void;
}

import { generalFrameworks } from '../../data/generalFrameworks';
import { caseFrameworks } from '../../data/caseFrameworks';

export default function Sidebar({ activeFramework, onSelect }: SidebarProps) {
    const { theme, toggleTheme } = useTheme();

    const activeData = activeFramework
        ? [...generalFrameworks, ...caseFrameworks].find(f => f.id === activeFramework)
        : null;

    return (
        <div
            className="bg-sidebar border-r border-border h-screen p-4 font-sans flex flex-col transition-colors duration-300"
            style={{
                width: '240px',
                minWidth: '240px',
                position: 'fixed',
                left: 0,
                top: 0,
                bottom: 0,
                zIndex: 50
            }}
        >
            {/* Logo / Header Area */}
            <div className="mb-8 px-2 mt-2 flex items-center justify-between">
                <div className="w-8 h-8 bg-card rounded-lg border border-border"></div>

                {/* Theme Toggle */}
                <button
                    onClick={toggleTheme}
                    className="p-2 rounded-lg hover:bg-hover text-muted hover:text-primary transition-colors"
                    title="Toggle Theme"
                >
                    {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                </button>
            </div>

            {/* Navigation Tabs */}
            <nav className="flex-0 flex flex-col gap-2 mb-6">
                {/* Frameworks Tab (Active State) */}
                <button
                    onClick={() => onSelect(null)}
                    className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all text-left ${!activeFramework
                            ? 'bg-primary text-inverted shadow-sm'
                            : 'text-muted hover:text-primary hover:bg-hover'
                        }`}
                >
                    <span className="text-lg">📊</span>
                    Frameworks
                </button>

                {/* New Tab (Pill Style) */}
                <button
                    className="flex items-center gap-2 px-4 py-2 mt-2 rounded-full border border-border text-muted hover:text-primary hover:border-primary hover:bg-hover transition-all text-xs font-bold uppercase tracking-wider justify-center"
                >
                    <Plus size={14} />
                    <span>New Tab</span>
                </button>

                {/* Draggable Sticky Note */}
                <div
                    className="flex items-center gap-2 px-4 py-3 mt-4 bg-yellow-400/10 border border-yellow-400/30 text-yellow-600 dark:text-yellow-200 rounded-lg cursor-grab hover:bg-yellow-400/20 transition-all"
                    draggable
                    onDragStart={(event) => {
                        event.dataTransfer.setData('application/reactflow/type', 'stickyNote');
                        event.dataTransfer.effectAllowed = 'move';
                    }}
                >
                    <div className="w-4 h-4 bg-yellow-400 rounded-sm shadow-sm" />
                    <span className="text-xs font-bold">Sticky Note</span>
                </div>
            </nav>

            {/* Active Framework Details */}
            {activeData && (
                <div className="flex-1 overflow-y-auto pr-1 custom-scrollbar">
                    <div className="px-1 pb-4">
                        <h3 className="text-sm font-bold text-primary mb-3 border-b border-border pb-2">
                            {activeData.shortName || activeData.name}
                        </h3>

                        {activeData.usage && (
                            <div className="mb-4">
                                <h4 className="text-[10px] uppercase font-bold text-muted mb-1">Usage</h4>
                                <div className="text-xs text-muted whitespace-pre-wrap leading-relaxed">
                                    {activeData.usage}
                                </div>
                            </div>
                        )}

                        {activeData.explanation && (
                            <div className="mb-4">
                                <h4 className="text-[10px] uppercase font-bold text-muted mb-1">Explanation</h4>
                                <div className="text-xs text-muted whitespace-pre-wrap leading-relaxed">
                                    {activeData.explanation}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Bottom User Profile */}
            <div className="mt-auto pt-6 border-t border-border">
                <button className="flex items-center gap-3 w-full px-2 py-2 text-muted hover:text-primary transition-colors">
                    <div className="w-8 h-8 rounded-full bg-card border border-border"></div>
                    <div className="flex flex-col items-start">
                        <span className="text-xs font-medium text-primary">User Profile</span>
                        <span className="text-[10px] text-muted">Pro Plan</span>
                    </div>
                </button>
            </div>
        </div>
    );
}
