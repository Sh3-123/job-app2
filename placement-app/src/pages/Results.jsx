import { useEffect, useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { CheckCircle, Calendar, Lightbulb, Target, TrendingUp, ArrowLeft, Download, Copy, Check, AlertCircle, Building2, MapPin } from 'lucide-react'
import { getAnalysisById, getLatestAnalysis, saveAnalysisEntry } from '../utils/storage'
import { getReadinessLevel } from '../utils/scoreCalculator'

export default function Results() {
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()
    const [analysis, setAnalysis] = useState(null)
    const [loading, setLoading] = useState(true)
    const [skillConfidence, setSkillConfidence] = useState({}) // skill -> "know" | "practice"
    const [liveScore, setLiveScore] = useState(0)
    const [copied, setCopied] = useState(null) // track which button was clicked

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
            // Load existing skill confidence or initialize to "practice"
            const confidence = data.skillConfidenceMap || {}
            setSkillConfidence(confidence)
            // Calculate initial live score
            calculateLiveScore(data.readinessScore, confidence)
        }
        setLoading(false)
    }, [searchParams])

    const calculateLiveScore = (baseScore, confidenceMap) => {
        let score = baseScore
        Object.values(confidenceMap).forEach(status => {
            if (status === 'know') {
                score += 1  // Changed from +2 to +1 for more balanced scoring
            } else if (status === 'practice') {
                score -= 1  // Changed from -2 to -1 for more balanced scoring
            }
        })
        // Clamp between 0 and 100
        score = Math.max(0, Math.min(100, score))
        setLiveScore(score)
    }

    const toggleSkillConfidence = (skill) => {
        const newConfidence = { ...skillConfidence }
        // Toggle: if not set or "practice", set to "know". If "know", set to "practice"
        const current = newConfidence[skill] || 'practice'
        newConfidence[skill] = current === 'practice' ? 'know' : 'practice'

        setSkillConfidence(newConfidence)
        calculateLiveScore(analysis.readinessScore, newConfidence)

        // Save to localStorage
        const updatedAnalysis = {
            ...analysis,
            skillConfidenceMap: newConfidence
        }

        // Update in localStorage by modifying the entry
        const allHistory = JSON.parse(localStorage.getItem('placement_analysis_history') || '[]')
        const index = allHistory.findIndex(entry => entry.id === analysis.id)
        if (index !== -1) {
            allHistory[index] = updatedAnalysis
            localStorage.setItem('placement_analysis_history', JSON.stringify(allHistory))
            setAnalysis(updatedAnalysis)
        }
    }

    const copyToClipboard = async (text, type) => {
        try {
            await navigator.clipboard.writeText(text)
            setCopied(type)
            setTimeout(() => setCopied(null), 2000)
        } catch (err) {
            alert('Failed to copy to clipboard')
        }
    }

    const format7DayPlan = () => {
        let text = '7-DAY PREPARATION PLAN\n'
        text += '='.repeat(50) + '\n\n'
        Object.entries(analysis.plan).forEach(([key, day]) => {
            text += `${day.title}\n`
            text += '-'.repeat(day.title.length) + '\n'
            day.tasks.forEach((task, idx) => {
                text += `${idx + 1}. ${task}\n`
            })
            text += '\n'
        })
        return text
    }

    const formatChecklist = () => {
        let text = 'ROUND-WISE PREPARATION CHECKLIST\n'
        text += '='.repeat(50) + '\n\n'
        Object.entries(analysis.checklist).forEach(([key, round]) => {
            text += `${round.title}\n`
            text += '-'.repeat(round.title.length) + '\n'
            round.items.forEach((item, idx) => {
                text += `${idx + 1}. ${item}\n`
            })
            text += '\n'
        })
        return text
    }

    const formatQuestions = () => {
        let text = '10 LIKELY INTERVIEW QUESTIONS\n'
        text += '='.repeat(50) + '\n\n'
        analysis.questions.forEach((q, idx) => {
            text += `Q${idx + 1}. ${q}\n\n`
        })
        return text
    }

    const formatFullReport = () => {
        let text = `JOB DESCRIPTION ANALYSIS REPORT\n`
        text += `${'='.repeat(50)}\n\n`
        text += `Company: ${analysis.company}\n`
        text += `Role: ${analysis.role}\n`
        text += `Analyzed: ${new Date(analysis.createdAt).toLocaleDateString()}\n`
        text += `Readiness Score: ${liveScore}/100\n\n`

        text += `KEY SKILLS EXTRACTED\n`
        text += `${'-'.repeat(50)}\n`
        Object.entries(analysis.extractedSkills).forEach(([key, category]) => {
            text += `${category.name}: ${category.skills.join(', ')}\n`
        })
        text += '\n\n'

        text += formatChecklist()
        text += '\n'
        text += format7DayPlan()
        text += '\n'
        text += formatQuestions()

        return text
    }

    const downloadAsText = () => {
        const text = formatFullReport()
        const blob = new Blob([text], { type: 'text/plain' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `${analysis.company}_${analysis.role}_Analysis.txt`.replace(/\s+/g, '_')
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(url)
    }

    const getWeakSkills = () => {
        const weak = []
        Object.entries(analysis.extractedSkills).forEach(([key, category]) => {
            category.skills.forEach(skill => {
                if ((skillConfidence[skill] || 'practice') === 'practice') {
                    weak.push(skill)
                }
            })
        })
        return weak.slice(0, 3)
    }

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

    const readinessInfo = getReadinessLevel(liveScore)
    const hasSkills = Object.keys(analysis.extractedSkills).length > 0
    const weakSkills = getWeakSkills()

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

            {/* Readiness Score - Now Live */}
            <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg p-6 border border-purple-200">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">Live Readiness Score</h3>
                        <p className="text-gray-600 text-sm">Updates as you assess your skills below</p>
                        <p className="text-xs text-gray-500 mt-1">Base: {analysis.readinessScore} | Adjusted: {liveScore}</p>
                    </div>
                    <div className="text-right">
                        <div className="text-5xl font-bold text-primary">{liveScore}</div>
                        <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium mt-2 ${readinessInfo.bgColor} ${readinessInfo.color}`}>
                            {readinessInfo.level}
                        </span>
                    </div>
                </div>
            </div>

            {/* Company Intelligence Block */}
            {analysis.companyIntel && (
                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center gap-2 mb-4">
                        <Building2 className="w-5 h-5 text-primary" />
                        <h3 className="text-xl font-semibold text-gray-900">Company Intel</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <div className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
                            <p className="text-sm text-gray-600 mb-1">Company</p>
                            <p className="font-semibold text-gray-900">{analysis.companyIntel.companyName}</p>
                        </div>
                        <div className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg border border-purple-200">
                            <p className="text-sm text-gray-600 mb-1">Industry</p>
                            <p className="font-semibold text-gray-900">{analysis.companyIntel.industry}</p>
                        </div>
                        <div className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg border border-green-200">
                            <p className="text-sm text-gray-600 mb-1">Estimated Size</p>
                            <p className="font-semibold text-gray-900">{analysis.companyIntel.sizeLabel}</p>
                        </div>
                    </div>

                    <div className="p-5 bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg border border-amber-200">
                        <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-amber-700" />
                            Typical Hiring Focus
                        </h4>
                        <p className="text-gray-800 font-medium mb-3">{analysis.companyIntel.hiringFocus.title}</p>
                        <ul className="space-y-2">
                            {analysis.companyIntel.hiringFocus.points.map((point, idx) => (
                                <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                                    <span className="text-amber-600 font-bold mt-0.5">•</span>
                                    <span>{point}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="mt-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
                        <p className="text-xs text-gray-600">
                            <strong>Demo Mode:</strong> Company intel generated heuristically based on industry patterns and detected skills.
                            No external data scraping used.
                        </p>
                    </div>
                </div>
            )}

            {/* Round Mapping Engine */}
            {analysis.companyIntel && analysis.companyIntel.rounds && (
                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center gap-2 mb-6">
                        <CheckCircle className="w-5 h-5 text-primary" />
                        <h3 className="text-xl font-semibold text-gray-900">Interview Round Flow</h3>
                        <span className="ml-auto text-xs bg-primary/10 text-primary px-3 py-1 rounded-full font-medium">
                            {analysis.companyIntel.rounds.length} Rounds
                        </span>
                    </div>

                    {/* Vertical Timeline */}
                    <div className="relative space-y-6">
                        {/* Timeline line */}
                        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-purple-400 to-pink-400"></div>

                        {analysis.companyIntel.rounds.map((round, idx) => (
                            <div key={idx} className="relative pl-12">
                                {/* Timeline dot */}
                                <div className="absolute left-0 top-2 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold text-sm shadow-lg">
                                    {idx + 1}
                                </div>

                                {/* Round card */}
                                <div className="bg-gradient-to-br from-gray-50 to-white rounded-lg border-2 border-gray-200 p-5 hover:border-primary/50 transition-all hover:shadow-md">
                                    <h4 className="font-bold text-gray-900 mb-2 text-lg">{round.title}</h4>

                                    <div className="mb-3">
                                        <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold">
                                            {round.duration}
                                        </span>
                                    </div>

                                    <div className="mb-3">
                                        <p className="text-sm text-gray-600 font-medium mb-1">Focus Areas:</p>
                                        <p className="text-gray-900">{round.focus}</p>
                                    </div>

                                    <div className="p-4 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg border border-purple-200">
                                        <p className="text-xs font-semibold text-primary mb-1">💡 Why this round matters:</p>
                                        <p className="text-sm text-gray-700">{round.why}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border-2 border-green-200">
                        <p className="text-sm text-gray-800">
                            <strong className="text-green-900">Pro Tip:</strong> This round mapping is dynamically generated based on {analysis.companyIntel.companyName}'s
                            estimated size ({analysis.companyIntel.companySize}) and the skills detected in the JD.
                            Use it as a preparation guide, but always verify with official company resources.
                        </p>
                    </div>
                </div>
            )}

            {/* Extracted Skills - Now Interactive */}

            <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                        <Target className="w-5 h-5 text-primary" />
                        <h3 className="text-xl font-semibold text-gray-900">Key Skills - Self Assessment</h3>
                    </div>
                    <p className="text-sm text-gray-500">Click to toggle your confidence level</p>
                </div>

                {hasSkills ? (
                    <div className="space-y-4">
                        {Object.entries(analysis.extractedSkills).map(([key, category]) => (
                            <div key={key}>
                                <h4 className="font-medium text-gray-700 mb-2">{category.name}</h4>
                                <div className="flex flex-wrap gap-2">
                                    {category.skills.map((skill, idx) => {
                                        const confidence = skillConfidence[skill] || 'practice'
                                        const isKnow = confidence === 'know'
                                        return (
                                            <button
                                                key={idx}
                                                onClick={() => toggleSkillConfidence(skill)}
                                                className={`px-3 py-2 rounded-full text-sm font-medium transition-all cursor-pointer border-2 ${isKnow
                                                    ? 'bg-green-100 text-green-700 border-green-300'
                                                    : 'bg-orange-50 text-orange-700 border-orange-200'
                                                    }`}
                                                title={isKnow ? 'Click to mark as "Need practice"' : 'Click to mark as "I know this"'}
                                            >
                                                <span className="flex items-center gap-1">
                                                    {isKnow ? <Check className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
                                                    {skill}
                                                </span>
                                            </button>
                                        )
                                    })}
                                </div>
                            </div>
                        ))}
                        <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                            <p className="text-sm text-blue-800">
                                <strong>Legend:</strong>
                                <span className="ml-2 inline-flex items-center gap-1">
                                    <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs border border-green-300">✓ I know this (+1)</span>
                                </span>
                                <span className="ml-2 inline-flex items-center gap-1">
                                    <span className="px-2 py-1 bg-orange-50 text-orange-700 rounded text-xs border border-orange-200">! Need practice (-1)</span>
                                </span>
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className="text-center py-8 bg-gray-50 rounded-lg">
                        <p className="text-gray-600">
                            No specific skills detected. Showing general fresher preparation plan.
                        </p>
                    </div>
                )}
            </div>

            {/* Export Tools */}
            <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Export & Save</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <button
                        onClick={() => copyToClipboard(format7DayPlan(), '7day')}
                        className="flex items-center justify-center gap-2 px-4 py-2 bg-purple-50 text-primary rounded-lg hover:bg-purple-100 transition-colors border border-purple-200"
                    >
                        {copied === '7day' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        <span className="text-sm font-medium">Copy 7-Day Plan</span>
                    </button>
                    <button
                        onClick={() => copyToClipboard(formatChecklist(), 'checklist')}
                        className="flex items-center justify-center gap-2 px-4 py-2 bg-purple-50 text-primary rounded-lg hover:bg-purple-100 transition-colors border border-purple-200"
                    >
                        {copied === 'checklist' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        <span className="text-sm font-medium">Copy Checklist</span>
                    </button>
                    <button
                        onClick={() => copyToClipboard(formatQuestions(), 'questions')}
                        className="flex items-center justify-center gap-2 px-4 py-2 bg-purple-50 text-primary rounded-lg hover:bg-purple-100 transition-colors border border-purple-200"
                    >
                        {copied === 'questions' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        <span className="text-sm font-medium">Copy Questions</span>
                    </button>
                    <button
                        onClick={downloadAsText}
                        className="flex items-center justify-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                    >
                        <Download className="w-4 h-4" />
                        <span className="text-sm font-medium">Download TXT</span>
                    </button>
                </div>
            </div>

            {/* Action Next Box */}
            {weakSkills.length > 0 && (
                <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-lg p-6 border-2 border-orange-200">
                    <div className="flex items-start gap-4">
                        <TrendingUp className="w-6 h-6 text-orange-600 flex-shrink-0 mt-1" />
                        <div className="flex-1">
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Action Next</h3>
                            <p className="text-gray-700 mb-3">
                                Focus on these skills marked as "Need practice":
                            </p>
                            <div className="flex flex-wrap gap-2 mb-4">
                                {weakSkills.map((skill, idx) => (
                                    <span key={idx} className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm font-medium">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                            <div className="p-4 bg-white rounded-lg border border-orange-200">
                                <p className="font-semibold text-gray-900 mb-1">Recommended Next Step:</p>
                                <p className="text-gray-700">Start Day 1 of your preparation plan now. Focus on basics and review fundamental concepts for these weak areas.</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

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
