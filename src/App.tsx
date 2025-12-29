import { useState } from 'react';
import AppLayout from './components/Layout/AppLayout';
import FrameworkLibrary from './components/Frameworks/FrameworkLibrary';
import AnalysisTab from './components/Analysis/AnalysisTab';
import NotesPanel from './components/Notes/NotesPanel';
import CaseUpload from './components/CaseUpload/CaseUpload';
import CaseHistory from './components/CaseHistory/CaseHistory';
import AuthPage from './components/Auth/AuthPage';
import { AuthProvider, useAuth } from './context/AuthContext';

function AppContent() {
    const { user, loading } = useAuth();
    // Using 'frameworks' as default tab to match original flow
    const [activeTab, setActiveTab] = useState<'frameworks' | 'analysis' | 'notes' | 'history' | 'upload'>('frameworks');

    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center bg-canvas text-primary">
                <div className="animate-pulse">Loading Nexus Strat...</div>
            </div>
        );
    }

    if (!user) {
        return <AuthPage />;
    }

    return (
        <AppLayout activeTab={activeTab} onTabChange={setActiveTab}>
            {activeTab === 'frameworks' && <FrameworkLibrary />}
            {activeTab === 'analysis' && <AnalysisTab />}
            {activeTab === 'notes' && <NotesPanel />}
            {activeTab === 'history' && <CaseHistory />}
            {activeTab === 'upload' && <CaseUpload />}
        </AppLayout>
    );
}

function App() {
    return (
        <AuthProvider>
            <AppContent />
        </AuthProvider>
    );
}

export default App;
