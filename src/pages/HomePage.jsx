import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function HomePage() {
  const { token } = useAuth();

  // If user is already logged in, don't allow visiting public home —
  // redirect them to the protected numerology page (or dashboard).
  if (token) return <Navigate to="/dashboard" replace />;
  return (
    <div className="home-page" style={{ padding: "2rem 1rem" }}>
      <section
        className="hero"
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          color: "#fff",
          textAlign: "left",
        }}
      >
        <h1 style={{ fontSize: "2.2rem", marginBottom: 8 }}>
          Welcome to Numerology AI
        </h1>
        <p style={{ color: "#dfefff", maxWidth: 800, lineHeight: 1.6 }}>
          This site generates an AI-enhanced numerology report based on your
          name and date of birth. It blends classical Vedic numerology concepts
          with modern AI-driven textual analysis to provide a comprehensive,
          personalized reading.
        </p>

        <div
          style={{
            marginTop: 20,
            display: "flex",
            gap: 16,
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: 220,
              height: 140,
              background: "linear-gradient(135deg,#002b36,#004d40)",
              borderRadius: 12,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* Simple Vedic SVG motif */}
            <svg
              width="140"
              height="100"
              viewBox="0 0 200 140"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="100" cy="70" r="36" fill="#00b894" opacity="0.9" />
              <path
                d="M100 34 L110 70 L140 70 L115 88 L125 122 L100 102 L75 122 L85 88 L60 70 L90 70 Z"
                fill="#fff"
                opacity="0.08"
              />
            </svg>
          </div>

          <div style={{ color: "#cfeffd" }}>
            <h3 style={{ margin: 0 }}>Ancient Wisdom</h3>
            <p style={{ margin: 0 }}>
              Vedic numerology principles with modern analysis.
            </p>
          </div>
        </div>
      </section>

      <style>{`
        /* animated background for the page */
        .home-page::before {
          content: "";
          position: fixed;
          left: 0; right: 0; top: 0; bottom: 0;
          z-index: -1;
          background: radial-gradient(circle at 10% 20%, rgba(0,185,148,0.06), transparent 10%),
                      radial-gradient(circle at 90% 80%, rgba(102,126,234,0.06), transparent 10%),
                      linear-gradient(135deg, #0f1724 0%, #142233 100%);
          animation: bgShift 12s linear infinite;
        }
        @keyframes bgShift {
          0% { background-position: 0% 0%, 0% 0%; }
          50% { background-position: 50% 50%, 50% 50%; }
          100% { background-position: 100% 100%, 100% 100%; }
        }
      `}</style>
    </div>
  );
}
