import { ViewType, CaseStudy } from '../../types';

interface HeaderProps {
    currentView: ViewType;
    currentCase?: CaseStudy;
}

function Header({ currentView, currentCase }: HeaderProps) {
    const getTitle = () => {
        switch (currentView) {
            case 'upload':
                return 'Upload Case Study';
            case 'library':
                return 'Framework Reference';
            case 'analysis':
                return currentCase ? currentCase.title : 'Analysis';
            case 'history':
                return 'Case History';
            default:
                return 'Case Analyzer';
        }
    };

    const getSubtitle = () => {
        switch (currentView) {
            case 'upload':
                return 'Import from PDF, URL, or paste text';
            case 'library':
                return 'Learn about business frameworks';
            case 'analysis':
                return 'Select text to add to frameworks';
            case 'history':
                return 'Previous analyses';
            default:
                return '';
        }
    };

    return (
        <header className="header">
            <div>
                <h2 style={{ fontSize: 'var(--text-lg)', fontWeight: 600 }}>
                    {getTitle()}
                </h2>
                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-tertiary)', marginTop: '2px' }}>
                    {getSubtitle()}
                </p>
            </div>
        </header>
    );
}

export default Header;
