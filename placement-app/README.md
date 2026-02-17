# Placement Readiness Platform

A modern React application for placement preparation with practice problems, mock interviews, and progress tracking.

## Features

- **Landing Page**: Hero section with features grid and call-to-action
- **Dashboard**: Overview of your progress and recent activity
- **Practice**: Coding problems to sharpen your skills
- **Assessments**: Timed tests to evaluate your knowledge
- **Resources**: Study materials and guides
- **Profile**: Manage your account information

## Tech Stack

- **React 18** - UI framework
- **React Router v6** - Client-side routing
- **Tailwind CSS** - Utility-first styling
- **Lucide React** - Icon library
- **Vite** - Build tool

## Getting Started

### Prerequisites

- Node.js 18+ and npm installed

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
placement-app/
├── src/
│   ├── layouts/
│   │   └── DashboardLayout.jsx    # App shell with sidebar
│   ├── pages/
│   │   ├── LandingPage.jsx        # Landing page
│   │   ├── Dashboard.jsx          # Dashboard page
│   │   ├── Practice.jsx           # Practice problems
│   │   ├── Assessments.jsx        # Assessments page
│   │   ├── Resources.jsx          # Resources page
│   │   └── Profile.jsx            # User profile
│   ├── App.jsx                    # Main app with routing
│   ├── main.jsx                   # React entry point
│   └── index.css                  # Global styles with Tailwind
├── index.html                      # HTML entry point
├── vite.config.js                  # Vite configuration
├── tailwind.config.js              # Tailwind configuration
└── package.json                    # Dependencies

```

## Color Scheme

Primary color: `hsl(245, 58%, 51%)` (Indigo/Purple)

## Routes

- `/` - Landing page
- `/app/dashboard` - Dashboard (stats and activity)
- `/app/practice` - Practice problems
- `/app/assessments` - Timed assessments
- `/app/resources` - Study resources
- `/app/profile` - User profile

## License

MIT
