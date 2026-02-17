export default function Resources() {
    return (
        <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Resources</h2>
            <div className="bg-white rounded-lg shadow p-6">
                <p className="text-gray-600 mb-6">Access study materials, guides, and helpful resources for placement preparation.</p>
                <div className="space-y-4">
                    {[
                        'Interview Preparation Guide',
                        'Data Structures Cheat Sheet',
                        'Algorithms Reference',
                        'System Design Fundamentals',
                        'Behavioral Interview Tips'
                    ].map((resource, idx) => (
                        <div key={idx} className="flex items-center justify-between border border-gray-200 rounded-lg p-4 hover:border-primary transition-colors">
                            <span className="font-medium text-gray-900">{resource}</span>
                            <button className="text-primary hover:underline">View</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
