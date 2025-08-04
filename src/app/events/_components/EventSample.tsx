
import type { FC } from "react";
import Image from "next/image";
import { getEvent } from "../_api/get-event";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, Calendar, Clock, Sparkles } from "lucide-react";
import { getOrganizer } from "../_api/get-organizer";

interface EventHeaderProps {
  slug: string;
}

const formatDateRange = (start: Date, end: Date) => {
  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "short",
    year: "numeric",
  };
  const startDate = start.toLocaleDateString("id-ID", options);
  const endDate = end.toLocaleDateString("id-ID", options);
  return start.toDateString() === end.toDateString()
    ? startDate
    : `${startDate} - ${endDate}`;
};

const formatTime = (date: Date) => {
  return date.toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
};

const EventSample: FC<EventHeaderProps> = async ({ slug }) => {
  const event = await getEvent(slug);

  if (!event) {
    return (
      <div className="bg-black flex items-center justify-center min-h-screen">
        <div className="text-white text-xl">Event not found</div>
      </div>
    );
  }

  // Fetch organizer data
  const startDate = new Date(event.startDate);
  const endDate = new Date(event.endDate);
  const formattedDate = formatDateRange(startDate, endDate);
  const startTime = formatTime(startDate);
  const endTime = formatTime(endDate);
  const totalPrice = event.price || 0;

  return (
    <div className="bg-black text-white px-4 py-8 sm:px-6 md:py-12 lg:px-8">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 lg:grid-cols-[2fr_1fr]">
        {/* LEFT SECTION */}
        <div className="space-y-6">
          <div className="relative aspect-video w-full overflow-hidden rounded-2xl shadow-md">
            <Image
              src={event.thumbnail || "/placeholder.svg?height=400&width=800"}
              alt={event.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1024px) 100vw, 66vw"
            />
          </div>

          {/* MOBILE DETAIL */}
          <Card className="md:hidden bg-gray-900 border-gray-700">
            <CardContent className="space-y-4 p-6">
              <h1 className="text-2xl font-bold text-white">{event.title}</h1>
              <div className="space-y-2 text-sm text-gray-300">
                <div className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-5 w-5 text-orange-500" />
                  <span>{event.location}</span>
                </div>
                <div className="flex items-start gap-3">
                  <Calendar className="mt-0.5 h-5 w-5 text-orange-500" />
                  <span>{formattedDate}</span>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="mt-0.5 h-5 w-5 text-orange-500" />
                  <span>
                    {startTime} - {endTime}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* DESCRIPTION & TICKETS */}
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="flex w-full bg-transparent border-b border-gray-700 rounded-none p-0 h-auto">
              <TabsTrigger
                value="description"
                className="flex-1 px-6 py-3 font-medium bg-transparent text-gray-400 hover:text-white data-[state=active]:text-white data-[state=active]:border-b-2 data-[state=active]:border-orange-500 data-[state=active]:bg-transparent rounded-none border-b-2 border-transparent"
              >
                Description
              </TabsTrigger>
              <TabsTrigger
                value="tickets"
                className="flex-1 px-6 py-3 font-medium bg-transparent text-gray-400 hover:text-white data-[state=active]:text-white data-[state=active]:border-b-2 data-[state=active]:border-orange-500 data-[state=active]:bg-transparent rounded-none border-b-2 border-transparent"
              >
                Tickets
              </TabsTrigger>
            </TabsList>

            <TabsContent
              value="description"
              className="space-y-4 pt-6 text-sm leading-relaxed text-gray-300"
            >
              <p>{event.description}</p>
              {event.content && (
                <div
                  className="prose prose-invert max-w-none"
                  dangerouslySetInnerHTML={{ __html: event.content }}
                />
              )}
              <ul className="list-inside list-disc space-y-1">
                <li>Tiket secara resmi hanya dijual melalui EventHub.</li>
                <li>
                  <span className="italic">Barcode</span> pada tiket ini
                  digunakan sebagai akses masuk untuk ditukarkan{" "}
                  <span className="italic">wristband</span>.
                </li>
                <li>
                  1 <span className="italic">e-ticket/e-voucher</span> (1{" "}
                  <span className="italic">barcode</span>) berlaku untuk 1
                  orang.
                </li>
              </ul>
            </TabsContent>

            <TabsContent value="tickets" className="pt-6">
              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="space-y-4 p-6">
                  <div className="flex justify-between items-center p-4 bg-gray-700 rounded-lg">
                    <div>
                      <h5 className="font-medium text-white">
                        General Admission
                      </h5>
                      <p className="text-sm text-gray-400">
                        Access to all event activities
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-orange-500">
                        {event.price === 0
                          ? "Free"
                          : `Rp ${event.price.toLocaleString()}`}
                      </p>
                      <p className="text-xs text-gray-400">per person</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 text-sm text-gray-300">
                    <Sparkles className="mt-1 h-5 w-5 text-orange-500" />
                    <span>
                      You haven't selected any tickets. Please choose one first
                      in the{" "}
                      <span className="font-medium text-orange-500">Tickets</span>{" "}
                      tab.
                    </span>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* DESKTOP DETAIL */}
        <div className="hidden space-y-6 md:block">
          <Card className="bg-gray-900 border-gray-700">
            <CardContent className="space-y-4 p-6">
              <h1 className="text-2xl font-bold text-white">{event.title}</h1>
              <div className="space-y-2 text-sm text-gray-300">
                <div className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-5 w-5 text-orange-500" />
                  <span>{event.location}</span>
                </div>
                <div className="flex items-start gap-3">
                  <Calendar className="mt-0.5 h-5 w-5 text-orange-500" />
                  <span>{formattedDate}</span>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="mt-0.5 h-5 w-5 text-orange-500" />
                  <span>
                    {startTime} - {endTime}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-700 rounded-lg shadow-lg overflow-hidden">
            <CardContent className="space-y-6 p-6">
              {/* Sparkles Icon */}
              <div className="flex items-center space-x-2">
                <Sparkles className="h-24 w-24 text-orange-500" />
                <span className="text-lg font-medium text-white">
                  You haven't selected any tickets. Please choose one first in
                  the{" "}
                  <span className="font-semibold text-orange-500">Tickets</span>{" "}
                  tab.
                </span>
              </div>

              {/* Total Price Section */}
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-400">
                  Total price
                </span>
                <span className="text-2xl font-bold text-white">
                  Rp {totalPrice.toLocaleString()}
                </span>
              </div>

              {/* Button Section */}
              <Button
                className="w-full bg-orange-500 py-3 text-lg font-medium text-white rounded-md hover:bg-orange-600 transition-all duration-200"
                size="lg"
              >
                {event.price === 0 ? "Register Now" : "Checkout"}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default EventSample;
