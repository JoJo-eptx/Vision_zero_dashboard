// components/ChartCard/buttonStyles.ts
"use client";

export const buttonStyles = (isActive: boolean) => ({
  fontWeight: "bold",
  color: isActive ? "white" : "#003366",        // white text if active, dark blue if inactive
  borderColor: "#003366",                      // dark blue border
  backgroundColor: isActive ? "#003366" : "white", // dark blue bg if active
  padding: "6px 24px",
  fontSize: "0.85rem",
  borderRadius: "9px",
  transition: "all 0.2s ease",

  "&:hover": {
    backgroundColor: isActive ? "#002244" : "#e6f0ff", // slightly darker blue if active, light blue if inactive
    borderColor: "#003366",
    color: isActive ? "white" : "#003366",
    transform: "scale(1.05)",
    boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
  },

  "&.Mui-focused": {
    backgroundColor: isActive ? "#002244" : "white",
    borderColor: "#003366",
    color: isActive ? "white" : "#003366",
  },

  "&.MuiButton-contained": {
    color: isActive ? "white" : "#003366",
    borderColor: "#003366",
  },

  "&.MuiButton-contained:hover": {
    backgroundColor: isActive ? "#002244" : "#e6f0ff",
    borderColor: "#003366",
  },
});
