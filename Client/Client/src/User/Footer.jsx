import React from "react";
import {
  FaCcVisa,
  FaCcMastercard,
  FaCcAmex,
  FaCcPaypal,
  FaGooglePay,
  FaApplePay,
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white pt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap justify-between gap-8">
        {/* Logo & Brand */}
        <div className="flex-1 min-w-[250px]">
          <div className="flex items-center gap-3 mb-3">
            <img
              src="https://tse2.mm.bing.net/th/id/OIP._PxenCnInwfF8Syr0D4UaAHaFj?pid=Api&P=0&h=180"
              alt="BookInn Logo"
              className="w-12 h-12 rounded-full bg-white p-1"
            />
            <span className="text-xl font-bold tracking-wide">BookInn</span>
          </div>
          <p className="text-gray-300 text-sm">
            Making hotel booking fast, easy, and reliable.
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex-1 min-w-[200px]">
          <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
          <div className="flex flex-col gap-1">
            {["About Us", "Contact", "Privacy Policy", "FAQs", "Careers"].map(
              (link, idx) => (
                <a
                  key={idx}
                  href={`/${link.replace(/\s+/g, "").toLowerCase()}`}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  {link}
                </a>
              )
            )}
          </div>
        </div>

        {/* Contact Info */}
        <div className="flex-1 min-w-[200px]">
          <h3 className="text-lg font-semibold mb-2">Get in Touch</h3>
          <p className="text-gray-300 text-sm">📍 123 Main St, New Delhi, India</p>
          <p className="text-gray-300 text-sm">📧 support@bookinn.com</p>
          <p className="text-gray-300 text-sm">📞 +91 98765 43210</p>
        </div>

        {/* Newsletter */}
        <div className="flex-1 min-w-[250px]">
          <h3 className="text-lg font-semibold mb-2">Newsletter</h3>
          <p className="text-gray-300 text-sm mb-2">
            Stay updated with our latest offers and hotels!
          </p>
          <form className="flex gap-2">
            <input
              type="email"
              placeholder="Your email"
              className="flex-1 px-3 py-2 rounded border border-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white font-semibold transition"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Divider */}
      <div className="max-w-7xl mx-auto my-6 h-px bg-gray-700"></div>

      {/* Bottom Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
        {/* Payment Methods */}
        <div className="flex flex-wrap gap-4 text-2xl text-white">
          <FaCcVisa />
          <FaCcMastercard />
          <FaCcAmex />
          <FaCcPaypal />
          <FaGooglePay />
          <FaApplePay />
        </div>

        {/* Social Media */}
        <div className="flex gap-4 text-xl mt-3 md:mt-0">
          <a href="#" className="hover:text-blue-500 transition">
            <FaFacebookF />
          </a>
          <a href="#" className="hover:text-pink-500 transition">
            <FaInstagram />
          </a>
          <a href="#" className="hover:text-blue-400 transition">
            <FaTwitter />
          </a>
          <a href="#" className="hover:text-blue-700 transition">
            <FaLinkedinIn />
          </a>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-gray-400 text-sm mt-6 pb-4">
        &copy; {new Date().getFullYear()} BookInn Hotels. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
