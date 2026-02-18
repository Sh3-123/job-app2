import { useState, useEffect } from 'react'
import {
    CheckCircle,
    XCircle,
    Copy,
    ExternalLink,
    Trophy,
    AlertCircle,
    Rocket,
    Link as LinkIcon
} from 'lucide-react'

const CHECKLIST_KEY = 'prp_test_checklist'
const PROOF_KEY = 'prp_final_submission'

const PROJECT_STEPS = [
    { id: 1, label: 'Project Setup & Routing' },
    { id: 2, label: 'Job Description Analysis Engine' },
    { id: 3, label: 'Data Persistence Layer' },
    { id: 4, label: 'Results & Scoring Visualization' },
    { id: 5, label: 'Interactive Readiness Plan' },
    { id: 6, label: 'Data Hardening & Validation' },
    { id: 7, label: 'System Verification Checklist' },
    { id: 8, label: 'Final Proof & Shipping' }
]

export default function ProofPage() {
    const [checklistPassed, setChecklistPassed] = useState(false)
    const [links, setLinks] = useState({
        lovable: '',
        github: '',
        deployed: ''
    })
    const [saved, setSaved] = useState(false)
    const [errors, setErrors] = useState({})

    useEffect(() => {
        // Load Checklist Status
        const checklistSaved = localStorage.getItem(CHECKLIST_KEY)
        if (checklistSaved) {
            try {
                const parsed = JSON.parse(checklistSaved)
                const count = Object.values(parsed).filter(Boolean).length
                // Assuming 10 items as per previous requirement
                setChecklistPassed(count >= 10)
            } catch (e) {
                console.error('Failed to parse checklist', e)
            }
        }

        // Load Saved Links
        const proofSaved = localStorage.getItem(PROOF_KEY)
        if (proofSaved) {
            try {
                setLinks(JSON.parse(proofSaved))
                // If loaded, we can assume saved state if valid
                setSaved(true)
            } catch (e) {
                console.error('Failed to parse proof', e)
            }
        }
    }, [])

    const validateUrl = (url) => {
        try {
            const parsed = new URL(url)
            // Check for valid protocol
            if (!['http:', 'https:'].includes(parsed.protocol)) return false

            // Check for valid hostname (must have dot or be localhost)
            const hostname = parsed.hostname
            if (hostname === 'localhost') return true

            // Basic TLD check: must have at least one dot
            // e.g. "a.co" is valid. "github" is invalid.
            const parts = hostname.split('.')
            return parts.length >= 2 && parts.every(p => p.length > 0)
        } catch {
            return false
        }
    }

    const normalizeUrl = (url) => {
        if (!url) return ''
        if (!/^https?:\/\//i.test(url)) {
            return `https://${url}`
        }
        return url
    }

    const handleLinkChange = (field, value) => {
        setLinks(prev => ({ ...prev, [field]: value }))
        setSaved(false)

        // Clear error when user types
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: null }))
        }
    }

    const saveLinks = () => {
        const newErrors = {}
        let isValid = true
        const normalizedLinks = { ...links }

        Object.keys(links).forEach((key) => {
            let url = links[key] ? links[key].trim() : ''

            if (!url) {
                newErrors[key] = 'URL is required'
                isValid = false
            } else {
                const normalized = normalizeUrl(url)
                if (!validateUrl(normalized)) {
                    newErrors[key] = 'Invalid URL format (e.g. usage: example.com)'
                    isValid = false
                } else {
                    normalizedLinks[key] = normalized
                }
            }
        })

        setErrors(newErrors)

        if (isValid) {
            setLinks(normalizedLinks)
            localStorage.setItem(PROOF_KEY, JSON.stringify(normalizedLinks))
            setSaved(true)
        }
        return isValid
    }

    const allStepsComplete = checklistPassed && saved
    const isShipped = allStepsComplete

    const copySubmission = () => {
        // Re-validate to be safe, though UI should be in saved state
        const savedLinks = JSON.parse(localStorage.getItem(PROOF_KEY) || '{}')

        const text = `
------------------------------------------
Placement Readiness Platform — Final Submission

Lovable Project: ${savedLinks.lovable || links.lovable}
GitHub Repository: ${savedLinks.github || links.github}
Live Deployment: ${savedLinks.deployed || links.deployed}

Core Capabilities:
- JD skill extraction (deterministic)
- Round mapping engine
- 7-day prep plan
- Interactive readiness scoring
- History persistence
------------------------------------------
`.trim()

        navigator.clipboard.writeText(text)
        alert('Submission copied to clipboard!')
    }

    return (
        <div className="max-w-5xl mx-auto space-y-8 pb-12">

            {/* Header / Status Banner */}
            <div className={`p-8 rounded-2xl border ${isShipped ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-200' : 'bg-white border-gray-100 shadow-sm'}`}>
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                            {isShipped ? <Trophy className="w-8 h-8 text-yellow-500" /> : <Rocket className="w-8 h-8 text-gray-400" />}
                            Project Status: <span className={isShipped ? 'text-green-600' : 'text-amber-600'}>
                                {isShipped ? 'Shipped 🚀' : 'In Progress'}
                            </span>
                        </h1>
                        <p className="mt-2 text-gray-600 max-w-xl leading-relaxed">
                            {isShipped
                                ? "You built a real product. Not a tutorial. Not a clone. A structured tool that solves a real problem. This is your proof of work."
                                : "Complete all verification steps and provide proof of deployment to ship this release."}
                        </p>
                    </div>
                    {isShipped && (
                        <div className="hidden md:flex items-center justify-center w-24 h-24 bg-green-100 rounded-full border-4 border-green-200 shadow-inner">
                            <span className="text-3xl">🎉</span>
                        </div>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Left Column: Artifact Inputs */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                        <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                            <LinkIcon className="w-5 h-5 text-primary" />
                            Deployment Artifacts
                        </h2>

                        <div className="space-y-4">
                            {[
                                { id: 'lovable', label: 'Lovable Project Link', placeholder: 'https://lovable.dev/...' },
                                { id: 'github', label: 'GitHub Repository Link', placeholder: 'https://github.com/...' },
                                { id: 'deployed', label: 'Deployed URL', placeholder: 'https://...' }
                            ].map((field) => (
                                <div key={field.id}>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        {field.label} <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="url"
                                        value={links[field.id]}
                                        onChange={(e) => handleLinkChange(field.id, e.target.value)}
                                        placeholder={field.placeholder}
                                        className={`w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-primary/20 outline-none transition-all ${errors[field.id] ? 'border-red-300 bg-red-50' : 'border-gray-200 focus:border-primary'
                                            }`}
                                    />
                                    {errors[field.id] && (
                                        <p className="text-sm text-red-500 mt-1 flex items-center gap-1">
                                            <AlertCircle className="w-3 h-3" />
                                            {errors[field.id]}
                                        </p>
                                    )}
                                </div>
                            ))}
                        </div>

                        <div className="mt-8 pt-6 border-t flex items-center gap-4">
                            <button
                                onClick={saveLinks}
                                className="px-6 py-2.5 bg-gray-900 hover:bg-gray-800 text-white font-medium rounded-lg transition-colors"
                            >
                                Save Links
                            </button>
                            {saved && (
                                <span className="text-green-600 text-sm font-medium flex items-center gap-1 animate-in fade-in">
                                    <CheckCircle className="w-4 h-4" />
                                    Saved
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Final Submission Card */}
                    {isShipped && (
                        <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl shadow-lg p-8 text-white">
                            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                                <Trophy className="w-5 h-5 text-yellow-400" />
                                Ready for Submission
                            </h2>
                            <p className="text-gray-300 mb-6 text-sm">
                                Your platform is verified and documented. Click below to copy the structured submission proof.
                            </p>

                            <button
                                onClick={copySubmission}
                                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-white text-gray-900 font-bold rounded-lg hover:bg-gray-100 transition-colors shadow-lg"
                            >
                                <Copy className="w-4 h-4" />
                                Copy Final Submission
                            </button>
                        </div>
                    )}
                </div>

                {/* Right Column: Steps Overview */}
                <div className="space-y-6">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                        <h2 className="text-lg font-bold text-gray-900 mb-4">Development Steps</h2>
                        <div className="space-y-3">
                            {PROJECT_STEPS.map((step) => {
                                // Step 7 is checklist, Step 8 is this page (links saved)
                                let isComplete = true;
                                if (step.id === 7) isComplete = checklistPassed
                                if (step.id === 8) isComplete = checklistPassed && saved // Step 8 requires Step 7 + Links

                                return (
                                    <div key={step.id} className="flex items-center gap-3 p-3 rounded-lg bg-gray-50/50">
                                        {isComplete ? (
                                            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                                        ) : (
                                            <span className="w-5 h-5 rounded-full border-2 border-gray-300 flex-shrink-0" />
                                        )}
                                        <div>
                                            <p className={`text-sm font-medium ${isComplete ? 'text-gray-900' : 'text-gray-500'}`}>
                                                {step.label}
                                            </p>
                                            <span className="text-xs text-gray-400">Step {step.id}</span>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
