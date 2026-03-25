// app/opengraph-image.tsx
import { ImageResponse } from "next/og";

// Route segment config
export const runtime = "edge";

// Image metadata
export const alt = "Nexus - Unified Team Collaboration";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    // Image HTML/CSS starts here
    <div
      style={{
        fontSize: 110,
        background: "linear-gradient(to bottom right, #8B5CF6, #4C1D95)",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        fontFamily: 'sans-serif',
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "40px", marginBottom: '20px' }}>
        {/* Match the favicon shape */}
        <div style={{ display: 'flex', gap: '15px', alignItems: 'flex-end', height: '120px' }}>
          <div style={{ width: '25px', height: '60px', background: 'white', borderRadius: '20px' }} />
          <div style={{ width: '25px', height: '120px', background: 'white', borderRadius: '20px' }} />
          <div style={{ width: '25px', height: '90px', background: 'white', borderRadius: '20px' }} />
          <div style={{ width: '25px', height: '100px', background: 'white', borderRadius: '20px' }} />
        </div>
        <span style={{ fontWeight: 900, letterSpacing: "-0.06em" }}>MindFlow</span>
      </div>
      <div
        style={{ fontSize: 32, marginTop: 20, opacity: 0.8, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.2em' }}
      >
        Tasks • Projects • Team Velocity
      </div>
    </div>,
    { ...size },
  );
}
