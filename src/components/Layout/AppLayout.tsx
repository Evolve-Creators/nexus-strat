import React, { useState } from 'react';
import { BookOpen, FolderOpen, Menu, X } from 'lucide-react';
// We will need to import the actual views later, for now just placeholders or props
/* import ReferenceTab from '../Frameworks/ReferenceTab'; */
/* import AnalysisTab from '../Analysis/AnalysisTab'; */

interface AppLayoutProps {
    currentView: 'reference' | 'analysis';
    onViewChange: (view: 'reference' | 'analysis') => void;
    children: React.ReactNode;
}

export default function AppLayout({ currentView, onViewChange, children }: AppLayoutProps) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    return (
        <div className="flex h-screen w-full bg-zinc-950 text-zinc-100 font-sans overflow-hidden">
            {/* Sidebar Navigation */}
            <aside
                className={`
                    fixed inset-y-0 left-0 z-50 w-64 bg-zinc-900 border-r border-zinc-800 transform transition-transform duration-300 ease-in-out
                    ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
                    md:relative md:translate-x-0 flex flex-col
                `}
            >
                {/* Logo / Header */}
                <div className="h-16 flex items-center px-6 border-b border-zinc-800">
                    <div className="w-8 h-8 bg-white rounded-lg mr-3 flex items-center justify-center">
                        <span className="text-zinc-950 font-bold text-lg">F</span>
                    </div>
                    <span className="font-semibold text-lg tracking-wide">Frameworks</span>
                    <button
                        onClick={toggleSidebar}
                        className="md:hidden ml-auto p-2 text-zinc-400 hover:text-white"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Navigation Links */}
                <nav className="flex-1 p-4 space-y-2">
                    <button
                        onClick={() => onViewChange('reference')}
                        className={`
                            w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
                            ${currentView === 'reference'
                                ? 'bg-white text-zinc-950 font-medium shadow-lg shadow-white/5'
                                : 'text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100'}
                        `}
                    >
                        <BookOpen size={20} />
                        <span>Framework Layouts</span>
                    </button>

                    <button
                        onClick={() => onViewChange('analysis')}
                        className={`
                            w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
                            ${currentView === 'analysis'
                                ? 'bg-white text-zinc-950 font-medium shadow-lg shadow-white/5'
                                : 'text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100'}
                        `}
                    >
                        <FolderOpen size={20} />
                        <span>Case Analysis</span>
                    </button>
                </nav>

                {/* Footer User Info */}
                <div className="p-4 border-t border-zinc-800">
                    <div className="flex items-center gap-3 px-2">
                        <div className="w-8 h-8 rounded-full bg-zinc-700 flex items-center justify-center text-xs font-medium">
                            JP
                        </div>
                        <div className="flex flex-col">
                            <span className="text-sm font-medium text-white">Joe Paul</span>
                            <span className="text-xs text-zinc-500">Case Analyst</span>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col h-full overflow-hidden bg-zinc-950 relative">
                {/* Mobile Header Trigger */}
                <div className="md:hidden h-16 flex items-center px-4 border-b border-zinc-800 bg-zinc-900/50 backdrop-blur-md sticky top-0 z-40">
                    <button
                        onClick={toggleSidebar}
                        className="p-2 text-zinc-400 active:text-white"
                    >
                        <Menu size={24} />
                    </button>
                    <span className="ml-4 font-semibold">
                        {currentView === 'reference' ? 'Library' : 'Workspace'}
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
