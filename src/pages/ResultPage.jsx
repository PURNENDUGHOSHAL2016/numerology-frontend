import ResultSection from "../components/ResultSection";
import { useLocation, Navigate } from "react-router-dom";

export default function ResultPage() {
  const location = useLocation();

  // Prefer navigation state, otherwise check sessionStorage for a persisted result.
  let data = location.state?.result;
  if (!data) {
    try {
      const s = sessionStorage.getItem("numerologyResult");
      if (s) data = JSON.parse(s);
    } catch (e) {
      data = null;
    }
  }

  // If there's no result available, don't allow visiting /result — redirect to form
  if (!data) return <Navigate to="/numerology" replace />;

  return <ResultSection result={data} />;
}
