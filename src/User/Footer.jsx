// import React from "react";
// import {
//   FaCcVisa,
//   FaCcMastercard,
//   FaCcAmex,
//   FaCcPaypal,
//   FaGooglePay,
//   FaApplePay,
// } from "react-icons/fa";

// const Footer = () => (
//   <footer style={{ background: "#1f2937", color: "#fff", padding: "2rem 0" }}>
//     <div
//       style={{
//         maxWidth: "1200px",
//         margin: "0 auto",
//         display: "flex",
//         flexWrap: "wrap",
//         justifyContent: "space-between",
//         alignItems: "center",
//         gap: "1.5rem",
//         padding: "0 1rem",
//       }}
//     >
//       {/* Logo and Brand */}
//       <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
//         <img
//           src="https://tse2.mm.bing.net/th/id/OIP._PxenCnInwfF8Syr0D4UaAHaFj?pid=Api&P=0&h=180"
//           alt="Hotel Booking Logo"
//           style={{
//             width: 50,
//             height: 50,
//             borderRadius: "50%",
//             background: "#fff",
//           }}
//         />
//         <span
//           style={{
//             fontSize: "1.5rem",
//             fontWeight: "bold",
//             letterSpacing: "1px",
//           }}
//         >
//           BookInn
//         </span>
//       </div>

//       {/* Navigation Links */}
//       <nav style={{ display: "flex", gap: "1.5rem" }}>
//         <a href="/about" style={footerLinkStyle}>
//           About Us
//         </a>
//         <a href="/contact" style={footerLinkStyle}>
//           Contact
//         </a>
//         <a href="/privacy" style={footerLinkStyle}>
//           Privacy Policy
//         </a>
//       </nav>

//       {/* Payment Methods */}
//       <div
//         style={{
//           display: "flex",
//           gap: "1rem",
//           fontSize: "2rem",
//           flexWrap: "wrap",
//           justifyContent: "center",
//         }}
//       >
//         <FaCcVisa />
//         <FaCcMastercard />
//         <FaCcAmex />
//         <FaCcPaypal />
//         <FaGooglePay />
//         <FaApplePay />
//       </div>
//     </div>

//     {/* Copyright */}
//     <div
//       style={{
//         textAlign: "center",
//         marginTop: "1.5rem",
//         fontSize: "0.9rem",
//         color: "#d1d5db",
//       }}
//     >
//       &copy; {new Date().getFullYear()} BookInn Hotels. All rights reserved.
//     </div>
//   </footer>
// );

// const footerLinkStyle = {
//   color: "#fff",
//   textDecoration: "none",
//   fontSize: "1rem",
//   transition: "color 0.3s",
// };

// export default Footer;
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

const Footer = () => (
  <footer style={{ background: "#1f2937", color: "#fff", padding: "2rem 0" }}>
    <div
      style={{
        maxWidth: "1200px",
        margin: "0 auto",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
        alignItems: "flex-start",
        gap: "2rem",
        padding: "0 1rem",
      }}
    >
      {/* Logo & Brand */}
      <div style={{ flex: "1", minWidth: "250px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <img
            src="https://tse2.mm.bing.net/th/id/OIP._PxenCnInwfF8Syr0D4UaAHaFj?pid=Api&P=0&h=180"
            alt="Hotel Booking Logo"
            style={{
              width: 50,
              height: 50,
              borderRadius: "50%",
              background: "#fff",
            }}
          />
          <span
            style={{
              fontSize: "1.5rem",
              fontWeight: "bold",
              letterSpacing: "1px",
            }}
          >
            BookInn
          </span>
        </div>
        <p style={{ marginTop: "1rem", color: "#d1d5db", fontSize: "0.95rem" }}>
          Making hotel booking fast, easy, and reliable.
        </p>
      </div>

      {/* Quick Links */}
      <div style={{ flex: "1", minWidth: "200px" }}>
        <h3 style={footerHeadingStyle}>Quick Links</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          <a href="/about" style={footerLinkStyle}>
            About Us
          </a>
          <a href="/contact" style={footerLinkStyle}>
            Contact
          </a>
          <a href="/privacy" style={footerLinkStyle}>
            Privacy Policy
          </a>
          <a href="/faq" style={footerLinkStyle}>
            FAQs
          </a>
          <a href="/careers" style={footerLinkStyle}>
            Careers
          </a>
        </div>
      </div>

      {/* Contact Info */}
      <div style={{ flex: "1", minWidth: "200px" }}>
        <h3 style={footerHeadingStyle}>Get in Touch</h3>
        <p style={{ color: "#d1d5db", margin: "0.3rem 0" }}>
          📍 123 Main St, New Delhi, India
        </p>
        <p style={{ color: "#d1d5db", margin: "0.3rem 0" }}>
          📧 support@bookinn.com
        </p>
        <p style={{ color: "#d1d5db", margin: "0.3rem 0" }}>📞 +91 98765 43210</p>
      </div>

      {/* Newsletter */}
      <div style={{ flex: "1", minWidth: "250px" }}>
        <h3 style={footerHeadingStyle}>Newsletter</h3>
        <p style={{ color: "#d1d5db", fontSize: "0.95rem", marginBottom: "0.5rem" }}>
          Stay updated with our latest offers and hotels!
        </p>
        <form
          onSubmit={(e) => e.preventDefault()}
          style={{ display: "flex", gap: "0.5rem" }}
        >
          <input
            type="email"
            placeholder="Your email"
            className="border border-white"
            style={{
              flex: 1,
              padding: "0.5rem",
              borderRadius: "4px",
              
              outline: "none",
            }}
          />
          <button
            type="submit"
            style={{
              padding: "0.5rem 1rem",
              background: "#2563eb",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              transition: "background 0.3s",
            }}
            onMouseOver={(e) => (e.target.style.background = "#1d4ed8")}
            onMouseOut={(e) => (e.target.style.background = "#2563eb")}
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>

    {/* Divider */}
    <div
      style={{
        maxWidth: "1200px",
        margin: "2rem auto 1rem",
        height: "1px",
        background: "#374151",
      }}
    />

    {/* Bottom Section */}
    <div
      style={{
        maxWidth: "1200px",
        margin: "0 auto",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
        alignItems: "center",
        gap: "1rem",
        padding: "0 1rem",
      }}
    >
      {/* Payment Methods */}
      <div
        style={{
          display: "flex",
          gap: "0.8rem",
          fontSize: "1.5rem",
          flexWrap: "wrap",
        }}
      >
        <FaCcVisa />
        <FaCcMastercard />
        <FaCcAmex />
        <FaCcPaypal />
        <FaGooglePay />
        <FaApplePay />
      </div>

      {/* Social Media */}
      <div style={{ display: "flex", gap: "1rem", fontSize: "1.4rem" }}>
        <a href="#" style={footerLinkStyle}>
          <FaFacebookF />
        </a>
        <a href="#" style={footerLinkStyle}>
          <FaInstagram />
        </a>
        <a href="#" style={footerLinkStyle}>
          <FaTwitter />
        </a>
        <a href="#" style={footerLinkStyle}>
          <FaLinkedinIn />
        </a>
      </div>
    </div>

    {/* Copyright */}
    <div
      style={{
        textAlign: "center",
        marginTop: "1.5rem",
        fontSize: "0.9rem",
        color: "#d1d5db",
      }}
    >
      &copy; {new Date().getFullYear()} BookInn Hotels. All rights reserved.
    </div>
  </footer>
);

const footerLinkStyle = {
  color: "#fff",
  textDecoration: "none",
  fontSize: "1rem",
  transition: "color 0.3s",
};

const footerHeadingStyle = {
  fontSize: "1.2rem",
  marginBottom: "0.8rem",
  fontWeight: "600",
};

export default Footer;
