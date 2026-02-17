import { useNavigate } from 'react-router-dom'
import { Code, Video, TrendingUp } from 'lucide-react'

export default function LandingPage() {
    const navigate = useNavigate()

    const features = [
        {
            icon: <Code className="w-12 h-12 text-primary" />,
            title: 'Practice Problems',
            description: 'Solve coding challenges to sharpen your technical skills'
        },
        {
            icon: <Video className="w-12 h-12 text-primary" />,
            title: 'Mock Interviews',
            description: 'Prepare with realistic interview simulations and feedback'
        },
        {
            icon: <TrendingUp className="w-12 h-12 text-primary" />,
            title: 'Track Progress',
            description: 'Monitor your improvement with detailed analytics and insights'
        }
    ]

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100">
            {/* Hero Section */}
            <div className="container mx-auto px-4 py-20">
                <div className="text-center max-w-4xl mx-auto">
                    <h1 className="text-6xl font-bold text-gray-900 mb-6">
                        Ace Your Placement
                    </h1>
                    <p className="text-2xl text-gray-600 mb-10">
                        Practice, assess, and prepare for your dream job
                    </p>
                    <button
                        onClick={() => navigate('/app/dashboard')}
                        className="bg-primary hover:bg-primary/90 text-white font-semibold text-lg px-10 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
                    >
                        Get Started
                    </button>
                </div>
            </div>

            {/* Features Grid */}
            <div className="container mx-auto px-4 py-16">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-xl p-8 shadow-md hover:shadow-xl transition-shadow duration-300"
                        >
                            <div className="mb-4">{feature.icon}</div>
                            <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                                {feature.title}
                            </h3>
                            <p className="text-gray-600 leading-relaxed">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-gray-900 text-gray-300 py-8 mt-20">
                <div className="container mx-auto px-4 text-center">
                    <p>&copy; 2026 Placement Readiness Platform. All rights reserved.</p>
                </div>
            </footer>
        </div>
    )
}
