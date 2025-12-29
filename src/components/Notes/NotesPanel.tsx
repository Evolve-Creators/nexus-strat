import { useState } from 'react';
import { Note } from '../../types';

interface NotesPanelProps {
    caseId: string;
    notes: Note[];
    onAddNote: (note: Note) => void;
    onClose: () => void;
}

type FontStyle = 'sans' | 'serif' | 'mono';

function NotesPanel({ caseId, notes, onAddNote, onClose }: NotesPanelProps) {
    const [newNote, setNewNote] = useState('');
    const [fontStyle, setFontStyle] = useState<FontStyle>('sans');

    const handleAddNote = () => {
        if (!newNote.trim()) return;

        const note: Note = {
            id: crypto.randomUUID(),
            caseId,
            content: newNote.trim(),
            fontStyle,
            createdAt: new Date(),
            updatedAt: new Date()
        };

        onAddNote(note);
        setNewNote('');
    };

    const getFontClass = (style: FontStyle) => {
        switch (style) {
            case 'sans': return 'note-font-sans';
            case 'serif': return 'note-font-serif';
            case 'mono': return 'note-font-mono';
        }
    };

    return (
        <div
            className="panel"
            style={{
                width: '320px',
                flexShrink: 0,
                position: 'relative'
            }}
        >
            <div className="panel-header">
                <h4>📝 Notes</h4>
                <button
                    className="btn btn-ghost btn-icon"
                    onClick={onClose}
                    style={{ fontSize: '16px' }}
                >
                    ✕
                </button>
            </div>

            <div className="panel-content" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
                {/* New Note Input */}
                <div style={{
                    background: 'var(--color-bg-tertiary)',
                    borderRadius: 'var(--radius-md)',
                    padding: 'var(--space-md)',
                    border: '1px solid var(--color-border)'
                }}>
                    {/* Font Style Selector */}
                    <div style={{
                        display: 'flex',
                        gap: 'var(--space-xs)',
                        marginBottom: 'var(--space-sm)'
                    }}>
                        {(['sans', 'serif', 'mono'] as FontStyle[]).map(style => (
                            <button
                                key={style}
                                onClick={() => setFontStyle(style)}
                                className={getFontClass(style)}
                                style={{
                                    padding: 'var(--space-xs) var(--space-sm)',
                                    background: fontStyle === style ? 'var(--color-surface-active)' : 'transparent',
                                    border: '1px solid ' + (fontStyle === style ? 'var(--color-border-light)' : 'transparent'),
                                    borderRadius: 'var(--radius-sm)',
                                    color: fontStyle === style ? 'var(--color-text-primary)' : 'var(--color-text-tertiary)',
                                    cursor: 'pointer',
                                    fontSize: 'var(--text-xs)',
                                    textTransform: 'capitalize'
                                }}
                            >
                                {style}
                            </button>
                        ))}
                    </div>

                    <textarea
                        className={`input ${getFontClass(fontStyle)}`}
                        placeholder="Add a note..."
                        rows={4}
                        value={newNote}
                        onChange={(e) => setNewNote(e.target.value)}
                        style={{
                            resize: 'none',
                            marginBottom: 'var(--space-sm)'
                        }}
                    />

                    <button
                        className="btn btn-primary w-full"
                        onClick={handleAddNote}
                        disabled={!newNote.trim()}
                        style={{ opacity: newNote.trim() ? 1 : 0.5 }}
                    >
                        Add Note
                    </button>
                </div>

                {/* Notes List */}
                <div style={{ flex: 1, overflow: 'auto' }}>
                    {notes.length === 0 ? (
                        <div style={{
                            textAlign: 'center',
                            padding: 'var(--space-xl)',
                            color: 'var(--color-text-tertiary)',
                            fontSize: 'var(--text-sm)'
                        }}>
                            No notes yet. Start adding your observations!
                        </div>
                    ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
                            {notes.map(note => (
                                <div
                                    key={note.id}
                                    className={getFontClass(note.fontStyle)}
                                    style={{
                                        padding: 'var(--space-md)',
                                        background: 'var(--color-surface)',
                                        borderRadius: 'var(--radius-md)',
                                        border: '1px solid var(--color-border)',
                                        fontSize: 'var(--text-sm)',
                                        lineHeight: 1.6
                                    }}
                                >
                                    <p style={{ whiteSpace: 'pre-wrap' }}>{note.content}</p>
                                    <div style={{
                                        fontSize: 'var(--text-xs)',
                                        color: 'var(--color-text-muted)',
                                        marginTop: 'var(--space-sm)'
                                    }}>
                                        {new Date(note.createdAt).toLocaleString()}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default NotesPanel;
