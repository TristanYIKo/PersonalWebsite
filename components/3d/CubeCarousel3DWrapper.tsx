"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { CubeCarousel } from "./CubeCarousel";
import * as THREE from "three";

interface CubeCarousel3DWrapperProps {
  images: string[];
}

export function CubeCarousel3DWrapper({ images }: CubeCarousel3DWrapperProps) {
  return (
    <div className="relative w-full h-full">
      <Canvas
        camera={{ 
          position: [0, 0, 7],
          fov: 50,
          near: 0.1,
          far: 1000
        }}
        style={{ background: "transparent" }}
        gl={{ 
          alpha: true, 
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.1
        }}
      >
        <Suspense fallback={null}>
          <CubeCarousel images={images} />
        </Suspense>
      </Canvas>
    </div>
  );
}
