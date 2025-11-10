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
  "/assets/carousel/portfolioPic1.png",
  "/assets/carousel/portfolioPic2.png",
  "/assets/carousel/portfolioPic3.png",
  "/assets/carousel/portfolioPic4.png",
];

export function IntroSection() {
  const [isMounted, setIsMounted] = useState(false);

  // Wait for client-side mounting
  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <section id="intro" className="min-h-[85vh] flex items-center justify-center px-6 py-20 relative">
      <div className="max-w-5xl w-full">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* 3D Cube Carousel with Gradient Halo */}
          <div className="order-2 md:order-1 relative h-[450px] md:h-[500px]">
            {/* Gradient Halo Background - positioned absolutely behind */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none -z-10">
              <div className="w-[600px] h-[600px] rounded-full bg-gradient-radial from-blue-400/20 via-blue-300/10 to-transparent blur-3xl dark:from-violet-500/25 dark:via-blue-500/15 dark:to-transparent" />
            </div>
            {/* Cube Carousel - original positioning maintained */}
            {isMounted && <CubeCarousel3DWrapper images={carouselImages} />}
          </div>

          {/* Text Content */}
          <div className="order-1 md:order-2 space-y-6 text-center md:text-left">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground">
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
