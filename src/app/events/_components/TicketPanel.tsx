import { format } from "date-fns";
import { Badge } from "lucide-react";
import Image from "next/image";
import type { FC } from "react";
import { getEvent } from "../_api/get-event";
import { Button } from "@/components/ui/button";

interface EventHeaderProps {
  slug: string;
}

const TicketPanel: FC<EventHeaderProps> = async ({ slug }) => {
  const event = await getEvent(slug);

  return (
     <div className="bg-gray-900 text-white p-6 rounded-2xl">
      {event.price === 0 ? (
        <div className="flex items-center gap-2 mb-6">
          <div className="w-8 h-8 bg-green-500 rounded flex items-center justify-center">
            <span className="text-white font-bold text-sm">✓</span>
          </div>
          <div>
            <p className="text-sm text-gray-300">This is a free event.</p>
            <p className="text-sm text-gray-300">Register now to secure your spot!</p>
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-2 mb-6">
          <div className="w-8 h-8 bg-orange-500 rounded flex items-center justify-center">
            <span className="text-white font-bold text-sm">!</span>
          </div>
          <div>
            <p className="text-sm text-gray-300">You haven't selected any tickets.</p>
            <p className="text-sm text-gray-300">
              Please choose one from the first tab in the <span className="text-orange-500">Tickets</span> tab.
            </p>
          </div>
        </div>
      )}

      <div className="border-t border-gray-700 pt-4">
        <div className="flex justify-between items-center mb-4">
          <span className="font-medium">Total price</span>
          <span className="text-xl font-bold">{event.price === 0 ? "Free" : `Rp ${event.price.toLocaleString()}`}</span>
        </div>

        <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3">
          {event.price === 0 ? "Register Now" : "Checkout"}
        </Button>
      </div>
    </div>
  );
};

export default TicketPanel;
