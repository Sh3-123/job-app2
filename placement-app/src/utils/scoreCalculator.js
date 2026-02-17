// Readiness score calculator

/**
 * Calculate readiness score based on JD analysis
 * 
 * Base: 35
 * +5 per detected category (max 30 for 6 categories)
 * +10 if company name provided
 * +10 if role provided
 * +10 if JD length > 800 chars
 * Cap at 100
 */
export function calculateReadinessScore(params) {
    const {
        extractedSkills = {},
        company = '',
        role = '',
        jdText = ''
    } = params

    let score = 35 // Base score

    // +5 per detected category (max 30)
    const categoryCount = Object.keys(extractedSkills).length
    score += Math.min(categoryCount * 5, 30)

    // +10 if company name provided
    if (company && company.trim().length > 0) {
        score += 10
    }

    // +10 if role provided
    if (role && role.trim().length > 0) {
        score += 10
    }

    // +10 if JD length > 800 chars
    if (jdText && jdText.length > 800) {
        score += 10
    }

    // Cap at 100
    return Math.min(score, 100)
}

/**
 * Get readiness level based on score
 */
export function getReadinessLevel(score) {
    if (score >= 80) return { level: 'Excellent', color: 'text-green-600', bgColor: 'bg-green-100' }
    if (score >= 65) return { level: 'Good', color: 'text-blue-600', bgColor: 'bg-blue-100' }
    if (score >= 50) return { level: 'Fair', color: 'text-yellow-600', bgColor: 'bg-yellow-100' }
    return { level: 'Needs Improvement', color: 'text-red-600', bgColor: 'bg-red-100' }
}
