import React from "react";

const Footer = () => (
    <footer style={{ background: "#222", color: "#fff", padding: "2rem 0" }}>
        <div style={{
            maxWidth: "1200px",
            margin: "0 auto",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center"
        }}>
            {/* Logo and Brand */}
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                <img
                    src="https://tse2.mm.bing.net/th/id/OIP._PxenCnInwfF8Syr0D4UaAHaFj?pid=Api&P=0&h=180" // Replace with your logo path
                    alt="Hotel Booking Logo"
                    style={{ width: 48, height: 48, borderRadius: "50%", background: "#fff" }}
                />
                <span style={{ fontSize: "1.5rem", fontWeight: "bold", letterSpacing: "1px" }}>
                    BookInn
                </span>
            </div>
            {/* Links */}
            <nav>
                <a href="/about" style={footerLinkStyle}>About Us</a>
                <a href="/contact" style={footerLinkStyle}>Contact</a>
                <a href="/privacy" style={footerLinkStyle}>Privacy Policy</a>
            </nav>
            {/* Copyright */}
            <div style={{ fontSize: "0.95rem", marginTop: "1rem" }}>
                &copy; {new Date().getFullYear()} StayEase Hotels. All rights reserved.
            </div>
        </div>
    </footer>
);

const footerLinkStyle = {
    color: "#fff",
    margin: "0 1rem",
    textDecoration: "none",
    fontSize: "1rem",
    transition: "color 0.2s",
};

export default Footer;