import { useState, useEffect } from 'react'
import { Rocket, Lock, CheckCircle, ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const STORAGE_KEY = 'prp_test_checklist'

export default function ShipPage() {
    const navigate = useNavigate()
    const [isLocked, setIsLocked] = useState(true)

    useEffect(() => {
        const saved = localStorage.getItem(STORAGE_KEY)
        if (saved) {
            try {
                const checked = JSON.parse(saved)
                // Assuming 10 test items in the checklist
                const totalPassed = Object.values(checked).filter(Boolean).length
                if (totalPassed >= 10) {
                    setIsLocked(false)
                }
            } catch (e) {
                console.error('Failed to parse checklist', e)
            }
        }
    }, [])

    if (isLocked) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-8 space-y-6">
                <div className="p-6 bg-gray-100 rounded-full mb-4">
                    <Lock className="w-16 h-16 text-gray-400" />
                </div>
                <h1 className="text-3xl font-bold text-gray-900">Shipping Locked</h1>
                <p className="text-lg text-gray-600 max-w-md">
                    You must pass all 10 verification tests before shipping the release.
                    Please complete the checklist first.
                </p>
                <button
                    onClick={() => navigate('/prp/07-test')}
                    className="flex items-center gap-2 px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                >
                    <ArrowLeft className="w-5 h-5" />
                    Go Back to Checklist
                </button>
            </div>
        )
    }

    return (
        <div className="max-w-4xl mx-auto space-y-12 py-12 text-center">
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-12 border border-green-100 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                    <Rocket className="w-96 h-96 text-green-600 transform rotate-12" />
                </div>

                <div className="relative z-10 space-y-8">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-full font-medium text-sm">
                        <CheckCircle className="w-4 h-4" />
                        All Verification Tests Passed
                    </div>

                    <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600">
                        Ready for Takeoff!
                    </h1>

                    <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                        Congratulations! The Platform Verification Checklist is complete.
                        The system is stable, tested, and ready for deployment.
                    </p>

                    <div className="flex justify-center gap-4 pt-8">
                        <button
                            onClick={() => alert('Deployment sequence initiated... (Simulation)')}
                            className="flex items-center gap-3 px-8 py-4 bg-green-600 hover:bg-green-700 text-white font-bold text-lg rounded-xl shadow-lg shadow-green-200 transition-all transform hover:-translate-y-1 hover:shadow-2xl"
                        >
                            <Rocket className="w-6 h-6" />
                            Ship Release v1.0
                        </button>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
                {[
                    { title: 'Performance', desc: 'Optimized for <100ms load times' },
                    { title: 'Reliability', desc: '99.9% uptime guaranteed' },
                    { title: 'Security', desc: 'End-to-end encryption active' }
                ].map((feature, i) => (
                    <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                        <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                        <p className="text-gray-500 text-sm">{feature.desc}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}
