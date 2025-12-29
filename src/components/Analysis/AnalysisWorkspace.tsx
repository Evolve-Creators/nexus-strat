import { useState, useCallback } from 'react';
import { CaseStudy, Analysis, Framework, Highlight, Note } from '../../types';
import SelectionMenu from './SelectionMenu';
import FrameworkDiagram from '../Frameworks/FrameworkDiagram';
import generalFrameworks from '../../data/generalFrameworks';
import caseFrameworks from '../../data/caseFrameworks';

interface AnalysisWorkspaceProps {
    caseStudy: CaseStudy;
    analysis: Analysis;
    frameworks: Framework[];
    onUpdateAnalysis: (analysis: Analysis) => void;
}

function AnalysisWorkspace({
    caseStudy,
    analysis,
    frameworks: _frameworks,
    onUpdateAnalysis
}: AnalysisWorkspaceProps) {
    const [activeFrameworkId, setActiveFrameworkId] = useState<string | null>(null);
    const [casePanelCollapsed, setCasePanelCollapsed] = useState(false);

    // Selection menu state
    const [selectionMenu, setSelectionMenu] = useState<{
        text: string;
        position: { x: number; y: number };
    } | null>(null);

    // Get frameworks that have content
    const getActiveFrameworks = () => {
        const allFrameworks = [...generalFrameworks, ...caseFrameworks];
        const activeIds = new Set<string>();

        Object.keys(analysis.sectionContent).forEach(sectionId => {
            if (analysis.sectionContent[sectionId]?.length > 0) {
                for (const f of allFrameworks) {
                    if (f.sections.some(s => s.id === sectionId)) {
                        activeIds.add(f.id);
                        break;
                    }
                }
            }
        });

        return allFrameworks.filter(f => activeIds.has(f.id));
    };

    const activeFrameworks = getActiveFrameworks();
    const activeFramework = activeFrameworkId
        ? [...generalFrameworks, ...caseFrameworks].find(f => f.id === activeFrameworkId)
        : activeFrameworks[0];

    // Handle text selection
    const handleTextSelect = useCallback(() => {
        const selection = window.getSelection();
        if (!selection || selection.isCollapsed || !selection.toString().trim()) {
            return;
        }

        const text = selection.toString().trim();
        const range = selection.getRangeAt(0);
        const rect = range.getBoundingClientRect();

        setSelectionMenu({
            text,
            position: { x: rect.left + rect.width / 2, y: rect.bottom + 10 }
        });
    }, []);

    // Handle comment
    const handleComment = useCallback((text: string) => {
        const note: Note = {
            id: crypto.randomUUID(),
            caseId: caseStudy.id,
            content: `Comment: "${text}"`,
            linkedText: text,
            fontStyle: 'sans',
            createdAt: new Date(),
            updatedAt: new Date()
        };

        onUpdateAnalysis({
            ...analysis,
            notes: [...analysis.notes, note]
        });
        setSelectionMenu(null);
        window.getSelection()?.removeAllRanges();
    }, [analysis, caseStudy.id, onUpdateAnalysis]);

    // Handle highlight
    const handleHighlight = useCallback((text: string, color: number) => {
        const highlight: Highlight = {
            id: crypto.randomUUID(),
            caseId: caseStudy.id,
            text,
            startOffset: 0,
            endOffset: text.length,
            color,
            createdAt: new Date()
        };

        onUpdateAnalysis({
            ...analysis,
            highlights: [...analysis.highlights, highlight]
        });
        setSelectionMenu(null);
        window.getSelection()?.removeAllRanges();
    }, [analysis, caseStudy.id, onUpdateAnalysis]);

    // Handle add to framework
    const handleAddToFramework = useCallback((text: string, frameworkId: string, sectionId: string) => {
        const highlight: Highlight = {
            id: crypto.randomUUID(),
            caseId: caseStudy.id,
            text,
            startOffset: 0,
            endOffset: text.length,
            frameworkId,
            sectionId,
            color: 1,
            createdAt: new Date()
        };

        const updatedSectionContent = { ...analysis.sectionContent };
        if (!updatedSectionContent[sectionId]) {
            updatedSectionContent[sectionId] = [];
        }
        updatedSectionContent[sectionId].push(text);

        onUpdateAnalysis({
            ...analysis,
            highlights: [...analysis.highlights, highlight],
            sectionContent: updatedSectionContent
        });

        // Switch to show this framework
        setActiveFrameworkId(frameworkId);
        setSelectionMenu(null);
        window.getSelection()?.removeAllRanges();
    }, [analysis, caseStudy.id, onUpdateAnalysis]);

    // Handle content change from interactive diagrams
    const handleContentChange = useCallback((sectionId: string, content: string[]) => {
        const updatedSectionContent = { ...analysis.sectionContent };
        updatedSectionContent[sectionId] = content;

        onUpdateAnalysis({
            ...analysis,
            sectionContent: updatedSectionContent
        });
    }, [analysis, onUpdateAnalysis]);



    return (
        <div style={{
            height: 'calc(100vh - 120px)',
            display: 'flex',
            gap: 'var(--space-md)',
            position: 'relative'
        }}>
            {/* Case Content Panel */}
            {!casePanelCollapsed && (
                <div style={{
                    width: '50%',
                    background: 'var(--color-surface)',
                    borderRadius: 'var(--radius-lg)',
                    border: '1px solid var(--color-border)',
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'hidden'
                }}>
                    {/* Panel Header */}
                    <div style={{
                        padding: 'var(--space-md)',
                        borderBottom: '1px solid var(--color-border)',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        <div>
                            <div style={{ fontWeight: 600, fontSize: 'var(--text-sm)' }}>
                                {caseStudy.title}
                            </div>
                            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-tertiary)' }}>
                                Select text to add to frameworks
                            </div>
                        </div>
                        <button
                            onClick={() => setCasePanelCollapsed(true)}
                            style={{
                                background: 'none',
                                border: 'none',
                                color: 'var(--color-text-tertiary)',
                                cursor: 'pointer',
                                padding: 'var(--space-xs)'
                            }}
                        >
                            ◀
                        </button>
                    </div>

                    {/* Content */}
                    <div
                        style={{
                            flex: 1,
                            overflow: 'auto',
                            padding: 'var(--space-lg)',
                            fontSize: 'var(--text-sm)',
                            lineHeight: 1.8,
                            whiteSpace: 'pre-wrap',
                            userSelect: 'text'
                        }}
                        onMouseUp={handleTextSelect}
                    >
                        {caseStudy.sourceType === 'image' && caseStudy.fileData ? (
                            <img
                                src={caseStudy.fileData}
                                alt={caseStudy.title}
                                style={{ maxWidth: '100%', borderRadius: 'var(--radius-md)' }}
                            />
                        ) : (
                            caseStudy.content || 'No content available'
                        )}
                    </div>
                </div>
            )}

            {/* Collapse Toggle */}
            {casePanelCollapsed && (
                <button
                    onClick={() => setCasePanelCollapsed(false)}
                    style={{
                        position: 'absolute',
                        left: 0,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        background: 'var(--color-surface)',
                        border: '1px solid var(--color-border)',
                        borderLeft: 'none',
                        borderRadius: '0 var(--radius-md) var(--radius-md) 0',
                        padding: 'var(--space-md) var(--space-xs)',
                        cursor: 'pointer',
                        color: 'var(--color-text-secondary)'
                    }}
                >
                    ▶
                </button>
            )}

            {/* Framework Panel */}
            <div style={{
                flex: 1,
                background: 'var(--color-surface)',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--color-border)',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden'
            }}>
                {/* Framework Tabs */}
                {activeFrameworks.length > 0 && (
                    <div style={{
                        padding: 'var(--space-sm) var(--space-md)',
                        borderBottom: '1px solid var(--color-border)',
                        display: 'flex',
                        gap: 'var(--space-xs)',
                        overflowX: 'auto'
                    }}>
                        {activeFrameworks.map(f => (
                            <button
                                key={f.id}
                                onClick={() => setActiveFrameworkId(f.id)}
                                style={{
                                    padding: 'var(--space-xs) var(--space-sm)',
                                    background: activeFramework?.id === f.id ? 'var(--color-surface-active)' : 'transparent',
                                    border: '1px solid',
                                    borderColor: activeFramework?.id === f.id ? 'var(--color-border-light)' : 'transparent',
                                    borderRadius: 'var(--radius-md)',
                                    color: activeFramework?.id === f.id ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
                                    fontSize: 'var(--text-xs)',
                                    cursor: 'pointer',
                                    whiteSpace: 'nowrap'
                                }}
                            >
                                {f.shortName || f.name}
                            </button>
                        ))}
                    </div>
                )}

                {/* Content Area */}
                <div style={{ flex: 1, overflow: 'auto', padding: 'var(--space-lg)' }}>
                    {activeFramework ? (
                        <div>
                            {/* Visual Diagram */}
                            <div style={{
                                background: 'var(--color-bg-tertiary)',
                                borderRadius: 'var(--radius-lg)',
                                padding: 'var(--space-xl)',
                                marginBottom: 'var(--space-lg)'
                            }}>
                                <FrameworkDiagram
                                    framework={activeFramework}
                                    content={analysis.sectionContent}
                                    interactive={true}
                                    showLabels={true}
                                    onContentChange={handleContentChange}
                                />
                            </div>

                            {/* Sections with Content */}
                            {/* Sections with Content - REMOVED (Content is now inside diagram) */}
                        </div>
                    ) : (
                        <div style={{
                            textAlign: 'center',
                            padding: 'var(--space-2xl)',
                            color: 'var(--color-text-tertiary)'
                        }}>
                            <div style={{ fontSize: '48px', marginBottom: 'var(--space-md)' }}>📊</div>
                            <h4 style={{ marginBottom: 'var(--space-sm)' }}>No Content Yet</h4>
                            <p style={{ fontSize: 'var(--text-sm)' }}>
                                Select text from the case study and add it to a framework section
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {/* Selection Context Menu */}
            {selectionMenu && (
                <SelectionMenu
                    text={selectionMenu.text}
                    position={selectionMenu.position}
                    generalFrameworks={generalFrameworks}
                    caseFrameworks={caseFrameworks}
                    onComment={handleComment}
                    onHighlight={handleHighlight}
                    onAddToFramework={handleAddToFramework}
                    onClose={() => setSelectionMenu(null)}
                />
            )}
        </div>
    );
}

export default AnalysisWorkspace;
