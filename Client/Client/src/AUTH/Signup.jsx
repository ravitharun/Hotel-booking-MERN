import { useRef } from "react";

export default function Login() {
  const FirstName = useRef("");
  const LastName = useRef("");
  const Email = useRef("");
  const Password = useRef("");
  const ConfirmPassword = useRef("");
  const NewRegister = (event) => {
    event.preventDefault();
    const UserNew = {
      FirstName: FirstName.current.value,
      LastName: LastName.current.value,
      Email: Email.current.value,
      Password: Password.current.value,
      ConfirmPassword: ConfirmPassword.current.value,
    };
    console.log(UserNew);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="w-full max-w-5xl min-w-[350px] bg-white rounded-2xl shadow-lg grid grid-cols-1 md:grid-cols-2 overflow-hidden">
        {/* Left: Illustration / Promo */}
        <div className="hidden md:flex flex-col justify-center items-start gap-6 p-10 bg-gradient-to-br from-sky-600 to-indigo-600 text-white">
          <h2 className="text-4xl font-extrabold">
            Welcome to <span className="text-yellow-300">BookInn</span>
          </h2>
          <p className="text-base opacity-90 max-w-sm">
            Find, compare and book beautiful stays — from cozy rooms to luxury
            suites. Fast booking, secure payments, and awesome deals.
          </p>
          <ul className="mt-4 space-y-2 text-sm">
            <li>• Instant booking confirmations</li>
            <li>• Flexible cancellations</li>
            <li>• 24/7 customer support</li>
          </ul>
          <div className="mt-6 text-xs opacity-90">
            Already have an account?{" "}
            <a href="#" className="underline">
              Sign in
            </a>
          </div>
        </div>

        {/* Right: Form */}
        <div className="p-8 md:p-12">
          <div className="mb-6">
            <h3 className="text-3xl font-semibold text-gray-800">
              Create your account
            </h3>
            <span className="text-gray-400 text-sm">Create a New Account</span>
          </div>

          <form className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-medium text-gray-600">
                  First name
                </label>
                <input
                  type="text"
                  placeholder="John"
                  ref={FirstName}
                  className="mt-1 block w-full rounded-lg border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-300"
                  autoFocus
                  autoCapitalize="words"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-gray-600">
                  Last name
                </label>
                <input
                  ref={LastName}
                  type="text"
                  placeholder="Doe"
                  className="mt-1 block w-full rounded-lg border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-300"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-medium text-gray-600">Email</label>
              <input
                ref={Email}
                type="email"
                placeholder="you@example.com"
                className="mt-1 block w-full rounded-lg border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-300"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-medium text-gray-600">
                  Password
                </label>
                <input
                  ref={Password}
                  type="password"
                  placeholder="Enter password"
                  className="mt-1 block w-full rounded-lg border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-300"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-gray-600">
                  Confirm password
                </label>
                <input
                  ref={ConfirmPassword}
                  type="password"
                  placeholder="Confirm password"
                  className="mt-1 block w-full rounded-lg border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-300"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="inline-flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-sky-600 focus:ring-sky-500"
                />
                <span className="text-gray-600">
                  Keep me updated with offers
                </span>
              </label>
              <a href="#" className="text-sm text-sky-600 underline">
                Need help?
              </a>
            </div>

            <button
              type="submit"
              onClick={NewRegister}
              className="w-full py-3 rounded-lg bg-sky-600 text-white font-semibold hover:bg-sky-700 transition"
            >
              Create account
            </button>

            <div className="pt-2 text-center text-sm text-gray-500">
              or continue with
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                className="flex items-center justify-center gap-2 py-2 rounded-lg border border-gray-200"
              >
                Google
              </button>
              <button
                type="button"
                className="flex items-center justify-center gap-2 py-2 rounded-lg border border-gray-200"
              >
                Facebook
              </button>
            </div>

            <p className="text-xs text-center text-gray-400">
              By creating an account, you agree to our{" "}
              <a href="#" className="underline">
                Terms
              </a>{" "}
              and{" "}
              <a href="#" className="underline">
                Privacy Policy
              </a>
              .
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
