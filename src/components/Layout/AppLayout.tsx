import React, { useState } from 'react';
import { Layout, BarChart2, Menu, X, StickyNote, History, Upload, Settings, BookOpen, FolderOpen } from 'lucide-react';

interface AppLayoutProps {
    activeTab: 'frameworks' | 'analysis' | 'notes' | 'history' | 'upload' | 'settings';
    onTabChange: (tab: 'frameworks' | 'analysis' | 'notes' | 'history' | 'upload' | 'settings') => void;
    children: React.ReactNode;
}

export default function AppLayout({ activeTab, onTabChange, children }: AppLayoutProps) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    const NavItem = ({ id, label, icon: Icon }: { id: typeof activeTab, label: string, icon: any }) => (
        <button
            onClick={() => onTabChange(id)}
            className={`
                w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
                ${activeTab === id
                    ? 'bg-hover text-primary font-medium shadow-sm border border-border dark:border-zinc-800'
                    : 'text-muted hover:bg-hover hover:text-primary'}
            `}
        >
            <Icon size={20} />
            <span>{label}</span>
        </button>
    );

    return (
        <div className="flex h-screen w-full bg-canvas text-primary font-sans overflow-hidden">
            {/* Sidebar Navigation */}
            <aside
                className={`
                    fixed inset-y-0 left-0 z-50 w-64 bg-sidebar border-r border-border dark:border-zinc-950 transform transition-transform duration-300 ease-in-out
                    ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
                    md:relative md:translate-x-0 flex flex-col
                `}
                style={{ borderColor: 'var(--border-color)' }}
            >
                {/* Logo / Header */}
                <div className="h-16 flex items-center px-6">
                    <div className="w-8 h-8 bg-primary text-inverted rounded-lg mr-3 flex items-center justify-center">
                        <span className="font-bold text-lg">N</span>
                    </div>
                    <span className="font-semibold text-lg tracking-wide">Nexus Strat</span>
                    <button
                        onClick={toggleSidebar}
                        className="md:hidden ml-auto p-2 text-muted hover:text-primary"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Navigation Links */}
                <nav className="flex-1 p-4 space-y-2">
                    <NavItem id="frameworks" label="Frameworks" icon={BookOpen} />
                    <NavItem id="analysis" label="Analysis" icon={FolderOpen} />
                    <NavItem id="notes" label="Notes" icon={StickyNote} />
                    <NavItem id="history" label="History" icon={History} />
                    <NavItem id="upload" label="Upload Case" icon={Upload} />
                    <div className="pt-4 mt-auto">
                        <NavItem id="settings" label="Settings" icon={Settings} />
                    </div>
                </nav>

                {/* Footer User Info */}
                <div className="p-4">
                    <div className="flex items-center gap-3 px-2">
                        <div className="w-8 h-8 rounded-full bg-hover flex items-center justify-center text-xs font-medium">
                            JP
                        </div>
                        <div className="flex flex-col">
                            <span className="text-sm font-medium text-primary">Joe Paul</span>
                            <span className="text-xs text-muted">Case Analyst</span>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col h-full overflow-hidden bg-canvas relative">
                {/* Mobile Header Trigger */}
                <div className="md:hidden h-16 flex items-center px-4 border-b border-border dark:border-zinc-950 bg-canvas/80 backdrop-blur-md sticky top-0 z-40">
                    <button
                        onClick={toggleSidebar}
                        className="p-2 text-muted active:text-primary"
                    >
                        <Menu size={24} />
                    </button>
                    <span className="ml-4 font-semibold">
                        {activeTab === 'frameworks' ? 'Library' :
                            activeTab === 'analysis' ? 'Workspace' :
                                activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
                    </span>
                </div>

                {/* Scrollable View Content */}
                <div className="flex-1 overflow-auto relative custom-scrollbar">
                    {children}
                </div>
            </main>
        </div>
    );
}
