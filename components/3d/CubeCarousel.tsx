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

  // Load textures for each face - must be called unconditionally (React hooks rule)
  const textures = useTexture(images);

  const { size } = useThree();

  // Configure textures to cover the entire face (like object-fit: cover)
  useEffect(() => {
    if (textures && Array.isArray(textures) && textures.length > 0) {
      textures.forEach((texture) => {
        texture.minFilter = THREE.LinearFilter;
        texture.magFilter = THREE.LinearFilter;
        texture.generateMipmaps = false;
        
        // Get image dimensions
        const img = texture.image as HTMLImageElement;
        if (img && img.width && img.height) {
          const imageAspect = img.width / img.height;
          const faceAspect = 1; // Cube faces are square
          
          // Calculate scale to cover the entire face (crop excess)
          if (imageAspect > faceAspect) {
            // Image is wider than face - fit height, crop width
            texture.repeat.set(faceAspect / imageAspect, 1);
          } else {
            // Image is taller than face - fit width, crop height
            texture.repeat.set(1, imageAspect / faceAspect);
          }
          
          // Center the texture
          texture.offset.set(
            (1 - texture.repeat.x) / 2,
            (1 - texture.repeat.y) / 2
          );
        }
        
        texture.needsUpdate = true;
      });
    }
  }, [textures]);

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
      color: "#ffffff",
      roughness: 0.3,
      metalness: 0.05,
    }),
    // Left face (image 2)
    new THREE.MeshStandardMaterial({ 
      color: "#ffffff",
      roughness: 0.3,
      metalness: 0.05,
    }),
    // Top face
    new THREE.MeshStandardMaterial({ 
      color: "#f5f5f5",
      roughness: 0.4,
      metalness: 0.05,
    }),
    // Bottom face
    new THREE.MeshStandardMaterial({ 
      color: "#f5f5f5",
      roughness: 0.4,
      metalness: 0.05,
    }),
    // Front face (image 3)
    new THREE.MeshStandardMaterial({ 
      color: "#ffffff",
      roughness: 0.3,
      metalness: 0.05,
    }),
    // Back face (image 4)
    new THREE.MeshStandardMaterial({ 
      color: "#ffffff",
      roughness: 0.3,
      metalness: 0.05,
    }),
  ];

  // Map textures to materials if available
  const textureArray = Array.isArray(textures) ? textures : [textures];
  if (textureArray.length >= 4) {
    materials[0].map = textureArray[0]; // Right
    materials[1].map = textureArray[1]; // Left
    materials[4].map = textureArray[2]; // Front
    materials[5].map = textureArray[3]; // Back
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
      <ambientLight intensity={1.2} />
      <directionalLight position={[5, 5, 5]} intensity={0.6} castShadow={false} />
      <directionalLight position={[-5, 3, -5]} intensity={0.4} />
      <pointLight position={[0, -3, 3]} intensity={0.3} color="#ffffff" />
    </>
  );
}
