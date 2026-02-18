import { Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import DashboardLayout from './layouts/DashboardLayout'
import Dashboard from './pages/Dashboard'
import Practice from './pages/Practice'
import Assessments from './pages/Assessments'
import Resources from './pages/Resources'
import Profile from './pages/Profile'
import Results from './pages/Results'
import TestChecklist from './pages/TestChecklist'
import ShipPage from './pages/ShipPage'
import ProofPage from './pages/ProofPage'



function App() {
    return (
        <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/app" element={<DashboardLayout />}>
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="practice" element={<Practice />} />
                <Route path="assessments" element={<Assessments />} />
                <Route path="results" element={<Results />} />
                <Route path="resources" element={<Resources />} />
                <Route path="profile" element={<Profile />} />
            </Route>

            {/* PRP Checklist & Test Routes - Wrapped in DashboardLayout */}
            <Route path="/prp" element={<DashboardLayout />}>
                <Route path="07-test" element={<TestChecklist />} />
                <Route path="08-ship" element={<ShipPage />} />
                <Route path="proof" element={<ProofPage />} />
            </Route>
        </Routes>
    )
}

export default App
