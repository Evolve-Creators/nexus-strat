import { Framework } from '../../types';

// Import individual diagram components
import SWOTDiagram from './diagrams/SWOTDiagram';
import PESTELDiagram from './diagrams/PESTELDiagram';
import PortersDiagram from './diagrams/PortersDiagram';

import GenericDiagram from './diagrams/GenericDiagram';
import ConcentricDiagram from './diagrams/ConcentricDiagram';
import TreeDiagram from './diagrams/TreeDiagram';
import CustomerJourneyDiagram from './diagrams/CustomerJourneyDiagram';
import SevenSDiagram from './diagrams/SevenSDiagram';
import FiveCDiagram from './diagrams/FiveCDiagram';
import Marketing4PsDiagram from './diagrams/Marketing4PsDiagram';
import AMODiagram from './diagrams/AMODiagram';
import FourMDiagram from './diagrams/FourMDiagram';
import BCGMatrixDiagram from './diagrams/BCGMatrixDiagram';

// Bespoke Dashboards
import ProfitabilityDashboard from './diagrams/ProfitabilityDashboard';
import MarketEntryDashboard from './diagrams/MarketEntryDashboard';
import GrowthDashboard from './diagrams/GrowthDashboard';
import AnsoffCircleDiagram from './diagrams/AnsoffCircleDiagram';

interface FrameworkDiagramProps {
    framework: Framework;
    content?: Record<string, string[]>; // sectionId -> content items
    interactive?: boolean;
    showLabels?: boolean;
    showDescriptions?: boolean;
    onSectionClick?: (sectionId: string) => void;
    onContentChange?: (sectionId: string, content: string[]) => void;
}

function FrameworkDiagram({
    framework,
    content = {},
    interactive = false,
    showLabels = true,
    showDescriptions = true,
    onSectionClick,
    onContentChange
}: FrameworkDiagramProps) {
    // Route to the appropriate diagram component based on framework ID
    switch (framework.id) {

        // --- BESPOKE DASHBOARDS (Case Frameworks) ---
        case 'profitability':
            return (
                <ProfitabilityDashboard
                    framework={framework}
                    content={content}
                    interactive={interactive}
                    onContentChange={onContentChange}
                />
            );

        case 'market-entry':
            return (
                <MarketEntryDashboard
                    framework={framework}
                    content={content}
                    interactive={interactive}
                    onContentChange={onContentChange}
                />
            );

        case 'growth-strategy':
            return (
                <GrowthDashboard
                    framework={framework}
                    content={content}
                    interactive={interactive}
                    onContentChange={onContentChange}
                />
            );

        // --- STANDARD DIAGRAMS (General Frameworks) ---
        case 'swot':
            return (
                <SWOTDiagram
                    framework={framework}
                    content={content}
                    interactive={interactive}
                    onContentChange={onContentChange}
                    showDescriptions={showDescriptions}
                />
            );

        case 'porters': // Canonical ID
        case 'porter':
        case 'porter-5':
            return (
                <PortersDiagram
                    framework={framework}
                    content={content}
                    interactive={interactive}
                    onContentChange={onContentChange}
                    showDescriptions={showDescriptions}
                />
            );

        case '7s':
            return (
                <SevenSDiagram
                    framework={framework}
                    content={content}
                    interactive={interactive}
                    onContentChange={onContentChange}
                    showDescriptions={showDescriptions}
                />
            );

        case 'ansoff':
        case 'ansoff-matrix':
            return (
                <AnsoffCircleDiagram
                    framework={framework}
                    content={content}
                    interactive={interactive}
                    onContentChange={onContentChange}
                    showDescriptions={showDescriptions}
                />
            );



        case 'tam-sam-som':
            return (
                <ConcentricDiagram
                    framework={framework}
                    content={content}
                    interactive={interactive}
                    showLabels={showLabels}
                    onContentChange={onContentChange}
                    showDescriptions={showDescriptions}
                />
            );

        case 'pestel':
            return (
                <PESTELDiagram
                    framework={framework}
                    content={content}
                    interactive={interactive}
                    onContentChange={onContentChange}
                    showDescriptions={showDescriptions}
                />
            );

        case '5c':
            return (
                <FiveCDiagram
                    framework={framework}
                    content={content}
                    interactive={interactive}
                    onContentChange={onContentChange}
                    showDescriptions={showDescriptions}
                />
            );

        case 'amo':
            return (
                <AMODiagram
                    framework={framework}
                    content={content}
                    interactive={interactive}
                    onContentChange={onContentChange}
                    showDescriptions={showDescriptions}
                />
            );

        case '4m':
            return (
                <FourMDiagram
                    framework={framework}
                    content={content}
                    interactive={interactive}
                    onContentChange={onContentChange}
                    showDescriptions={showDescriptions}
                />
            );

        case 'bcg':
            return (
                <BCGMatrixDiagram
                    framework={framework}
                    content={content}
                    interactive={interactive}
                    onContentChange={onContentChange}
                    showDescriptions={showDescriptions}
                />
            );

        case 'customer-journey':
            return (
                <CustomerJourneyDiagram
                    framework={framework}
                    content={content}
                    interactive={interactive}
                    onContentChange={onContentChange}
                    showDescriptions={showDescriptions}
                />
            );

        case 'issue-tree':
        case 'pricing':
        case 'ma-pe':
            return (
                <TreeDiagram
                    framework={framework}
                    content={content}
                    interactive={interactive}
                    onContentChange={onContentChange}
                    showDescriptions={showDescriptions}
                />
            );

        default:
            return (
                <GenericDiagram
                    framework={framework}
                    content={content}
                    interactive={interactive}
                    showLabels={showLabels}
                    onSectionClick={onSectionClick}
                    onContentChange={onContentChange}
                    showDescriptions={showDescriptions}
                />
            );
        case '4p':
            return (
                <Marketing4PsDiagram
                    framework={framework}
                    content={content}
                    interactive={interactive}
                    onContentChange={onContentChange}
                    showDescriptions={showDescriptions}
                />
            );
    }
}

export default FrameworkDiagram;
