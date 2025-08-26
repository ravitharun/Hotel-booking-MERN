import React from "react";

function Login() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 via-white to-blue-200">
            <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-10 border-t-8 border-blue-400">
                <div className="flex flex-col items-center mb-8">
                    <img
                        src="https://tse2.mm.bing.net/th/id/OIP._PxenCnInwfF8Syr0D4UaAHaFj?pid=Api&P=0&h=180"
                        alt="Hotel Logo"
                        className="w-16 h-16 mb-2"
                    />
                    <h2 className="text-3xl font-bold text-blue-700 mb-1">Hotel Booking Login</h2>
                    <span className="text-gray-400 text-sm">Access your account to book your stay</span>
                </div>
                <form className="space-y-5">
                    <div>
                        <label htmlFor="email" className="block text-gray-700 font-medium mb-1">
                            Email Address
                        </label>
                        <input
                            id="email"
                            type="email"
                            className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="you@email.com"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-gray-700 font-medium mb-1">
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Enter your password"
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <label className="flex items-center text-sm">
                            <input type="checkbox" className="form-checkbox text-blue-600" />
                            <span className="ml-2 text-gray-600">Remember me</span>
                        </label>
                        <a href="#" className="text-blue-600 hover:underline text-sm">
                            Forgot password?
                        </a>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg transition duration-200 shadow"
                    >
                        Sign In
                    </button>
                </form>
                <div className="mt-8 text-center text-gray-600 text-sm">
                    New to Hotel Booking?{" "}
                    <a href="#" className="text-blue-700 font-semibold hover:underline">
                        Create an account
                    </a>
                </div>
            </div>
        </div>
    );
}

export default Login;
