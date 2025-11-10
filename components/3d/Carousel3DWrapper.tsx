"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { ImageCarousel3D } from "./ImageCarousel3D";

interface Carousel3DWrapperProps {
  images: string[];
  currentIndex?: number;
}

export function Carousel3DWrapper({ images, currentIndex = 0 }: Carousel3DWrapperProps) {
  return (
    <Canvas
      camera={{ 
        position: [0, 2.5, 6], // Slightly elevated for top-down view
        fov: 45,
        near: 0.1,
        far: 1000
      }}
      style={{ background: "transparent" }}
      gl={{ 
        alpha: true, 
        antialias: true,
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.2
      }}
    >
      <Suspense fallback={null}>
        <ImageCarousel3D images={images} />
      </Suspense>
    </Canvas>
  );
}

// Import THREE for tone mapping
import * as THREE from "three";
