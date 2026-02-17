# Company Intel + Round Mapping - Test Scenarios

## Test Scenario 1: Enterprise Company (Amazon) with DSA Focus

### Input:
- **Company:** Amazon
- **Role:** Software Development Engineer
- **JD Text:** 
```
We are looking for a Software Development Engineer to join our team.

Requirements:
- Strong proficiency in data structures and algorithms
- Experience with Java, Python, or C++
- Understanding of object-oriented programming
- Knowledge of DBMS, operating systems, and computer networks
- Problem-solving skills and ability to optimize solutions
```

### Expected Output:
- **Company Size:** Enterprise (2,000+ employees)
- **Industry:** E-commerce or Technology Services
- **Hiring Focus:** "Structured DSA + Core Fundamentals"
  - Strong emphasis on data structures and algorithms
  - Core CS subjects (OS, DBMS, Networks, OOPS)
  - Multiple rounds with increasing difficulty
  - Focus on problem-solving patterns and optimization

- **Round Mapping:**
  - Round 1: Online Assessment (DSA + Aptitude + Core CS MCQs)
  - Round 2: Technical Interview I (DSA Deep Dive)
  - Round 3: Technical Interview II (Advanced DSA + System Design Basics)
  - Round 4: HR/Managerial (Behavioral Questions + Cultural Fit)

---

## Test Scenario 2: Startup with Web Stack Focus

### Input:
- **Company:** TechVenture Inc
- **Role:** Full Stack Developer
- **JD Text:**
```
Join our fast-growing startup as a Full Stack Developer!

Requirements:
- Proficiency in React and Node.js
- Experience with REST APIs and Express
- Knowledge of MongoDB or PostgreSQL
- Familiarity with HTML, CSS, and JavaScript
- Ability to build features end-to-end
```

### Expected Output:
- **Company Size:** Startup (<200 employees)
- **Industry:** Technology Services
- **Hiring Focus:** "Practical Problem Solving + Stack Depth"
  - Hands-on coding in specific frameworks/technologies
  - Real-world problem solving over theoretical DSA
  - Quick proof of skills through take-home or live coding
  - Cultural fit and learning agility emphasized

- **Round Mapping:**
  - Round 1: Practical Task (Build a small feature/component)
  - Round 2: Technical Deep Dive (Code review + Discussion on approach)
  - Round 3: Culture + Vision Fit (Meet the team, discuss growth mindset)

---

## Test Scenario 3: Enterprise IT Services (TCS) with Mixed Skills

### Input:
- **Company:** TCS
- **Role:** Associate Software Engineer
- **JD Text:**
```
Tata Consultancy Services is hiring Associate Software Engineers.

Requirements:
- Good understanding of programming fundamentals
- Knowledge of data structures and algorithms
- Experience with Java or Python
- Understanding of software development lifecycle
- Strong communication skills
```

### Expected Output:
- **Company Size:** Enterprise (2,000+ employees)
- **Industry:** IT Services
- **Hiring Focus:** "Structured DSA + Core Fundamentals"

- **Round Mapping:**
  - Round 1: Online Assessment
  - Round 2: Technical Interview I (DSA Deep Dive)
  - Round 3: Technical Interview II (Technical Skills + Projects)
  - Round 4: HR/Managerial

---

## Test Scenario 4: Mid-size Company (Generic)

### Input:
- **Company:** CloudTech Solutions
- **Role:** Backend Developer
- **JD Text:**
```
We need a Backend Developer to work on our cloud infrastructure.

Requirements:
- Experience with Node.js and Express
- Knowledge of AWS services
- Understanding of Docker and Kubernetes
- SQL and NoSQL databases
- Experience with CI/CD pipelines
```

### Expected Output:
- **Company Size:** Startup (<200 employees) - defaults for unknown companies
- **Industry:** Cloud Services
- **Hiring Focus:** "Practical Problem Solving + Stack Depth"

- **Round Mapping:**
  - Round 1: Practical Task
  - Round 2: Technical Deep Dive
  - Round 3: Culture + Vision Fit

---

## Test Scenario 5: Financial Services (JP Morgan)

### Input:
- **Company:** JP Morgan
- **Role:** Technology Analyst
- **JD Text:**
```
JP Morgan is looking for Technology Analysts to join our team.

Requirements:
- Strong analytical and problem-solving skills
- Proficiency in Java, Python, or C++
- Understanding of algorithms and data structures
- Knowledge of financial systems is a plus
- Good communication skills
```

### Expected Output:
- **Company Size:** Enterprise (2,000+ employees)
- **Industry:** Financial Services
- **Hiring Focus:** "Structured DSA + Core Fundamentals"

- **Round Mapping:**
  - Round 1: Online Assessment (DSA + Aptitude + Core CS MCQs)
  - Round 2: Technical Interview I (DSA Deep Dive)
  - Round 3: Technical Interview II (Advanced DSA + System Design Basics)
  - Round 4: HR/Managerial

---

## Verification Checklist

### ✅ Company Intel Block
- [ ] Company name displays correctly
- [ ] Industry is inferred correctly (or defaults to "Technology Services")
- [ ] Company size category is accurate (Enterprise/Startup)
- [ ] Size label shows correct employee count range
- [ ] Hiring focus title matches company size
- [ ] Hiring focus points are relevant to company size
- [ ] Demo mode note is visible

### ✅ Round Mapping Engine
- [ ] Correct number of rounds based on company size
- [ ] Round titles are descriptive
- [ ] Focus areas match detected skills
- [ ] "Why this round matters" explanations are present
- [ ] Duration information is displayed
- [ ] Vertical timeline renders correctly
- [ ] Round numbering is sequential
- [ ] Pro tip displays company name and size correctly

### ✅ Dynamic Behavior
- [ ] Enterprise + DSA → 4 rounds with DSA focus
- [ ] Startup + Web → 3 rounds with practical focus
- [ ] Changes in skills reflect in round focus areas
- [ ] Company size affects hiring focus template

### ✅ Persistence
- [ ] Company intel saves to localStorage
- [ ] Refreshing page preserves company intel
- [ ] History entries include company intel
- [ ] Viewing old analysis shows correct company intel

### ✅ No Breaking Changes
- [ ] All existing routes still work
- [ ] Skill assessment toggles still function
- [ ] Export buttons work correctly
- [ ] 7-day plan displays properly
- [ ] Round checklist displays properly
- [ ] Interview questions display properly
- [ ] Premium design is maintained

### ✅ Edge Cases
- [ ] Works when company name is empty
- [ ] Works when company is unknown
- [ ] Works when no skills detected
- [ ] Gracefully handles missing companyIntel data in old entries

---

## Manual Testing Steps

1. **Clear localStorage** to start fresh
   ```javascript
   localStorage.clear()
   ```

2. **Test Enterprise Company (Amazon)**
   - Navigate to `/app/practice`
   - Enter "Amazon" as company
   - Enter "Software Engineer" as role
   - Paste Test Scenario 1 JD text
   - Click "Analyze JD"
   - Verify Company Intel shows "Enterprise"
   - Verify 4 rounds appear
   - Verify round 1 mentions "Online Assessment"

3. **Test Startup (Unknown Company)**
   - Analyze with "MyStartup" as company
   - Paste Test Scenario 2 JD text
   - Verify Company Intel shows "Startup"
   - Verify 3 rounds appear
   - Verify practical focus in rounds

4. **Test IT Services (TCS)**
   - Analyze with "TCS" as company
   - Verify Industry shows "IT Services"
   - Verify Enterprise classification

5. **Test Persistence**
   - Analyze a JD
   - Refresh the page
   - Verify company intel persists
   - Navigate to history
   - Click on old entry
   - Verify company intel loads correctly

6. **Test With No Company Name**
   - Leave company field empty
   - Analyze a JD
   - Verify it defaults to "Unknown Company"
   - Verify it works without errors

7. **Verify No Route Changes**
   - Check `/app/practice` still works
   - Check `/app/results` still works
   - Check `/app/assessments` still works
   - Check `/app/dashboard` still works

---

## Expected Visual Quality

- Premium gradient backgrounds on info cards
- Smooth transitions on hover
- Clear visual hierarchy
- Consistent spacing and alignment
- Professional color scheme (blues, purples, greens, ambers)
- Timeline with gradient line
- Numbered round indicators with shadow
- Clear typography with proper font weights
- Responsive grid layouts
