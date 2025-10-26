import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";

export default function DashboardPage() {
  const { user } = useAuth();
  return (
    <div style={{ padding: "2rem 1rem" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <h2>Dashboard</h2>
        <p>
          Welcome, <strong>{user?.name}</strong>. This is your dashboard.
        </p>
        <div style={{ marginTop: 16 }}>
          <Link to="/numerology">Go to Numerology</Link>
        </div>
      </div>
    </div>
  );
}
