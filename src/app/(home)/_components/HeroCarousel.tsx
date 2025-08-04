"use client"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import Image from "next/image"

interface Banner {
  src: string
  alt: string
  date?: string
  location?: string
}

const banners: Banner[] = [
  {
    src: "/rog.png?height=400&width=800",
    alt: "Cigarettes After Sex",
    date: "FRI 17 JAN, 2025",
    location: "Beach City International Stadium",
  },
  {
    src: "/rog.png?height=400&width=800",
    alt: "IBL Playoff 2025",
    date: "31 MAR - 01 APR 2026",
    location: "Indoor Stadium Jakarta",
  },
]

const HeroCarousel = () => {
  return (
    <section className="container mx-auto px-4 py-8">
      <Carousel className="w-full relative">
        <CarouselContent>
          {banners.map((banner, index) => (
            <CarouselItem key={index}>
              <div className="relative w-full h-[300px] md:h-[400px] lg:h-[500px] rounded-2xl overflow-hidden group">
                <Image
                  src={banner.src || "/placeholder.svg"}
                  alt={banner.alt}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                  priority={index === 0}
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Text Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white">
                  <h2 className="text-2xl md:text-4xl font-bold mb-2">{banner.alt}</h2>
                  <p className="text-lg md:text-xl font-medium mb-1">{banner.date}</p>
                  <p className="text-base md:text-lg text-gray-300">{banner.location}</p>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Navigation Buttons */}
        <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 border-gray-600 text-white hover:bg-black/70 hover:text-white" />
        <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 border-gray-600 text-white hover:bg-black/70 hover:text-white" />
      </Carousel>
    </section>
  )
}

export default HeroCarousel
