import { useState, useEffect } from 'react';
import { Layers, Search, LayoutGrid, ChevronLeft, ChevronRight, Plus, FolderOpen, Trash2, Clock, ArrowRight } from 'lucide-react';
import AnalysisBoard from './AnalysisBoard';
import { generalFrameworks } from '../../data/generalFrameworks';
import { caseFrameworks } from '../../data/caseFrameworks';
import { v4 as uuidv4 } from 'uuid';

// Merge all frameworks for the palette
const allFrameworks = [...generalFrameworks, ...caseFrameworks];

interface Project {
    id: string;
    name: string;
    updatedAt: number;
}

export default function AnalysisTab() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<'all' | 'general' | 'case'>('all');
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    // Project Management State
    const [projects, setProjects] = useState<Project[]>([]);
    const [activeProjectId, setActiveProjectId] = useState<string | null>(null);
    const [newProjectName, setNewProjectName] = useState('');

    // Load Projects on Mount
    useEffect(() => {
        const savedProjects = localStorage.getItem('analysis-projects-meta');
        if (savedProjects) {
            setProjects(JSON.parse(savedProjects));
        }
    }, []);

    // Save Projects on Change
    useEffect(() => {
        if (projects.length > 0) {
            localStorage.setItem('analysis-projects-meta', JSON.stringify(projects));
        }
    }, [projects]);

    const handleCreateProject = () => {
        if (!newProjectName.trim()) return;
        const newProject: Project = {
            id: uuidv4(),
            name: newProjectName,
            updatedAt: Date.now()
        };
        setProjects([newProject, ...projects]);
        setNewProjectName('');
        setActiveProjectId(newProject.id);
    };

    const handleDeleteProject = (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        if (confirm('Are you sure you want to delete this project?')) {
            const updatedProjects = projects.filter(p => p.id !== id);
            setProjects(updatedProjects);
            localStorage.removeItem(`analysis-flow-${id}`);
            if (updatedProjects.length === 0) {
                localStorage.removeItem('analysis-projects-meta');
            }
        }
    };

    const handleOpenProject = (id: string) => {
        // Update timestamp
        const updatedProjects = projects.map(p =>
            p.id === id ? { ...p, updatedAt: Date.now() } : p
        ).sort((a, b) => b.updatedAt - a.updatedAt);

        setProjects(updatedProjects);
        setActiveProjectId(id);
    };

    const filteredFrameworks = allFrameworks.filter(f => {
        const matchesSearch = f.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'all' ||
            (selectedCategory === 'general' && generalFrameworks.some(gf => gf.id === f.id)) ||
            (selectedCategory === 'case' && caseFrameworks.some(cf => cf.id === f.id));
        return matchesSearch && matchesCategory;
    });

    const onDragStart = (event: React.DragEvent, frameworkId: string) => {
        event.dataTransfer.setData('application/reactflow/type', 'frameworkNode');
        event.dataTransfer.setData('application/reactflow/frameworkId', frameworkId);
        event.dataTransfer.effectAllowed = 'move';
    };

    // If NO project is active, show the Dashboard
    if (!activeProjectId) {
        return (
            <div className="w-full h-full bg-zinc-950 flex flex-col items-center justify-center p-8 overflow-auto font-sans">
                <div className="w-full max-w-4xl">
                    <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">Case Projects</h1>
                    <p className="text-zinc-400 mb-12">Manage your analysis boards and workspaces.</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        {/* Create New Panel */}
                        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 flex flex-col shadow-xl">
                            <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center mb-6">
                                <Plus className="text-emerald-500" size={24} />
                            </div>
                            <h2 className="text-xl font-bold text-white mb-2">Create New Project</h2>
                            <p className="text-zinc-500 text-sm mb-6">Start a fresh analysis board for a new case.</p>

                            <div className="mt-auto space-y-3">
                                <input
                                    type="text"
                                    value={newProjectName}
                                    onChange={(e) => setNewProjectName(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleCreateProject()}
                                    placeholder="Project Name (e.g. Apple Market Entry)"
                                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-3 text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-emerald-500 transition-colors"
                                />
                                <button
                                    onClick={handleCreateProject}
                                    disabled={!newProjectName.trim()}
                                    className="w-full bg-emerald-600 hover:bg-emerald-500 disabled:bg-zinc-800 disabled:text-zinc-600 text-white font-medium py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
                                >
                                    Create Project <ArrowRight size={16} />
                                </button>
                            </div>
                        </div>

                        {/* Recent Projects List */}
                        <div className="flex flex-col">
                            <h2 className="text-lg font-bold text-zinc-300 mb-4 flex items-center gap-2">
                                <Clock size={16} /> Recent Projects
                            </h2>
                            <div className="space-y-3 flex-1 overflow-y-auto max-h-[500px] pr-2 custom-scrollbar">
                                {projects.length === 0 ? (
                                    <div className="text-zinc-600 italic text-sm py-4">No projects yet. Create one to get started.</div>
                                ) : (
                                    projects.map(project => (
                                        <div
                                            key={project.id}
                                            onClick={() => handleOpenProject(project.id)}
                                            className="group bg-zinc-900/50 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 rounded-xl p-4 cursor-pointer transition-all flex items-center justify-between"
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 bg-zinc-800 rounded-lg flex items-center justify-center text-zinc-400 group-hover:text-emerald-400 transition-colors">
                                                    <FolderOpen size={18} />
                                                </div>
                                                <div>
                                                    <h3 className="font-bold text-zinc-200 group-hover:text-white transition-colors">{project.name}</h3>
                                                    <span className="text-xs text-zinc-500">
                                                        Edited {new Date(project.updatedAt).toLocaleDateString()}
                                                    </span>
                                                </div>
                                            </div>
                                            <button
                                                onClick={(e) => handleDeleteProject(project.id, e)}
                                                className="p-2 text-zinc-600 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                                                title="Delete Project"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Default View (when project is active)
    return (
        <div className="flex h-full w-full bg-zinc-950 overflow-hidden relative">
            {/* Framework Palette Sidebar - Only visible when project active */}
            <div
                className={`
                    flex flex-col border-r border-zinc-800 bg-zinc-900 transition-all duration-300 ease-in-out shrink-0
                    ${isSidebarOpen ? 'w-80 opacity-100' : 'w-0 opacity-0 overflow-hidden'}
                `}
            >
                <div className="p-4 border-b border-zinc-800 shrink-0">
                    <div className="flex items-center gap-2 text-zinc-100 font-semibold mb-4">
                        <Layers className="text-emerald-500" size={20} />
                        <h2>Frameworks</h2>
                    </div>

                    {/* Search */}
                    <div className="relative mb-3">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={14} />
                        <input
                            type="text"
                            placeholder="Search models..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-9 pr-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-sm text-zinc-200 focus:outline-none focus:border-emerald-500 transition-colors"
                        />
                    </div>

                    {/* Filters */}
                    <div className="flex gap-1 p-1 bg-zinc-800 rounded-lg">
                        {(['all', 'general', 'case'] as const).map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`
                                    flex-1 py-1 text-xs font-medium rounded-md transition-all
                                    ${selectedCategory === cat
                                        ? 'bg-zinc-700 text-emerald-400 shadow-sm'
                                        : 'text-zinc-400 hover:text-zinc-200'}
                                `}
                            >
                                {cat.charAt(0).toUpperCase() + cat.slice(1)}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto p-3 space-y-2 custom-scrollbar">
                    {filteredFrameworks.map((framework) => (
                        <div
                            key={framework.id}
                            draggable
                            onDragStart={(e) => onDragStart(e, framework.id)}
                            className="bg-zinc-800/50 hover:bg-zinc-800 border border-zinc-800 hover:border-emerald-500/50 p-3 rounded-xl cursor-grab active:cursor-grabbing transition-all group"
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-zinc-900 flex items-center justify-center text-emerald-500 group-hover:scale-110 transition-transform">
                                    <LayoutGrid size={16} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h4 className="text-zinc-200 text-sm font-medium truncate">{framework.name}</h4>
                                    <p className="text-zinc-500 text-xs truncate">Drag to add</p>
                                </div>
                            </div>
                        </div>
                    ))}
                    {filteredFrameworks.length === 0 && (
                        <div className="text-center py-8 text-zinc-500 text-xs">
                            No frameworks found.
                        </div>
                    )}
                </div>
            </div>

            {/* Sidebar Toggle Button - Positioning relative to main area */}
            <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className={`
                    absolute top-3 z-30 w-8 h-8 flex items-center justify-center 
                    bg-zinc-800 border border-zinc-700 rounded-lg shadow-lg text-zinc-400 hover:text-white hover:border-emerald-500 transition-all duration-300
                    ${isSidebarOpen ? 'left-[20.5rem]' : 'left-3'}
                `}
                title={isSidebarOpen ? "Collapse Sidebar" : "Expand Sidebar"}
            >
                {isSidebarOpen ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
            </button>

            {/* Main Canvas Area */}
            <div className="flex-1 relative h-full bg-zinc-950">
                <AnalysisBoard
                    frameworks={allFrameworks}
                    projectId={activeProjectId}
                    onBack={() => setActiveProjectId(null)}
                />

                {/* Overlay Title - Centered at top, strictly visual */}
                <div className="absolute top-4 left-1/2 -translate-x-1/2 pointer-events-none z-0 opacity-50 select-none">
                    <h1 className="text-zinc-800 font-black text-4xl tracking-tighter">
                        {projects.find(p => p.id === activeProjectId)?.name || 'PROJECT'}
                    </h1>
                </div>
            </div>
        </div>
    );
}
