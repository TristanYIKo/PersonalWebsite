"use client";

import { Separator } from "@/components/ui/separator";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";

// Dynamically import cube 3D carousel wrapper to avoid SSR issues
const CubeCarousel3DWrapper = dynamic(
  () => import("@/components/3d/CubeCarousel3DWrapper").then((mod) => ({ 
    default: mod.CubeCarousel3DWrapper 
  })),
  { ssr: false, loading: () => <div className="w-full h-full bg-muted/20 rounded-lg animate-pulse" /> }
);

const carouselImages = [
  "/assets/carousel/image-1.jpg",
  "/assets/carousel/image-2.jpg",
  "/assets/carousel/image-3.jpg",
  "/assets/carousel/image-4.jpg",
];

export function IntroSection() {
  const [isMounted, setIsMounted] = useState(false);

  // Wait for client-side mounting
  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <section id="intro" className="min-h-[85vh] flex items-center justify-center px-6 py-20">
      <div className="max-w-5xl w-full">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* 3D Cube Carousel */}
          <div className="order-2 md:order-1 relative h-[450px] md:h-[500px]">
            {isMounted && <CubeCarousel3DWrapper images={carouselImages} />}
          </div>

          {/* Text Content */}
          <div className="order-1 md:order-2 space-y-6 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
              Tristan Ko
            </h1>
            
            <Separator className="mx-auto md:mx-0 w-24" />
            
            <p className="text-lg md:text-xl text-foreground leading-relaxed">
              Management Engineering student at the University of Waterloo, passionate about data and problem-solving through analytics.
            </p>
            
            <p className="text-base text-muted-foreground leading-relaxed">
              Outside of school and work, I enjoy working out, playing sports like golf, taekwondo, and snowboarding, as well as investing, gaming, and playing poker.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
