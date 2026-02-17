export default function Profile() {
    return (
        <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Profile</h2>
            <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center gap-6 mb-8">
                    <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center text-white text-4xl font-semibold">
                        U
                    </div>
                    <div>
                        <h3 className="text-2xl font-semibold text-gray-900">User Name</h3>
                        <p className="text-gray-600">user@example.com</p>
                    </div>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                        <input
                            type="text"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                            placeholder="Enter your name"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input
                            type="email"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                            placeholder="Enter your email"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">College</label>
                        <input
                            type="text"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                            placeholder="Enter your college name"
                        />
                    </div>
                    <button className="mt-4 bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors">
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    )
}
