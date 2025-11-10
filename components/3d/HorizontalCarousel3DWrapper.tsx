"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { Horizontal3DCarousel } from "./Horizontal3DCarousel";
import * as THREE from "three";

interface CarouselItem {
  image: string;
  title: string;
}

interface HorizontalCarousel3DWrapperProps {
  items: CarouselItem[];
}

export function HorizontalCarousel3DWrapper({ items }: HorizontalCarousel3DWrapperProps) {
  return (
    <Canvas
      camera={{ 
        position: [0, 1.5, 8], // Slightly elevated for horizontal tilt
        fov: 40,
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
        <Horizontal3DCarousel items={items} />
      </Suspense>
    </Canvas>
  );
}
