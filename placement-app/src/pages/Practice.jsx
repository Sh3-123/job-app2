export default function Practice() {
    return (
        <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Practice Problems</h2>
            <div className="bg-white rounded-lg shadow p-6">
                <p className="text-gray-600">Browse and solve coding challenges to improve your skills.</p>
                <div className="mt-6 space-y-4">
                    {[1, 2, 3].map((num) => (
                        <div key={num} className="border border-gray-200 rounded-lg p-4 hover:border-primary transition-colors cursor-pointer">
                            <h3 className="font-semibold text-gray-900">Problem {num}</h3>
                            <p className="text-sm text-gray-600 mt-1">Difficulty: Medium</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
