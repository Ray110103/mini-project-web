"use client";

import Image from "next/image";
import Link from "next/link";
import useGetEvents from "@/app/events/_hooks/useGetEvents";
import { Skeleton } from "@/components/ui/skeleton";

const Events = () => {
  const { data: events, isPending } = useGetEvents({
    page: 1,
    search: "",
    take: 4,
    sortBy: "createdAt",
    sortOrder: "desc",
  });

  return (
    <section className="container mx-auto mt-12 px- md:px-8">
      

      {/* Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {isPending
          ? Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="space-y-3 overflow-hidden rounded-xl bg-zinc-900 p-4 shadow"
              >
                <Skeleton className="aspect-[4/3] w-full rounded-md" />
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-4 w-2/3" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))
          : events?.data?.map((event) => {
              // Ensure the event is defined and has a slug
              if (!event?.slug) return null; // Return nothing if event or slug is undefined

              return (
                <Link
                  key={event.id}
                  href={`/events/${event.slug}`}  // Link to the event detail page using the slug
                  className="overflow-hidden rounded-xl bg-zinc-900 shadow transition hover:shadow-lg"
                >
                  <div className="relative aspect-[4/3] w-full">
                    <Image
                      src={event.thumbnail || "/placeholder.jpg"}
                      alt={event.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                  <div className="space-y-2 p-4">
                    <h4 className="line-clamp-2 text-base font-semibold text-white">
                      {event.title}
                    </h4>
                    <p className="truncate text-sm text-sky-400">
                      {new Date(event.startDate).toLocaleDateString()} –{" "}
                      {new Date(event.endDate).toLocaleDateString()}
                    </p>
                    <p className="text-sm font-medium text-orange-400">
                      Rp {event.price?.toLocaleString("id-ID")}
                    </p>
                  </div>
                </Link>
              );
            })}
      </div>
    </section>
  );
};

export default Events;
