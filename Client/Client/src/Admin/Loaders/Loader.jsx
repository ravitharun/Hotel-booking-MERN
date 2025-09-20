import React from "react";

function Loader() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-yellow-100 via-yellow-200 to-yellow-300">
      <div className="relative bg-white/40 backdrop-blur-lg p-8 rounded-2xl shadow-xl border border-white/20 flex flex-col items-center">
        {/* Hotel Bell Icon */}
        <div className="w-20 h-20 rounded-full bg-yellow-500 flex items-center justify-center shadow-lg animate-bounce">
          <svg
            className="w-12 h-12 text-white"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path
              d="M12 3v2m0 0a7 7 0 017 7v2H5v-2a7 7 0 017-7zm-7 9h14a2 2 0 012 2v2a2 2 0 01-2 2H5a2 2 0 01-2-2v-2a2 2 0 012-2z"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* Animated Dots */}
        <div className="flex justify-center mt-6 space-x-3">
          <span
            className="w-3 h-3 bg-yellow-400 rounded-full animate-bounce"
            style={{ animationDelay: "0s" }}
          ></span>
          <span
            className="w-3 h-3 bg-yellow-500 rounded-full animate-bounce"
            style={{ animationDelay: "0.2s" }}
          ></span>
          <span
            className="w-3 h-3 bg-yellow-600 rounded-full animate-bounce"
            style={{ animationDelay: "0.4s" }}
          ></span>
        </div>

        {/* Loading Text */}
        <p className="mt-6 text-lg sm:text-xl font-semibold text-yellow-800 animate-pulse text-center">
          Loading Admin Dashboard...
        </p>

        {/* Progress Bar */}
        <div className="w-48 h-2 mt-6 bg-yellow-200 rounded-full overflow-hidden">
          <div className="h-full bg-yellow-600 animate-[progress_2s_ease-in-out_infinite]" />
        </div>
      </div>

      {/* Keyframes for progress bar */}
      <style>
        {`
          @keyframes progress {
            0% { width: 0%; }
            50% { width: 80%; }
            100% { width: 0%; }
          }
        `}
      </style>
    </div>
  );
}

export default Loader;
