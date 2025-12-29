import { useState, useEffect } from 'react';
import AppLayout from './components/Layout/AppLayout';
import FrameworkLibrary from './components/Frameworks/FrameworkLibrary';
import AnalysisTab from './components/Analysis/AnalysisTab';
import SettingsTab from './components/Settings/SettingsTab';
// import NotesPanel from './components/Notes/NotesPanel';
// import CaseUpload from './components/CaseUpload/CaseUpload';
// import CaseHistory from './components/CaseHistory/CaseHistory';
import AuthPage from './components/Auth/AuthPage';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { generalFrameworks } from './data/generalFrameworks';
import { caseFrameworks } from './data/caseFrameworks';

// import ReferenceTab from './components/Frameworks/ReferenceTab'; // Add thisimport near top
import ReferenceTab from './components/Frameworks/ReferenceTab';

function AppContent() {
    const { user, loading, isGuest } = useAuth();
    // Using 'frameworks' as default tab to match original flow
    const [activeTab, setActiveTab] = useState<'frameworks' | 'analysis' | 'notes' | 'history' | 'upload' | 'settings'>('frameworks');
    const [sharedProjectId, setSharedProjectId] = useState<string | null>(null);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const shareId = params.get('share');
        if (shareId) {
            setSharedProjectId(shareId);
            setActiveTab('analysis');
        }
    }, []);

    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center bg-canvas text-primary">
                <div className="animate-pulse">Loading Nexus Strat...</div>
            </div>
        );
    }

    if (!user && !isGuest) {
        return <AuthPage />;
    }

    return (
        <AppLayout activeTab={activeTab} onTabChange={setActiveTab}>
            {activeTab === 'frameworks' && (
                <ReferenceTab
                    frameworks={[...generalFrameworks, ...caseFrameworks]}
                />
            )}
            {activeTab === 'analysis' && <AnalysisTab initialProjectId={sharedProjectId} />}
            {activeTab === 'settings' && <SettingsTab />}
            {/* 
                Temporary placeholders for other tabs to prevent TS errors until fully implemented 
                {activeTab === 'notes' && <NotesPanel caseId="default" notes={[]} onAddNote={() => {}} onClose={() => {}} />}
                {activeTab === 'history' && <CaseHistory cases={[]} analyses={[]} onLoadAnalysis={() => {}} onDeleteCase={() => {}} />}
                {activeTab === 'upload' && <CaseUpload onCaseAdded={() => {}} />}
            */}
            {activeTab === 'notes' && <div className="p-8 text-center text-muted">Notes Module Coming Soon</div>}
            {activeTab === 'history' && <div className="p-8 text-center text-muted">History Module Coming Soon</div>}
            {activeTab === 'upload' && <div className="p-8 text-center text-muted">Upload Module Coming Soon</div>}
        </AppLayout>
    );
}

function App() {
    return (
        <AuthProvider>
            <ThemeProvider>
                <AppContent />
            </ThemeProvider>
        </AuthProvider>
    );
}

export default App;
