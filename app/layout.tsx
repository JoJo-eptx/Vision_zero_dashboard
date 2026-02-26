// app/layout.tsx (or wherever your RootLayout is located)
import React from "react";
import "@/app/ui/global.css";
import HorizontalNav from "./ui/horznav";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* ✅ Load Semantic UI and El Paso CSS */}
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css"
        />
        <link
          rel="stylesheet"
          href="https://design.elpasotexas.gov/apps/components-css/symantic-css/symantic.css"
        />
        <link
          rel="stylesheet"
          href="https://design.elpasotexas.gov/apps/components-css/symantic-css/overrides.css"
        />
        <link
          rel="stylesheet"
          href="https://design.elpasotexas.gov/apps/components-css/elpaso-css/app-styles.css"
        />
      </head>
      <body>
        <div className="flex h-screen flex-col md:flex-col md:overflow-hidden">
            <HorizontalNav />
          <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
        </div>

        {/* ✅ jQuery (required by Semantic UI JavaScript) */}
        <script src="https://code.jquery.com/jquery-3.6.0.min.js" defer></script>

        {/* ✅ Semantic UI JS */}
        <script
          src="https://cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.js"
          defer
        ></script>
      </body>
    </html>
  );
}

