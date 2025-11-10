"use client";

import { useRef, useState, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

interface CarouselItem {
  image: string;
  title: string;
}

interface Horizontal3DCarouselProps {
  items: CarouselItem[];
}

export function Horizontal3DCarousel({ items }: Horizontal3DCarouselProps) {
  const groupRef = useRef<THREE.Group>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState(0);
  const [currentOffset, setCurrentOffset] = useState(0);
  const targetOffset = useRef(0);
  const autoScrollSpeed = useRef(0.002);
  const { size, viewport } = useThree();

  // Spacing between cards - very tight
  const cardWidth = 2.5;
  const gap = 0.15;
  const spacing = cardWidth + gap;

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    // Auto-scroll only when not hovering and not dragging
    if (hoveredIndex === null && !isDragging) {
      targetOffset.current += autoScrollSpeed.current;
    }

    // Smooth interpolation to target offset
    const smoothness = isDragging ? 0.15 : 0.08;
    setCurrentOffset((prev) => {
      const diff = targetOffset.current - prev;
      return prev + diff * smoothness;
    });

    // Update group position
    groupRef.current.position.x = -currentOffset * spacing;

    // Snap to center when hovering
    if (hoveredIndex !== null && !isDragging) {
      const targetPos = hoveredIndex;
      targetOffset.current += (targetPos - targetOffset.current) * 0.1;
    }
  });

  const handlePointerDown = (e: any) => {
    if (hoveredIndex === null) {
      setIsDragging(true);
      setDragStart(e.clientX);
    }
  };

  const handlePointerMove = (e: any) => {
    if (isDragging) {
      const delta = (e.clientX - dragStart) * 0.01;
      targetOffset.current -= delta;
      setDragStart(e.clientX);
    }
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("pointermove", handlePointerMove);
      window.addEventListener("pointerup", handlePointerUp);
      return () => {
        window.removeEventListener("pointermove", handlePointerMove);
        window.removeEventListener("pointerup", handlePointerUp);
      };
    }
  }, [isDragging, dragStart]);

  return (
    <group
      ref={groupRef}
      onPointerDown={handlePointerDown}
    >
      {items.map((item, index) => {
        const xPos = index * spacing;
        const isHovered = hoveredIndex === index;
        const scale = isHovered ? 1.05 : 1;
        const zPos = isHovered ? 0.3 : 0;

        return (
          <group
            key={index}
            position={[xPos, 0, zPos]}
            onPointerEnter={() => !isDragging && setHoveredIndex(index)}
            onPointerLeave={() => setHoveredIndex(null)}
          >
            {/* Card */}
            <mesh scale={[scale, scale, 1]}>
              <planeGeometry args={[cardWidth, 3]} />
              <meshStandardMaterial
                color="#f0f0f0"
                side={THREE.DoubleSide}
                transparent
                opacity={0.95}
                roughness={0.3}
                metalness={0.1}
              />
            </mesh>

            {/* Border */}
            <lineSegments scale={[scale, scale, 1]}>
              <edgesGeometry args={[new THREE.PlaneGeometry(cardWidth, 3)]} />
              <lineBasicMaterial color="#d0d0d0" transparent opacity={0.4} />
            </lineSegments>

            {/* Placeholder for image - will be replaced with texture */}
            <mesh position={[0, 0.5, 0.01]} scale={[scale, scale, 1]}>
              <planeGeometry args={[cardWidth - 0.3, 2]} />
              <meshBasicMaterial color="#e5e5e5" />
            </mesh>

            {/* Title background */}
            <mesh position={[0, -1, 0.01]} scale={[scale, scale, 1]}>
              <planeGeometry args={[cardWidth - 0.2, 0.6]} />
              <meshBasicMaterial color="#333333" transparent opacity={0.8} />
            </mesh>
          </group>
        );
      })}

      {/* Soft lighting */}
      <ambientLight intensity={0.9} />
      <directionalLight position={[3, 5, 5]} intensity={0.3} />
      <directionalLight position={[-3, 3, -3]} intensity={0.2} />
      <pointLight position={[0, -2, 3]} intensity={0.15} color="#ffffff" />
    </group>
  );
}
