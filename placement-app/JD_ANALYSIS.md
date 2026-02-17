# JD Analysis System - Feature Documentation

## Overview
The Placement Readiness Platform now includes a complete JD (Job Description) analysis system with real working logic that runs offline, no external APIs, and persists data in localStorage.

## Features Implemented

### 1. Skill Extraction Engine (`skillExtractor.js`)
**6 Skill Categories:**
- Core CS: DSA, OOP, DBMS, OS, Networks
- Languages: Java, Python, JavaScript, TypeScript, C, C++, C#, Go
- Web: React, Next.js, Node.js, Express, REST, GraphQL
- Data: SQL, MongoDB, PostgreSQL, MySQL, Redis
- Cloud/DevOps: AWS, Azure, GCP, Docker, Kubernetes, CI/CD, Linux
- Testing: Selenium, Cypress, Playwright, JUnit, PyTest

**How it works:**
- Case-insensitive keyword matching
- Groups detected skills by category
- Returns structured object with category names and skills

### 2. Analysis Generators (`analysisGenerator.js`)

#### A) Round-wise Preparation Checklist
Generates 4 rounds of preparation with 5-8 items each:
- **Round 1**: Aptitude & Basics (always 7 items)
- **Round 2**: DSA & Core CS (adapts based on detected skills)
- **Round 3**: Technical Interview (dynamic based on web/data/cloud/testing skills)
- **Round 4**: Managerial/HR (always 6 items)

#### B) 7-Day Preparation Plan
- **Day 1-2**: Basics & Core CS
- **Day 3-4**: DSA & Coding Practice
- **Day 5**: Projects & Resume Alignment
- **Day 6**: Mock Interviews
- **Day 7**: Revision & Weak Areas

Plan adapts based on detected skills (e.g., React → frontend revision included)

#### C) 10 Likely Interview Questions
Generates skill-specific questions:
- SQL detected → "Explain indexing and when it helps"
- React detected → "Explain state management options"
- DSA detected → "How would you optimize search in sorted data?"
- Always returns exactly 10 questions

### 3. Readiness Score Calculator (`scoreCalculator.js`)

**Scoring Formula:**
- Base: 35 points
- +5 per detected category (max 30 for 6 categories)
- +10 if company name provided
- +10 if role provided
- +10 if JD length > 800 characters
- **Cap at 100**

**Readiness Levels:**
- 80-100: Excellent (green)
- 65-79: Good (blue)
- 50-64: Fair (yellow)
- 0-49: Needs Improvement (red)

### 4. localStorage Persistence (`storage.js`)

**Operations:**
- `saveAnalysisEntry()` - Saves new analysis with unique ID and timestamp
- `getAnalysisHistory()` - Retrieves all analyses (most recent first)
- `getAnalysisById(id)` - Gets specific analysis
- `deleteAnalysisEntry(id)` - Removes analysis
- `clearAnalysisHistory()` - Clears all history
- `getLatestAnalysis()` - Gets most recent analysis

**Storage:**
- Key: `placement_analysis_history`
- Limit: 50 entries max (prevents localStorage overflow)
- Format: JSON array of analysis objects

### 5. Pages

#### Practice Page (`/app/practice`)
- Form with Company (optional), Role (optional), JD Text (required)
- Character counter
- Analyze button with loading state
- Performs analysis and saves to localStorage
- Navigates to Results page

#### Results Page (`/app/results`)
- Shows readiness score with level badge
- Displays extracted skills grouped by category
- Shows round-wise checklist (4 rounds)
- Displays 7-day preparation plan
- Lists 10 likely interview questions
- Buttons: "Analyze Another JD", "View History"
- Can load specific analysis via `?id=` query param

#### History Page (`/app/assessments`)
- Lists all past analyses
- Each card shows:
  - Company name and role
  - Date analyzed
  - Readiness score with level
  - Skill count
  - Skill preview (first 3 categories)
  - Delete button
- Click card to view full results
- Empty state with call-to-action

## User Flow

1. **Analyze JD**: User goes to "Analyze JD" tab
2. **Fill Form**: Enters company, role (optional), pastes JD text
3. **Analyze**: Clicks "Analyze JD" button
4. **Processing**: System extracts skills, generates outputs, calculates score
5. **Save**: Entry saved to localStorage with unique ID
6. **Navigate**: Redirects to Results page showing full analysis
7. **View History**: User can view all past analyses in History tab
8. **Re-view**: Clicking history entry loads that specific analysis

## Persistence

✅ **Works offline** - No external API calls
✅ **Survives page refresh** - All data in localStorage
✅ **No scraping** - Pure keyword-based detection
✅ **No routes changed** - Existing structure maintained
✅ **Premium design preserved** - Consistent styling throughout

## Testing

### Sample JD for Testing:
```
Software Engineer - Full Stack Developer

We are looking for a talented Software Engineer to join our team.

Requirements:
- Strong knowledge of DSA and algorithms
- Proficiency in JavaScript, React, and Node.js
- Experience with SQL databases (PostgreSQL or MySQL)
- Familiarity with AWS cloud services
- Understanding of Docker and CI/CD pipelines
- Knowledge of testing frameworks like Jest and Cypress

Responsibilities:
- Develop RESTful APIs using Express
- Build responsive frontends with React
- Write unit and integration tests
- Deploy applications to AWS
- Collaborate with the team on code reviews

Must have:
- Bachelor's degree in Computer Science
- Strong OOP and DBMS fundamentals
- Experience with MongoDB or other NoSQL databases
```

### Expected Results:
- **Readiness Score**: 85-90
  - Base: 35
  - 6 categories detected: +30
  - Company provided: +10
  - Role provided: +10
  - JD > 800 chars: +10
  - Total: 95 (or 90 if company/role not filled)

- **Skills Detected**:
  - Core CS: DSA, Algorithms, OOP, DBMS
  - Languages: JavaScript
  - Web: React, Node.js, Express, REST
  - Data: SQL, PostgreSQL, MySQL, MongoDB
  - Cloud/DevOps: AWS, Docker, CI/CD
  - Testing: Jest, Cypress

- **Questions Include**:
  - React-specific (state management)
  - SQL-specific (indexing)
  - AWS/Docker questions
  - DSA questions

## Verification Steps

1. **Test Skill Extraction**:
   - Paste sample JD
   - Verify all 6 categories detected
   - Check skills are grouped correctly

2. **Test Readiness Score**:
   - Without company/role: ~75
   - With company/role + long JD: ~95

3. **Test History Persistence**:
   - Analyze 2-3 JDs
   - Refresh page
   - Verify all entries still present
   - Delete one entry
   - Refresh again - verify deletion persists

4. **Test Edge Cases**:
   - Empty JD → should prevent submission
   - Very short JD → lower score (<800 chars)
   - No skills detected → "General fresher stack" message
   - Multiple analyses → history shows all in reverse chronological order

## localStorage Structure

```json
[
  {
    "id": "1705512345678",
    "createdAt": "2024-01-17T12:30:45.678Z",
    "company": "Google",
    "role": "Software Engineer",
    "jdText": "...",
    "extractedSkills": {
      "coreCS": {
        "name": "Core CS",
        "skills": ["DSA", "OOP", "DBMS"]
      },
      "languages": {
        "name": "Languages",
        "skills": ["Java", "Python"]
      }
    },
    "checklist": {
      "round1": { "title": "...", "items": [...] },
      "round2": { "title": "...", "items": [...] },
      "round3": { "title": "...", "items": [...] },
      "round4": { "title": "...", "items": [...] }
    },
    "plan": {
      "day1": { "title": "...", "tasks": [...] },
      "day3": { "title": "...", "tasks": [...] },
      "day5": { "title": "...", "tasks": [...] },
      "day6": { "title": "...", "tasks": [...] },
      "day7": { "title": "...", "tasks": [...] }
    },
    "questions": [
      "Question 1...",
      "Question 2...",
      ...
    ],
    "readinessScore": 85
  }
]
```
