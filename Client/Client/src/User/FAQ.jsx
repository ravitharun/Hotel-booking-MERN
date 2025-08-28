import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

export default function FAQ() {
  const faqs = [
    {
      question: "How can I book a hotel?",
      answer:
        "Search for hotels, choose the one you like, and click Book Now to confirm your booking.",
    },
    {
      question: "Can I cancel my booking?",
      answer:
        "Yes, you can cancel based on hotel policy. Check 'My Bookings' for cancellation options.",
    },
    {
      question: "Do you offer customer support?",
      answer: "Yes, 24/7 support is available via email or live chat.",
    },
  ];

  const [openIndex, setOpenIndex] = useState(null);

  const handleToggle = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="max-w-3xl mx-auto p-8">
      <h2 className="text-3xl font-extrabold text-gray-900 mb-8 text-center tracking-tight">
        Frequently Asked Questions
      </h2>

      <div className="space-y-4">
        {faqs.map((faq, idx) => (
          <div
            key={idx}
            className={`rounded-xl border border-gray-300 transition-shadow duration-300 ${
              openIndex === idx ? "shadow-lg" : "shadow-sm"
            }`}
          >
            <button
              className="w-full flex justify-between items-center p-5 focus:outline-none"
              onClick={() => handleToggle(idx)}
              aria-expanded={openIndex === idx}
            >
              <span className="text-lg font-medium text-gray-800">{faq.question}</span>
              <span className="ml-4 text-gray-500">
                {openIndex === idx ? <FaChevronUp /> : <FaChevronDown />}
              </span>
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 px-5 ${
                openIndex === idx ? "max-h-40 py-2" : "max-h-0"
              }`}
            >
              <p className="text-gray-700">{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
