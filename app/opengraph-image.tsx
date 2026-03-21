// app/opengraph-image.tsx
import { ImageResponse } from "next/og";

// Route segment config
export const runtime = "edge";

// Image metadata
export const alt = "MindFlow - Unified Team Collaboration";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    // Image HTML/CSS starts here
    <div
      style={{
        fontSize: 128,
        background: "linear-gradient(to bottom right, #ea580c, #c2410c)",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
        {/* A simple geometric logo shape */}
        <div
          style={{
            width: 80,
            height: 80,
            backgroundColor: "white",
            borderRadius: "20px",
          }}
        />
        <span style={{ fontWeight: 800, letterSpacing: "-0.05em" }}>MindFlow</span>
      </div>
      <div
        style={{ fontSize: 36, marginTop: 40, opacity: 0.9, fontWeight: 500 }}
      >
        Tasks • Projects • Revenue • Teams
      </div>
    </div>,
    { ...size },
  );
}
