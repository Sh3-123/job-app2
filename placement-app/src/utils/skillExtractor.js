// Skill extraction engine - detects skills from JD text using keyword matching

export const skillCategories = {
    coreCS: {
        name: 'Core CS',
        keywords: ['dsa', 'data structures', 'algorithms', 'oop', 'object oriented', 'dbms', 'database', 'os', 'operating system', 'networks', 'networking', 'computer networks']
    },
    languages: {
        name: 'Languages',
        keywords: ['java', 'python', 'javascript', 'typescript', 'c++', 'c#', 'golang', 'go ', ' c ', 'rust', 'kotlin', 'swift']
    },
    web: {
        name: 'Web',
        keywords: ['react', 'next.js', 'nextjs', 'node.js', 'nodejs', 'express', 'rest', 'restful', 'api', 'graphql', 'vue', 'angular', 'html', 'css', 'frontend', 'backend']
    },
    data: {
        name: 'Data',
        keywords: ['sql', 'mongodb', 'postgresql', 'postgres', 'mysql', 'redis', 'nosql', 'cassandra', 'dynamodb', 'firebase']
    },
    cloudDevOps: {
        name: 'Cloud/DevOps',
        keywords: ['aws', 'azure', 'gcp', 'google cloud', 'docker', 'kubernetes', 'k8s', 'ci/cd', 'jenkins', 'github actions', 'linux', 'devops', 'terraform']
    },
    testing: {
        name: 'Testing',
        keywords: ['selenium', 'cypress', 'playwright', 'junit', 'pytest', 'testing', 'jest', 'mocha', 'chai', 'test automation']
    }
}

/**
 * Extract skills from job description text
 * @param {string} jdText - Job description text
 * @returns {Object} Object with categories as keys and detected skills as arrays
 */
export function extractSkills(jdText) {
    if (!jdText || typeof jdText !== 'string') {
        return {}
    }

    const normalizedText = jdText.toLowerCase()
    const extracted = {}

    Object.keys(skillCategories).forEach(categoryKey => {
        const category = skillCategories[categoryKey]
        const foundSkills = []

        category.keywords.forEach(keyword => {
            if (normalizedText.includes(keyword.toLowerCase())) {
                // Capitalize first letter for display
                const displayName = keyword.charAt(0).toUpperCase() + keyword.slice(1)
                if (!foundSkills.includes(displayName)) {
                    foundSkills.push(displayName)
                }
            }
        })

        if (foundSkills.length > 0) {
            extracted[categoryKey] = {
                name: category.name,
                skills: foundSkills
            }
        }
    })

    return extracted
}

/**
 * Check if any skills were detected
 */
export function hasSkills(extractedSkills) {
    return Object.keys(extractedSkills).length > 0
}

/**
 * Get total skill count
 */
export function getTotalSkillCount(extractedSkills) {
    let count = 0
    Object.values(extractedSkills).forEach(category => {
        count += category.skills.length
    })
    return count
}
