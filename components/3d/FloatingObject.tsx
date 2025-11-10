"use client";

import { useRef, useEffect, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function FloatingObject() {
  const meshRef = useRef<THREE.Group>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // Calculate scroll progress from hero section (first 100vh)
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;
      const progress = Math.min(scrollY / viewportHeight, 1);
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useFrame((state) => {
    if (meshRef.current) {
      // Idle float animation
      const time = state.clock.getElapsedTime();
      meshRef.current.position.y = Math.sin(time * 0.5) * 0.3;

      // Scroll-based rotation and scale
      meshRef.current.rotation.x = scrollProgress * Math.PI * 0.5;
      meshRef.current.rotation.y = time * 0.2 + scrollProgress * Math.PI;
      
      const scaleValue = 1 - scrollProgress * 0.3;
      meshRef.current.scale.set(scaleValue, scaleValue, scaleValue);

      // Move away as user scrolls
      meshRef.current.position.z = -scrollProgress * 3;
    }
  });

  return (
    <group ref={meshRef} position={[0, 0, 0]}>
      {/* Low-poly icosphere (orb) */}
      <mesh>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial
          color="#1f1f1f"
          wireframe={false}
          roughness={0.4}
          metalness={0.6}
          emissive="#1f1f1f"
          emissiveIntensity={0.1}
        />
      </mesh>

      {/* Wireframe overlay for detail */}
      <mesh>
        <icosahedronGeometry args={[1.01, 1]} />
        <meshBasicMaterial
          color="#666666"
          wireframe
          transparent
          opacity={0.2}
        />
      </mesh>

      {/* Orbiting small cubes */}
      {[0, 1, 2].map((i) => (
        <FloatingCube key={i} index={i} time={scrollProgress} />
      ))}
    </group>
  );
}

function FloatingCube({ index, time }: { index: number; time: number }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      const t = state.clock.getElapsedTime();
      const angle = (index / 3) * Math.PI * 2 + t * 0.5;
      const radius = 1.8;

      meshRef.current.position.x = Math.cos(angle) * radius;
      meshRef.current.position.z = Math.sin(angle) * radius;
      meshRef.current.position.y = Math.sin(t + index) * 0.2;

      meshRef.current.rotation.x = t * 0.5;
      meshRef.current.rotation.y = t * 0.3;
    }
  });

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[0.15, 0.15, 0.15]} />
      <meshStandardMaterial
        color="#333333"
        roughness={0.5}
        metalness={0.5}
      />
    </mesh>
  );
}
