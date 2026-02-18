import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
    CheckSquare,
    Square,
    RefreshCw,
    AlertTriangle,
    ArrowRight,
    CheckCircle2,
    ClipboardCheck
} from 'lucide-react'

const STORAGE_KEY = 'prp_test_checklist'

const TEST_ITEMS = [
    {
        id: 'jd_validation',
        label: 'JD required validation works',
        hint: 'Try processing without pasting a JD. The button should be disabled.'
    },
    {
        id: 'short_jd_warning',
        label: 'Short JD warning shows for <200 chars',
        hint: 'Paste a very short text (e.g. "Hiring dev"). Check for amber warning box.'
    },
    {
        id: 'skills_extraction',
        label: 'Skills extraction groups correctly',
        hint: 'Analyze a JD with obvious skills (Java, React). Check if categorized correctly.'
    },
    {
        id: 'round_mapping',
        label: 'Round mapping changes based on company + skills',
        hint: 'Try "Amazon" vs unknown company. Rounds should differ.'
    },
    {
        id: 'score_deterministic',
        label: 'Score calculation is deterministic',
        hint: 'Analyze same JD twice. Base score should remain identical.'
    },
    {
        id: 'score_live_update',
        label: 'Skill toggles update score live',
        hint: 'Toggle "I know this" on results page. Score should increase.'
    },
    {
        id: 'persist_refresh',
        label: 'Changes persist after refresh',
        hint: 'Toggle skills, refresh page. Score and toggles should remain.'
    },
    {
        id: 'history_save_load',
        label: 'History saves and loads correctly',
        hint: 'Check "Assessments" page. Your analysis should appear there.'
    },
    {
        id: 'export_buttons',
        label: 'Export buttons copy the correct content',
        hint: 'Click "Copy Plan" and paste elsewhere to verify content.'
    },
    {
        id: 'no_console_errors',
        label: 'No console errors on core pages',
        hint: 'Open DevTools (F12) and browse. Console should be clean.'
    }
]

export default function TestChecklist() {
    const navigate = useNavigate()
    const [checkedItems, setCheckedItems] = useState(() => {
        const saved = localStorage.getItem(STORAGE_KEY)
        if (saved) {
            try {
                return JSON.parse(saved)
            } catch (e) {
                console.error('Failed to parse checklist', e)
            }
        }
        return {}
    })

    const progress = Object.values(checkedItems).filter(Boolean).length

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(checkedItems))
    }, [checkedItems])

    const toggleItem = (id) => {
        setCheckedItems(prev => ({
            ...prev,
            [id]: !prev[id]
        }))
    }

    const resetChecklist = () => {
        if (confirm('Are you sure you want to reset all progress?')) {
            setCheckedItems({})
        }
    }

    const allPassed = progress === TEST_ITEMS.length

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            {/* Header Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                            <ClipboardCheck className="text-primary w-8 h-8" />
                            System Verification Checklist
                        </h1>
                        <p className="text-gray-500 mt-1">
                            Verify all core functionality before marking the release as stable.
                        </p>
                    </div>
                    <div className="flex items-center gap-4">
                        <button
                            onClick={resetChecklist}
                            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
                        >
                            <RefreshCw className="w-4 h-4" />
                            Reset Checklist
                        </button>
                    </div>
                </div>

                {/* Progress Bar */}
                <div className="space-y-2">
                    <div className="flex justify-between items-end">
                        <span className="text-sm font-semibold text-gray-700">
                            Tests Passed: <span className="text-primary text-lg">{progress}</span> / {TEST_ITEMS.length}
                        </span>
                        {allPassed ? (
                            <span className="text-sm font-medium text-green-600 flex items-center gap-1">
                                <CheckCircle2 className="w-4 h-4" />
                                Ready to Ship
                            </span>
                        ) : (
                            <span className="text-sm font-medium text-amber-600 flex items-center gap-1">
                                <AlertTriangle className="w-4 h-4" />
                                Fix issues before shipping
                            </span>
                        )}
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                        <div
                            className={`h-full transition-all duration-500 ease-out ${allPassed ? 'bg-green-500' : 'bg-primary'}`}
                            style={{ width: `${(progress / TEST_ITEMS.length) * 100}%` }}
                        />
                    </div>
                </div>
            </div>

            {/* Checklist Items */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="divide-y divide-gray-100">
                    {TEST_ITEMS.map((item) => {
                        const isChecked = checkedItems[item.id] || false
                        return (
                            <div
                                key={item.id}
                                onClick={() => toggleItem(item.id)}
                                className={`p-4 flex items-start gap-4 cursor-pointer transition-colors hover:bg-gray-50 ${isChecked ? 'bg-green-50/30' : ''}`}
                            >
                                <button className={`mt-0.5 flex-shrink-0 transition-colors ${isChecked ? 'text-green-600' : 'text-gray-300'}`}>
                                    {isChecked ? (
                                        <CheckSquare className="w-6 h-6" />
                                    ) : (
                                        <Square className="w-6 h-6" />
                                    )}
                                </button>
                                <div className="flex-1">
                                    <h3 className={`font-medium ${isChecked ? 'text-gray-900' : 'text-gray-700'}`}>
                                        {item.label}
                                    </h3>
                                    {item.hint && (
                                        <p className="text-sm text-gray-500 mt-1">
                                            <span className="font-semibold text-xs uppercase tracking-wider text-gray-400 mr-2">How to Test</span>
                                            {item.hint}
                                        </p>
                                    )}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>

            {/* Action Bar */}
            <div className={`flex justify-end transition-opacity duration-300 ${allPassed ? 'opacity-100' : 'opacity-50 pointer-events-none'}`}>
                <button
                    onClick={() => navigate('/prp/08-ship')}
                    disabled={!allPassed}
                    className="flex items-center gap-2 px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow-lg shadow-green-200 transition-all transform hover:-translate-y-0.5 disabled:shadow-none"
                >
                    Proceed to Shipping
                    <ArrowRight className="w-5 h-5" />
                </button>
            </div>
        </div>
    )
}
