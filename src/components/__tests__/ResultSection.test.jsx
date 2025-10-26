import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
// Make Vitest's expect available to jest-dom which expects a global `expect`
global.expect = expect;
import * as matchers from "@testing-library/jest-dom/matchers";
expect.extend(matchers);

// Mock html2canvas and jspdf to avoid heavy operations in tests
vi.mock("html2canvas", () => ({
  __esModule: true,
  default: vi.fn(() =>
    Promise.resolve({
      width: 800,
      height: 1200,
      toDataURL: () => "data:image/png;base64,fake",
      getContext: () => ({}),
    })
  ),
}));

vi.mock("jspdf", () => ({
  __esModule: true,
  default: function JsPDF() {
    return {
      internal: { pageSize: { getWidth: () => 210, getHeight: () => 297 } },
      addImage: () => {},
      addPage: () => {},
      setFontSize: () => {},
      setTextColor: () => {},
      text: () => {},
      save: () => {},
    };
  },
}));

// Render the component
import ResultSection from "../ResultSection";

const sampleResult = {
  calculations: { driverNumber: 2, conductorNumber: 8, kuaNumber: 7 },
  comprehensiveAnalysis: {
    career:
      "Your Driver Number 2 (The Diplomat) suits Counselor, mediator, artist, team player.",
    financial:
      "Your Kua Number 7 favors wealth through West, Northwest, Southwest, Northeast direction. Build prosperity there.",
    health: "Focus on holistic wellness with missing numbers: 4, 3, 5, 6.",
    recommendations: "⭐ Face West when working\nUse White,Gold,Silver color",
    relationships:
      "Your Driver-Conductor compatibility is Needs Work. Your Cooperative, sensitive, diplomatic, harmonious nature attracts compatible people.",
    spiritual:
      "Your spiritual path develops Cooperative, sensitive, diplomatic, harmonious. Meditate facing West for alignment.",
  },
  compatibility: {
    rating: "<2/5",
    description: "Needs Work",
    details:
      "Significant differences between inner desires and outer expression",
  },
  loShuGrid: {
    gridArray: ["", "9", "2222", "", "", "7", "8", "11", ""],
    gridMap: {
      1: "11",
      2: "2222",
      3: "",
      4: "",
      5: "",
      6: "",
      7: "7",
      8: "8",
      9: "9",
    },
    missing: [4, 3, 5, 6],
    repeated: [
      { number: 2, count: 4 },
      { number: 1, count: 2 },
    ],
  },
  interpretations: {
    driver: {
      name: "The Diplomat",
      characteristics: "Cooperative, sensitive, diplomatic, harmonious",
      career: "Counselor, mediator, artist, team player",
      strengths: "Peacemaker, intuitive, supportive",
      challenges: "Can be overly sensitive, indecisive, dependent",
    },
    conductor: {
      name: "The Powerhouse",
      characteristics: "Ambitious, authoritative, material success-oriented",
      career: "Executive, banker, entrepreneur, lawyer",
      strengths: "Leadership, business acumen, organizational skills",
      challenges: "Can be materialistic, controlling, workaholic",
    },
    kua: {
      element: "Metal",
      direction: "West",
      luckyColors: ["White", "Gold", "Silver"],
      favorableDirections: ["West", "Northwest", "Southwest", "Northeast"],
      personality: "Joyful, sociable, expressive",
    },
  },
  personalInfo: { name: "Purnendu Ghoshal", dob: "2002-11-29", gender: "male" },
};

describe("ResultSection", () => {
  it("renders primary personal info and core numbers", () => {
    render(<ResultSection result={sampleResult} />);

    // Name and DOB
    expect(screen.getByText(/Purnendu Ghoshal/)).toBeInTheDocument();
    expect(screen.getByText(/2002-11-29/)).toBeInTheDocument();

    // Core numbers (allow multiple places where the digits may appear)
    expect(screen.getAllByText("2").length).toBeGreaterThan(0);
    expect(screen.getAllByText("8").length).toBeGreaterThan(0);
    expect(screen.getAllByText("7").length).toBeGreaterThan(0);

    // Interpretations
    expect(screen.getAllByText(/The Diplomat/).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/The Powerhouse/).length).toBeGreaterThan(0);

    // Kua direction
    expect(screen.getAllByText(/West/).length).toBeGreaterThan(0);

    // Missing numbers displayed in legend
    expect(screen.getByText(/Missing/)).toBeInTheDocument();
    expect(screen.getAllByText("4").length).toBeGreaterThan(0);

    // Compatibility
    expect(screen.getAllByText(/Needs Work/).length).toBeGreaterThan(0);
  });

  it("renders recommendations list split by newline", () => {
    render(<ResultSection result={sampleResult} />);
    expect(
      screen.getAllByText(/Face West when working/).length
    ).toBeGreaterThan(0);
    expect(
      screen.getAllByText(/Use White,Gold,Silver color/).length
    ).toBeGreaterThan(0);
  });
});
