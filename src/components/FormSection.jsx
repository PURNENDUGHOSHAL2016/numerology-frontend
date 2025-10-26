import { useState } from "react";
import { FaUser, FaCalendarAlt, FaMars, FaVenus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { calculateNumerology } from "../api/numerologyApi";
import Loader from "./Loader";

export default function FormSection() {
  const [name, setName] = useState("");
  const [gender, setGender] = useState("male");
  const [dob, setDob] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !dob) {
      alert("Please enter all required fields");
      return;
    }

    setLoading(true);
    try {
      const res = await calculateNumerology(name, dob, gender);
      try {
        sessionStorage.setItem("numerologyResult", JSON.stringify(res));
      } catch (e) {
        // ignore storage errors
      }
      navigate("/result", { state: { result: res } });
    } catch (err) {
      console.error(err);
      alert("Error generating result, try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-wrapper">
      {loading ? (
        <Loader />
      ) : (
        <form onSubmit={handleSubmit} className="form-container">
          <h2 className="form-header">✨ Numerology Input</h2>

          <div className="input-group">
            <label htmlFor="name" className="form-label">
              <FaUser className="icon" /> Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-input"
            />
          </div>

          <div className="input-group">
            <label htmlFor="dob" className="form-label">
              <FaCalendarAlt className="icon" /> Date of Birth
            </label>
            <input
              id="dob"
              type="date"
              placeholder="dd--mm--yyyy"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              className="form-input"
            />
          </div>

          <div className="input-group">
            <label htmlFor="gender" className="form-label">
              Gender
            </label>
            <select
              id="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="form-input"
            >
              <option value="male">Male ♂️</option>
              <option value="female">Female ♀️</option>
            </select>
          </div>

          <button type="submit" className="generate-btn">
            Generate Report
          </button>
        </form>
      )}
    </div>
  );
}
