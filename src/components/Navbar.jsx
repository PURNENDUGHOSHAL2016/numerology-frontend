import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Navbar() {
  const { user, token, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="site-header" style={{ marginBottom: 16 }}>
      <nav
        className="nav-bar"
        style={{
          display: "flex",
          gap: 12,
          alignItems: "center",
          justifyContent: "space-between",
          maxWidth: 1100,
          margin: "0 auto",
          padding: "0 1rem",
        }}
      >
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <NavLink
            to="/"
            className="nav-brand"
            style={{ fontWeight: 800, color: "#fff", textDecoration: "none" }}
          >
            Numerology AI
          </NavLink>
          {!token && (
            <NavLink to="/" className="nav-link">
              Home
            </NavLink>
          )}
          {token && (
            <NavLink to="/dashboard" className="nav-link">
              Dashboard
            </NavLink>
          )}
          {token && (
            <NavLink to="/numerology" className="nav-link">
              Numerology
            </NavLink>
          )}
        </div>

        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          {token ? (
            <>
              <span style={{ color: "#fff", fontWeight: 600 }}>
                Hi, {user?.name || "User"}
              </span>
              <button
                className="btn-ghost"
                onClick={() => {
                  logout();
                  navigate("/login");
                }}
                style={{ padding: "6px 10px" }}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" className="nav-link">
                Login
              </NavLink>
              <NavLink to="/register" className="nav-link">
                Register
              </NavLink>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
