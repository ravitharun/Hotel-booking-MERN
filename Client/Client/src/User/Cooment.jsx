import React from "react";
import { FaQuoteLeft } from "react-icons/fa";

const comments = [
  {
    id: 1,
    user: "Alice",
    avatar: "https://i.pravatar.cc/40?img=1",
    comment:
      "Amazing experience! The rooms were spotless and the staff was super friendly.",
    date: "2 hours ago",
  },
  {
    id: 2,
    user: "Bob",
    avatar: "https://i.pravatar.cc/40?img=2",
    comment: "Loved the food and the view from my room. Will visit again!",
    date: "5 hours ago",
  },
  {
    id: 3,
    user: "Charlie",
    avatar: "https://i.pravatar.cc/40?img=3",
    comment: "Great location and excellent service. Highly recommended.",
    date: "1 day ago",
  },
  {
    id: 4,
    user: "Diana",
    avatar: "https://i.pravatar.cc/40?img=4",
    comment: "The pool was fantastic and the breakfast buffet was delicious.",
    date: "2 days ago",
  },
];

const Cooment = () => (
  <div className="overflow-hidden w-full bg-gradient-to-r from-blue-50 to-blue-100 py-10">
    <h2 className="text-3xl font-bold text-center mb-8 text-blue-900">
      Guest Comments
    </h2>

    {/* Marquee Wrapper */}
    <div className="relative w-full">
      <div className="flex gap-8 animate-marquee">
        {comments.concat(comments).map((c, idx) => (
          <div
            key={idx}
            className="min-w-[280px] max-w-sm bg-white rounded-2xl shadow-lg p-6 flex flex-col gap-4 mx-3 hover:shadow-xl hover:scale-105 transition-transform duration-300"
          >
            {/* User Info */}
            <div className="flex items-center gap-3">
              <img
                src={c.avatar}
                alt={c.user}
                className="w-12 h-12 rounded-full border-2 border-blue-200"
              />
              <div>
                <div className="font-semibold text-blue-800">{c.user}</div>
                <div className="text-xs text-gray-400">{c.date}</div>
              </div>
            </div>

            {/* Comment */}
            <div className="text-gray-600 text-sm leading-relaxed relative pl-6 break-words">
              <FaQuoteLeft className="absolute left-0 top-0 text-blue-400 opacity-50 text-lg" />
              {c.comment}
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Tailwind animation keyframes */}
    <style>
      {`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: flex;
          animation: marquee 25s linear infinite;
        }
      `}
    </style>
  </div>
);

export default Cooment;
