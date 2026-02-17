export default function Dashboard() {
    return (
        <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Dashboard</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">Problems Solved</h3>
                    <p className="text-4xl font-bold text-primary">24</p>
                </div>
                <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">Mock Interviews</h3>
                    <p className="text-4xl font-bold text-primary">5</p>
                </div>
                <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">Success Rate</h3>
                    <p className="text-4xl font-bold text-primary">87%</p>
                </div>
            </div>
            <div className="mt-8 bg-white rounded-lg shadow p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h3>
                <p className="text-gray-600">Your recent practice sessions and assessments will appear here.</p>
            </div>
        </div>
    )
}
