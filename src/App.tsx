import React, { useState } from 'react';
import AppLayout from './components/Layout/AppLayout';
import ReferenceTab from './components/Frameworks/ReferenceTab';
import AnalysisTab from './components/Analysis/AnalysisTab';
import { generalFrameworks } from './data/generalFrameworks';
import { caseFrameworks } from './data/caseFrameworks';

const allFrameworks = [...caseFrameworks, ...generalFrameworks];

function App() {
    const [currentView, setCurrentView] = useState<'reference' | 'analysis'>('reference');

    return (
        <AppLayout currentView={currentView} onViewChange={setCurrentView}>
            {currentView === 'reference' ? (
                <ReferenceTab
                    frameworks={allFrameworks}
                />
            ) : (
                <AnalysisTab />
            )}
        </AppLayout>
    );
}

export default App;
