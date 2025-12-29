// Case-Specific Frameworks Data (5 frameworks)
import { Framework } from '../types';

export const caseFrameworks: Framework[] = [
    {
        id: 'profitability',
        name: 'Profitability Framework',
        shortName: 'Profitability',
        category: 'case-specific',
        description: 'Profit = Revenue - Cost breakdown for analyzing business profitability',
        explanation: 'The Profitability Framework is the most common case interview framework. It breaks down profit into its two main drivers: Revenue and Cost. It is Mutually Exclusive and Collectively Exhaustive (MECE), meaning covering these two branches covers the entire profit equation. Use this to isolate the root cause of declining profits.',
        equations: [
            'Profit = Revenue - Cost',
            'Revenue = Price × Quantity',
            'Cost = Fixed Costs + Variable Costs',
            'Variable Costs = Volume × Cost/Unit'
        ],
        usage: 'Use this framework initially for any case involving a decline in "bottom line" or "profits". Determine if it is a revenue problem, a cost problem, or both.',
        useCase: 'Profitability analysis and improvement cases',
        sections: [
            {
                id: 'revenue',
                name: 'Revenue',
                description: 'Revenue analysis breakdown',
                children: [
                    {
                        id: 'selling-price',
                        name: 'Selling Price per Unit',
                        description: 'Price point analysis',
                        children: [
                            { id: 'supply', name: 'Supply', description: 'Supply-side factors' },
                            { id: 'value-chain', name: 'Value Chain Activities', description: 'Primary: Procurement, Manufacturing, Distribution, Post Sales. Secondary: SG&A, Infra & IT, Human Capital' }
                        ]
                    },
                    { id: 'num-units', name: 'Number of Units', description: 'Volume analysis' },
                    {
                        id: 'product-mix',
                        name: 'Product Mix',
                        description: 'Demand-side factors',
                        children: [
                            { id: 'num-customers', name: 'Number of Customers', description: 'Pre Service, During Service, Post-Service touchpoints' },
                            { id: 'avg-order', name: 'Avg. Order Amount', description: 'Average transaction value' },
                            { id: 'order-freq', name: 'Order Frequency', description: 'Purchase frequency' }
                        ]
                    }
                ]
            },
            {
                id: 'cost',
                name: 'Cost',
                description: 'Cost structure analysis',
                children: [
                    {
                        id: 'primary-activities',
                        name: 'Primary Activities',
                        description: 'Direct cost drivers',
                        children: [
                            { id: 'procurement', name: 'Procuring Raw Materials', description: 'Raw material costs + supplier contract terms, Transportation and packaging costs, #Suppliers × contract value × duration' },
                            { id: 'manufacturing', name: 'Manufacturing', description: 'Plant maintenance and setup costs, Idle capacity and downtime losses, Material wastage and equipment wear' },
                            { id: 'distribution', name: 'Distribution & Storage', description: 'Distributor count × order size × frequency, Transport, packaging, & warehousing costs, Retail channel margin × sales volume by tier' },
                            { id: 'post-sales', name: 'Post-Sales Service', description: 'No. of Customers × service frequency × cost, Spare parts, replacements, and returns, Waste from repairs, inefficiencies, defects' }
                        ]
                    },
                    {
                        id: 'supporting-activities',
                        name: 'Supporting Activities',
                        description: 'Indirect cost drivers',
                        children: [
                            { id: 'rd', name: 'Research & Development', description: 'R&D investment' },
                            { id: 'financing', name: 'Financing Costs', description: 'Capital costs' },
                            { id: 'branding', name: 'Branding & Advertising', description: 'Marketing costs' },
                            { id: 'human-capital', name: 'Human Capital', description: 'Capacity × Efficiency × Utilization' },
                            { id: 'sga', name: 'Selling, General & Administrative', description: 'Overhead costs' }
                        ]
                    }
                ]
            },
            {
                id: 'preliminary',
                name: 'Preliminary Questions',
                description: 'Key questions to ask before analysis',
                questions: [
                    'Clarify objective, quantum of change in profit and timeline',
                    'Geography - Location of the firm, its branches',
                    'Business Model – Where does the firm lie in the value chain? What are its revenue streams and distribution channels?',
                    'Who are the key customer segments, and how do they differ?',
                    'What is the product mix? Any new differentiation/change in products?',
                    'What is the competitive landscape?',
                    'How does pricing and volume of sales vary? Are there seasonal patterns in sales volume or pricing?'
                ]
            }
        ]
    },
    {
        id: 'market-entry',
        name: 'Market Entry Framework',
        shortName: 'Market Entry',
        category: 'case-specific',
        description: 'Analyze Risks, Economic Feasibility, and Modes of Entry',
        explanation: 'The Market Entry framework evaluates the feasibility and strategy of entering a new market. It typically involves analyzing the Market (Size, Growth, Competition), the Entrant (Capabilities, Finances), and the Strategy (How to enter).',
        equations: [
            'Profit = (Mkt Size × Mkt Share × Price) - (Fixed + Variable Costs)',
            'Break Even = Fixed Costs / (Price - Variable Cost)',
            'ROI = (Net Profit / Cost of Entry) × 100'
        ],
        usage: 'Use this when a client is considering launching a new product, expanding to a new geography, or acquiring a company in a new sector.',
        useCase: 'Market entry and expansion cases',
        sections: [
            {
                id: 'risks',
                name: 'Risks Involved',
                description: 'Analysis of potential risks and mitigation strategies',
            },
            {
                id: 'market-size',
                name: 'Market Size and Share',
                description: 'Economic Feasibility: Market Size × Market Share × (Price – Variable cost) – Fixed Cost',
                questions: [
                    'Solve the guesstimate to calculate market size',
                    'Qualitatively find achievable market share'
                ]
            },
            {
                id: 'modes-of-entry',
                name: 'Modes of Entry',
                description: 'Entry strategy options',
                children: [
                    {
                        id: 'organic',
                        name: 'Organic',
                        description: 'Build from scratch',
                        examples: ['Advantages: Retain business control, Build experience curve, Boosts brand image', 'Disadvantages: High capex, High commitment']
                    },
                    {
                        id: 'joint-venture',
                        name: 'Joint Venture',
                        description: 'Partner with local entity',
                        examples: ['Advantages: Less investment, Local expertise, High scale and scope', 'Disadvantages: Limited control, Brand dilution risk']
                    },
                    {
                        id: 'acquisition',
                        name: 'Acquisition',
                        description: 'Buy existing player',
                        examples: ['Advantages: Extend market scope, Utilise local expertise, Produce synergy', 'Disadvantages: Significant investment, Threat to brand value']
                    }
                ]
            },
            {
                id: 'preliminary',
                name: 'Preliminary Questions',
                description: 'Key questions to ask before analysis',
                questions: [
                    'Clarify objective, growth quantum and targeted timeline',
                    'Geography: Why are we looking into this geography? Have they launched this product in another market?',
                    'Business Model: Where does the firm lie in the value chain?',
                    'Who are the target customers? Market size and price sensitivity',
                    'What are the existing products/services, capabilities of the firm? Any differentiating/new features in products?',
                    'Pricing - given or required, ask for targeted margin',
                    'What is the competitive landscape?'
                ]
            }
        ]
    },
    {
        id: 'growth-strategy',
        name: 'Growth Strategy Framework',
        shortName: 'Growth',
        category: 'case-specific',
        description: 'Framework for analyzing growth opportunities',
        explanation: 'The Growth Strategy framework explores avenues for increasing revenue. It splits options into Organic (Internal) and Inorganic (External). Organic focusing on selling more of the same (Market Pen.), new products, or new markets. Inorganic focuses on M&A and Partnerships.',
        equations: [
            'Growth = Organic Growth + Inorganic Growth',
            'Revenue = (Avg. Price × Volume) + New Revenue Streams',
            'CAGR = (End Value / Start Value)^(1/n) - 1'
        ],
        usage: 'Use this when a client wants to grow revenue/sales, improve market share, or is stagnant. Start by distinguishing between Organic vs Inorganic.',
        useCase: 'Growth planning and strategy cases',
        sections: [
            {
                id: 'core-activities',
                name: 'Core Activities',
                description: 'Primary growth strategies',
                children: [
                    {
                        id: 'inorganic',
                        name: 'Inorganic Growth',
                        description: 'Growth through external means',
                        children: [
                            { id: 'ma', name: 'Mergers & Acquisitions', description: 'Acquire or merge with other companies' },
                            { id: 'jv', name: 'Joint Venture', description: 'Partner with other entities' },
                            { id: 'e2e', name: 'Develop E2E Skills & Capabilities', description: 'Can be analyzed using Ansoff matrix components' }
                        ]
                    },
                    {
                        id: 'organic',
                        name: 'Organic Growth',
                        description: 'Growth through internal means',
                        children: [
                            { id: 'product-mix', name: 'Product Mix', description: 'Diversify product offerings' },
                            {
                                id: 'no-users',
                                name: 'No of Users',
                                description: 'Increase customer base',
                                children: [
                                    {
                                        id: 'market-size',
                                        name: 'Market Size',
                                        description: 'Expand market presence',
                                        // Ansoff note handled visually in dashboard
                                    },
                                    {
                                        id: 'market-share',
                                        name: 'Market Share',
                                        description: 'Capture more of existing market',
                                        children: [
                                            { id: 'customer-journey', name: 'Improve Customer Journey', description: 'Enhance customer experience' },
                                            { id: 'branding', name: 'Branding and Marketing', description: 'Increase brand awareness' },
                                            { id: 'distribution', name: 'Improve Channels of Distribution', description: 'Expand distribution network' },
                                            { id: 'retention', name: 'Improve Customer Retention', description: 'Reduce churn' }
                                        ]
                                    }
                                ]
                            },
                            {
                                id: 'profit-per-user',
                                name: 'Profit per User',
                                description: 'Revenue/User and Cost/User optimization',
                                children: [
                                    {
                                        id: 'revenue-user',
                                        name: 'Revenue/User',
                                        description: 'Increase revenue per customer',
                                        children: [
                                            {
                                                id: 'price-unit',
                                                name: 'Price per Unit',
                                                description: 'Optimize pricing',
                                                children: [
                                                    { id: 'elasticity', name: 'Elasticity of Demand', description: 'Analyse impact of price changes' }
                                                ]
                                            },
                                            {
                                                id: 'num-units-user',
                                                name: 'Number of Units',
                                                description: 'Increase volume per user',
                                                children: [
                                                    { id: 'bundling', name: 'Bundling', description: 'Combine products' },
                                                    { id: 'price-discrimination', name: 'Price Discrimination', description: 'Segmented pricing' },
                                                    { id: 'cross-selling', name: 'Cross Selling', description: 'Related products' },
                                                    { id: 'upselling', name: 'Upselling', description: 'Higher tier products' }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        id: 'cost-user',
                                        name: 'Cost/User',
                                        description: 'Reduce cost per customer',
                                        children: [
                                            { id: 'fixed-costs', name: 'Fixed Costs', description: 'Overhead optimization' },
                                            {
                                                id: 'variable-costs',
                                                name: 'Variable Costs',
                                                description: 'Direct cost optimization',
                                                children: [
                                                    { id: 'value-chain', name: 'Value Chain Analysis', description: 'Process Innovation, Strategic Vertical Integration' }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                id: 'non-core',
                name: 'Non-Core Activities',
                description: 'Secondary revenue streams',
                children: [
                    { id: 'lease', name: 'Lease/Rent Out', description: 'Asset monetization' },
                    { id: 'advertising', name: 'Advertising Revenue', description: 'Ad-based revenue' },
                    { id: 'vas', name: 'Value Added Services', description: 'Additional service offerings' }
                ]
            },
            {
                id: 'preliminary',
                name: 'Preliminary Questions',
                description: 'Key questions to ask before analysis',
                questions: [
                    'Clarify objective, growth quantum and targeted timeline',
                    'Geography: Why are we looking into this geography? Have they launched this product in another market?',
                    'Business Model: Where does the firm lie in the value chain?',
                    'Who are the target customers? Market size and price sensitivity',
                    'What are the existing products/services, capabilities of the firm? Any differentiating/new features in products?',
                    'Pricing - given or required, ask for targeted margin',
                    'What is the competitive landscape?'
                ]
            }
        ]
    },
    {
        id: 'pricing',
        name: 'Pricing Framework',
        shortName: 'Pricing',
        category: 'case-specific',
        description: 'Framework for pricing strategy decisions',
        explanation: 'The Pricing Framework helps determine the optimal price for a product or service. It triangulates between three methods: Cost-Based (Floor), Value-Based (Ceiling), and Competitor-Based (Reference).',
        equations: [
            'Cost-Plus = Unit Cost × (1 + Markup%)',
            'Value-Based = Perceived Value - Pricing Incentive',
            'Margin = (Price - Cost) / Price'
        ],
        usage: 'Use this when setting a price for a new product or re-evaluating the price of an existing one. Always consider all three perspectives (Cost, Customer, Competitor).',
        useCase: 'Pricing analysis and strategy cases',
        sections: [
            {
                id: 'gap-analysis',
                name: 'GAP Analysis',
                description: 'Understanding the gap between Cost and Marked Price',
                children: [
                    { id: 'new-utility', name: 'New Found Utility', description: 'Value from new functionality' },
                    { id: 'innovation', name: 'Innovation', description: 'Value from innovative features' },
                    { id: 'quality', name: 'Quality', description: 'Value from quality improvements' },
                    { id: 'brand', name: 'Brand', description: 'Value from brand premium' }
                ]
            },
            {
                id: 'internal',
                name: 'Internal Looking (Cost Based)',
                description: 'Pricing based on internal factors',
                children: [
                    {
                        id: 'costs',
                        name: 'Costs',
                        description: 'Cost-based pricing inputs',
                        examples: ['R&D, one time costs', 'Production costs', 'Fixed & Variable', 'Other specific costs']
                    },
                    {
                        id: 'returns',
                        name: 'Returns',
                        description: 'Return-based pricing targets',
                        examples: ['Product markup', 'Profit margins', 'Breakeven Period', 'Payback Period']
                    }
                ]
            },
            {
                id: 'external',
                name: 'External Looking',
                description: 'Pricing based on external factors',
                children: [
                    {
                        id: 'benchmarking',
                        name: 'Benchmarking',
                        description: 'Industry and feature benchmarks',
                        children: [
                            { id: 'industry', name: 'Industry', description: 'Structure, Feature of Others, Substitutes, Complements, Other proxies' },
                            { id: 'features', name: 'Features', description: 'Additional features, Differentiating benefits, Other\'s price range' }
                        ]
                    },
                    {
                        id: 'value-based',
                        name: 'Value Based',
                        description: 'Customer value-based pricing',
                        examples: ['Willingness to Pay', 'Opportunity Costs', 'Extrapolate Benefits']
                    }
                ]
            },
            {
                id: 'preliminary',
                name: 'Preliminary Questions',
                description: 'Key questions to ask before analysis',
                questions: [
                    'What is the primary pricing objective - profit maximization, market penetration, or brand positioning?',
                    'Are we pricing a new product or revisiting the price of an existing offering?',
                    'What is the minimum acceptable margin or breakeven condition?',
                    'Who are the target customers and their willingness to pay?',
                    'What value do we offer over substitutes or existing options?',
                    'How does the competitor pricing landscape look - industry norms, price anchors & outliers?',
                    'Are there any regulatory or channel-specific constraints on pricing?'
                ]
            }
        ]
    },
    {
        id: 'ma-pe',
        name: 'M&A and PE Framework',
        shortName: 'M&A/PE',
        category: 'case-specific',
        description: 'Framework for M&A and Private Equity investment analysis',
        explanation: 'The M&A / PE Framework evaluates potential acquisitions. It assesses the Target Valuation, Deal Synergies (Revenue & Cost), Feasibility, and Risks. For PE, it also emphasizes Exit Strategy.',
        equations: [
            'Valuation = EBITDA × Multiple',
            'Synergy Value = PV(Cost Savings) + PV(Revenue Gains)',
            'Deal Value = Standalone Value + Synergies - Transaction Costs'
        ],
        usage: 'Use this for "Should we buy Company X?" or "Evaluate this investment opportunity". Focus on whether the deal creates value (1+1 > 2).',
        useCase: 'M&A deals and PE investment cases',
        sections: [
            {
                id: 'financial-feasibility',
                name: 'Financial Feasibility',
                description: 'Financial analysis of the deal',
                children: [
                    {
                        id: 'financial-factors',
                        name: 'Financial Factors',
                        description: 'Factors to be evaluated for the time-period of investment',
                        examples: ['Market Size (Guesstimate)', 'Growth Rate', 'Profitability']
                    },
                    {
                        id: 'acquired-firm',
                        name: "Acquired Firm's Factors",
                        description: 'Target company analysis',
                        examples: ['Unique Value Proposition', 'Competitors', 'Current Equity Structure']
                    }
                ]
            },
            {
                id: 'synergies',
                name: 'Synergies and Business Model',
                description: 'Value creation analysis',
                children: [
                    {
                        id: 'synergies-types',
                        name: 'Synergies',
                        description: 'Types of synergy potential',
                        children: [
                            { id: 'demand-synergies', name: 'Demand-side Synergies', description: 'Revenue synergies' },
                            { id: 'supply-synergies', name: 'Supply-side Synergies', description: 'Cost synergies' },
                            { id: 'efficiency-synergies', name: 'Efficiency Synergies', description: 'Operational improvements' }
                        ]
                    },
                    {
                        id: 'business-model',
                        name: 'Business Model',
                        description: 'Target company evaluation',
                        children: [
                            { id: 'evaluation', name: "Company's Evaluation", description: 'Business valuation' },
                            { id: 'operations', name: 'Operations', description: 'Operational assessment' },
                            { id: 'financials', name: 'Financials', description: 'Financial health' }
                        ]
                    }
                ]
            },
            {
                id: 'exit-options',
                name: 'Exit Options and Risks',
                description: 'Exit strategy and risk analysis',
                children: [
                    {
                        id: 'exit-options-list',
                        name: 'Exit Options',
                        description: 'Ways to exit the investment',
                        examples: ['Total Exit', 'Partial Exit', 'IPO']
                    },
                    {
                        id: 'risks',
                        name: 'Risks',
                        description: 'Risk assessment',
                        examples: ['PESTLE factors', 'Integration risks', 'Market risks']
                    }
                ]
            },
            {
                id: 'company-analysis',
                name: 'Factors to Analyze a Company',
                description: 'Comprehensive company analysis using modified 7S',
                children: [
                    { id: 'structure', name: 'Structure', description: 'What structure do we need to execute the strategy?' },
                    { id: 'systems', name: 'Systems', description: 'Business system needed to execute the strategy?' },
                    { id: 'style', name: 'Style', description: 'Analyzing Leadership style and cultural qualities' },
                    { id: 'staff', name: 'Staff', description: 'How should we help our managers in their growth?' },
                    { id: 'strategy', name: 'Strategy', description: 'What should we do to solve the business problem?' },
                    { id: 'shared-values', name: 'Shared Values', description: 'Current Values and culture of the firm' }
                ]
            },
            {
                id: 'preliminary',
                name: 'Preliminary Questions',
                description: 'Key questions to ask before analysis',
                questions: [
                    'What is the investment objective - total/partial exit, TAT or scale-up?',
                    'What is the investment horizon - short-term, long-term, or staged funding?',
                    "What is the firm's unique value proposition compared to existing players?",
                    'What is the size and growth rate of the target market?',
                    "What are the core capabilities and financial health of the business?",
                    "What is the current equity structure and founder's stake?",
                    'Are there any regulatory, macro economic, or execution risks to be accounted for?'
                ]
            }
        ]
    }
];

export default caseFrameworks;
