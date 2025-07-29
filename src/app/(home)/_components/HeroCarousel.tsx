"use client";

import * as React from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Image from "next/image";

interface Banner {
  src: string;
  alt: string;
  date?: string;
  location?: string;
}

const banners: Banner[] = [
  {
    src: "/rog.png",
    alt: "Cigarettes After Sex",
    date: "FRI 17 JAN, 2025",
    location: "Beach City International Stadium",
  },
  {
    src: "/rog.png",
    alt: "IBL Playoff 2025",
    date: "31 MAR - 01 APR 2026",
    location: "Indoor Stadium Jakarta",
  },
];

const HeroCarousel = () => {
  return (
    <section className="w-full container mx-auto px-4 py-4">
      <Carousel className="w-full">
        <CarouselContent>
          {banners.map((banner, index) => (
            <CarouselItem key={index}>
              <div className="relative w-full h-[220px] md:h-[320px] lg:h-[400px] rounded-xl overflow-hidden">
                <Image
                  src={banner.src}
                  alt={banner.alt}
                  fill
                  className="object-cover"
                  priority={index === 0}
                />

                {/* Text Overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 text-white">
                  <h2 className="text-xl md:text-2xl font-bold">{banner.alt}</h2>
                  <p className="text-sm md:text-base">{banner.date}</p>
                  <p className="text-sm md:text-base">{banner.location}</p>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="-left-6" />
        <CarouselNext className="-right-6" />
      </Carousel>
    </section>
  );
};

export default HeroCarousel;
