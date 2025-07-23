import Image from "next/image";
import Link from "next/link";

const events = [
  {
    id: 1,
    title: "Raisa Ambivert Showcase",
    date: "11 Feb 2026 - 13 Feb 2026",
    price: "Rp 2.000.000",
    img: "/events/raisa.jpg",
    author: "Daniel Reinhard",
  },
  {
    id: 2,
    title: "PLAYOFF IBL GOPAY 2025",
    date: "31 Mar 2026 - 01 Apr 2026",
    price: "Rp 650.000",
    img: "/events/ibl.jpg",
    author: "Daniel Reinhard",
  },
  // Add more events...
];

export default function NewestEvents() {
  return (
    <section className="mt-12">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Newest Event</h3>
        <Link href="/events" className="text-sm text-orange-400 hover:underline">
          See all
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {events.map((event) => (
          <div
            key={event.id}
            className="bg-zinc-900 rounded-lg overflow-hidden shadow hover:shadow-lg transition"
          >
            <Image
              src={event.img}
              alt={event.title}
              width={400}
              height={200}
              className="object-cover w-full h-[200px]"
            />
            <div className="p-4 space-y-2">
              <h4 className="font-semibold text-white line-clamp-2">{event.title}</h4>
              <p className="text-sm text-sky-400">{event.date}</p>
              <p className="text-sm text-orange-400">{event.price}</p>
              <p className="text-xs text-white/60 pt-2">by {event.author}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
