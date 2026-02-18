# Quick Reference Card - Data Model Hardening

## ✅ What Changed

### Input Validation
- **JD < 200 chars** → Amber warning (still allows analysis)
- **Empty JD** → Button disabled
- **Company/Role optional** → Stored as empty string `""`

### New Schema Fields
```javascript
{
  baseScore: number,      // Initial score, never changes
  finalScore: number,     // Current score after toggles
  skillConfidenceMap: {}, // { skillName: "know" | "practice" }
  updatedAt: string       // Timestamp of last update
}
```

### Default Skills
When no skills detected → Adds "General Skills" category:
- Communication
- Problem solving
- Basic coding
- Projects

### Corruption Protection
- Invalid entries auto-filtered
- User notified via amber banner
- Storage auto-cleaned

---

## 🧪 Quick Tests

### Test 1: Validation
1. Go to `/app/practice`
2. Type 50 chars → See warning ✓
3. Type 200+ chars → Warning gone ✓

### Test 2: Default Skills
1. Analyze JD: "Looking for good candidate"
2. See "General Skills" in results ✓

### Test 3: Score Stability
1. Analyze any JD → Note baseScore
2. Toggle skill → finalScore changes
3. Refresh → finalScore persists ✓
4. baseScore unchanged ✓

### Test 4: Corruption Handling
```javascript
// Corrupt storage
const h = JSON.parse(localStorage.getItem('placement_analysis_history')||'[]');
h.push({bad:true});
localStorage.setItem('placement_analysis_history',JSON.stringify(h));
```
Refresh `/app/assessments` → See warning ✓

---

## 📊 Score System

| State | baseScore | finalScore | Display |
|-------|-----------|------------|---------|
| Initial | 75 | 75 | "Base: 75 \| Current: 75" |
| +1 "know" | 75 | 76 | "Base: 75 \| Current: 76" |
| +1 "practice" | 75 | 74 | "Base: 75 \| Current: 74" |
| Refresh | 75 | 74 | "Base: 75 \| Current: 74" |

**Rules:**
- `baseScore` = computed on analyze, **never changes**
- `finalScore` = recalculated from baseScore + skillConfidenceMap
- Min: 0, Max: 100 (clamped)

---

## 🔧 Debugging

### Check if entry is corrupted
```javascript
const entries = JSON.parse(localStorage.getItem('placement_analysis_history')||'[]');
entries.forEach(e => {
  const valid = e?.id && e?.createdAt && e?.jdText && e?.extractedSkills;
  console.log(e.id, valid ? '✓' : '✗ CORRUPTED');
});
```

### View schema version
```javascript
const latest = JSON.parse(localStorage.getItem('placement_analysis_history')||'[]')[0];
console.log({
  hasBaseScore: 'baseScore' in latest,
  hasFinalScore: 'finalScore' in latest,
  hasSkillMap: 'skillConfidenceMap' in latest,
  hasUpdatedAt: 'updatedAt' in latest
});
```

### Manually upgrade old entry
```javascript
const entries = JSON.parse(localStorage.getItem('placement_analysis_history')||'[]');
entries[0].baseScore = entries[0].readinessScore;
entries[0].finalScore = entries[0].readinessScore;
entries[0].skillConfidenceMap = {};
entries[0].updatedAt = new Date().toISOString();
localStorage.setItem('placement_analysis_history', JSON.stringify(entries));
```

---

## 📁 Files Changed

- `Practice.jsx` → Validation + default skills
- `Results.jsx` → Score calculation logic
- `Assessments.jsx` → Corruption detection
- `storage.js` → Validation function

---

## ✅ Verification Checklist

- [ ] Short JD warning appears
- [ ] Default skills when none detected
- [ ] baseScore never changes
- [ ] finalScore updates on toggle
- [ ] finalScore persists after refresh
- [ ] Corrupted entry warning shows
- [ ] Old entries work (backward compatible)
- [ ] All routes accessible
- [ ] All features intact
- [ ] Premium design maintained

---

## 📚 Documentation

- `DATA_MODEL_HARDENING.md` → Full implementation summary
- `DATA_MODEL_VERIFICATION.md` → Detailed test procedures
- `EDGE_CASE_TESTS.md` → 15 edge cases covered

---

## Server Status

**Dev Server:** `http://localhost:5173/`  
**Status:** Running ✓

---

## Common Issues

**Q: Old entries not showing scores**  
A: Fallback logic uses `readinessScore` → Works normally

**Q: Corrupted entry warning won't go away**  
A: Reload page → Auto-cleaned on next load

**Q: Score not updating on toggle**  
A: Check console for errors, ensure entry has baseScore

**Q: Export showing baseScore instead of finalScore**  
A: Fixed → Now uses finalScore (current score)

---

## Migration Path

Old Entry → New Entry happens automatically:
1. User opens old entry
2. Toggle any skill
3. Entry upgraded with:
   - `baseScore` = old `readinessScore`
   - `finalScore` = calculated
   - `skillConfidenceMap` = new
   - `updatedAt` = now()

No manual migration needed ✓
