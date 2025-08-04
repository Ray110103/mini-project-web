import { format } from "date-fns";
import { Badge } from "lucide-react";
import Image from "next/image";
import type { FC } from "react";
import { getEvent } from "../_api/get-event";

interface EventHeaderProps {
  slug: string;
}

const EventHeader: FC<EventHeaderProps> = async ({ slug }) => {
  const event = await getEvent(slug);

  return (
    <div className="w-full">
      <div className="relative aspect-[16/9] rounded-2xl overflow-hidden">
        <img
          src={event.thumbnail || `/placeholder.svg?height=400&width=800`}
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default EventHeader;
