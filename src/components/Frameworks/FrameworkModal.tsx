import { Framework } from '../../types';
import FrameworkDiagram from './FrameworkDiagram';

interface FrameworkModalProps {
    framework: Framework;
    onClose: () => void;
}

function FrameworkModal({ framework, onClose }: FrameworkModalProps) {
    return (
        <div
            style={{
                position: 'fixed',
                inset: 0,
                background: 'rgba(0, 0, 0, 0.8)',
                backdropFilter: 'blur(4px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 1000,
                padding: 'var(--space-lg)'
            }}
            onClick={onClose}
        >
            <div
                style={{
                    background: 'var(--color-bg-secondary)',
                    borderRadius: 'var(--radius-xl)',
                    maxWidth: '900px',
                    width: '100%',
                    maxHeight: '90vh',
                    overflow: 'auto',
                    border: '1px solid var(--color-border)'
                }}
                onClick={e => e.stopPropagation()}
            >
                {/* Header */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    padding: 'var(--space-xl)',
                    borderBottom: '1px solid var(--color-border)'
                }}>
                    <div>
                        <div style={{
                            fontSize: 'var(--text-xs)',
                            color: 'var(--color-text-tertiary)',
                            textTransform: 'uppercase',
                            letterSpacing: '1px',
                            marginBottom: 'var(--space-xs)'
                        }}>
                            {framework.category === 'general' ? 'General Framework' : 'Case-Specific Framework'}
                        </div>
                        <h2 style={{
                            fontSize: 'var(--text-2xl)',
                            fontWeight: 600,
                            marginBottom: 'var(--space-sm)'
                        }}>
                            {framework.name}
                        </h2>
                        <p style={{
                            color: 'var(--color-text-secondary)',
                            lineHeight: 1.6,
                            maxWidth: '600px'
                        }}>
                            {framework.description}
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        style={{
                            background: 'var(--color-surface)',
                            border: '1px solid var(--color-border)',
                            borderRadius: 'var(--radius-full)',
                            width: '36px',
                            height: '36px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            color: 'var(--color-text-primary)',
                            fontSize: '16px',
                            flexShrink: 0
                        }}
                    >
                        ✕
                    </button>
                </div>

                {/* Visual Diagram */}
                <div style={{
                    padding: 'var(--space-xl)',
                    background: 'var(--color-bg-tertiary)'
                }}>
                    <FrameworkDiagram
                        framework={framework}
                        content={{}}
                        showLabels={true}
                    />
                </div>

                {/* When to Use */}
                {framework.useCase && (
                    <div style={{
                        padding: 'var(--space-xl)',
                        borderBottom: '1px solid var(--color-border)'
                    }}>
                        <h3 style={{
                            fontSize: 'var(--text-sm)',
                            fontWeight: 600,
                            marginBottom: 'var(--space-md)',
                            color: 'var(--color-text-tertiary)',
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px'
                        }}>
                            When to Use
                        </h3>
                        <p style={{
                            color: 'var(--color-text-secondary)',
                            lineHeight: 1.6
                        }}>
                            {framework.useCase}
                        </p>
                    </div>
                )}

                {/* Sections */}
                <div style={{ padding: 'var(--space-xl)' }}>
                    <h3 style={{
                        fontSize: 'var(--text-sm)',
                        fontWeight: 600,
                        marginBottom: 'var(--space-lg)',
                        color: 'var(--color-text-tertiary)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px'
                    }}>
                        Sections & Key Questions
                    </h3>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                        gap: 'var(--space-md)'
                    }}>
                        {framework.sections.map(section => (
                            <div
                                key={section.id}
                                style={{
                                    background: 'var(--color-surface)',
                                    border: '1px solid var(--color-border)',
                                    borderRadius: 'var(--radius-md)',
                                    padding: 'var(--space-md)'
                                }}
                            >
                                <h4 style={{
                                    fontWeight: 600,
                                    marginBottom: 'var(--space-xs)',
                                    fontSize: 'var(--text-base)'
                                }}>
                                    {section.name}
                                </h4>
                                <p style={{
                                    color: 'var(--color-text-tertiary)',
                                    fontSize: 'var(--text-sm)',
                                    marginBottom: 'var(--space-sm)',
                                    lineHeight: 1.5
                                }}>
                                    {section.description}
                                </p>

                                {section.questions && section.questions.length > 0 && (
                                    <div style={{ marginTop: 'var(--space-sm)' }}>
                                        <div style={{
                                            fontSize: 'var(--text-xs)',
                                            color: 'var(--color-text-muted)',
                                            marginBottom: 'var(--space-xs)'
                                        }}>
                                            Key Questions:
                                        </div>
                                        <ul style={{
                                            margin: 0,
                                            paddingLeft: 'var(--space-md)',
                                            fontSize: 'var(--text-xs)',
                                            color: 'var(--color-text-secondary)'
                                        }}>
                                            {section.questions.slice(0, 3).map((q, i) => (
                                                <li key={i} style={{ marginBottom: '2px' }}>{q}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FrameworkModal;
