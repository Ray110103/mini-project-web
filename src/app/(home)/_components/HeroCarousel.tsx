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
    alt: "Cigarettes After Sex",
    date: "FRI 17 JAN, 2025",
    location: "Beach City International Stadium",
  },
  {
    src: "/rog.png",
    alt: "Cigarettes After Sex",
    date: "FRI 17 JAN, 2025",
    location: "Beach City International Stadium",
  },
  {
    src: "/rog.png",
    alt: "Cigarettes After Sex",
    date: "FRI 17 JAN, 2025",
    location: "Beach City International Stadium",
  },
];

const HeroCarousel = () => {
  return (
    <Carousel className="w-full">
      <CarouselContent>
        {banners.map((banner, index) => (
          <CarouselItem key={index}>
            <div className="relative w-full h-[300px] md:h-[450px] lg:h-[550px] overflow-hidden rounded-lg">
              <Image
                src={banner.src}
                alt={banner.alt}
                fill
                className="object-cover"
                priority={index === 0}
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-6 text-white">
                <h2 className="text-2xl md:text-4xl font-bold">{banner.alt}</h2>
                {banner.date && <p className="text-sm md:text-base">{banner.date}</p>}
                {banner.location && <p className="text-sm md:text-base">{banner.location}</p>}
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-4" />
      <CarouselNext className="right-4" />
    </Carousel>
  );
};

export default HeroCarousel;
