"use client";

/**
 * AmbientBackground — Full-Stack "Client-to-Server" living background.
 * Renders a subtle grid overlay and floating tech icons at very low opacity
 * to give the page a "breathing data center" feel without distracting from content.
 */
export default function AmbientBackground() {
  // Each icon has: SVG path(s), position, animation timing
  const icons = [
    {
      // Browser / Frontend
      paths: [
        "M3 5a2 2 0 012-2h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5z",
        "M3 8h18M8 3v5",
      ],
      style: { top: "8%", left: "12%", "--float-duration": "9s", "--pulse-duration": "7s", "--delay": "0s" } as React.CSSProperties,
      size: 32,
    },
    {
      // Server
      paths: [
        "M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01",
      ],
      style: { top: "15%", right: "8%", "--float-duration": "11s", "--pulse-duration": "8s", "--delay": "1.5s" } as React.CSSProperties,
      size: 36,
    },
    {
      // Database
      paths: [
        "M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4",
      ],
      style: { top: "45%", right: "5%", "--float-duration": "10s", "--pulse-duration": "6s", "--delay": "3s" } as React.CSSProperties,
      size: 34,
    },
    {
      // Cloud
      paths: [
        "M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z",
      ],
      style: { top: "25%", left: "5%", "--float-duration": "12s", "--pulse-duration": "9s", "--delay": "2s" } as React.CSSProperties,
      size: 38,
    },
    {
      // Lock / Security
      paths: [
        "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z",
      ],
      style: { bottom: "20%", left: "10%", "--float-duration": "8s", "--pulse-duration": "7s", "--delay": "4s" } as React.CSSProperties,
      size: 30,
    },
    {
      // Code brackets
      paths: [
        "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4",
      ],
      style: { top: "60%", left: "18%", "--float-duration": "10s", "--pulse-duration": "8s", "--delay": "1s" } as React.CSSProperties,
      size: 28,
    },
    {
      // API / Lightning bolt
      paths: [
        "M13 10V3L4 14h7v7l9-11h-7z",
      ],
      style: { top: "35%", right: "15%", "--float-duration": "9s", "--pulse-duration": "7s", "--delay": "2.5s" } as React.CSSProperties,
      size: 26,
    },
    {
      // Circuit / CPU
      paths: [
        "M9 3v2m6-2v2M9 19v2m6-2v2M3 9h2m-2 6h2m14-6h2m-2 6h2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z",
      ],
      style: { bottom: "30%", right: "12%", "--float-duration": "11s", "--pulse-duration": "6s", "--delay": "3.5s" } as React.CSSProperties,
      size: 32,
    },
    {
      // Globe / Network
      paths: [
        "M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9",
      ],
      style: { top: "70%", left: "6%", "--float-duration": "13s", "--pulse-duration": "8s", "--delay": "0.5s" } as React.CSSProperties,
      size: 34,
    },
    {
      // Terminal
      paths: [
        "M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
      ],
      style: { top: "80%", right: "18%", "--float-duration": "10s", "--pulse-duration": "7s", "--delay": "4.5s" } as React.CSSProperties,
      size: 30,
    },
    {
      // React atom
      paths: [
        "M12 12m-1 0a1 1 0 102 0 1 1 0 10-2 0",
        "M12 12m-9 0a9 3 0 1018 0 9 3 0 10-18 0",
      ],
      style: { top: "50%", left: "50%", "--float-duration": "14s", "--pulse-duration": "9s", "--delay": "2s" } as React.CSSProperties,
      size: 40,
      rotate: true,
    },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {/* Grid overlay */}
      <div className="grid-overlay" />

      {/* Atmospheric Gradient Mesh Glows — Calibrated to Dual-Tone Studio Lighting */}
      {/* Top-Left Cyan Ambient Halo (matches left rim light) */}
      <div
        className="absolute w-[720px] h-[720px] rounded-full blur-[110px] pointer-events-none"
        style={{
          top: "-15%",
          left: "2%",
          background: "radial-gradient(circle, rgba(6, 182, 212, 0.22) 0%, rgba(56, 189, 248, 0.08) 45%, transparent 70%)",
        }}
      />
      {/* Top-Right & Hero Violet/Lavender Ambient Halo (matches photo backdrop & right rim light) */}
      <div
        className="absolute w-[780px] h-[780px] rounded-full blur-[120px] pointer-events-none"
        style={{
          top: "-10%",
          right: "2%",
          background: "radial-gradient(circle, rgba(139, 92, 246, 0.25) 0%, rgba(168, 85, 247, 0.10) 45%, transparent 70%)",
        }}
      />
      {/* Mid-canvas Indigo Depth Glow */}
      <div
        className="absolute w-[650px] h-[650px] rounded-full blur-[130px] pointer-events-none"
        style={{
          top: "40%",
          left: "30%",
          background: "radial-gradient(circle, rgba(99, 102, 241, 0.14) 0%, transparent 65%)",
        }}
      />
      {/* Bottom-Right Cyan Accent */}
      <div
        className="absolute w-[600px] h-[600px] rounded-full blur-[100px] pointer-events-none"
        style={{
          bottom: "-8%",
          right: "8%",
          background: "radial-gradient(circle, rgba(6, 182, 212, 0.16) 0%, transparent 70%)",
        }}
      />
      {/* Bottom-Left Twilight Violet Accent */}
      <div
        className="absolute w-[560px] h-[560px] rounded-full blur-[110px] pointer-events-none"
        style={{
          bottom: "12%",
          left: "-5%",
          background: "radial-gradient(circle, rgba(139, 92, 246, 0.18) 0%, transparent 70%)",
        }}
      />

      {/* Floating tech icons */}
      {icons.map((icon, i) => (
        <div
          key={i}
          className="ambient-icon"
          style={icon.style}
        >
          <svg
            width={icon.size}
            height={icon.size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            style={icon.rotate ? { transform: "rotate(30deg)" } : undefined}
          >
            {icon.paths.map((d, j) => (
              <path key={j} d={d} />
            ))}
          </svg>
        </div>
      ))}
    </div>
  );
}
