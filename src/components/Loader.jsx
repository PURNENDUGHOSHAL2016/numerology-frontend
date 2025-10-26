import { FaSpinner } from "react-icons/fa";

export default function Loader() {
  return (
    <div
      style={{
        textAlign: "center",
        marginTop: "2rem",
      }}
    >
      <FaSpinner
        className="spin"
        style={{ fontSize: "2rem", color: "#00b894" }}
      />
      <p>Generating your AI numerology report...</p>
      <style>{`
        .spin {
          animation: spin 1.5s linear infinite;
        }
        @keyframes spin {
          0% { transform: rotate(0); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
