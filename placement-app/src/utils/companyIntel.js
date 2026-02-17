// Company Intelligence and Round Mapping Engine

/**
 * Known enterprise companies (alphabetically sorted)
 */
const ENTERPRISE_COMPANIES = [
    'accenture', 'adobe', 'amazon', 'apple', 'atlassian',
    'bosch', 'capgemini', 'cisco', 'cognizant', 'deloitte',
    'ey', 'flipkart', 'google', 'hcl', 'hp', 'ibm',
    'infosys', 'intel', 'jp morgan', 'jpmorgan', 'kpmg',
    'microsoft', 'oracle', 'pwc', 'salesforce', 'sap',
    'tcs', 'tata', 'tech mahindra', 'uber', 'wipro',
    'walmart', 'wells fargo'
]

/**
 * Company size categories
 */
export const CompanySize = {
    STARTUP: 'startup',
    MIDSIZE: 'midsize',
    ENTERPRISE: 'enterprise'
}

/**
 * Infer company size based on company name
 * @param {string} companyName - Company name
 * @returns {string} Company size category
 */
export function inferCompanySize(companyName) {
    if (!companyName) return CompanySize.STARTUP

    const normalized = companyName.toLowerCase().trim()

    // Check if it matches known enterprise companies
    const isEnterprise = ENTERPRISE_COMPANIES.some(enterprise =>
        normalized.includes(enterprise) || enterprise.includes(normalized)
    )

    if (isEnterprise) {
        return CompanySize.ENTERPRISE
    }

    // Default to startup for unknown companies
    return CompanySize.STARTUP
}

/**
 * Infer industry based on company name or keywords
 * @param {string} companyName - Company name
 * @param {string} jdText - Job description text (optional)
 * @returns {string} Industry name
 */
export function inferIndustry(companyName, jdText = '') {
    if (!companyName) return 'Technology Services'

    const searchText = `${companyName} ${jdText}`.toLowerCase()

    // Industry keywords mapping
    const industryMap = {
        'Financial Services': ['bank', 'finance', 'fintech', 'capital', 'investment', 'trading'],
        'E-commerce': ['ecommerce', 'e-commerce', 'retail', 'marketplace', 'shopping'],
        'Cloud Services': ['cloud', 'aws', 'azure', 'saas', 'paas'],
        'Consulting': ['consulting', 'consulting', 'advisory', 'accenture', 'deloitte', 'pwc', 'kpmg', 'ey'],
        'Automotive': ['automotive', 'car', 'vehicle', 'bosch'],
        'IT Services': ['tcs', 'infosys', 'wipro', 'hcl', 'cognizant', 'tech mahindra', 'capgemini']
    }

    for (const [industry, keywords] of Object.entries(industryMap)) {
        if (keywords.some(keyword => searchText.includes(keyword))) {
            return industry
        }
    }

    // Default industry
    return 'Technology Services'
}

/**
 * Get typical hiring focus based on company size
 * @param {string} companySize - Company size category
 * @returns {Object} Hiring focus details
 */
export function getHiringFocus(companySize) {
    const focusMap = {
        [CompanySize.ENTERPRISE]: {
            title: 'Structured DSA + Core Fundamentals',
            points: [
                'Strong emphasis on data structures and algorithms',
                'Core CS subjects (OS, DBMS, Networks, OOPS)',
                'Multiple rounds with increasing difficulty',
                'Focus on problem-solving patterns and optimization'
            ]
        },
        [CompanySize.MIDSIZE]: {
            title: 'Balanced Mix: DSA + Practical Skills',
            points: [
                'Moderate DSA expectations with practical coding',
                'Some focus on specific tech stack experience',
                'Project discussion and implementation details',
                'Problem-solving with business context'
            ]
        },
        [CompanySize.STARTUP]: {
            title: 'Practical Problem Solving + Stack Depth',
            points: [
                'Hands-on coding in specific frameworks/technologies',
                'Real-world problem solving over theoretical DSA',
                'Quick proof of skills through take-home or live coding',
                'Cultural fit and learning agility emphasized'
            ]
        }
    }

    return focusMap[companySize] || focusMap[CompanySize.STARTUP]
}

/**
 * Generate round mapping based on company size and detected skills
 * @param {string} companySize - Company size category
 * @param {Object} extractedSkills - Extracted skills from JD
 * @returns {Array} Array of interview rounds
 */
export function generateRoundMapping(companySize, extractedSkills) {
    const hasWeb = extractedSkills.web || extractedSkills.languages
    const hasDSA = extractedSkills.coreCS
    const hasData = extractedSkills.data
    const hasCloud = extractedSkills.cloudDevOps

    let rounds = []

    if (companySize === CompanySize.ENTERPRISE) {
        rounds = [
            {
                title: 'Round 1: Online Assessment',
                focus: 'DSA + Aptitude + Core CS MCQs',
                why: 'Filters large applicant pools efficiently. Tests foundational problem-solving and CS knowledge.',
                duration: '60-90 mins'
            },
            {
                title: 'Round 2: Technical Interview I',
                focus: 'DSA Deep Dive (Arrays, Strings, Trees, DP)',
                why: 'Validates algorithmic thinking and coding proficiency. Checks if you can optimize solutions.',
                duration: '45-60 mins'
            },
            {
                title: 'Round 3: Technical Interview II',
                focus: hasDSA ? 'Advanced DSA + System Design Basics' : 'Technical Skills + Projects',
                why: 'Assesses depth in problem-solving and design thinking. Ensures you can handle complex scenarios.',
                duration: '60 mins'
            },
            {
                title: 'Round 4: HR/Managerial',
                focus: 'Behavioral Questions + Cultural Fit',
                why: 'Evaluates communication, teamwork, and alignment with company values.',
                duration: '30-45 mins'
            }
        ]
    } else if (companySize === CompanySize.MIDSIZE) {
        rounds = [
            {
                title: 'Round 1: Initial Screening',
                focus: hasWeb ? 'Practical Coding Challenge' : 'DSA + Technical MCQs',
                why: 'Quick filter to assess baseline technical skills and interest.',
                duration: '30-60 mins'
            },
            {
                title: 'Round 2: Technical Discussion',
                focus: hasWeb ? 'Tech Stack + Live Coding' : 'DSA + Core CS Concepts',
                why: 'Tests your hands-on experience and ability to explain technical decisions.',
                duration: '45-60 mins'
            },
            {
                title: 'Round 3: Final Round',
                focus: 'Projects + Behavioral + Hiring Manager',
                why: 'Validates real-world experience and ensures good team fit.',
                duration: '45 mins'
            }
        ]
    } else { // STARTUP
        rounds = [
            {
                title: 'Round 1: Practical Task',
                focus: hasWeb ? 'Build a small feature/component' : 'Solve a real-world problem',
                why: 'Startups need proof of immediate contribution. This tests your ability to ship working code.',
                duration: 'Take-home (2-4 hours)'
            },
            {
                title: 'Round 2: Technical Deep Dive',
                focus: hasWeb ? 'Code review + Discussion on approach' : 'Live problem solving + Stack discussion',
                why: 'Assesses code quality, thought process, and collaboration style.',
                duration: '60 mins'
            },
            {
                title: 'Round 3: Culture + Vision Fit',
                focus: 'Meet the team, discuss growth mindset',
                why: 'Startups value adaptability and passion. This ensures you align with their mission and pace.',
                duration: '30-45 mins'
            }
        ]
    }

    return rounds
}

/**
 * Generate complete company intelligence
 * @param {string} companyName - Company name
 * @param {Object} extractedSkills - Extracted skills from JD
 * @param {string} jdText - Full job description text
 * @returns {Object} Complete company intelligence data
 */
export function generateCompanyIntel(companyName, extractedSkills, jdText = '') {
    const companySize = inferCompanySize(companyName)
    const industry = inferIndustry(companyName, jdText)
    const hiringFocus = getHiringFocus(companySize)
    const rounds = generateRoundMapping(companySize, extractedSkills)

    return {
        companyName,
        industry,
        companySize,
        sizeLabel: getSizeLabel(companySize),
        hiringFocus,
        rounds,
        generatedAt: new Date().toISOString()
    }
}

/**
 * Get human-readable size label
 * @param {string} companySize - Company size category
 * @returns {string} Display label
 */
function getSizeLabel(companySize) {
    const labels = {
        [CompanySize.STARTUP]: 'Startup (<200 employees)',
        [CompanySize.MIDSIZE]: 'Mid-size (200–2,000 employees)',
        [CompanySize.ENTERPRISE]: 'Enterprise (2,000+ employees)'
    }
    return labels[companySize] || labels[CompanySize.STARTUP]
}
