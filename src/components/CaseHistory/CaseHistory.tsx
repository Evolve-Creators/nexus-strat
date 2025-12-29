import { CaseStudy, Analysis } from '../../types';

interface CaseHistoryProps {
    cases: CaseStudy[];
    analyses: Analysis[];
    onLoadAnalysis: (analysisId: string) => void;
    onDeleteCase: (caseId: string) => void;
}

function CaseHistory({ cases, analyses, onLoadAnalysis, onDeleteCase }: CaseHistoryProps) {
    const getAnalysesForCase = (caseId: string) => {
        return analyses.filter(a => a.caseId === caseId);
    };

    const formatDate = (date: Date) => {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    if (cases.length === 0) {
        return (
            <div className="empty-state" style={{ height: '60vh' }}>
                <div className="empty-state-icon">📁</div>
                <h3>No Cases Yet</h3>
                <p className="text-muted" style={{ maxWidth: '300px' }}>
                    Upload your first case study to start building your analysis library
                </p>
            </div>
        );
    }

    return (
        <div>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: 'var(--space-lg)'
            }}>
                <div>
                    <span style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-tertiary)' }}>
                        {cases.length} case{cases.length !== 1 ? 's' : ''} • {analyses.length} analysis{analyses.length !== 1 ? 'es' : ''}
                    </span>
                </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
                {cases.map(caseStudy => {
                    const caseAnalyses = getAnalysesForCase(caseStudy.id);

                    return (
                        <div
                            key={caseStudy.id}
                            className="card"
                            style={{ padding: 'var(--space-lg)' }}
                        >
                            <div style={{
                                display: 'flex',
                                alignItems: 'flex-start',
                                justifyContent: 'space-between',
                                marginBottom: 'var(--space-md)'
                            }}>
                                <div>
                                    <h4 style={{ marginBottom: 'var(--space-xs)' }}>{caseStudy.title}</h4>
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 'var(--space-sm)',
                                        fontSize: 'var(--text-sm)',
                                        color: 'var(--color-text-tertiary)'
                                    }}>
                                        <span className="badge">{caseStudy.sourceType.toUpperCase()}</span>
                                        <span>•</span>
                                        <span>{formatDate(caseStudy.createdAt)}</span>
                                    </div>
                                </div>
                                <button
                                    className="btn btn-ghost"
                                    onClick={() => {
                                        if (confirm('Delete this case and all its analyses?')) {
                                            onDeleteCase(caseStudy.id);
                                        }
                                    }}
                                    style={{ color: 'var(--color-text-tertiary)' }}
                                >
                                    🗑️
                                </button>
                            </div>

                            {/* Analyses for this case */}
                            {caseAnalyses.length > 0 ? (
                                <div style={{
                                    borderTop: '1px solid var(--color-border)',
                                    paddingTop: 'var(--space-md)'
                                }}>
                                    <div style={{
                                        fontSize: 'var(--text-xs)',
                                        color: 'var(--color-text-tertiary)',
                                        marginBottom: 'var(--space-sm)'
                                    }}>
                                        ANALYSES ({caseAnalyses.length})
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
                                        {caseAnalyses.map(analysis => (
                                            <div
                                                key={analysis.id}
                                                onClick={() => onLoadAnalysis(analysis.id)}
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'space-between',
                                                    padding: 'var(--space-sm) var(--space-md)',
                                                    background: 'var(--color-surface)',
                                                    borderRadius: 'var(--radius-md)',
                                                    cursor: 'pointer',
                                                    transition: 'background var(--transition-fast)'
                                                }}
                                                onMouseOver={(e) => e.currentTarget.style.background = 'var(--color-surface-hover)'}
                                                onMouseOut={(e) => e.currentTarget.style.background = 'var(--color-surface)'}
                                            >
                                                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
                                                    <span style={{ fontSize: '14px' }}>📊</span>
                                                    <span style={{ fontSize: 'var(--text-sm)' }}>
                                                        {analysis.frameworkIds.length} framework{analysis.frameworkIds.length !== 1 ? 's' : ''}
                                                    </span>
                                                    <span style={{
                                                        fontSize: 'var(--text-xs)',
                                                        color: 'var(--color-text-tertiary)'
                                                    }}>
                                                        • {Object.values(analysis.sectionContent).flat().length} items mapped
                                                    </span>
                                                </div>
                                                <span style={{
                                                    fontSize: 'var(--text-xs)',
                                                    color: 'var(--color-text-tertiary)'
                                                }}>
                                                    {formatDate(analysis.updatedAt)}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                <div style={{
                                    fontSize: 'var(--text-sm)',
                                    color: 'var(--color-text-tertiary)',
                                    fontStyle: 'italic'
                                }}>
                                    No analyses yet
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default CaseHistory;
