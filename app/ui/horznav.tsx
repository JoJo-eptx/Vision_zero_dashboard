import React from "react";
import NavLinks from "./nav-links"; // ⬅️ import your existing NavLinks component

export default function HorizontalNav() {
  return (
    <nav className="flex items-center justify-between px-6 py-3 bg-gray-50 border-b border-gray-200">
      {/* Left side — brand/title */}

      {/* Center section — Nav links */}
      <div className="flex items-center space-x-4">
        <NavLinks />
      </div>

      {/* Right side — optional user / extra buttons */}
      <div className="flex items-center space-x-2">
        {/* Placeholder for future actions */}
      </div>
    </nav>
  );
}

