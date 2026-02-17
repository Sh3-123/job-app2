import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FileText, Sparkles } from 'lucide-react'
import { extractSkills } from '../utils/skillExtractor'
import { generateChecklist, generate7DayPlan, generateQuestions } from '../utils/analysisGenerator'
import { calculateReadinessScore } from '../utils/scoreCalculator'
import { saveAnalysisEntry } from '../utils/storage'

export default function Practice() {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        company: '',
        role: '',
        jdText: ''
    })
    const [analyzing, setAnalyzing] = useState(false)

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleAnalyze = () => {
        if (!formData.jdText.trim()) {
            alert('Please paste a job description to analyze')
            return
        }

        setAnalyzing(true)

        // Simulate processing time for better UX
        setTimeout(() => {
            // Extract skills
            const extractedSkills = extractSkills(formData.jdText)

            // Generate analysis outputs
            const checklist = generateChecklist(extractedSkills)
            const plan = generate7DayPlan(extractedSkills)
            const questions = generateQuestions(extractedSkills)

            // Calculate readiness score
            const readinessScore = calculateReadinessScore({
                extractedSkills,
                company: formData.company,
                role: formData.role,
                jdText: formData.jdText
            })

            // Save to localStorage
            const savedEntry = saveAnalysisEntry({
                company: formData.company || 'Unknown Company',
                role: formData.role || 'Unknown Role',
                jdText: formData.jdText,
                extractedSkills,
                checklist,
                plan,
                questions,
                readinessScore
            })

            setAnalyzing(false)

            // Navigate to results page with the ID
            navigate(`/app/results?id=${savedEntry.id}`)
        }, 1500)
    }

    return (
        <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">JD Analysis</h2>

            <div className="bg-white rounded-lg shadow p-6 max-w-4xl">
                <div className="flex items-center gap-3 mb-6">
                    <FileText className="w-6 h-6 text-primary" />
                    <h3 className="text-xl font-semibold text-gray-900">Analyze Job Description</h3>
                </div>

                <p className="text-gray-600 mb-6">
                    Paste a job description below and get instant preparation insights, skill breakdown, and a personalized study plan.
                </p>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Company Name (Optional)
                        </label>
                        <input
                            type="text"
                            name="company"
                            value={formData.company}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                            placeholder="e.g., Google, Microsoft, Amazon"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Role (Optional)
                        </label>
                        <input
                            type="text"
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                            placeholder="e.g., Software Engineer, Frontend Developer"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Job Description *
                        </label>
                        <textarea
                            name="jdText"
                            value={formData.jdText}
                            onChange={handleChange}
                            rows={12}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-mono text-sm"
                            placeholder="Paste the complete job description here..."
                        />
                        <p className="text-xs text-gray-500 mt-1">
                            {formData.jdText.length} characters
                        </p>
                    </div>

                    <button
                        onClick={handleAnalyze}
                        disabled={analyzing || !formData.jdText.trim()}
                        className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {analyzing ? (
                            <>
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                Analyzing...
                            </>
                        ) : (
                            <>
                                <Sparkles className="w-5 h-5" />
                                Analyze JD
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    )
}
