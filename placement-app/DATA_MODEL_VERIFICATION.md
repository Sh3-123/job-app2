# Data Model Hardening - Verification Guide

## ✅ Implementation Complete

### Changes Made

#### 1. **Input Validation** ✓
**File:** `src/pages/Practice.jsx`
- JD textarea required (cannot analyze empty)
- Warning shows if JD < 200 characters: "This JD is too short to analyze deeply..."
- Company and Role remain optional
- Character count displayed in real-time

#### 2. **Standardized Schema** ✓
**New Schema Structure:**
```javascript
{
  // Core identifiers
  id: string,                    // Auto-generated timestamp ID
  createdAt: string,             // ISO timestamp of creation
  updatedAt: string,             // ISO timestamp of last update
  
  // Input data
  company: string,               // Empty string if not provided
  role: string,                  // Empty string if not provided
  jdText: string,                // Required, the full JD text
  
  // Extracted data
  extractedSkills: {
    coreCS?: { name, skills[] },
    languages?: { name, skills[] },
    web?: { name, skills[] },
    data?: { name, skills[] },
    cloudDevOps?: { name, skills[] },
    testing?: { name, skills[] },
    other?: { name, skills[] }   // Default when no skills detected
  },
  
  // Generated outputs
  checklist: {},                 // Round-wise checklist object
  plan: {},                      // 7-day plan object
  questions: string[],           // Array of 10 questions
  companyIntel: {},              // Company intelligence data
  
  // Scoring (NEW!)
  baseScore: number,             // Initial score, computed only on analyze
  finalScore: number,            // Current score after skill adjustments
  skillConfidenceMap: {          // User's skill assessments
    [skillName]: "know" | "practice"
  }
}
```

#### 3. **Default Skills When None Detected** ✓
**File:** `src/pages/Practice.jsx`
- If `extractedSkills` is empty after extraction:
  ```javascript
  extractedSkills = {
    other: {
      name: 'General Skills',
      skills: ['Communication', 'Problem solving', 'Basic coding', 'Projects']
    }
  }
  ```
- Ensures every analysis has at least some skills
- Plan/checklist/questions adjusted for general preparation

#### 4. **Score Stability Rules** ✓
**Files Modified:** `src/pages/Practice.jsx`, `src/pages/Results.jsx`

**Rules:**
1. `baseScore` computed only on analyze (never changes)
2. `finalScore` = `baseScore` initially
3. When user toggles skills:
   - Calculate new `finalScore` from `baseScore` + adjustments
   - +1 for "know", -1 for "practice"
   - Clamp between 0-100
   - Update `updatedAt` timestamp
   - Persist to localStorage

**Code Flow:**
```
Analyze JD → baseScore calculated
           → finalScore = baseScore
           → skillConfidenceMap = {}

Toggle Skill → finalScore recalculated from baseScore
             → updatedAt = now()
             → Save to localStorage
```

#### 5. **History Robustness** ✓
**File:** `src/utils/storage.js`
- Validation function `isValidEntry()` checks:
  - `id` is string
  - `createdAt` is string
  - `jdText` is string
  - `extractedSkills` is object
- Corrupted entries automatically filtered out
- Cleaned list saved back to localStorage
- Console warning logged for each corrupted entry

**File:** `src/pages/Assessments.jsx`
- Detects if entries were filtered
- Shows amber warning banner:
  > "Some entries couldn't be loaded. One or more saved entries were corrupted and have been automatically cleaned. Create a new analysis if needed."
- Uses `finalScore` with fallback to `baseScore` or `readinessScore`

---

## Verification Steps

### Test 1: Input Validation

**Steps:**
1. Navigate to `/app/practice`
2. Leave JD textarea empty, click "Analyze JD"
   - **Expected:** Button is disabled (grayed out)
3. Type 50 characters in JD textarea
   - **Expected:** Amber warning appears: "This JD is too short to analyze deeply..."
4. Type 200+ characters
   - **Expected:** Warning disappears
5. Leave Company and Role empty, analyze JD
   - **Expected:** Works fine, company/role default to empty strings

**Pass Criteria:** ✓ Validation prevents empty JD, warns on short JD, allows empty company/role

---

### Test 2: Default Skills Behavior

**Steps:**
1. Analyze a JD with no recognizable skills (e.g., "Looking for a candidate with good attitude")
2. View results page
3. Check "Key Skills - Self Assessment" section

**Expected:**
- Shows "General Skills" category
- Contains: Communication, Problem solving, Basic coding, Projects
- Can toggle these default skills
- Score updates accordingly

**Pass Criteria:** ✓ Default skills appear when JD has no detectable skills

---

### Test 3: Score Stability

**Steps:**
1. Analyze a JD (e.g., Amazon SDE with DSA keywords)
2. Note Initial baseScore (e.g., 65)
3. Note finalScore shown (should equal baseScore)
4. Toggle a skill to "I know this"
5. Check score display: "Base: 65 | Current: 66"
6. Toggle another skill to "Need practice"
7. Check score display: "Base: 65 | Current: 65"
8. Refresh the page
9. **Expected:** Current score persists (not reset to baseScore)

**Pass Criteria:**
✓ baseScore never changes
✓ finalScore adjusts with toggles
✓ finalScore persists after refresh
✓ updatedAt timestamp updates on toggle

---

### Test 4: Backward Compatibility

**Steps:**
1. Manually create an old-format entry in localStorage:
   ```javascript
   const oldEntry = {
     id: "12345",
     createdAt: "2026-02-17T10:00:00Z",
     company: "TestCorp",
     role: "Developer",
     jdText: "Test JD with Java and Python",
     extractedSkills: { languages: { name: "Languages", skills: ["Java", "Python"] } },
     checklist: {},
     plan: {},
     questions: [],
     readinessScore: 70  // Old format
   };
   const history = JSON.parse(localStorage.getItem('placement_analysis_history') || '[]');
   history.unshift(oldEntry);
   localStorage.setItem('placement_analysis_history', JSON.stringify(history));
   ```
2. Refresh `/app/assessments`
3. **Expected:** Old entry appears with score 70
4. Click to view it
5. **Expected:** Results page works, shows "Base: 70 | Current: 70"
6. Toggle a skill
7. **Expected:** Entry upgrades to new schema with baseScore=70, finalScore=71

**Pass Criteria:** ✓ Old entries work without errors, gracefully upgrades

---

### Test 5: Corrupted Entry Handling

**Steps:**
1. Manually corrupt an entry in localStorage:
   ```javascript
   const history = JSON.parse(localStorage.getItem('placement_analysis_history') || '[]');
   history.push({ id: "broken", createdAt: "bad", corrupted: true });
   localStorage.setItem('placement_analysis_history', JSON.stringify(history));
   ```
2. Refresh `/app/assessments`
3. **Expected:**
   - Amber warning appears: "Some entries couldn't be loaded..."
   - Corrupted entry NOT shown in list
   - Console shows: "Skipping corrupted entry: broken"
4. Check localStorage
5. **Expected:** Corrupted entry removed from storage

**Pass Criteria:** ✓ Corrupted entries filtered, warning shown, storage cleaned

---

### Test 6: Schema Consistency

**Steps:**
1. Analyze multiple JDs with different inputs:
   - Empty company/role
   - Long company/role
   - No skills detected
   - Many skills detected
2. For each, inspect localStorage entry

**Expected Fields Present:**
```json
{
  "id": "...",
  "createdAt": "ISO string",
  "updatedAt": "ISO string",
  "company": "string or empty",
  "role": "string or empty",
  "jdText": "string",
  "extractedSkills": "object",
  "checklist": "object",
  "plan": "object",
  "questions": "array[10]",
  "baseScore": "number 0-100",
  "finalScore": "number 0-100",
  "skillConfidenceMap": "object",
  "companyIntel": "object"
}
```

**Pass Criteria:** ✓ All entries have consistent schema regardless of input

---

### Test 7: Company Intel Integration

**Steps:**
1. Analyze "Amazon" + DSA JD
2. Check Results page
3. **Expected:**
   - Company Intel block appears
   - Shows Enterprise size
   - Shows 4 rounds
   - Round 1 mentions "Online Assessment"

**Pass Criteria:** ✓ Company intel works with new schema

---

### Test 8: Export Tools

**Steps:**
1. Analyze a JD
2. Toggle some skills
3. Check score updates
4. Click "Copy 7-Day Plan"
5. Paste and verify content
6. Click "Download TXT"
7. Open file and verify:
   - Shows finalScore (not baseScore)
   - All sections included

**Pass Criteria:** ✓ Export buttons work, show current finalScore

---

## Edge Cases Handled

### ✓ Empty Company/Role
- Stored as empty string `""`
- No "Unknown Company" placeholders
- Display handles gracefully

### ✓ No Skills Detected
- Default "other" skills populated
- Plan/checklist still generated
- No empty sections shown

### ✓ Very Short JD
- Warning shown but analysis allowed
- May detect no skills → defaults apply

### ✓ Old Format Entries
- Backward compatible
- `readinessScore` → mapped to `baseScore`
- Missing `finalScore` → fallback to `baseScore`
- Missing `skillConfidenceMap` → default to `{}`

### ✓ Corrupted Entries
- Validated on load
- Automatically filtered out
- User notified via amber banner
- Storage auto-cleaned

### ✓ Score Out of Bounds
- Clamped to 0-100 range
- -1 adjustments can't go below 0
- +1 adjustments can't go above 100

---

## Files Changed Summary

| File | Changes |
|------|---------|
| `Practice.jsx` | Added validation, default skills, new schema fields |
| `Results.jsx` | Updated to use baseScore/finalScore, proper calculations |
| `Assessments.jsx` | Added corrupted entry detection, schema fallbacks |
| `storage.js` | Added validation function, corruption filtering |
| `companyIntel.js` | (Previously added) No changes needed |

---

## Breaking Changes

**None!** All changes are backward compatible:
- Old entries with `readinessScore` work via fallbacks
- Missing fields handled gracefully
- Existing routes unchanged
- Premium design preserved

---

## Manual Testing Checklist

- [ ] Short JD warning appears (<200 chars)
- [ ] Empty JD blocked
- [ ] Optional company/role work when empty
- [ ] Default skills appear when none detected
- [ ] baseScore never changes after creation
- [ ] finalScore updates on skill toggle
- [ ] finalScore persists after refresh
- [ ] updatedAt changes on toggle
- [ ] Old entries display correctly
- [ ] Old entries upgrade to new schema on update
- [ ] Corrupted entries filtered out
- [ ] Corrupted entry warning shows
- [ ] Console logs corrupted entry IDs
- [ ] Company intel still works
- [ ] All export buttons work
- [ ] History page shows finalScore
- [ ] No UI drift or layout breaks
- [ ] All routes still accessible

---

## Known Limitations

1. **Company Size Detection:** Only Enterprise and Startup (no Mid-size differentiation)
2. **Industry Inference:** Limited keyword matching
3. **Score Precision:** Integer-based (+1/-1), not percentage-based
4. **Corruption Detection:** Only validates required fields, not deep structure

---

## Developer Notes

### Adding New Required Fields

If you need to add a new required field to the schema:

1. Add to `isValidEntry()` validation in `storage.js`
2. Ensure default value in `Practice.jsx` when creating entry
3. Add fallback in `Results.jsx` and `Assessments.jsx` for old entries
4. Update this verification doc

### Debugging Corrupted Entries

If users report missing entries:
1. Check browser console for "Skipping corrupted entry: X"
2. Manually inspect localStorage: `placement_analysis_history`
3. Look for entries missing `id`, `createdAt`, `jdText`, or `extractedSkills`
4. Validate JSON structure is correct

---

## Success Criteria Met ✓

1. ✅ Input validation works (JD required, <200 warning)
2. ✅ Schema is standardized across all entries
3. ✅ Default skills populate when none detected
4. ✅ Score stability rules enforced (baseScore vs finalScore)
5. ✅ History is robust (corruption handled)
6. ✅ No routes changed
7. ✅ No features removed
8. ✅ Premium design maintained
9. ✅ Backward compatible with old entries
10. ✅ Edge cases handled gracefully
