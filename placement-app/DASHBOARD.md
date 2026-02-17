# Dashboard Page - Component Breakdown

## Components Implemented

### 1. Overall Readiness (Top Left)
- **Circular Progress Indicator**: Custom SVG with animated stroke-dasharray
- **Score**: 72/100 displayed in center
- **Label**: "Readiness Score" below the number
- **Animation**: Smooth progress animation on load
- **Colors**: Primary indigo/purple for the progress arc

### 2. Skill Breakdown (Top Right)
- **Radar Chart**: Using recharts library
- **5 Skills Tracked**:
  - DSA: 75/100
  - System Design: 60/100
  - Communication: 80/100
  - Resume: 85/100
  - Aptitude: 70/100
- **Responsive**: Uses ResponsiveContainer for automatic sizing
- **Styling**: Matches the indigo/purple theme

### 3. Continue Practice (Middle Left)
- **Current Topic**: "Dynamic Programming"
- **Progress Bar**: Shows 3/10 completed (30%)
- **Visual Progress**: Animated progress bar
- **Action Button**: "Continue" button to resume practice
- **Card Design**: Clean white background with shadow

### 4. Weekly Goals (Middle Right)
- **Progress Summary**: "Problems Solved: 12/20 this week"
- **Progress Bar**: 60% filled (12 out of 20)
- **Weekly Activity Tracker**: 7 day circles (Mon-Sun)
  - **Filled circles**: Days with activity (Mon, Tue, Thu, Fri, Sun)
  - **Empty circles**: Inactive days (Wed, Sat)
- **Interactive**: Circles change color based on activity

### 5. Upcoming Assessments (Full Width Bottom)
- **3 Assessment Cards**:
  1. DSA Mock Test - Tomorrow, 10:00 AM
  2. System Design Review - Wed, 2:00 PM
  3. HR Interview Prep - Friday, 11:00 AM
- **Icons**: Calendar icon from lucide-react
- **Hover Effects**: Border color changes, subtle background highlight
- **Action Links**: "View Details →" on each card

## Layout Structure

```
┌─────────────────────────────────────────────────┐
│ Dashboard Heading                                │
├──────────────────────┬──────────────────────────┤
│ Overall Readiness    │ Skill Breakdown          │
│ [Circular Progress]  │ [Radar Chart]            │
│      72/100          │                          │
├──────────────────────┼──────────────────────────┤
│ Continue Practice    │ Weekly Goals             │
│ Dynamic Programming  │ Problems: 12/20          │
│ Progress: 3/10       │ [Week Activity Circles]  │
│ [Continue Button]    │ M T W T F S S            │
├──────────────────────┴──────────────────────────┤
│ Upcoming Assessments                            │
│ → DSA Mock Test - Tomorrow, 10:00 AM            │
│ → System Design Review - Wed, 2:00 PM           │
│ → HR Interview Prep - Friday, 11:00 AM          │
└─────────────────────────────────────────────────┘
```

## Responsive Design

- **Desktop (lg+)**: 2-column grid layout
- **Mobile/Tablet**: Single column stack
- **Bottom Section**: Always full width (spans both columns)

## Technical Details

### Dependencies Added:
- `recharts@^2.10.3` - For the radar chart visualization

### Key Features:
- ✅ Custom SVG circular progress with animation
- ✅ Recharts radar chart with 5-axis data
- ✅ Animated progress bars
- ✅ Interactive weekly activity tracker
- ✅ Hover effects on assessment cards
- ✅ Fully responsive grid layout
- ✅ Consistent card styling throughout
- ✅ Lucide-react icons (Calendar, Clock)

### Color Scheme:
- Primary: `hsl(245, 58%, 51%)` (indigo/purple)
- Background: White cards on gray-50 background
- Text: Gray-900 for headings, gray-600 for secondary text
- Accents: Purple/indigo for interactive elements

## To View:

The dashboard is accessible at:
- Route: `/app/dashboard`
- The dev server should reload automatically
- Visit: http://localhost:5173/app/dashboard
