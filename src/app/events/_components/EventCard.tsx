import type { Event } from "@/app/types/event"
import Image from "next/image"
import Link from "next/link"
import type { FC } from "react"

interface EventCardProps {
  event: Event
}

const EventCard: FC<EventCardProps> = ({ event }) => {
  if (!event || !event.slug) {
    return <p>Loading...</p>
  }

  return (
    <Link
      href={`/events/${event.slug}`}
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
        <h4 className="line-clamp-2 text-base font-semibold text-white">{event.title}</h4>
        <p className="truncate text-sm text-sky-400">
          {new Date(event.startDate).toLocaleDateString()} – {new Date(event.endDate).toLocaleDateString()}
        </p>
      </div>
    </Link>
  )
}

export default EventCard
