
export type CompanyPortfolioData = {
    companyName: string;
    totalCredits: number;
    investments: {
        project: string;
        slug: string;
        credits: number;
        avgPrice: number;
        status: 'active' | 'completed';
    }[];
}

export const companyPortfolios: CompanyPortfolioData[] = [
    {
        companyName: 'Eco Corp.',
        totalCredits: 750,
        investments: [
            {
                project: 'Sunderbans Restoration',
                slug: 'sunderbans-restoration',
                credits: 500,
                avgPrice: 2100.75,
                status: 'active'
            },
            {
                project: 'Pichavaram Initiative',
                slug: 'pichavaram-initiative',
                credits: 250,
                avgPrice: 2650.00,
                status: 'active'
            }
        ]
    },
    {
        companyName: 'GreenShift Energy',
        totalCredits: 1200,
        investments: [
            {
                project: 'Mahanadi Delta Project',
                slug: 'mahanadi-delta-project',
                credits: 1000,
                avgPrice: 1550.00,
                status: 'active'
            },
            {
                project: 'Godavari Estuary Greens',
                slug: 'godavari-estuary-greens',
                credits: 200,
                avgPrice: 1740.50,
                status: 'active'
            }
        ]
    },
    {
        companyName: 'AquaPure Logistics',
        totalCredits: 500,
        investments: [
            {
                project: 'Mumbai Coastal Protection',
                slug: 'mumbai-coastal-protection',
                credits: 500,
                avgPrice: 2324.00,
                status: 'active'
            }
        ]
    },
    {
        companyName: 'Innovate Apparel',
        totalCredits: 350,
        investments: [
            {
                project: 'Pichavaram Initiative',
                slug: 'pichavaram-initiative',
                credits: 100,
                avgPrice: 2680.00,
                status: 'active'
            },
            {
                project: 'Maldives Atoll Conservation',
                slug: 'maldives-atoll-conservation',
                credits: 250,
                avgPrice: 3150.00,
                status: 'active'
            }
        ]
    }
];
