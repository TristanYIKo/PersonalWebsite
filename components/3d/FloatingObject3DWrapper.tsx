"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { FloatingObject } from "./FloatingObject";

export function FloatingObject3DWrapper() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 50 }}
      style={{ background: "transparent" }}
      gl={{ alpha: true, antialias: true }}
    >
      <Suspense fallback={null}>
        <FloatingObject />
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={0.5} />
      </Suspense>
    </Canvas>
  );
}
