// General Frameworks Data (12 frameworks)
import { Framework } from '../types';

export const generalFrameworks: Framework[] = [
    {
        id: 'swot',
        name: 'SWOT Analysis',
        shortName: 'SWOT',
        category: 'general',
        description: 'Analyze internal strengths/weaknesses and external opportunities/threats',
        useCase: 'Strategic planning and competitive analysis',
        sections: [
            {
                id: 'strengths',
                name: 'Strengths',
                description: 'Positive tangible and intangible attributes providing competitive edge',
                questions: [
                    'What aspects of people, products, processes sets you apart?',
                    'What is your USP and value proposition?'
                ],
                examples: ['Proprietary systems', 'Employees', 'Brand image']
            },
            {
                id: 'weaknesses',
                name: 'Weaknesses',
                description: 'Factors that detract from achieving desired goals, need improvement',
                questions: [
                    'What are the vulnerabilities & what changes are needed?',
                    'What is obstructing progress and needs to be eliminated?'
                ],
                examples: ['Weak brand', 'Inadequate supply chain', 'Lack of capital']
            },
            {
                id: 'opportunities',
                name: 'Opportunities',
                description: 'Factors representing why an organization can gain competitive advantage',
                questions: [
                    'What trends, changes could strengthen the brand, markets?'
                ],
                examples: ['Reduced tariffs', 'Tech advancements', 'Market expansion']
            },
            {
                id: 'threats',
                name: 'Threats',
                description: 'Factors that have potential to harm the organization and put goals at risk',
                questions: [
                    'What external risks could impact performance?',
                    'What market shifts could disrupt the firm?'
                ],
                examples: ['Rising cost of production', 'Increasing competition', 'Tight labor supply']
            }
        ]
    },
    {
        id: 'pestel',
        name: 'PESTEL Analysis',
        shortName: 'PESTEL',
        category: 'general',
        description: 'Analyze macro-environmental factors affecting an organization',
        useCase: 'Understanding external business environment',
        sections: [
            {
                id: 'political',
                name: 'Political',
                description: 'Government policies affecting organization and industry',
                questions: ['How do fiscal policy, trade policies, tax policies affect the organization?'],
                examples: ['Labor laws', 'Corruption levels', 'Trade restrictions']
            },
            {
                id: 'economic',
                name: 'Economic',
                description: 'Economic factors affecting the country directly',
                questions: ['How do interest rates, exchange rates, disposable income affect operations?'],
                examples: ['Unemployment rate', 'Micro and macro economic factors']
            },
            {
                id: 'social',
                name: 'Social',
                description: 'Social environment and growing trends',
                questions: ['How do demographics, age distribution, health standards affect demand?'],
                examples: ['Population growth', 'Career attitudes', 'Employment patterns']
            },
            {
                id: 'technological',
                name: 'Technological',
                description: 'Rate of technological improvements affecting the market',
                questions: ['How do digital tech, R&D, adoption rates affect operations?'],
                examples: ['New production methods', 'Distribution tech', 'AI adoption']
            },
            {
                id: 'environmental',
                name: 'Environmental',
                description: 'Factors influencing the surrounding environment',
                questions: ['How do sustainability practices, CSR initiatives affect the business?'],
                examples: ['Carbon footprint', 'Natural resource availability', 'Ethics']
            },
            {
                id: 'legal',
                name: 'Legal',
                description: 'Legal factors of the industry in which organization operates',
                questions: ['What laws pertaining to health, safety, advertising standards apply?'],
                examples: ['Product labelling', 'IP', 'Licenses', 'Industrial regulations']
            }
        ]
    },
    {
        id: 'customer-journey',
        name: 'Customer Journey Map',
        shortName: 'Journey Map',
        category: 'general',
        description: 'Map the complete customer experience from pre-purchase to post-purchase',
        useCase: 'Understanding and improving customer experience',
        sections: [
            {
                id: 'pre-purchase',
                name: 'Pre-Purchase',
                description: 'Phase 1: Identifying needs and options',
                children: [
                    { id: 'need', name: 'Need', description: 'Recognition of a problem or need' },
                    {
                        id: '4a-framework',
                        name: '4A Framework',
                        description: 'Awareness, Affordability, Availability, Accessibility',
                        children: [
                            { id: 'awareness', name: 'Awareness', description: 'Is customer aware?' },
                            { id: 'affordability', name: 'Affordability', description: 'Can customer afford it?' },
                            { id: 'availability', name: 'Availability', description: 'Is it available?' },
                            { id: 'accessibility', name: 'Accessibility', description: 'Can customer access it?' }
                        ]
                    }
                ]
            },
            {
                id: 'during-purchase',
                name: 'During Purchase',
                description: 'Phase 2: The buying process',
                children: [
                    {
                        id: 'purchase-journey',
                        name: 'Purchase Journey',
                        description: 'Channels Used',
                        children: [
                            { id: 'in-store', name: 'In-Store', description: 'Physical retail experience' },
                            { id: 'apps-online', name: 'Apps/Online', description: 'Digital experience' },
                            { id: 'omni-channel', name: 'Omni-channel', description: 'Integrated experience' }
                        ]
                    },
                    {
                        id: '5-senses',
                        name: '5 Senses Framework',
                        description: 'Sensory Experience',
                        children: [
                            { id: 'vision', name: 'Vision', description: 'Visual elements' },
                            { id: 'hearing', name: 'Hearing', description: 'Audio/Sound' },
                            { id: 'smell', name: 'Smell', description: 'Olfactory elements' },
                            { id: 'taste', name: 'Taste', description: 'Taste elements' },
                            { id: 'touch', name: 'Touch', description: 'Tactile elements' }
                        ]
                    }
                ]
            },
            {
                id: 'post-purchase',
                name: 'Post Purchase',
                description: 'Phase 3: Retention and Advocacy',
                children: [
                    {
                        id: 'after-sales',
                        name: 'After Sales Service',
                        description: 'Support',
                        children: [
                            { id: 'repair-maint', name: 'Repair & Maintenance', description: 'Fixing issues' }
                        ]
                    },
                    {
                        id: 'loyalty',
                        name: 'Loyalty Programs',
                        description: 'Rewards and Retention'
                    },
                    {
                        id: 'returns',
                        name: 'Returns / Exchange',
                        description: 'Policies',
                        children: [
                            { id: 'guarantees', name: 'Guarantees & Warranty', description: 'Assurance' }
                        ]
                    }
                ]
            }
        ]
    },

    {
        id: '5c',
        name: "5C's of Marketing",
        shortName: '5Cs',
        category: 'general',
        description: 'Comprehensive marketing situation analysis',
        explanation: "The 5C's framework provides a complete understanding of a business's situation before making strategic decisions. It ensures that the strategy is grounded in reality.\n\n**VRIO Analysis** (Value, Rarity, Imitability, Organization) is a key part of the 'Company' analysis. It helps determine if a company's resources provide a sustained competitive advantage:\n- **Value**: Do you offer a resource that adds value for customers?\n- **Rarity**: Do you control scarce resources or capabilities?\n- **Imitability**: Is it expensive or difficult for others to duplicate?\n- **Organization**: Is your firm organized to capture value?",
        useCase: 'Strategic Planning & Marketing Strategy',
        usage: "Use this framework to:\n1. Diagnosis: Understand the root cause of business problems by checking internal (Company) and external (Context) factors.\n2. Strategy: Identify opportunities (Customer/Collaborators) and threats (Competitors).\n3. Marketing Mix: It serves as the foundation before defining your 4Ps (Product, Price, Place, Promotion).",
        sections: [
            {
                id: 'company',
                name: 'Company',
                description: 'Competitive adv, value chain, brand equity, tech. advancements, VRIO analysis etc.'
            },
            {
                id: 'customer',
                name: 'Customer',
                description: 'TAM, SAM, SOM, demographics, psychographics behavior, geography'
            },
            {
                id: 'competitor',
                name: 'Competitor',
                description: 'Industry players, direct/indirect rivals, market share split, concentration ratio'
            },
            {
                id: 'collaboration',
                name: 'Collaboration',
                description: 'Suppliers, distributors, agencies, or alliances that support delivery and growth'
            },
            {
                id: 'context',
                name: 'Context',
                description: 'External environment driven by PESTEL, industry dynamics, and regulatory shifts'
            }
        ]
    },
    {
        id: '4p',
        name: "4P's of Marketing",
        shortName: '4Ps',
        category: 'general',
        description: 'Marketing mix framework',
        useCase: 'Product marketing strategy',
        usage: "Use the 4Ps (Marketing Mix) to operationalize your strategy:\n1. Why: It translates high-level strategy (like positioning) into tangible actions.\n2. How: Define each element to align with your target customer.\n   - Product: Must solve the customer's problem.\n   - Price: Must reflect perceived value.\n   - Place: Must be accessible where customers shop.\n   - Promotion: Must communicate value effectively.",
        sections: [
            {
                id: 'product',
                name: 'Product',
                description: 'Bundle of features offering perceived value through quality, design, and packaging'
            },
            {
                id: 'price',
                name: 'Price',
                description: 'Impacts sales and profit, influenced by demand, competition, discounts, and credit terms'
            },
            {
                id: 'place',
                name: 'Place',
                description: 'Location where product is available through distribution, logistics, and delivery channels'
            },
            {
                id: 'promotion',
                name: 'Promotion',
                description: 'Builds awareness and demand through ads, PR, discounts, and direct and indirect marketing'
            }
        ]
    },
    {
        id: 'porter-5',
        name: "Porter's 5 Forces",
        shortName: 'Porter 5',
        category: 'general',
        description: 'Industry competitive analysis framework',
        useCase: 'Industry attractiveness and competitive positioning',
        usage: "Why: Determines the profit potential of an industry.\nHow: Assess each of the 5 forces. High forces mean low profitability. Use it to find a position where forces are weaker.",
        explanation: "GLOSSARY OF TERMS\n\nBPOB: Bargaining Power of Buyers\nBPOS: Bargaining Power of Suppliers\nRivalry: Intensity of competition\nTOS:    Threat of Substitution\nTONE:   Threat of New Entrants\nEOS:    Economies of Scale",
        sections: [
            {
                id: 'buyer-power',
                name: 'Bargaining Power of Buyers',
                description: 'BPOB increases with,',
                examples: ['Few large size buyers', 'Low switching cost', 'Higher # of substitutes', 'Standardized products', 'High price elasticity', 'High buyer awareness']
            },
            {
                id: 'supplier-power',
                name: 'Bargaining Power of Suppliers',
                description: 'BPOS increases with,',
                examples: ['Low number of suppliers', 'High switching cost', 'Lower # of substitutes', 'Differentiated product', 'Forward integration possible']
            },
            {
                id: 'rivalry',
                name: 'Competitive Rivalry',
                description: 'RIVALRY increases with,',
                examples: ['High # of competitors', 'Low barriers to entry', 'Easily substitutable product', 'Low bargaining power of suppliers', 'Low focus on brand value']
            },
            {
                id: 'substitution',
                name: 'Threat of Substitution',
                description: 'TOS increases with,',
                examples: ['Low switching cost for customers', 'High performance of substitutes', 'Price-performance trade off is acceptable']
            },
            {
                id: 'new-entrants',
                name: 'Threat of New Entrants',
                description: 'TONE increases with,',
                examples: ['High capital req.', 'Differentiated products', 'Strict govt. regulations', 'High switching cost', 'Supply side EOS', 'High brand value of firms']
            }
        ]
    },
    {
        id: '7s',
        name: '7S Framework',
        shortName: '7S',
        category: 'general',
        description: 'Analyze and improve organizational effectiveness',
        useCase: 'Organizational change and alignment',
        usage: "Why: Analyze and improve organizational effectiveness.\nHow: Ensure all 7 interconnected elements are aligned to support the strategy.",
        explanation: "7S Framework Components:\n\nStrategy:      Plan to grow and outcompete\nStructure:     Organization of the company\nSystems:       Daily activities and processes\nShared Values: Core beliefs & mission\nStyle:         Leadership style used\nStaff:         Employees of the company\nSkills:        Employee capabilities",
        sections: [
            { id: 'strategy', name: 'Strategy', description: 'Plan to grow and outcompete competitors' },
            { id: 'structure', name: 'Structure', description: 'Organization of the company' },
            { id: 'systems', name: 'Systems', description: 'Daily activities and processes' },
            { id: 'shared-values', name: 'Shared Values', description: 'Core beliefs, values, & mission' },
            { id: 'style', name: 'Style', description: 'Leadership & management style used' },
            { id: 'staff', name: 'Staff', description: 'Hired employees of the company' },
            { id: 'skills', name: 'Skills', description: 'Employee capabilities' }
        ]
    },
    {
        id: 'amo',
        name: 'AMO Framework',
        shortName: 'AMO',
        category: 'general',
        description: 'Assess employee productivity due to HR practices',
        useCase: 'HR Strategy and Performance Management',
        usage: "Why: Used to assess employee productivity due to HR practices.\nHow: Evaluate the three components (Ability, Motivation, Opportunity) to identify gaps in performance.",
        explanation: "AMO Framework Components:\n\nAbility:     Skills and knowledge\nMotivation:  Willingness to perform\nOpportunity: Environmental support",
        sections: [
            {
                id: 'ability',
                name: 'Ability',
                description: 'Capacity to perform',
                examples: ['Selective recruitment', 'Hire able & qualified employees', 'Training and development']
            },
            {
                id: 'motivation',
                name: 'Motivation',
                description: 'Willingness to perform',
                examples: ['Compensation', 'Work life balance', 'Performance-based incentives', 'Clarity of goals', 'Conflict mgt.']
            },
            {
                id: 'opportunity',
                name: 'Opportunity',
                description: 'Opportunity to perform',
                examples: ['Career planning', 'High performing work culture', 'Recognition', 'Fair appraisal']
            }
        ]
    },
    {
        id: '4m',
        name: '4M Framework',
        shortName: '4M',
        category: 'general',
        description: 'Establish cause-effect relationship and root cause of process variation',
        useCase: 'Process analysis and troubleshooting',
        usage: "Why: Identify root causes of process variation.\nHow: Analyze four key categories (Man, Machine, Material, Method) to find the source of the problem.",
        explanation: "4M Framework Components:\n\nMan:      Human-related factors (Skills, Training)\nMachine:  Equipment and technology (Reliability, Maint.)\nMaterial: Input resources (Quality, Availability)\nMethod:   Processes and workflows (SOPs, Compliance)",
        sections: [
            {
                id: 'man',
                name: 'Man',
                description: 'Human-related factors—skills, training, productivity, availability, and workforce efficiency'
            },
            {
                id: 'machine',
                name: 'Machine',
                description: 'Equipment and tech includes availability, reliability, capacity, maintenance and automation level'
            },
            {
                id: 'material',
                name: 'Material',
                description: 'Input resources incl. quality, availability, lead times, sourcing reliability and inventory management'
            },
            {
                id: 'method',
                name: 'Method',
                description: 'Processes and workflows includes SOPs, efficiency, compliance and best practice adherence'
            }
        ]
    },
    {
        id: 'bcg',
        name: 'BCG Growth Share Matrix',
        shortName: 'BCG Matrix',
        category: 'general',
        description: 'Portfolio management tool to decide among different business opportunities by profitability',
        useCase: 'Product portfolio and investment decisions',
        usage: "Why: Portfolio management tool to decide among different business opportunities.\nHow: Categorize products based on Market Share and Growth Rate to determine investment strategy (Invest, Divest, Maintain).",
        explanation: "BCG Matrix Components:\n\nStar:          High Growth, High Share (Invest)\nQuestion Mark: High Growth, Low Share (Decide)\nCash Cow:      Low Growth, High Share (Milks)\nDog:           Low Growth, Low Share (Divest)",
        sections: [
            {
                id: 'star',
                name: 'Star',
                description: 'High Market Share, High Growth Rate',
                examples: ['Growth stage of product lifecycle', 'Significant market share', 'High future potential, make significant investment', 'High profits, high costs, high competition', 'Can be turned into Cash Cows']
            },
            {
                id: 'question-mark',
                name: 'Question Mark',
                description: 'Low Market Share, High Growth Rate',
                examples: ['New business venture', 'Continued growth can help become Star', 'Reduced growth can lead to Dog', 'Invest/discard based on chances of becoming Star']
            },
            {
                id: 'cash-cow',
                name: 'Cash Cow',
                description: 'High Market Share, Low Growth Rate',
                examples: ['Mature state of product lifecycle', 'Huge market share', 'Take maximum profit to reinvest', 'Moves to Dog once in decline phase']
            },
            {
                id: 'dog',
                name: 'Dog',
                description: 'Low Market Share, Low Growth Rate',
                examples: ['Products in declining phase', 'Generating little to no profits', 'Must be liquidated, repositioned, or divested', 'Resources must be reallocated']
            }
        ]
    },
    {
        id: 'ansoff',
        name: 'Ansoff Matrix',
        shortName: 'Ansoff',
        category: 'general',
        description: 'Growth strategy framework based on products and markets',
        useCase: 'Strategic growth planning',
        usage: "Why: To identify opportunities for growth and potential risks.\nHow: Analyze the four growth strategies based on whether you are targeting new or existing markets with new or existing products.",
        explanation: "The Ansoff Matrix is a strategic planning tool that provides a framework to help executives, senior managers, and marketers devise strategies for future growth.",
        sections: [
            {
                id: 'market-development',
                name: 'Market Development Strategy',
                description: 'Existing Products, New Markets',
                examples: [
                    "Market growth rate lower than management's growth expectations",
                    "High market share w.r.t. closest competitor",
                    "Concentrated in a small market",
                    "Demand in other markets",
                    "Typical Market Entry Case"
                ]
            },
            {
                id: 'diversification',
                name: 'Diversification Strategy',
                description: 'New Products, New Markets',
                examples: [
                    "Product - Market growth rate lower than management's growth expectations",
                    "Management's objective",
                    "High concentration in a single product/category",
                    "Diversification strategy case"
                ]
            },
            {
                id: 'market-penetration',
                name: 'Market Penetration/Entry Strategy',
                description: 'Existing Products, Existing Markets',
                examples: [
                    "Market growth rate in line with management's growth expectations",
                    "Low market share w.r.t. market leader",
                    "Growth rate w.r.t competitor",
                    "A derived profitability case"
                ]
            },
            {
                id: 'product-development',
                name: 'Product Development Strategy',
                description: 'New Products, Existing Markets',
                examples: [
                    "Market growth rate lower than management's growth expectations",
                    "Product in maturation or decline phase",
                    "Product Launch Case"
                ]
            }
        ]
    },
    {
        id: 'tam-sam-som',
        name: 'TAM SAM SOM',
        shortName: 'TAM/SAM/SOM',
        category: 'general',
        description: 'Addressable and obtainable market sizing framework',
        useCase: 'Market sizing and opportunity analysis',
        usage: "Why: Used to prioritize business opportunities by estimating the potential scale of the market.\nHow: Calculated from the top-down (TAM) to assess maximum potential, and bottom-up (SOM) to forecast realistic short-term revenue.",
        explanation: "TAM = Total Addressable Market\nThe market that exists. The total demand for a product or service across all geographies, segments, and use cases, assuming no constraints on distribution or competition.\n- Helps size the maximum opportunity.\n- Typically calculated top-down using industry data.\n\nSAM = Serviceable Addressable Market\nThe market that is accessible. The portion of TAM that a company can realistically target based on its current offerings, regulatory access, and distribution reach.\n- Accounts for what fits your current capability.\n\nSOM = Serviceable Obtainable Market\nThe market that is winnable. The share of SAM that a company can actually capture in the near term, based on salesforce strength, brand equity, pricing, and competition.\n- Calculated bottom-up using internal data.",
        equations: [
            "TAM = Total Potential Customers × Average Annual Contract Value (ACV)",
            "SAM = TAM × Market Penetration Percentage",
            "SOM = SAM × Market Share Percentage",
            "ACV = Total Contract Revenue / Total Number of Contracts",
            "Total Contract Revenue = Sum of all active contract values",
            "Total Number of Contracts = Count of active customer agreements",
            "Market Penetration % = (Customers Reached / Total Target Market) × 100",
            "Market Share % = (Company Sales / Total Market Sales) × 100"
        ],
        sections: [
            {
                id: 'tam',
                name: 'TAM',
                description: 'Total Addressable Market',
                examples: ['Total market demand', 'No constraints assumed', 'Maximum theoretical revenue']
            },
            {
                id: 'sam',
                name: 'SAM',
                description: 'Serviceable Addressable Market',
                examples: ['Targetable portion of TAM', 'Constrained by product/geo', 'Realistic market potential']
            },
            {
                id: 'som',
                name: 'SOM',
                description: 'Serviceable Obtainable Market',
                examples: ['Captureable share of SAM', 'Short-term sales forecast', 'Winnable market share']
            }
        ]
    }
];

export default generalFrameworks;
