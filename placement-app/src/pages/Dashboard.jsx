import { useNavigate } from 'react-router-dom'
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts'
import { Calendar, Clock, CheckCircle, RotateCcw } from 'lucide-react'

export default function Dashboard() {
    const navigate = useNavigate()
    // Practice topic data - set completed/total to control state
    const currentPractice = {
        topic: 'Dynamic Programming',
        completed: 3,
        total: 10,
        // Change to completed: 10, total: 10 to test completion state
    }

    // Skill breakdown data for radar chart
    const skillData = [
        { skill: 'DSA', value: 75, fullMark: 100 },
        { skill: 'System Design', value: 60, fullMark: 100 },
        { skill: 'Communication', value: 80, fullMark: 100 },
        { skill: 'Resume', value: 85, fullMark: 100 },
        { skill: 'Aptitude', value: 70, fullMark: 100 },
    ]

    // Upcoming assessments data
    const upcomingAssessments = [
        { title: 'DSA Mock Test', timing: 'Tomorrow, 10:00 AM' },
        { title: 'System Design Review', timing: 'Wed, 2:00 PM' },
        { title: 'HR Interview Prep', timing: 'Friday, 11:00 AM' },
    ]

    // Weekly activity data (true = active, false = inactive)
    const weeklyActivity = [
        { day: 'Mon', active: true },
        { day: 'Tue', active: true },
        { day: 'Wed', active: false },
        { day: 'Thu', active: true },
        { day: 'Fri', active: true },
        { day: 'Sat', active: false },
        { day: 'Sun', active: true },
    ]

    const readinessScore = 72
    const isAllComplete = currentPractice.completed === currentPractice.total
    const progressPercentage = (currentPractice.completed / currentPractice.total) * 100
    const radius = 70
    const circumference = 2 * Math.PI * radius
    const progress = (readinessScore / 100) * circumference

    return (
        <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900">Dashboard</h2>

            {/* Grid Layout: 2 columns on desktop, 1 on mobile */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                {/* Overall Readiness */}
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Overall Readiness</h3>
                    <div className="flex flex-col items-center justify-center py-6">
                        <div className="relative">
                            <svg width="180" height="180" className="transform -rotate-90">
                                {/* Background circle */}
                                <circle
                                    cx="90"
                                    cy="90"
                                    r={radius}
                                    stroke="#e5e7eb"
                                    strokeWidth="12"
                                    fill="none"
                                />
                                {/* Progress circle */}
                                <circle
                                    cx="90"
                                    cy="90"
                                    r={radius}
                                    stroke="hsl(245, 58%, 51%)"
                                    strokeWidth="12"
                                    fill="none"
                                    strokeDasharray={circumference}
                                    strokeDashoffset={circumference - progress}
                                    strokeLinecap="round"
                                    className="transition-all duration-1000 ease-out"
                                />
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <span className="text-5xl font-bold text-gray-900">{readinessScore}</span>
                                <span className="text-sm text-gray-500">/100</span>
                            </div>
                        </div>
                        <p className="text-lg font-medium text-gray-700 mt-4">Readiness Score</p>
                    </div>
                </div>

                {/* Skill Breakdown Radar Chart */}
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Skill Breakdown</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <RadarChart data={skillData}>
                            <PolarGrid stroke="#d1d5db" />
                            <PolarAngleAxis
                                dataKey="skill"
                                tick={{ fill: '#4b5563', fontSize: 12 }}
                            />
                            <PolarRadiusAxis
                                angle={90}
                                domain={[0, 100]}
                                tick={{ fill: '#6b7280', fontSize: 10 }}
                            />
                            <Radar
                                name="Skills"
                                dataKey="value"
                                stroke="hsl(245, 58%, 51%)"
                                fill="hsl(245, 58%, 51%)"
                                fillOpacity={0.6}
                            />
                        </RadarChart>
                    </ResponsiveContainer>
                </div>

                {/* Continue Practice */}
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Continue Practice</h3>

                    {isAllComplete ? (
                        // All topics completed state
                        <div className="space-y-4 py-4">
                            <div className="flex flex-col items-center justify-center text-center">
                                <CheckCircle className="w-16 h-16 text-green-500 mb-3" />
                                <p className="text-xl font-semibold text-gray-900 mb-2">All topics complete!</p>
                                <p className="text-gray-600 mb-4">Great job! You've completed all practice topics.</p>
                            </div>
                            <button
                                onClick={() => navigate('/app/practice')}
                                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                            >
                                <RotateCcw className="w-4 h-4" />
                                Review Topics
                            </button>
                        </div>
                    ) : (
                        // In-progress state
                        <div className="space-y-4">
                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <p className="text-lg font-medium text-gray-900">{currentPractice.topic}</p>
                                    <span className="text-sm text-gray-500">
                                        {currentPractice.completed}/{currentPractice.total}
                                    </span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2.5">
                                    <div
                                        className="bg-primary h-2.5 rounded-full transition-all duration-500"
                                        style={{ width: `${progressPercentage}%` }}
                                    ></div>
                                </div>
                            </div>
                            <button
                                onClick={() => navigate('/app/practice')}
                                className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-3 px-4 rounded-lg transition-colors"
                            >
                                Continue
                            </button>
                        </div>
                    )}
                </div>

                {/* Weekly Goals */}
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Weekly Goals</h3>
                    <div className="space-y-4">
                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <p className="font-medium text-gray-900">Problems Solved</p>
                                <span className="text-sm font-semibold text-primary">12/20 this week</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                                <div
                                    className="bg-primary h-2.5 rounded-full transition-all duration-500"
                                    style={{ width: '60%' }}
                                ></div>
                            </div>
                        </div>

                        {/* Weekly Activity Circles */}
                        <div className="flex justify-between items-center pt-2">
                            {weeklyActivity.map((item, index) => (
                                <div key={index} className="flex flex-col items-center gap-1">
                                    <div
                                        className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-medium transition-colors ${item.active
                                            ? 'bg-primary text-white'
                                            : 'bg-gray-200 text-gray-400'
                                            }`}
                                    >
                                        {item.day.substring(0, 1)}
                                    </div>
                                    <span className="text-xs text-gray-500">{item.day}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Upcoming Assessments - Full Width */}
                <div className="bg-white rounded-lg shadow-md p-6 lg:col-span-2">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Upcoming Assessments</h3>
                    <div className="space-y-3">
                        {upcomingAssessments.map((assessment, index) => (
                            <div
                                key={index}
                                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-primary hover:bg-purple-50 transition-all cursor-pointer"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                                        <Calendar className="w-6 h-6 text-primary" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-900">{assessment.title}</h4>
                                        <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                                            <Clock className="w-4 h-4" />
                                            <span>{assessment.timing}</span>
                                        </div>
                                    </div>
                                </div>
                                <button className="text-primary hover:text-primary/80 font-medium">
                                    View Details →
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    )
}
