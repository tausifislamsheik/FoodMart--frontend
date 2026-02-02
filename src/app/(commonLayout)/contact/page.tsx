"use client";

import { useState } from "react";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [focused, setFocused] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  const info = [
    {
      icon: (
        <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
          <polyline points="22,6 12,13 2,6"/>
        </svg>
      ),
      label: "Email",
      value: "support@foodmart.com",
    },
    {
      icon: (
        <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
        </svg>
      ),
      label: "Phone",
      value: "+880 1865619327",
    },
    {
      icon: (
        <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
          <circle cx="12" cy="10" r="3"/>
        </svg>
      ),
      label: "Address",
      value: "Dhaka, Bangladesh",
    },
    {
      icon: (
        <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10"/>
          <polyline points="12 6 12 12 16 14"/>
        </svg>
      ),
      label: "Support Hours",
      value: "Sun – Thu, 9 AM – 6 PM",
    },
  ];

  return (
    <div style={{ fontFamily: "'Georgia', serif", minHeight: "100vh", background: "#f4f1ec", color: "#1a1a1a" }}>
      {/* ─── Hero ─── */}
      <header style={{ position: "relative", overflow: "hidden", background: "linear-gradient(135deg, #1a1a1a 0%, #2c2420 100%)", padding: "100px 24px 90px" }}>
        {/* Decorative circles */}
        <div style={{ position: "absolute", top: "-80px", right: "-80px", width: "320px", height: "320px", borderRadius: "50%", border: "1px solid rgba(230,160,80,0.15)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: "-40px", right: "-40px", width: "320px", height: "320px", borderRadius: "50%", border: "1px solid rgba(230,160,80,0.08)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "-100px", left: "-60px", width: "280px", height: "280px", borderRadius: "50%", border: "1px solid rgba(230,160,80,0.1)", pointerEvents: "none" }} />

        <div style={{ maxWidth: "720px", margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "10px", background: "rgba(230,160,80,0.1)", border: "1px solid rgba(230,160,80,0.25)", borderRadius: "30px", padding: "6px 18px", marginBottom: "32px" }}>
            <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#e6a050", boxShadow: "0 0 8px rgba(230,160,80,0.5)" }} />
            <span style={{ color: "#e6a050", fontSize: "13px", letterSpacing: "1.5px", textTransform: "uppercase", fontFamily: "'Helvetica Neue', sans-serif", fontWeight: 500 }}>We're here to help</span>
          </div>
          <h1 style={{ fontSize: "clamp(38px, 6vw, 62px)", fontWeight: 400, color: "#fff", lineHeight: 1.15, marginBottom: "20px", letterSpacing: "-0.5px" }}>
            Contact <span style={{ color: "#e6a050", fontStyle: "italic" }}>FoodMart</span>
          </h1>
          <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "17px", lineHeight: 1.7, maxWidth: "480px", margin: "0 auto", fontFamily: "'Helvetica Neue', sans-serif" }}>
            Have a question, idea, or just want to say hello? Our team is always ready to connect.
          </p>
        </div>
      </header>

      {/* ─── Main Content ─── */}
      <main style={{ maxWidth: "1080px", margin: "0 auto", padding: "80px 24px 100px", display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: "56px", alignItems: "start" }}>
        {/* Left – Info Panel */}
        <aside>
          <h2 style={{ fontSize: "22px", fontWeight: 400, color: "#1a1a1a", marginBottom: "8px", letterSpacing: "-0.3px" }}>
            Get in touch
          </h2>
          <div style={{ width: "36px", height: "2px", background: "#e6a050", marginBottom: "32px" }} />

          <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
            {info.map((item, i) => (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "18px" }}>
                <div style={{
                  flexShrink: 0, width: "48px", height: "48px", borderRadius: "14px",
                  background: "linear-gradient(135deg, #fff8f0, #ffecd9)",
                  border: "1px solid rgba(230,160,80,0.2)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "#e6a050"
                }}>
                  {item.icon}
                </div>
                <div>
                  <p style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "1.4px", color: "#999", fontFamily: "'Helvetica Neue', sans-serif", fontWeight: 500, marginBottom: "4px" }}>{item.label}</p>
                  <p style={{ fontSize: "15.5px", color: "#333", fontFamily: "'Helvetica Neue', sans-serif", lineHeight: 1.5 }}>{item.value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Social */}
          <div style={{ marginTop: "48px", paddingTop: "36px", borderTop: "1px solid #e0dbd4" }}>
            <p style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "1.4px", color: "#999", fontFamily: "'Helvetica Neue', sans-serif", fontWeight: 500, marginBottom: "16px" }}>Follow us</p>
            <div style={{ display: "flex", gap: "12px" }}>
              {["𝕏", "in", "f"].map((icon, i) => (
                <div key={i} style={{
                  width: "40px", height: "40px", borderRadius: "10px",
                  border: "1px solid #e0dbd4", display: "flex", alignItems: "center", justifyContent: "center",
                  color: "#888", fontSize: "15px", cursor: "pointer", transition: "all 0.2s",
                  fontFamily: "'Helvetica Neue', sans-serif", fontWeight: 600
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "#e6a050"; e.currentTarget.style.color = "#e6a050"; e.currentTarget.style.background = "#fff8f0"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "#e0dbd4"; e.currentTarget.style.color = "#888"; e.currentTarget.style.background = "transparent"; }}
                >
                  {icon}
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* Right – Form */}
        <section style={{
          background: "#fff", borderRadius: "20px", padding: "44px 40px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.04), 0 12px 40px rgba(0,0,0,0.06)",
          border: "1px solid rgba(0,0,0,0.06)", position: "relative", overflow: "hidden"
        }}>
          {/* Decorative accent corner */}
          <div style={{ position: "absolute", top: 0, right: 0, width: "120px", height: "120px", background: "linear-gradient(225deg, #fff5eb 0%, transparent 70%)", pointerEvents: "none" }} />

          <div style={{ position: "relative", zIndex: 1 }}>
            <h3 style={{ fontSize: "21px", fontWeight: 400, color: "#1a1a1a", marginBottom: "6px", letterSpacing: "-0.3px" }}>Send a message</h3>
            <div style={{ width: "36px", height: "2px", background: "#e6a050", marginBottom: "32px" }} />

            {submitted && (
              <div style={{
                background: "linear-gradient(135deg, #f0fdf4, #dcfce7)", border: "1px solid #86efac",
                borderRadius: "12px", padding: "14px 20px", marginBottom: "24px",
                display: "flex", alignItems: "center", gap: "12px"
              }}>
                <svg width="20" height="20" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
                <span style={{ color: "#15803d", fontSize: "14px", fontFamily: "'Helvetica Neue', sans-serif", fontWeight: 500 }}>Message sent successfully! We'll get back to you soon.</span>
              </div>
            )}

            <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
              {[
                { name: "name", placeholder: "Full Name", type: "text" },
                { name: "email", placeholder: "Email Address", type: "email" },
                { name: "subject", placeholder: "Subject", type: "text" },
              ].map((field) => (
                <div key={field.name}>
                  <label style={{ display: "block", fontSize: "11px", textTransform: "uppercase", letterSpacing: "1.3px", color: focused === field.name ? "#e6a050" : "#999", fontFamily: "'Helvetica Neue', sans-serif", fontWeight: 500, marginBottom: "8px", transition: "color 0.2s" }}>
                    {field.placeholder}
                  </label>
                  <input
                    type={field.type}
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleChange}
                    onFocus={() => setFocused(field.name)}
                    onBlur={() => setFocused(null)}
                    placeholder=""
                    style={{
                      width: "100%", boxSizing: "border-box", padding: "13px 16px", fontSize: "15px",
                      fontFamily: "'Helvetica Neue', sans-serif", color: "#1a1a1a",
                      border: `1.5px solid ${focused === field.name ? "#e6a050" : "#e0dbd4"}`,
                      borderRadius: "10px", outline: "none", background: focused === field.name ? "#fffcf9" : "#fafaf8",
                      transition: "all 0.2s", boxShadow: focused === field.name ? "0 0 0 3px rgba(230,160,80,0.12)" : "none"
                    }}
                  />
                </div>
              ))}

              {/* Textarea */}
              <div>
                <label style={{ display: "block", fontSize: "11px", textTransform: "uppercase", letterSpacing: "1.3px", color: focused === "message" ? "#e6a050" : "#999", fontFamily: "'Helvetica Neue', sans-serif", fontWeight: 500, marginBottom: "8px", transition: "color 0.2s" }}>
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  onFocus={() => setFocused("message")}
                  onBlur={() => setFocused(null)}
                  rows={4}
                  placeholder=""
                  style={{
                    width: "100%", boxSizing: "border-box", padding: "13px 16px", fontSize: "15px",
                    fontFamily: "'Helvetica Neue', sans-serif", color: "#1a1a1a", resize: "vertical",
                    border: `1.5px solid ${focused === "message" ? "#e6a050" : "#e0dbd4"}`,
                    borderRadius: "10px", outline: "none", background: focused === "message" ? "#fffcf9" : "#fafaf8",
                    transition: "all 0.2s", boxShadow: focused === "message" ? "0 0 0 3px rgba(230,160,80,0.12)" : "none"
                  }}
                />
              </div>

              {/* Submit */}
              <button
                onClick={handleSubmit}
                style={{
                  marginTop: "8px", width: "100%", padding: "14px 24px", border: "none", borderRadius: "10px",
                  background: "linear-gradient(135deg, #e6a050, #d4813a)", color: "#fff", fontSize: "14px",
                  fontFamily: "'Helvetica Neue', sans-serif", fontWeight: 600, letterSpacing: "0.8px",
                  cursor: "pointer", transition: "all 0.25s", boxShadow: "0 4px 14px rgba(230,160,80,0.35)",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: "10px"
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = "0 6px 20px rgba(230,160,80,0.45)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 14px rgba(230,160,80,0.35)"; }}
              >
                <svg width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
                Send Message
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ContactPage;