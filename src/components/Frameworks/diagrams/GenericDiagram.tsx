import { Framework } from '../../../types';
import InteractiveNode from '../InteractiveNode';

interface GenericDiagramProps {
    framework: Framework;
    content: Record<string, string[]>;
    interactive?: boolean;
    showLabels?: boolean;
    showDescriptions?: boolean;
    onSectionClick?: (sectionId: string) => void;
    onContentChange?: (sectionId: string, content: string[]) => void;
}

function GenericDiagram({
    framework,
    content,
    interactive = false,
    showLabels = true,
    showDescriptions = true,
    onSectionClick,
    onContentChange
}: GenericDiagramProps) {
    // Color palette for sections
    const colors = [
        '#ef4444', '#f59e0b', '#22c55e', '#3b82f6',
        '#8b5cf6', '#ec4899', '#14b8a6', '#f97316'
    ];

    return (
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            {/* Framework Title */}
            {showLabels && (
                <div style={{
                    textAlign: 'center',
                    marginBottom: 'var(--space-lg)'
                }}>
                    <h4 style={{
                        fontSize: 'var(--text-base)',
                        fontWeight: 600,
                        color: 'var(--color-text-primary)'
                    }}>
                        {framework.name}
                    </h4>
                    <p style={{
                        fontSize: 'var(--text-xs)',
                        color: 'var(--color-text-tertiary)',
                        marginTop: 'var(--space-xs)'
                    }}>
                        {framework.description}
                    </p>
                </div>
            )}

            {/* Sections Grid */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: framework.sections.length <= 4
                    ? 'repeat(2, 1fr)'
                    : 'repeat(3, 1fr)',
                gap: 'var(--space-md)'
            }}>
                {framework.sections.map((section, index) => {
                    const color = colors[index % colors.length];

                    return (
                        <div
                            key={section.id}
                            onClick={() => {
                                if (!interactive && onSectionClick) onSectionClick(section.id);
                            }}
                            style={{
                                background: `linear-gradient(135deg, ${color}15 0%, ${color}05 100%)`,
                                border: `1px solid ${color}15`,
                                borderRadius: 'var(--radius-lg)',
                                padding: 'var(--space-md)',
                                cursor: interactive ? 'default' : 'default', // Interactive handled by children inputs
                                transition: 'all var(--transition-fast)',
                                minHeight: '100px'
                            }}
                            onMouseOver={(e) => {
                                if (interactive) {
                                    e.currentTarget.style.borderColor = color;
                                    e.currentTarget.style.transform = 'translateY(-2px)';
                                }
                            }}
                            onMouseOut={(e) => {
                                if (interactive) {
                                    e.currentTarget.style.borderColor = `${color}15`;
                                    e.currentTarget.style.transform = 'translateY(0)';
                                }
                            }}
                        >
                            {/* Section Header */}
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 'var(--space-xs)',
                                marginBottom: 'var(--space-sm)'
                            }}>
                                <div style={{
                                    width: '8px',
                                    height: '8px',
                                    borderRadius: 'var(--radius-full)',
                                    background: color
                                }} />
                                <span style={{
                                    fontWeight: 600,
                                    color: color,
                                    fontSize: 'var(--text-sm)',
                                    cursor: interactive ? 'pointer' : 'default'
                                }}
                                    onClick={() => interactive && onSectionClick?.(section.id)}
                                >
                                    {section.name}
                                </span>
                            </div>

                            {/* Section Description */}
                            {showLabels && showDescriptions && section.description && (
                                <p style={{
                                    fontSize: 'var(--text-xs)',
                                    color: 'var(--color-text-tertiary)',
                                    marginBottom: 'var(--space-sm)',
                                    lineHeight: 1.4
                                }}>
                                    {section.description.slice(0, 80)}
                                    {section.description.length > 80 ? '...' : ''}
                                </p>
                            )}

                            {/* Content (Directly under section if no children) */}
                            {(!section.children || section.children.length === 0) && (
                                <div style={{
                                    fontSize: 'var(--text-xs)',
                                    color: 'var(--color-text-secondary)'
                                }}>
                                    <InteractiveNode
                                        id={section.id}
                                        initialContent={content[section.id] || []}
                                        onUpdate={(c) => onContentChange?.(section.id, c)}
                                        isInteractive={interactive}
                                        placeholder="Add notes..."
                                    />
                                </div>
                            )}

                            {/* Children sections (Sub-frameworks or breakdown) */}
                            {section.children && section.children.length > 0 && (
                                <div style={{
                                    marginTop: 'var(--space-sm)',
                                    paddingTop: 'var(--space-sm)',
                                    borderTop: `1px solid ${color}20`
                                }}>
                                    {section.children.map(child => (
                                        <div
                                            key={child.id}
                                            style={{
                                                fontSize: 'var(--text-xs)',
                                                color: 'var(--color-text-secondary)',
                                                padding: '4px 0',
                                                marginBottom: 'var(--space-xs)'
                                            }}
                                        >
                                            <div
                                                style={{
                                                    fontWeight: 600,
                                                    marginBottom: '2px',
                                                    color: color,
                                                    cursor: interactive ? 'pointer' : 'default',
                                                    fontSize: '11px'
                                                }}
                                                onClick={() => interactive && onSectionClick?.(child.id)}
                                            >
                                                ↳ {child.name}
                                            </div>
                                            <div style={{ marginLeft: '12px' }}>
                                                <InteractiveNode
                                                    id={child.id}
                                                    initialContent={content[child.id] || []}
                                                    onUpdate={(c) => onContentChange?.(child.id, c)}
                                                    isInteractive={interactive}
                                                    placeholder="..."
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default GenericDiagram;
