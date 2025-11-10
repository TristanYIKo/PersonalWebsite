"use client";

import { Separator } from "@/components/ui/separator";
import { Card } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";

const carouselImages = [
  {
    src: "/assets/carousel/image-1.jpg",
    alt: "Tristan Ko - Photo 1",
  },
  {
    src: "/assets/carousel/image-2.jpg",
    alt: "Tristan Ko - Photo 2",
  },
  {
    src: "/assets/carousel/image-3.jpg",
    alt: "Tristan Ko - Photo 3",
  },
  {
    src: "/assets/carousel/image-4.jpg",
    alt: "Tristan Ko - Photo 4",
  },
];

export function IntroSection() {
  const plugin = useRef(
    Autoplay({ delay: 3000, stopOnInteraction: false })
  );

  return (
    <section id="intro" className="min-h-[85vh] flex items-center justify-center px-6 py-20">
      <div className="max-w-5xl w-full">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Image Carousel */}
          <div className="order-2 md:order-1">
            <Carousel
              plugins={[plugin.current]}
              className="w-full"
              opts={{
                align: "start",
                loop: true,
              }}
            >
              <CarouselContent>
                {carouselImages.map((image, index) => (
                  <CarouselItem key={index}>
                    <Card className="overflow-hidden border border-border">
                      <div className="aspect-square bg-muted flex items-center justify-center">
                        {/* Placeholder for images */}
                        <div className="text-center p-8">
                          <p className="text-muted-foreground text-sm">
                            Image {index + 1}
                          </p>
                          <p className="text-xs text-muted-foreground/60 mt-2">
                            {image.src}
                          </p>
                        </div>
                      </div>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-2" />
              <CarouselNext className="right-2" />
            </Carousel>
            <div className="flex justify-center gap-2 mt-4">
              {carouselImages.map((_, index) => (
                <div
                  key={index}
                  className="h-1.5 w-1.5 rounded-full bg-muted-foreground/30"
                />
              ))}
            </div>
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
