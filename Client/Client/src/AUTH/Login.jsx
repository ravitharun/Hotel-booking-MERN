import { useRef } from "react";
import { Link } from "react-router-dom";

function Login() {
  const Email = useRef("");
  const Password = useRef("");
  const Login = (event) => {
    event.preventDefault();
    const data = {
      Email: Email.current.value,
      Password: Password.current.value,
    };
    if (data.Email == "" || Password.current.value == "") {
      console.log("object");
    } else {
      console.log("send api");
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 via-white to-blue-200">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-10 border-t-8 border-blue-400">
        <div className="flex flex-col items-center mb-8">
          <img
            src="https://tse2.mm.bing.net/th/id/OIP._PxenCnInwfF8Syr0D4UaAHaFj?pid=Api&P=0&h=180"
            alt="Hotel Logo"
            className="w-16 h-16 mb-2"
          />
          <h2 className="text-3xl font-bold text-blue-700 mb-1">
            Hotel Booking Login
          </h2>
          <span className="text-gray-400 text-sm">
            Access your account to book your stay
          </span>
        </div>
        <form className="space-y-5">
          <div className="w-full">
            <label className="text-xs font-medium text-gray-600 block mb-1">
              Select The Role
            </label>
            <select className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-300">
              <option value="">Choose Role</option>
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-gray-700 font-medium mb-1"
            >
              Email Address
            </label>
            <input
              id="email"
              ref={Email}
              type="email"
              className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="you@email.com"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium mb-1"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              ref={Password}
              className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your password"
            />
          </div>
          <div className="flex items-center justify-between">
            <label className="flex items-center text-sm">
              <input type="checkbox" className="form-checkbox text-blue-600" />
              <span className="ml-2 text-gray-600">Remember me</span>
            </label>
            <Link
              to="/forget-password"
              className="text-blue-600 hover:underline text-sm"
            >
              Forgot password?
            </Link>
          </div>
          <button
            type="submit"
            onClick={Login}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg transition duration-200 shadow"
          >
            Sign In
          </button>
        </form>
        <div className="mt-8 text-center text-gray-600 text-sm">
          New to Hotel Booking?{" "}
          <Link
            to="/Create"
            className="text-blue-700 font-semibold hover:underline"
          >
            Create an account
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
