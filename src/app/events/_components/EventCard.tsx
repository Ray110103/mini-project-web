import { Event } from "@/app/types/events";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

interface BlogCardProps {
  event: Event;
}

const EventCard: FC<BlogCardProps> = ({ event }) => {
  return (
    <Link href={`/blogs/${event.slug}`}>
      <Card>
        <CardHeader>
          <div className="relative h-[200px] w-full overflow-hidden rounded-lg">
            <Image
              src={event.thumbnail}
              alt="thumbnail"
              className="object-cover"
              fill
            />
          </div>
        </CardHeader>
        <CardContent>
          <h2 className="text-lg font-bold">{event.title}</h2>
          <p className="line-clamp-3">{event.description}</p>
        </CardContent>
      </Card>
    </Link>
  );
};

export default EventCard;
