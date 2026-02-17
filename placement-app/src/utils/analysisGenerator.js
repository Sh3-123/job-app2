// Analysis generators - creates checklists, plans, and questions based on detected skills

/**
 * Generate round-wise preparation checklist
 */
export function generateChecklist(extractedSkills) {
    const hasCategory = (category) => extractedSkills[category] !== undefined

    const checklist = {
        round1: {
            title: 'Round 1: Aptitude & Basics',
            items: [
                'Practice quantitative aptitude (numbers, percentages, ratios)',
                'Solve logical reasoning puzzles',
                'Review verbal ability and comprehension',
                'Practice time management with mock tests',
                'Brush up on basic mathematics and statistics',
                'Review common aptitude question patterns',
                'Take at least 2 full-length mock aptitude tests'
            ]
        },
        round2: {
            title: 'Round 2: DSA & Core CS',
            items: []
        },
        round3: {
            title: 'Round 3: Technical Interview',
            items: []
        },
        round4: {
            title: 'Round 4: Managerial/HR',
            items: [
                'Prepare STAR format answers for behavioral questions',
                'Research company culture and values',
                'Prepare questions to ask the interviewer',
                'Practice explaining career goals and motivations',
                'Review conflict resolution scenarios',
                'Prepare examples of teamwork and leadership'
            ]
        }
    }

    // Round 2: DSA + Core CS
    if (hasCategory('coreCS')) {
        checklist.round2.items.push(
            'Master fundamental data structures (arrays, linked lists, trees, graphs)',
            'Practice common algorithms (sorting, searching, graph traversal)',
            'Review OOP concepts and design patterns',
            'Study DBMS fundamentals (normalization, transactions, indexing)',
            'Understand OS concepts (processes, threads, memory management)',
            'Review networking basics (TCP/IP, HTTP, DNS)'
        )
    } else {
        checklist.round2.items.push(
            'Learn basic data structures (arrays, linked lists, stacks, queues)',
            'Practice simple algorithms (sorting, searching)',
            'Understand basic programming concepts',
            'Review fundamental CS theory'
        )
    }

    // Add language-specific items
    if (hasCategory('languages')) {
        checklist.round2.items.push(
            'Practice coding problems in your primary language',
            'Understand language-specific features and best practices'
        )
    }

    // Round 3: Technical Interview
    if (hasCategory('web')) {
        checklist.round3.items.push(
            'Review web development fundamentals (HTTP, REST APIs)',
            'Practice building small projects with detected frameworks',
            'Understand frontend-backend communication',
            'Review state management and component lifecycle'
        )
    }

    if (hasCategory('data')) {
        checklist.round3.items.push(
            'Practice SQL queries (joins, subqueries, aggregations)',
            'Understand database design and indexing',
            'Review NoSQL vs SQL trade-offs'
        )
    }

    if (hasCategory('cloudDevOps')) {
        checklist.round3.items.push(
            'Understand cloud service models (IaaS, PaaS, SaaS)',
            'Review containerization concepts and benefits',
            'Learn CI/CD pipeline basics'
        )
    }

    if (hasCategory('testing')) {
        checklist.round3.items.push(
            'Understand testing pyramid (unit, integration, e2e)',
            'Practice writing test cases for common scenarios'
        )
    }

    // Add generic items if not enough specific ones
    if (checklist.round3.items.length === 0) {
        checklist.round3.items.push(
            'Prepare to explain your projects in detail',
            'Practice live coding on a whiteboard or IDE',
            'Review your resume and be ready to discuss each point',
            'Prepare examples of problem-solving approaches',
            'Practice explaining technical concepts to non-technical audience'
        )
    }

    // Ensure round 3 has enough items
    if (checklist.round3.items.length < 5) {
        checklist.round3.items.push(
            'Prepare questions about the role and team',
            'Review the company\'s tech stack',
            'Practice explaining your thought process while coding'
        )
    }

    return checklist
}

/**
 * Generate 7-day preparation plan
 */
export function generate7DayPlan(extractedSkills) {
    const hasCategory = (category) => extractedSkills[category] !== undefined

    const plan = {
        day1: {
            title: 'Day 1-2: Basics & Core CS',
            tasks: []
        },
        day3: {
            title: 'Day 3-4: DSA & Coding',
            tasks: []
        },
        day5: {
            title: 'Day 5: Projects & Resume',
            tasks: []
        },
        day6: {
            title: 'Day 6: Mock Interviews',
            tasks: []
        },
        day7: {
            title: 'Day 7: Revision & Polish',
            tasks: []
        }
    }

    // Day 1-2: Basics
    plan.day1.tasks.push('Review fundamental CS concepts (OOP, DBMS, OS, Networks)')

    if (hasCategory('languages')) {
        plan.day1.tasks.push('Brush up on your primary programming language syntax and features')
    }

    if (hasCategory('web')) {
        plan.day1.tasks.push('Review web fundamentals: HTTP, REST APIs, request-response cycle')
    }

    plan.day1.tasks.push('Practice 5-10 easy coding problems to warm up')

    // Day 3-4: DSA
    plan.day3.tasks.push('Solve 10-15 medium-level DSA problems (arrays, strings, linked lists)')
    plan.day3.tasks.push('Practice common patterns: two pointers, sliding window, hash maps')

    if (hasCategory('coreCS')) {
        plan.day3.tasks.push('Deep dive into trees and graphs (BFS, DFS, traversals)')
    }

    plan.day3.tasks.push('Time yourself to improve speed and efficiency')

    // Day 5: Projects
    plan.day5.tasks.push('Update resume with relevant projects and skills')

    if (hasCategory('web')) {
        plan.day5.tasks.push('Review your web projects: architecture, challenges, learnings')
    }

    if (hasCategory('data')) {
        plan.day5.tasks.push('Prepare to explain database design decisions in your projects')
    }

    if (hasCategory('cloudDevOps')) {
        plan.day5.tasks.push('Review deployment strategies and infrastructure choices')
    }

    plan.day5.tasks.push('Align your project stories with the job requirements')

    // Day 6: Mock interviews
    plan.day6.tasks.push('Conduct 2-3 mock technical interviews with peers or online')
    plan.day6.tasks.push('Practice explaining your thought process while coding')
    plan.day6.tasks.push('Record yourself answering behavioral questions')
    plan.day6.tasks.push('Get feedback and identify weak areas')

    // Day 7: Revision
    plan.day7.tasks.push('Review notes from all previous days')

    if (hasCategory('coreCS') || hasCategory('languages')) {
        plan.day7.tasks.push('Revisit weak topics identified during practice')
    }

    plan.day7.tasks.push('Practice 3-5 problems from your weak areas')
    plan.day7.tasks.push('Prepare questions to ask the interviewer')
    plan.day7.tasks.push('Get a good night\'s sleep before the interview day')

    return plan
}

/**
 * Generate likely interview questions based on detected skills
 */
export function generateQuestions(extractedSkills) {
    const questions = []
    const hasCategory = (category) => extractedSkills[category] !== undefined

    // Core CS questions
    if (hasCategory('coreCS')) {
        questions.push(
            'Explain the difference between stack and queue with real-world examples.',
            'What is a hash table and when would you use it over an array?',
            'Explain database normalization and why it matters.',
            'What is the difference between process and thread?',
            'How does virtual memory work in operating systems?'
        )
    }

    // Language-specific questions
    if (hasCategory('languages')) {
        const skills = extractedSkills.languages.skills
        if (skills.some(s => s.toLowerCase().includes('java'))) {
            questions.push('Explain the difference between abstract class and interface in Java.')
        }
        if (skills.some(s => s.toLowerCase().includes('python'))) {
            questions.push('What are Python decorators and when would you use them?')
        }
        if (skills.some(s => s.toLowerCase().includes('javascript'))) {
            questions.push('Explain closures and how they work in JavaScript.')
        }
    }

    // Web development questions
    if (hasCategory('web')) {
        questions.push(
            'Explain the difference between REST and GraphQL APIs.',
            'How would you optimize the performance of a web application?',
            'What is state management and why is it important in frontend frameworks?'
        )

        const webSkills = extractedSkills.web.skills
        if (webSkills.some(s => s.toLowerCase().includes('react'))) {
            questions.push('Explain the React component lifecycle and hooks.')
        }
    }

    // Database questions
    if (hasCategory('data')) {
        questions.push(
            'Explain database indexing and when it helps performance.',
            'What is the difference between SQL and NoSQL databases?',
            'How would you design a database schema for an e-commerce application?'
        )
    }

    // Cloud/DevOps questions
    if (hasCategory('cloudDevOps')) {
        questions.push(
            'Explain containerization and its benefits over virtual machines.',
            'What is CI/CD and why is it important in modern development?'
        )
    }

    // Testing questions
    if (hasCategory('testing')) {
        questions.push('Explain the testing pyramid and different types of testing.')
    }

    // General questions if not many specific ones
    if (questions.length < 10) {
        questions.push(
            'How would you approach debugging a production issue?',
            'Explain a time when you optimized code or improved performance.',
            'Describe your approach to learning a new technology or framework.',
            'How do you ensure code quality in your projects?'
        )
    }

    // Return exactly 10 questions
    return questions.slice(0, 10)
}
