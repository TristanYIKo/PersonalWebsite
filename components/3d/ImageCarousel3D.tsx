"use client";

import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ImageCarousel3DProps {
  images: string[];
  onRotate?: (direction: number) => void;
}

export function ImageCarousel3D({ images, onRotate }: ImageCarousel3DProps) {
  const groupRef = useRef<THREE.Group>(null);
  const [isHovered, setIsHovered] = useState(false);
  const rotationSpeed = useRef(0);
  const targetSpeed = 0.004; // Slow, smooth rotation
  const manualRotation = useRef(0);

  // Tight square formation - smaller radius for closer positioning
  const radius = 2.2;
  const count = images.length;

  useFrame((state, delta) => {
    if (groupRef.current) {
      // Smooth acceleration/deceleration
      if (!isHovered) {
        rotationSpeed.current += (targetSpeed - rotationSpeed.current) * 0.05;
      } else {
        rotationSpeed.current += (0 - rotationSpeed.current) * 0.1;
      }
      
      groupRef.current.rotation.y += rotationSpeed.current;
    }
  });

  return (
    <group
      onPointerEnter={() => setIsHovered(true)}
      onPointerLeave={() => setIsHovered(false)}
    >
      <group ref={groupRef}>
        {images.map((_, index) => {
          const angle = (index / count) * Math.PI * 2;
          const x = Math.sin(angle) * radius;
          const z = Math.cos(angle) * radius;

          return (
            <mesh key={index} position={[x, 0, z]} rotation={[0, -angle, 0]}>
              {/* Slightly smaller planes for tighter look */}
              <planeGeometry args={[2, 2]} />
              <meshStandardMaterial
                color="#e8e8e6"
                side={THREE.DoubleSide}
                transparent
                opacity={0.92}
                roughness={0.5}
                metalness={0.1}
              />
              {/* Subtle border/frame */}
              <lineSegments>
                <edgesGeometry args={[new THREE.PlaneGeometry(2, 2)]} />
                <lineBasicMaterial color="#d0d0ce" transparent opacity={0.3} />
              </lineSegments>
            </mesh>
          );
        })}
      </group>

      {/* Soft, ambient lighting for minimal aesthetic */}
      <ambientLight intensity={0.9} />
      <directionalLight position={[3, 4, 5]} intensity={0.3} castShadow={false} />
      <directionalLight position={[-3, 2, -5]} intensity={0.2} />
      {/* Subtle fill light from below */}
      <pointLight position={[0, -2, 0]} intensity={0.1} color="#f6f6f4" />
    </group>
  );
}

// Export controls to be rendered outside Canvas
export function CarouselControls({
  onNext,
  onPrev,
}: {
  onNext: () => void;
  onPrev: () => void;
}) {
  return (
    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-4 z-10">
      <button
        onClick={onPrev}
        className="p-2 rounded-full bg-background/80 backdrop-blur-sm border border-border hover:bg-background/90 transition-all hover:scale-110"
        aria-label="Previous image"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        onClick={onNext}
        className="p-2 rounded-full bg-background/80 backdrop-blur-sm border border-border hover:bg-background/90 transition-all hover:scale-110"
        aria-label="Next image"
      >
        <ChevronRight className="h-5 w-5" />
      </button>
    </div>
  );
}
