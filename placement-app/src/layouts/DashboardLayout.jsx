import { Outlet, NavLink } from 'react-router-dom'
import { LayoutDashboard, Code, FileCheck, BookOpen, User } from 'lucide-react'

export default function DashboardLayout() {
    const navItems = [
        { path: '/app/dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
        { path: '/app/practice', label: 'Analyze JD', icon: <Code className="w-5 h-5" /> },
        { path: '/app/assessments', label: 'History', icon: <FileCheck className="w-5 h-5" /> },
        { path: '/app/resources', label: 'Resources', icon: <BookOpen className="w-5 h-5" /> },
        { path: '/app/profile', label: 'Profile', icon: <User className="w-5 h-5" /> },
    ]

    return (
        <div className="flex h-screen bg-gray-50">
            {/* Sidebar */}
            <aside className="w-64 bg-white shadow-lg">
                <div className="p-6 border-b">
                    <h2 className="text-2xl font-bold text-primary">Placement Prep</h2>
                </div>
                <nav className="p-4">
                    <ul className="space-y-2">
                        {navItems.map((item) => (
                            <li key={item.path}>
                                <NavLink
                                    to={item.path}
                                    className={({ isActive }) =>
                                        `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200 ${isActive
                                            ? 'bg-primary text-white'
                                            : 'text-gray-700 hover:bg-gray-100'
                                        }`
                                    }
                                >
                                    {item.icon}
                                    <span className="font-medium">{item.label}</span>
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </nav>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Header */}
                <header className="bg-white shadow-sm px-8 py-4 flex items-center justify-between">
                    <h1 className="text-2xl font-semibold text-gray-800">Placement Prep</h1>
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-semibold">
                            U
                        </div>
                    </div>
                </header>

                {/* Main Content Area */}
                <main className="flex-1 overflow-auto p-8">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}
