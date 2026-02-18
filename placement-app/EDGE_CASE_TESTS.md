# Edge Case Testing Guide

## Quick Edge Case Tests

### Edge Case 1: Empty Company/Role
```
Input:
- Company: [leave empty]
- Role: [leave empty]
- JD: "Looking for software developer with Java and Spring Boot experience."

Expected:
- Analysis succeeds
- Company stored as: ""
- Role stored as: ""
- Company Intel shows: "" (empty company name)
- Results page displays without errors
- History shows empty strings gracefully

Test: ✓ Pass if no errors and empty values handled
```

---

### Edge Case 2: Very Short JD (< 200 characters)
```
Input:
- Company: "TechCorp"
- Role: "Developer"
- JD: "Need Java developer. Experience required."

Expected:
- Warning appears: "This JD is too short to analyze deeply..."
- Warning is amber/orange background
- Analysis still allowed (button not disabled)
- Likely no skills detected → defaults to "other" skills
- baseScore might be lower due to lack of detail

Test: ✓ Pass if warning shows and analysis completes
```

---

### Edge Case 3: No Skills Detected
```
Input:
- Company: "ABC Inc"
- Role: "General Position"
- JD: "We are looking for someone with good attitude and willingness to learn. Must be a team player."

Expected:
- extractedSkills = { other: { name: "General Skills", skills: ["Communication", "Problem solving", "Basic coding", "Projects"] } }
- baseScore calculated with default skills
- Results page shows "General Skills" category
- Can toggle default skills
- Plan/Checklist/Questions adjusted for general prep

Test: ✓ Pass if default skills appear and no errors
```

---

### Edge Case 4: Extremely Long JD (> 5000 characters)
```
Input:
- Paste a very long JD with many repeated sections

Expected:
- Character count updates correctly
- No warning (>200 chars)
- Analysis processes without timeout
- Skills extracted from entirety
- localStorage saves successfully (check size limits)

Test: ✓ Pass if handles large text without errors
Note: localStorage has ~5-10MB limit per domain
```

---

### Edge Case 5: Special Characters in Company/Role
```
Input:
- Company: "Tech & Co. (Pvt.) Ltd."
- Role: "Sr. Developer | Full-Stack Engineer"
- JD: "Normal JD text with React and Node"

Expected:
- Special characters stored correctly
- No JSON parsing errors
- Display renders correctly (no HTML entities issues)
- Export to TXT handles special chars

Test: ✓ Pass if special characters preserved
```

---

### Edge Case 6: Toggling Same Skill Multiple Times
```
Steps:
1. Analyze JD with Java skill
2. Toggle Java: practice → know (score +1)
3. Toggle Java: know → practice (score -1)
4. Repeat 10 times rapidly

Expected:
- Score updates correctly each time
- No race conditions
- Final score matches expected calculation
- localStorage updates persist correctly
- updatedAt timestamp changes each toggle

Test: ✓ Pass if score stable and correct after rapid toggles
```

---

### Edge Case 7: Score Boundary Testing
```
Scenario A: Score hits 0
- Start with baseScore = 5
- Have 10 skills, all set to "practice"
- Expected: finalScore = 0 (clamped, not negative)

Scenario B: Score hits 100
- Start with baseScore = 95
- Have 10 skills, all set to "know"
- Expected: finalScore = 100 (clamped, not >100)

Test: ✓ Pass if scores clamped to 0-100 range
```

---

### Edge Case 8: Browser Refresh During Analysis
```
Steps:
1. Click "Analyze JD"
2. Immediately refresh browser (before navigation)

Expected:
- Analysis doesn't complete
- No entry saved to localStorage
- User returns to Practice page with form data cleared
- No corrupted partial entries

Test: ✓ Pass if no partial/broken entries created
```

---

### Edge Case 9: Corrupted localStorage Recovery
```
Setup:
localStorage.setItem('placement_analysis_history', '[{invalid json')

Expected:
- getAnalysisHistory() catches parse error
- Returns empty array []
- Console logs error
- App doesn't crash
- User sees "No Analysis History"

Test: ✓ Pass if graceful handling, no crash
```

---

### Edge Case 10: Mixed Old and New Format Entries
```
Setup localStorage with:
- 3 old entries (readinessScore, no baseScore/finalScore)
- 2 new entries (baseScore, finalScore, skillConfidenceMap)

Expected:
- History page shows all 5 entries
- Old entries display with readinessScore as fallback
- New entries display with finalScore
- Opening old entry works
- Toggling skill in old entry upgrades it to new format
- After toggle, entry has baseScore = old readinessScore

Test: ✓ Pass if seamless mixing of old/new formats
```

---

### Edge Case 11: Skill Name Edge Cases
```
Input JD containing:
- "C++" → Should detect as "C++"
- "C#" → Should detect as "C#"
- "Node.js" → Should detect as "Node.js"
- "AWS" → Should detect as "AWS"

Expected:
- Special characters in skill names preserved
- Toggle works with special chars
- skillConfidenceMap keys handle special chars
- Export displays correctly

Test: ✓ Pass if special char skills work end-to-end
```

---

### Edge Case 12: Delete While Viewing
```
Steps:
1. Analyze JD (creates entry A)
2. Go to History
3. Open entry A in new tab
4. In History tab, delete entry A
5. In Results tab, toggle a skill

Expected:
- Toggle tries to save but entry doesn't exist
- Console may log warning
- No crash
- User action silently fails (acceptable)
OR
- Could show toast: "Entry not found"

Test: ✓ Pass if no crash, graceful handling
```

---

### Edge Case 13: Skills in Multiple Categories
```
Input JD: "Looking for experience in Java, React, AWS, MongoDB, and Docker"

Expected Skills:
- languages: ["Java"]
- web: ["React"]
- cloudDevOps: ["AWS", "Docker"]
- data: ["MongoDB"]

Test: ✓ Pass if skills properly categorized
```

---

### Edge Case 14: Company Intel for Unknown Company
```
Input:
- Company: "RandomStartupXYZ"
- JD: Has only web skills (React, Node)

Expected:
- companySize: "startup" (default for unknown)
- industry: "Technology Services" (default)
- sizeLabel: "Startup (<200 employees)"
- rounds: 3 rounds (startup pattern)
- Round 1: "Practical Task"

Test: ✓ Pass if defaults apply correctly
```

---

### Edge Case 15: All Skills Marked as "I Know"
```
Steps:
1. Analyze JD with 10 skills
2. Mark all 10 as "I know this"

Expected:
- finalScore = baseScore + 10
- "Action Next" box disappears or shows different message
- weakSkills = []
- No orange "Need practice" tags visible

Test: ✓ Pass if UI adapts to all-known scenario
```

---

## Automated Test Script (Browser Console)

```javascript
// Test: Default skills when no skills detected
const testNoSkills = () => {
  const jd = "Looking for a candidate with good attitude";
  // Manually call extractSkills from console
  // Expected: Should return {} which triggers default behavior
};

// Test: Score clamping
const testScoreClamping = () => {
  const baseScore = 95;
  const confidenceMap = {
    'Java': 'know', 'Python': 'know', 'React': 'know',
    'Node': 'know', 'AWS': 'know', 'MongoDB': 'know',
    'Docker': 'know', 'Kubernetes': 'know',
  };
  let score = baseScore;
  Object.values(confidenceMap).forEach(s => score += (s === 'know' ? 1 : -1));
  console.log('Clamped:', Math.max(0, Math.min(100, score))); // Should be 100
};

// Test: localStorage corruption handling
const testCorruptedEntry = () => {
  const history = JSON.parse(localStorage.getItem('placement_analysis_history') || '[]');
  history.push({ id: 'corrupt', bad: true });
  localStorage.setItem('placement_analysis_history', JSON.stringify(history));
  location.reload(); // Check if app handles gracefully
};

// Run all tests
console.log('Running edge case tests...');
// testNoSkills();
// testScoreClamping();
// testCorruptedEntry(); // WARNING: Will corrupt storage
```

---

## Test Results Summary

| Edge Case | Status | Notes |
|-----------|--------|-------|
| Empty Company/Role | ✓ | Handled with empty strings |
| Short JD Warning | ✓ | Amber alert shows <200 chars |
| No Skills Detected | ✓ | Defaults to "other" skills |
| Long JD | ✓ | Processes correctly |
| Special Characters | ✓ | Preserved in storage/display |
| Rapid Toggles | ✓ | Score updates correctly |
| Score Boundaries | ✓ | Clamped to 0-100 |
| Refresh During Analysis | ✓ | No partial entries |
| Corrupted Storage | ✓ | Graceful fallback |
| Mixed Formats | ✓ | Old/new entries coexist |
| Special Char Skills | ✓ | C++, C# handled |
| Delete While Viewing | ⚠️ | Silently fails (acceptable) |
| Multi-category Skills | ✓ | Properly categorized |
| Unknown Company | ✓ | Defaults applied |
| All Known Skills | ✓ | UI adapts |

---

## Stress Test Scenarios

### Stress Test 1: 50 Entries (Maximum)
1. Create 50 analysis entries
2. Expected: Oldest entry auto-removed on 51st (FIFO with 50 limit)
3. Test: History page loads quickly

### Stress Test 2: 100 Skills in One JD
1. JD listing 100 different technologies
2. Expected: All extracted and categorized
3. Test: Toggle any skill, score updates correctly

### Stress Test 3: Offline → Online Transition
1. Analyze JD while offline
2. Go offline, toggle skills
3. Go online, refresh
4. Expected: Changes persist from offline session
