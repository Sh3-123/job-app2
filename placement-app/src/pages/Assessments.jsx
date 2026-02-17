import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { History, Trash2, Calendar, Briefcase, TrendingUp } from 'lucide-react'
import { getAnalysisHistory, deleteAnalysisEntry } from '../utils/storage'
import { getReadinessLevel } from '../utils/scoreCalculator'

export default function Assessments() {
    const navigate = useNavigate()
    const [history, setHistory] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        loadHistory()
    }, [])

    const loadHistory = () => {
        setLoading(true)
        const data = getAnalysisHistory()
        setHistory(data)
        setLoading(false)
    }

    const handleDelete = (id, e) => {
        e.stopPropagation()
        if (window.confirm('Are you sure you want to delete this analysis?')) {
            deleteAnalysisEntry(id)
            loadHistory()
        }
    }

    const handleViewAnalysis = (id) => {
        navigate(`/app/results?id=${id}`)
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center py-20">
                <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
        )
    }

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-3xl font-bold text-gray-900">Analysis History</h2>
                    <p className="text-gray-600 mt-1">View your past job description analyses</p>
                </div>
                <button
                    onClick={() => navigate('/app/practice')}
                    className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
                >
                    New Analysis
                </button>
            </div>

            {history.length === 0 ? (
                <div className="bg-white rounded-lg shadow p-12 text-center">
                    <History className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">No Analysis History</h3>
                    <p className="text-gray-600 mb-6">
                        You haven't analyzed any job descriptions yet. Start by analyzing your first JD!
                    </p>
                    <button
                        onClick={() => navigate('/app/practice')}
                        className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
                    >
                        Analyze Job Description
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-4">
                    {history.map((entry) => {
                        const readinessInfo = getReadinessLevel(entry.readinessScore)
                        const skillCount = Object.values(entry.extractedSkills).reduce(
                            (acc, category) => acc + category.skills.length,
                            0
                        )

                        return (
                            <div
                                key={entry.id}
                                onClick={() => handleViewAnalysis(entry.id)}
                                className="bg-white rounded-lg shadow hover:shadow-lg transition-all cursor-pointer p-6 border border-gray-200 hover:border-primary"
                            >
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <Briefcase className="w-5 h-5 text-primary" />
                                            <h3 className="text-xl font-semibold text-gray-900">{entry.role}</h3>
                                        </div>
                                        <p className="text-gray-600 mb-3">{entry.company}</p>

                                        <div className="flex items-center gap-4 text-sm text-gray-500">
                                            <div className="flex items-center gap-1">
                                                <Calendar className="w-4 h-4" />
                                                <span>{new Date(entry.createdAt).toLocaleDateString()}</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <TrendingUp className="w-4 h-4" />
                                                <span>{skillCount} skills detected</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <div className="text-right">
                                            <div className="text-3xl font-bold text-primary mb-1">
                                                {entry.readinessScore}
                                            </div>
                                            <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${readinessInfo.bgColor} ${readinessInfo.color}`}>
                                                {readinessInfo.level}
                                            </span>
                                        </div>

                                        <button
                                            onClick={(e) => handleDelete(entry.id, e)}
                                            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                            title="Delete analysis"
                                        >
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>

                                {/* Skills Preview */}
                                <div className="mt-4 pt-4 border-t border-gray-100">
                                    <div className="flex flex-wrap gap-2">
                                        {Object.entries(entry.extractedSkills).slice(0, 3).map(([key, category]) => (
                                            <div key={key} className="flex items-center gap-1">
                                                <span className="text-xs font-medium text-gray-500">{category.name}:</span>
                                                {category.skills.slice(0, 3).map((skill, idx) => (
                                                    <span
                                                        key={idx}
                                                        className="px-2 py-1 bg-purple-50 text-primary rounded text-xs"
                                                    >
                                                        {skill}
                                                    </span>
                                                ))}
                                            </div>
                                        ))}
                                        {Object.keys(entry.extractedSkills).length > 3 && (
                                            <span className="text-xs text-gray-500 italic">+ more</span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            )}
        </div>
    )
}
