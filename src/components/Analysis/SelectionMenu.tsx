import { useState, useEffect, useRef } from 'react';
import { Framework } from '../../types';

interface SelectionMenuProps {
    text: string;
    position: { x: number; y: number };
    generalFrameworks: Framework[];
    caseFrameworks: Framework[];
    onComment: (text: string) => void;
    onHighlight: (text: string, color: number) => void;
    onAddToFramework: (text: string, frameworkId: string, sectionId: string) => void;
    onClose: () => void;
}

type MenuLevel = 'main' | 'highlight' | 'framework-type' | 'framework-list' | 'section-list';

const HIGHLIGHT_COLORS = [
    { id: 1, name: 'Yellow', color: '#fef08a' },
    { id: 2, name: 'Green', color: '#86efac' },
    { id: 3, name: 'Blue', color: '#93c5fd' },
    { id: 4, name: 'Pink', color: '#f9a8d4' },
    { id: 5, name: 'Orange', color: '#fed7aa' },
];

function SelectionMenu({
    text,
    position,
    generalFrameworks,
    caseFrameworks,
    onComment,
    onHighlight,
    onAddToFramework,
    onClose
}: SelectionMenuProps) {
    const menuRef = useRef<HTMLDivElement>(null);
    const [menuLevel, setMenuLevel] = useState<MenuLevel>('main');
    const [selectedType, setSelectedType] = useState<'general' | 'case' | null>(null);
    const [selectedFramework, setSelectedFramework] = useState<Framework | null>(null);
    const [menuPosition, setMenuPosition] = useState(position);

    // Adjust menu position to stay in viewport
    useEffect(() => {
        if (!menuRef.current) return;

        const rect = menuRef.current.getBoundingClientRect();
        const newPosition = { ...position };

        // Adjust if off right edge
        if (position.x + rect.width > window.innerWidth) {
            newPosition.x = window.innerWidth - rect.width - 10;
        }

        // Adjust if off bottom
        if (position.y + rect.height > window.innerHeight) {
            newPosition.y = position.y - rect.height - 10;
        }

        // Adjust if off top
        if (newPosition.y < 10) {
            newPosition.y = 10;
        }

        setMenuPosition(newPosition);
    }, [position, menuLevel]);

    // Close on click outside
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                onClose();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [onClose]);

    const renderMenuItem = (
        icon: string,
        label: string,
        onClick: () => void,
        hasSubmenu = false
    ) => (
        <button
            onClick={onClick}
            style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-sm)',
                width: '100%',
                padding: 'var(--space-sm) var(--space-md)',
                background: 'transparent',
                border: 'none',
                color: 'var(--color-text-primary)',
                fontSize: 'var(--text-sm)',
                cursor: 'pointer',
                textAlign: 'left',
                borderRadius: 'var(--radius-sm)',
                transition: 'background var(--transition-fast)'
            }}
            onMouseOver={(e) => e.currentTarget.style.background = 'var(--color-surface-hover)'}
            onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
        >
            <span>{icon}</span>
            <span style={{ flex: 1 }}>{label}</span>
            {hasSubmenu && <span style={{ opacity: 0.5 }}>▶</span>}
        </button>
    );

    const renderBackButton = (label: string, onClick: () => void) => (
        <button
            onClick={onClick}
            style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-sm)',
                width: '100%',
                padding: 'var(--space-sm) var(--space-md)',
                background: 'var(--color-bg-tertiary)',
                border: 'none',
                borderBottom: '1px solid var(--color-border)',
                color: 'var(--color-text-secondary)',
                fontSize: 'var(--text-xs)',
                cursor: 'pointer',
                textAlign: 'left'
            }}
        >
            <span>◀</span>
            <span>{label}</span>
        </button>
    );

    const renderMenu = () => {
        switch (menuLevel) {
            case 'main':
                return (
                    <>
                        <div style={{
                            padding: 'var(--space-sm) var(--space-md)',
                            borderBottom: '1px solid var(--color-border)',
                            fontSize: 'var(--text-xs)',
                            color: 'var(--color-text-tertiary)',
                            maxWidth: '200px',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap'
                        }}>
                            "{text.slice(0, 30)}{text.length > 30 ? '...' : ''}"
                        </div>
                        {renderMenuItem('💬', 'Comment', () => onComment(text))}
                        {renderMenuItem('🖍️', 'Highlight', () => setMenuLevel('highlight'), true)}
                        {renderMenuItem('📊', 'Add to Framework', () => setMenuLevel('framework-type'), true)}
                    </>
                );

            case 'highlight':
                return (
                    <>
                        {renderBackButton('Highlight Color', () => setMenuLevel('main'))}
                        <div style={{ padding: 'var(--space-sm)' }}>
                            <div style={{ display: 'flex', gap: 'var(--space-xs)', flexWrap: 'wrap' }}>
                                {HIGHLIGHT_COLORS.map(c => (
                                    <button
                                        key={c.id}
                                        onClick={() => {
                                            onHighlight(text, c.id);
                                            onClose();
                                        }}
                                        style={{
                                            width: '28px',
                                            height: '28px',
                                            borderRadius: 'var(--radius-sm)',
                                            background: c.color,
                                            border: '2px solid transparent',
                                            cursor: 'pointer'
                                        }}
                                        title={c.name}
                                    />
                                ))}
                            </div>
                        </div>
                    </>
                );

            case 'framework-type':
                return (
                    <>
                        {renderBackButton('Framework Type', () => setMenuLevel('main'))}
                        {renderMenuItem('📋', `Case-Specific (${caseFrameworks.length})`, () => {
                            setSelectedType('case');
                            setMenuLevel('framework-list');
                        }, true)}
                        {renderMenuItem('📚', `General (${generalFrameworks.length})`, () => {
                            setSelectedType('general');
                            setMenuLevel('framework-list');
                        }, true)}
                    </>
                );

            case 'framework-list':
                const frameworks = selectedType === 'case' ? caseFrameworks : generalFrameworks;
                return (
                    <>
                        {renderBackButton(selectedType === 'case' ? 'Case-Specific' : 'General', () => setMenuLevel('framework-type'))}
                        <div style={{ maxHeight: '250px', overflow: 'auto' }}>
                            {frameworks.map(f => (
                                <button
                                    key={f.id}
                                    onClick={() => {
                                        setSelectedFramework(f);
                                        setMenuLevel('section-list');
                                    }}
                                    style={{
                                        display: 'block',
                                        width: '100%',
                                        padding: 'var(--space-sm) var(--space-md)',
                                        background: 'transparent',
                                        border: 'none',
                                        color: 'var(--color-text-primary)',
                                        fontSize: 'var(--text-sm)',
                                        cursor: 'pointer',
                                        textAlign: 'left'
                                    }}
                                    onMouseOver={(e) => e.currentTarget.style.background = 'var(--color-surface-hover)'}
                                    onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
                                >
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <span>{f.shortName || f.name}</span>
                                        <span style={{ opacity: 0.5 }}>▶</span>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </>
                );

            case 'section-list':
                if (!selectedFramework) return null;

                // Flatten sections for display
                const getAllSections = (sections: Framework['sections'], depth = 0): { section: Framework['sections'][0]; depth: number }[] => {
                    const result: { section: Framework['sections'][0]; depth: number }[] = [];
                    for (const s of sections) {
                        result.push({ section: s, depth });
                        if (s.children) {
                            result.push(...getAllSections(s.children, depth + 1));
                        }
                    }
                    return result;
                };

                const allSections = getAllSections(selectedFramework.sections);

                return (
                    <>
                        {renderBackButton(selectedFramework.shortName || selectedFramework.name, () => setMenuLevel('framework-list'))}
                        <div style={{ maxHeight: '250px', overflow: 'auto' }}>
                            {allSections.map(({ section, depth }) => (
                                <button
                                    key={section.id}
                                    onClick={() => {
                                        onAddToFramework(text, selectedFramework.id, section.id);
                                        onClose();
                                    }}
                                    style={{
                                        display: 'block',
                                        width: '100%',
                                        padding: 'var(--space-sm) var(--space-md)',
                                        paddingLeft: `calc(var(--space-md) + ${depth * 12}px)`,
                                        background: 'transparent',
                                        border: 'none',
                                        color: 'var(--color-text-primary)',
                                        fontSize: 'var(--text-sm)',
                                        cursor: 'pointer',
                                        textAlign: 'left'
                                    }}
                                    onMouseOver={(e) => e.currentTarget.style.background = 'var(--color-surface-hover)'}
                                    onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
                                >
                                    <span style={{ opacity: depth > 0 ? 0.7 : 1 }}>
                                        {depth > 0 ? '↳ ' : ''}{section.name}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </>
                );
        }
    };

    return (
        <div
            ref={menuRef}
            style={{
                position: 'fixed',
                left: menuPosition.x,
                top: menuPosition.y,
                minWidth: '180px',
                background: 'var(--color-bg-secondary)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-md)',
                boxShadow: 'var(--shadow-lg)',
                zIndex: 1000,
                overflow: 'hidden'
            }}
        >
            {renderMenu()}
        </div>
    );
}

export default SelectionMenu;
