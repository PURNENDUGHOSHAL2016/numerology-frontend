import { FaDownload } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";

export default function ResultSection({ result }) {
  const location = useLocation();
  const navigate = useNavigate();
  // prefer prop `result` (keeps state when navigating within app),
  // but fall back to navigation state (when navigate passed state) as well
  // prefer prop or location state, otherwise try sessionStorage (survives refresh)
  let data = result || location.state?.result;
  if (!data) {
    try {
      const s = sessionStorage.getItem("numerologyResult");
      if (s) data = JSON.parse(s);
    } catch (e) {
      // ignore
    }
  }

  if (!data)
    return (
      <div style={{ padding: 20 }}>
        <h3>No result to display</h3>
        <p>Please submit the form first to generate the report.</p>
      </div>
    );

  const {
    personalInfo,
    calculations,
    loShuGrid,
    interpretations,
    comprehensiveAnalysis,
    compatibility,
  } = data;

  const handleDownload = async () => {
    window.print();
  };
  // Lo Shu grid fixed structure - each cell: {digit, label, color}
  const LO_SHU_CELLS = [
    { digit: 4, label: "Rahu", color: "#e57373" },
    { digit: 9, label: "Mars", color: "#64b5f6" },
    { digit: 2, label: "Moon", color: "#ffe082" },
    { digit: 3, label: "Jupiter", color: "#81c784" },
    { digit: 5, label: "Mercury", color: "#4fc3f7" },
    { digit: 7, label: "Ketu", color: "#7986cb" },
    { digit: 8, label: "Saturn", color: "#ffb74d" },
    { digit: 1, label: "Sun", color: "#f06292" },
    { digit: 6, label: "Venus", color: "#ffd54f" },
  ];

  function renderLoShuFullGrid(gridArr) {
    return (
      <table
        className="grid-table"
        role="table"
        aria-label="Lo Shu reference grid"
      >
        <tbody>
          {[0, 1, 2].map((row) => (
            <tr key={row}>
              {[0, 1, 2].map((col) => {
                const idx = row * 3 + col;
                const { digit, label, color } = LO_SHU_CELLS[idx];
                const val = gridArr[idx];
                const isMissing = loShuGrid.missing.includes(digit);
                const isRepeated = loShuGrid.repeated.some(
                  (r) => r.number === digit
                );
                return (
                  <td
                    key={idx}
                    className={`grid-cell${isMissing ? " missing" : ""}${
                      isRepeated ? " repeated" : ""
                    }`}
                    style={{
                      background: isMissing
                        ? "rgba(244,67,54,0.25)"
                        : color + "55",
                    }}
                  >
                    <div style={{ fontWeight: "700", fontSize: "1.1em" }}>
                      {digit}
                    </div>
                    <div
                      style={{
                        fontSize: "0.8em",
                        color: "#fff",
                        marginBottom: "0.2em",
                      }}
                    >
                      {label}
                    </div>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  // RIGHT: Dynamic Birth Chart with same design as Lo Shu Grid
  function renderBirthChart() {
    const loShuOrder = [4, 9, 2, 3, 5, 7, 8, 1, 6];

    // Define standard 1-9 birth chart cells with labels
    const BIRTH_CHART_CELLS = [
      { digit: 1, label: "Self" },
      { digit: 2, label: "Duality" },
      { digit: 3, label: "Creation" },
      { digit: 4, label: "Foundation" },
      { digit: 5, label: "Change" },
      { digit: 6, label: "Harmony" },
      { digit: 7, label: "Wisdom" },
      { digit: 8, label: "Power" },
      { digit: 9, label: "Completion" },
    ];

    return (
      <table
        className="grid-table"
        role="table"
        aria-label="Numerology birth chart"
      >
        <tbody>
          {[0, 1, 2].map((row) => (
            <tr key={row}>
              {[0, 1, 2].map((col) => {
                const idx = row * 3 + col;
                const loShuDigit = loShuOrder[idx];

                // Find the birth chart cell info (1-9)
                const birthChartCell = BIRTH_CHART_CELLS[loShuDigit - 1];

                const val = loShuGrid.gridMap[loShuDigit] || "";
                const isMissing = loShuGrid.missing.includes(loShuDigit);
                const isRepeated = loShuGrid.repeated.some(
                  (r) => r.number === loShuDigit
                );

                return (
                  <td
                    key={idx}
                    className={`grid-cell${isMissing ? " missing" : ""}${
                      isRepeated ? " repeated" : ""
                    }`}
                    style={{
                      background: isMissing
                        ? "rgba(244,67,54,0.25)"
                        : "rgba(102, 126, 234, 0.15)",
                    }}
                  >
                    <div>
                      {val
                        ? val.split("").map((d, i) => (
                            <span
                              key={i}
                              className="cell-digit"
                              style={{ fontSize: "1.1em" }}
                            >
                              {d}
                            </span>
                          ))
                        : ""}
                    </div>
                    <div
                      style={{
                        fontSize: "0.8em",
                        color: "#fff",
                        marginBottom: "0.2em",
                      }}
                    >
                      {birthChartCell.label}
                    </div>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  return (
    <div className="report-container">
      <div
        id="report-content"
        className="report-content"
        role="region"
        aria-label="Numerology report"
      >
        {/* HEADER */}
        <div className="report-header">
          <h1>🔮 Numerology Birth Chart Report</h1>
          <div className="personal-info-box">
            <div className="info-row">
              <span className="label">👤 Name:</span>
              <span className="value">{personalInfo.name}</span>
            </div>
            <div className="info-row">
              <span className="label">📅 Date of Birth:</span>
              <span className="value">{personalInfo.dob}</span>
            </div>
            <div className="info-row">
              <span className="label">⚧ Gender:</span>
              <span className="value">{personalInfo.gender.toUpperCase()}</span>
            </div>
          </div>
        </div>

        <hr className="divider" />

        {/* CORE NUMBERS */}
        <div className="core-numbers-section">
          <h2>✨ Core Numbers</h2>
          <div className="numbers-grid">
            {/* Driver Number */}
            <div className="number-card driver-card">
              <div className="number-value">{calculations.driverNumber}</div>
              <div className="number-title">Driver Number</div>
              <div className="number-subtitle">(Psychic Number)</div>
              <div className="number-type">{interpretations.driver.name}</div>
              <div className="number-description">
                {interpretations.driver.characteristics}
              </div>
            </div>

            {/* Conductor Number */}
            <div className="number-card conductor-card">
              <div className="number-value">{calculations.conductorNumber}</div>
              <div className="number-title">Conductor Number</div>
              <div className="number-subtitle">(Life Path)</div>
              <div className="number-type">
                {interpretations.conductor.name}
              </div>
              <div className="number-description">
                {interpretations.conductor.characteristics}
              </div>
            </div>

            {/* Kua Number */}
            <div className="number-card kua-card">
              <div className="number-value">{calculations.kuaNumber}</div>
              <div className="number-title">Kua Number</div>
              <div className="number-subtitle">(Feng Shui)</div>
              <div className="number-type">
                Element: {interpretations.kua.element}
              </div>
              <div className="number-description">
                Direction: {interpretations.kua.direction}
              </div>
            </div>
          </div>
        </div>

        <hr className="divider" />

        {/* BIRTH CHART (LO SHU 3x3 GRID) */}
        <div className="grids-section">
          <h2>📊 Numerology Grids</h2>

          <div className="grids-container">
            {/* Lo Shu reference grid (LEFT, always fixed with planet names!) */}
            <div className="grid-wrapper">
              <h3>🔢 Lo Shu Grid</h3>
              {renderLoShuFullGrid(loShuGrid.gridArray)}
            </div>
            {/* Your usual birth chart, right as before (highlight missing red etc) */}
            <div className="grid-wrapper">
              <h3>🧿 Numerology Birth Chart</h3>
              {renderBirthChart()}
            </div>
          </div>

          {/* Legend */}
          <div className="grid-legend">
            <div className="legend-item repeated">
              <span className="dot"></span>
              <span>
                Repeated ({loShuGrid.repeated.map((r) => r.number).join(", ")})
              </span>
            </div>
            <div className="legend-item missing">
              <span className="dot"></span>
              <span>Missing ({loShuGrid.missing.join(", ")})</span>
            </div>
          </div>
        </div>

        <hr className="divider" />

        {/* DETAILED ANALYSIS */}
        <div className="analysis-section">
          <h2>📈 Comprehensive Analysis</h2>
          <div className="analysis-card">
            <h4>💼 Career & Professional Life</h4>
            <p>{comprehensiveAnalysis.career}</p>
            <div className="detail-box">
              <strong>Best Careers:</strong> {interpretations.driver.career}
            </div>
          </div>
          <div className="analysis-card">
            <h4>❤️ Relationships & Compatibility</h4>
            <p>{comprehensiveAnalysis.relationships}</p>
            <div className="detail-box">
              <strong>Compatibility:</strong> {compatibility?.rating} -{" "}
              {compatibility?.description}
              {compatibility?.details ? (
                <div style={{ marginTop: 6 }}>{compatibility.details}</div>
              ) : null}
            </div>
          </div>
          <div className="analysis-card">
            <h4>💪 Health & Wellness</h4>
            <p>{comprehensiveAnalysis.health}</p>
          </div>
          <div className="analysis-card">
            <h4>💰 Financial & Material Success</h4>
            <p>{comprehensiveAnalysis.financial}</p>
            <div className="detail-box">
              <strong>Kua Element:</strong> {interpretations?.kua?.element}
              <br />
              <strong>Lucky Colors:</strong>{" "}
              {interpretations?.kua?.luckyColors?.join(", ")}
              <br />
              <strong>Favorable Directions:</strong>{" "}
              {interpretations?.kua?.favorableDirections?.join(", ")}
            </div>
          </div>
          <div className="analysis-card">
            <h4>🙏 Spiritual Growth & Purpose</h4>
            <p>{comprehensiveAnalysis.spiritual}</p>
          </div>
        </div>

        <hr className="divider" />

        {/* RECOMMENDATIONS */}
        <div className="recommendations-section">
          <h2>📋 Personalized Recommendations</h2>
          <div className="recommendations-list">
            {Array.isArray(comprehensiveAnalysis.recommendations)
              ? comprehensiveAnalysis.recommendations.map((rec, i) => (
                  <div key={i} className="recommendation-item">
                    <span className="rec-icon">✨</span>
                    <span>{rec}</span>
                  </div>
                ))
              : typeof comprehensiveAnalysis.recommendations === "string"
              ? comprehensiveAnalysis.recommendations
                  .split("\n")
                  .map((rec, i) => (
                    <div key={i} className="recommendation-item">
                      <span className="rec-icon">✨</span>
                      <span>{rec}</span>
                    </div>
                  ))
              : null}
          </div>
        </div>

        <hr className="divider" />

        {/* FULL INTERPRETATIONS */}
        <div className="interpretations-section">
          <h2>🔎 Interpretations</h2>
          <div className="interpretation-cards">
            <div className="interpretation-card">
              <h4>Driver - {interpretations?.driver?.name}</h4>
              <p>
                <strong>Characteristics:</strong>{" "}
                {interpretations?.driver?.characteristics}
              </p>
              <p>
                <strong>Strengths:</strong> {interpretations?.driver?.strengths}
              </p>
              <p>
                <strong>Challenges:</strong>{" "}
                {interpretations?.driver?.challenges}
              </p>
              <p>
                <strong>Career:</strong> {interpretations?.driver?.career}
              </p>
            </div>
            <div className="interpretation-card">
              <h4>Conductor - {interpretations?.conductor?.name}</h4>
              <p>
                <strong>Characteristics:</strong>{" "}
                {interpretations?.conductor?.characteristics}
              </p>
              <p>
                <strong>Strengths:</strong>{" "}
                {interpretations?.conductor?.strengths}
              </p>
              <p>
                <strong>Challenges:</strong>{" "}
                {interpretations?.conductor?.challenges}
              </p>
              <p>
                <strong>Career:</strong> {interpretations?.conductor?.career}
              </p>
            </div>
            <div className="interpretation-card">
              <h4>Kua / Feng Shui</h4>
              <p>
                <strong>Element:</strong> {interpretations?.kua?.element}
              </p>
              <p>
                <strong>Direction:</strong> {interpretations?.kua?.direction}
              </p>
              <p>
                <strong>Personality:</strong>{" "}
                {interpretations?.kua?.personality}
              </p>
              <p>
                <strong>Lucky Colors:</strong>{" "}
                {interpretations?.kua?.luckyColors?.join(", ")}
              </p>
              <p>
                <strong>Favorable Directions:</strong>{" "}
                {interpretations?.kua?.favorableDirections?.join(", ")}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div
        className="report-actions"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: 12,
        }}
      >
        <button
          className="back-btn"
          onClick={() => {
            try {
              sessionStorage.removeItem("numerologyResult");
            } catch (e) {
              // ignore storage errors
            }
            // navigate back to the numerology form - require a fresh submit
            navigate("/numerology");
          }}
          aria-label="Back to form"
          style={{
            padding: "8px 12px",
            borderRadius: 6,
          }}
        >
          ⬅ Back
        </button>

        <button
          onClick={handleDownload}
          className="back-btn"
          aria-label="Download report as PDF"
          style={{ padding: "8px 12px" }}
        >
          <FaDownload style={{ marginRight: "8px" }} /> Download as PDF
        </button>
      </div>
    </div>
  );
}
