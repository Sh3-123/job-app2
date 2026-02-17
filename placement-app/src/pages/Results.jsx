import { useEffect, useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { CheckCircle, Calendar, Lightbulb, Target, TrendingUp, ArrowLeft } from 'lucide-react'
import { getAnalysisById, getLatestAnalysis } from '../utils/storage'
import { getReadinessLevel } from '../utils/scoreCalculator'

export default function Results() {
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()
    const [analysis, setAnalysis] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const id = searchParams.get('id')

        let data = null
        if (id) {
            data = getAnalysisById(id)
        } else {
            data = getLatestAnalysis()
        }

        if (data) {
            setAnalysis(data)
        }
        setLoading(false)
    }, [searchParams])

    if (loading) {
        return (
            <div className="flex items-center justify-center py-20">
                <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
        )
    }

    if (!analysis) {
        return (
            <div className="text-center py-20">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">No Analysis Found</h2>
                <p className="text-gray-600 mb-6">Analyze a job description to see results here.</p>
                <button
                    onClick={() => navigate('/app/practice')}
                    className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90"
                >
                    Analyze JD
                </button>
            </div>
        )
    }

    const readinessInfo = getReadinessLevel(analysis.readinessScore)
    const hasSkills = Object.keys(analysis.extractedSkills).length > 0

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <button
                        onClick={() => navigate('/app/practice')}
                        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-2"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Analysis
                    </button>
                    <h2 className="text-3xl font-bold text-gray-900">{analysis.role}</h2>
                    <p className="text-gray-600">{analysis.company}</p>
                </div>
                <div className="text-right">
                    <p className="text-sm text-gray-500">Analyzed on</p>
                    <p className="text-gray-900">{new Date(analysis.createdAt).toLocaleDateString()}</p>
                </div>
            </div>

            {/* Readiness Score */}
            <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg p-6 border border-purple-200">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">Readiness Score</h3>
                        <p className="text-gray-600">Based on JD analysis and provided information</p>
                    </div>
                    <div className="text-right">
                        <div className="text-5xl font-bold text-primary">{analysis.readinessScore}</div>
                        <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium mt-2 ${readinessInfo.bgColor} ${readinessInfo.color}`}>
                            {readinessInfo.level}
                        </span>
                    </div>
                </div>
            </div>

            {/* Extracted Skills */}
            <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center gap-2 mb-4">
                    <Target className="w-5 h-5 text-primary" />
                    <h3 className="text-xl font-semibold text-gray-900">Key Skills Extracted</h3>
                </div>

                {hasSkills ? (
                    <div className="space-y-4">
                        {Object.entries(analysis.extractedSkills).map(([key, category]) => (
                            <div key={key}>
                                <h4 className="font-medium text-gray-700 mb-2">{category.name}</h4>
                                <div className="flex flex-wrap gap-2">
                                    {category.skills.map((skill, idx) => (
                                        <span
                                            key={idx}
                                            className="px-3 py-1 bg-purple-100 text-primary rounded-full text-sm font-medium"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-8 bg-gray-50 rounded-lg">
                        <p className="text-gray-600">
                            No specific skills detected. Showing general fresher preparation plan.
                        </p>
                    </div>
                )}
            </div>

            {/* Round-wise Checklist */}
            <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center gap-2 mb-4">
                    <CheckCircle className="w-5 h-5 text-primary" />
                    <h3 className="text-xl font-semibold text-gray-900">Round-wise Preparation Checklist</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {Object.entries(analysis.checklist).map(([key, round]) => (
                        <div key={key} className="border border-gray-200 rounded-lg p-4">
                            <h4 className="font-semibold text-gray-900 mb-3">{round.title}</h4>
                            <ul className="space-y-2">
                                {round.items.map((item, idx) => (
                                    <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                                        <span className="text-primary mt-1">•</span>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>

            {/* 7-Day Plan */}
            <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center gap-2 mb-4">
                    <Calendar className="w-5 h-5 text-primary" />
                    <h3 className="text-xl font-semibold text-gray-900">7-Day Preparation Plan</h3>
                </div>

                <div className="space-y-4">
                    {Object.entries(analysis.plan).map(([key, day]) => (
                        <div key={key} className="border-l-4 border-primary pl-4 py-2">
                            <h4 className="font-semibold text-gray-900 mb-2">{day.title}</h4>
                            <ul className="space-y-1">
                                {day.tasks.map((task, idx) => (
                                    <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                                        <span className="text-primary">→</span>
                                        <span>{task}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>

            {/* Interview Questions */}
            <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center gap-2 mb-4">
                    <Lightbulb className="w-5 h-5 text-primary" />
                    <h3 className="text-xl font-semibold text-gray-900">10 Likely Interview Questions</h3>
                </div>

                <div className="space-y-3">
                    {analysis.questions.map((question, idx) => (
                        <div key={idx} className="flex gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                            <span className="flex-shrink-0 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-medium">
                                {idx + 1}
                            </span>
                            <p className="text-gray-900">{question}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4">
                <button
                    onClick={() => navigate('/app/practice')}
                    className="flex-1 bg-primary text-white py-3 px-6 rounded-lg hover:bg-primary/90 transition-colors font-medium"
                >
                    Analyze Another JD
                </button>
                <button
                    onClick={() => navigate('/app/assessments')}
                    className="flex-1 bg-gray-100 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                >
                    View History
                </button>
            </div>
        </div>
    )
}
