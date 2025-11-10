"use client";

import { useRef, useState, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";

interface CubeCarouselProps {
  images: string[];
}

export function CubeCarousel({ images }: CubeCarouselProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [previousMouseX, setPreviousMouseX] = useState(0);
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const resumeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  // Rotation state
  const currentRotation = useRef(0);
  const targetRotation = useRef(0);
  const velocity = useRef(0);
  const autoRotateSpeed = 0.004; // Slow auto-rotation

  // Load textures for each face (with fallback to placeholders)
  let textures: THREE.Texture[] = [];
  try {
    textures = useTexture(images);
  } catch (error) {
    console.warn("Textures not loaded, using placeholders");
  }

  const { size } = useThree();

  useFrame((state, delta) => {
    if (!meshRef.current) return;

    // Auto-rotate when enabled and not dragging
    if (isAutoRotating && !isDragging) {
      targetRotation.current += autoRotateSpeed;
    }

    // Apply velocity (inertia) and friction when not auto-rotating
    if (!isAutoRotating && !isDragging) {
      velocity.current *= 0.95; // Friction
      targetRotation.current += velocity.current;
      
      // Stop velocity when it's very small
      if (Math.abs(velocity.current) < 0.0001) {
        velocity.current = 0;
      }
    }

    // Smooth interpolation to target rotation
    const diff = targetRotation.current - currentRotation.current;
    currentRotation.current += diff * 0.12; // Slightly faster interpolation for smoother feel

    // Apply rotation to mesh
    meshRef.current.rotation.y = currentRotation.current;
  });

  const handlePointerDown = (e: any) => {
    setIsDragging(true);
    setIsAutoRotating(false); // Pause auto-rotation
    setPreviousMouseX(e.clientX);
    velocity.current = 0; // Stop inertia when grabbing
    
    // Clear any pending resume timeout
    if (resumeTimeoutRef.current) {
      clearTimeout(resumeTimeoutRef.current);
      resumeTimeoutRef.current = null;
    }
    
    e.stopPropagation();
  };

  const handlePointerMove = (e: any) => {
    if (isDragging && meshRef.current) {
      const deltaX = e.clientX - previousMouseX;
      const rotationDelta = (deltaX / size.width) * Math.PI * 2;
      
      targetRotation.current += rotationDelta;
      velocity.current = rotationDelta; // Store for inertia
      
      setPreviousMouseX(e.clientX);
    }
  };

  const handlePointerUp = () => {
    setIsDragging(false);
    
    // Resume auto-rotation after 2 seconds
    resumeTimeoutRef.current = setTimeout(() => {
      setIsAutoRotating(true);
      velocity.current = 0; // Clear inertia when resuming auto-rotation
    }, 2000);
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (resumeTimeoutRef.current) {
        clearTimeout(resumeTimeoutRef.current);
      }
    };
  }, []);

  // Create materials for each face
  const materials = [
    // Right face (image 1)
    new THREE.MeshStandardMaterial({ 
      color: "#f0f0f0",
      roughness: 0.4,
      metalness: 0.1,
    }),
    // Left face (image 2)
    new THREE.MeshStandardMaterial({ 
      color: "#f0f0f0",
      roughness: 0.4,
      metalness: 0.1,
    }),
    // Top face
    new THREE.MeshStandardMaterial({ 
      color: "#e5e5e5",
      roughness: 0.5,
      metalness: 0.05,
    }),
    // Bottom face
    new THREE.MeshStandardMaterial({ 
      color: "#e5e5e5",
      roughness: 0.5,
      metalness: 0.05,
    }),
    // Front face (image 3)
    new THREE.MeshStandardMaterial({ 
      color: "#f0f0f0",
      roughness: 0.4,
      metalness: 0.1,
    }),
    // Back face (image 4)
    new THREE.MeshStandardMaterial({ 
      color: "#f0f0f0",
      roughness: 0.4,
      metalness: 0.1,
    }),
  ];

  // Map textures to materials if available
  if (textures.length >= 4) {
    materials[0].map = textures[0]; // Right
    materials[1].map = textures[1]; // Left
    materials[4].map = textures[2]; // Front
    materials[5].map = textures[3]; // Back
  }

  return (
    <>
      <mesh
        ref={meshRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
      >
        {/* Increased cube size by 20% (from 3 to 3.6) */}
        <boxGeometry args={[3.6, 3.6, 3.6]} />
        {materials.map((material, index) => (
          <meshStandardMaterial key={index} attach={`material-${index}`} {...material} />
        ))}
      </mesh>

      {/* Soft ambient lighting */}
      <ambientLight intensity={0.85} />
      <directionalLight position={[5, 5, 5]} intensity={0.3} castShadow={false} />
      <directionalLight position={[-5, 3, -5]} intensity={0.2} />
      <pointLight position={[0, -3, 3]} intensity={0.15} color="#f6f6f4" />
    </>
  );
}
