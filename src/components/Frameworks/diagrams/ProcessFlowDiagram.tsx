import { Framework } from '../../../types';
import InteractiveNode from '../InteractiveNode';

interface ProcessFlowDiagramProps {
    framework: Framework;
    content: Record<string, string[]>;
    interactive?: boolean;
    showLabels?: boolean;
    showDescriptions?: boolean;
    onSectionClick?: (sectionId: string) => void;
    onContentChange?: (sectionId: string, content: string[]) => void;
}

export default function ProcessFlowDiagram({
    framework,
    content,
    interactive = false,
    onContentChange
}: ProcessFlowDiagramProps) {
    // Horizontal Chevron Process Flow

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            width: '100%',
            overflowX: 'auto',
            padding: '10px'
        }}>
            <div style={{ display: 'flex', gap: '10px', minWidth: 'min-content' }}>
                {framework.sections.map((section, index) => (
                    <div key={section.id} style={{
                        flex: 1,
                        minWidth: '220px',
                        display: 'flex',
                        flexDirection: 'column'
                    }}>
                        {/* Chevron Header */}
                        <div style={{
                            background: '#3b82f6',
                            color: 'white',
                            padding: '10px 20px',
                            clipPath: 'polygon(0% 0%, 90% 0%, 100% 50%, 90% 100%, 0% 100%, 10% 50%)', // Chevron shape
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: 'bold',
                            fontSize: '14px',
                            marginBottom: '10px',
                            marginLeft: index === 0 ? '0' : '-15px', // Overlap
                            zIndex: 10 - index,
                            position: 'relative'
                        }}>
                            {section.name}
                        </div>

                        {/* Content Area */}
                        <div style={{
                            border: '1px solid var(--color-border)',
                            borderRadius: '8px',
                            padding: '10px',
                            background: 'var(--color-surface)',
                            flex: 1
                        }}>
                            {/* Children Sub-process */}
                            {section.children && section.children.length > 0 ? (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                    {section.children.map(child => (
                                        <div key={child.id} style={{
                                            border: '1px dashed var(--color-border)',
                                            padding: '8px',
                                            borderRadius: '4px',
                                            background: 'var(--color-bg-secondary)'
                                        }}>
                                            <div style={{ fontSize: '11px', fontWeight: 600, marginBottom: '4px', color: 'var(--color-text-secondary)' }}>{child.name}</div>
                                            <InteractiveNode
                                                id={child.id}
                                                initialContent={content[child.id] || []}
                                                onUpdate={(c) => onContentChange?.(child.id, c)}
                                                isInteractive={interactive}
                                                style={{ fontSize: '11px' }}
                                            />
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <InteractiveNode
                                    id={section.id}
                                    initialContent={content[section.id] || []}
                                    onUpdate={(c) => onContentChange?.(section.id, c)}
                                    isInteractive={interactive}
                                />
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
