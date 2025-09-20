import React from "react";

function Loader({isLoader}) {
  console.log(isLoader);
  if(!isLoader){
    return null;
  }
  return (
     <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-yellow-50 via-yellow-100 to-yellow-200">
      {/* Loader Card */}
      <div className="relative bg-white/60 backdrop-blur-xl p-10 rounded-3xl shadow-2xl border border-white/30 flex flex-col items-center text-center">
        
        {/* Rotating Circle with Hotel Icon */}
        <div className="relative w-24 h-24 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border-4 border-dashed border-yellow-500 animate-spin-slow"></div>
          <div className="w-16 h-16 rounded-full bg-yellow-500 flex items-center justify-center shadow-lg">
            <svg
              className="w-10 h-10 text-white"
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
        </div>

        {/* Main Loading Text */}
        <p className="mt-8 text-xl font-bold text-yellow-800 bg-gradient-to-r from-yellow-600 via-yellow-400 to-yellow-600 bg-clip-text text-transparent animate-shimmer">
        Hang tight, we’re almost there...

        </p>

        {/* Subtext */}
        <p className="mt-2 text-sm sm:text-base text-gray-700 animate-fade">
          Loading the page...
        </p>

        {/* Progress Bar */}
        <div className="w-56 h-3 mt-6 bg-yellow-200 rounded-full overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-yellow-600 to-yellow-400 animate-progress"></div>
        </div>
      </div>

      {/* Animations */}
      <style>
        {`
          .animate-spin-slow {
            animation: spin 3s linear infinite;
          }
          @keyframes spin {
            to { transform: rotate(360deg); }
          }

          .animate-shimmer {
            background-size: 200% auto;
            animation: shimmer 2s linear infinite;
          }
          @keyframes shimmer {
            0% { background-position: 200% center; }
            100% { background-position: -200% center; }
          }

          .animate-progress {
            width: 50%;
            animation: progress-move 2s ease-in-out infinite;
          }
          @keyframes progress-move {
            0% { left: -50%; }
            50% { left: 100%; }
            100% { left: -50%; }
          }

          .animate-fade {
            animation: fadeInOut 2s ease-in-out infinite;
          }
          @keyframes fadeInOut {
            0%, 100% { opacity: 0.4; }
            50% { opacity: 1; }
          }
        `}
      </style>
    </div>
  );
}

export default Loader;
