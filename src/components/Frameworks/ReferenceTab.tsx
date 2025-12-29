import { useState } from 'react';
import { Framework } from '../../types';
import FrameworkLibrary from './FrameworkLibrary';
import FrameworkDetailView from './FrameworkDetailView';

export default function ReferenceTab({
    frameworks
}: {
    frameworks: Framework[]
}) {
    const [selectedId, setSelectedId] = useState<string | null>(null);

    const selectedFramework = frameworks.find(f => f.id === selectedId);

    if (selectedFramework) {
        return (
            <FrameworkDetailView
                framework={selectedFramework}
                onBack={() => setSelectedId(null)}
            />
        );
    }

    return (
        <div className="p-6">
            <div className="max-w-7xl mx-auto">
                <FrameworkLibrary
                    frameworks={frameworks}
                    onSelectFramework={setSelectedId}
                />
            </div>
        </div>
    );
}
