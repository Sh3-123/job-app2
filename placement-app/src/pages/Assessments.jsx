export default function Assessments() {
    return (
        <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Assessments</h2>
            <div className="bg-white rounded-lg shadow p-6">
                <p className="text-gray-600">Take timed assessments to test your knowledge and skills.</p>
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                    {['Technical Assessment', 'Aptitude Test', 'Coding Challenge', 'System Design'].map((title, idx) => (
                        <div key={idx} className="border border-gray-200 rounded-lg p-6 hover:border-primary transition-colors cursor-pointer">
                            <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
                            <p className="text-sm text-gray-600">Duration: 60 minutes</p>
                            <button className="mt-4 bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 transition-colors">
                                Start Assessment
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
