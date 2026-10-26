"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import AvatarCharacter, { AvatarCharacterProps } from "./AvatarCharacter";

export default function CompanionCanvas(props: AvatarCharacterProps) {
  return (
    <div
      style={{ pointerEvents: "none" }}
      className="w-full h-full relative pointer-events-none webgl-canvas-container"
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        dpr={typeof window !== "undefined" ? Math.min(2, window.devicePixelRatio) : 1}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        style={{ pointerEvents: "none" }}
        className="pointer-events-none"
      >
        {/* Cinematic Holographic Lighting Setup */}
        <ambientLight intensity={1.6} />
        <directionalLight
          position={[5, 8, 5]}
          intensity={2.2}
          castShadow
          shadow-mapSize={1024}
        />
        {/* Front-left Cyan Accent Light */}
        <pointLight position={[-4, 3, -2]} intensity={2.0} color="#06b6d4" />
        {/* Front-right Violet Accent Light */}
        <pointLight position={[4, -2, 2]} intensity={2.0} color="#8b5cf6" />
        {/* Rear Rim Light for Edge Highlights */}
        <pointLight position={[0, 4, -4]} intensity={2.8} color="#ec4899" />

        <Suspense fallback={null}>
          <AvatarCharacter {...props} />
        </Suspense>
      </Canvas>
    </div>
  );
}
