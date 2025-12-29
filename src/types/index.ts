// Type definitions for Case Framework Analyzer

export type FrameworkCategory = 'general' | 'case-specific';

export interface FrameworkSection {
    id: string;
    name: string;
    description: string;
    questions?: string[];
    examples?: string[];
    children?: FrameworkSection[];
}

export interface Framework {
    id: string;
    name: string;
    shortName?: string;
    category: FrameworkCategory;
    description: string;
    useCase: string;
    // Rich Data Fields
    explanation?: string; // Detailed text explanation
    equations?: string[]; // Arrays of math strings/formulas
    usage?: string; // "Where to use" guide
    sections: FrameworkSection[];
    color?: string;
}

export type CaseSourceType = 'pdf' | 'image' | 'url' | 'text';

export interface CaseStudy {
    id: string;
    title: string;
    sourceType: CaseSourceType;
    content: string; // For text/URL extracted content
    sourceUrl?: string; // Original URL if from web
    fileName?: string; // Original filename if from file
    fileData?: string; // Base64 data for images
    createdAt: Date;
    updatedAt: Date;
}

export interface Highlight {
    id: string;
    caseId: string;
    text: string;
    startOffset: number;
    endOffset: number;
    frameworkId?: string; // Optional - only set when adding to framework
    sectionId?: string; // Optional - only set when adding to framework
    color: number; // 1-6 for different highlight colors
    note?: string;
    createdAt: Date;
}

export interface Note {
    id: string;
    caseId: string;
    content: string;
    linkedText?: string; // Optional, the text this note is about
    frameworkId?: string; // Optional, if linked to a framework
    sectionId?: string; // Optional, if linked to a specific section
    highlightId?: string; // Optional, if linked to a highlight
    fontStyle: 'sans' | 'serif' | 'mono';
    createdAt: Date;
    updatedAt: Date;
}

export interface Analysis {
    id: string;
    caseId: string;
    frameworkIds: string[];
    highlights: Highlight[];
    notes: Note[];
    sectionContent: Record<string, string[]>; // sectionId -> array of content
    createdAt: Date;
    updatedAt: Date;
}

export interface AppState {
    cases: CaseStudy[];
    analyses: Analysis[];
    currentCaseId: string | null;
    currentAnalysisId: string | null;
    selectedFrameworkIds: string[];
}

// View types
export type ViewType = 'library' | 'upload' | 'analysis' | 'history';

export interface ViewState {
    currentView: ViewType;
    sidebarOpen: boolean;
    notesOpen: boolean;
}
