"use client";

import Markdown from "@/components/Markdown";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Calendar, MapPin } from 'lucide-react';
import Image from "next/image";
import { type FC, useState, useMemo, useEffect } from "react";
import { format } from "date-fns";
import useGetEventBySlug from "../_hooks/useGetEventBySlug";
import { useRouter } from "next/navigation";
import { useCreateTransaction } from "../_api/create-transactions";
import Link from "next/link";

interface EventDetailsProps {
  slug: string;
}

const EventDetails: FC<EventDetailsProps> = ({ slug }) => {
  const { data: event, isPending } = useGetEventBySlug(slug);
  const [quantities, setQuantities] = useState<Record<number, number>>({});
  const [showConfirm, setShowConfirm] = useState(false);
  const router = useRouter();

  // Add this hook for creating transactions
  const { handleCheckout: createTransaction } = useCreateTransaction(
    event?.tickets || [],
    quantities,
    () => {
      setShowConfirm(false);
    }
  );

  // Calculate total price based on selected tickets
  const totalPrice = useMemo(() => {
    if (!event?.tickets) return 0;
    return event.tickets.reduce((total, ticket) => {
      const quantity = quantities[ticket.id] || 0;
      return total + ticket.price * quantity;
    }, 0);
  }, [event?.tickets, quantities]);

  // Get total ticket count
  const totalTickets = useMemo(() => {
    return Object.values(quantities).reduce((total, qty) => total + qty, 0);
  }, [quantities]);

  const handleQuantityChange = (ticketId: number, delta: number) => {
    setQuantities((prev) => ({
      ...prev,
      [ticketId]: Math.max((prev[ticketId] || 0) + delta, 0),
    }));
  };

  const handleCheckout = () => {
    // Use the same transaction creation logic as EventHeader
    createTransaction();
  };

  // Add this useEffect after the useMemo hooks
  useEffect(() => {
    if (event?.tickets) {
      const initialQuantities: Record<number, number> = {};
      event.tickets.forEach((ticket) => (initialQuantities[ticket.id] = 0));
      setQuantities(initialQuantities);
    }
  }, [event?.tickets]);

  if (isPending)
    return (
      <div className="p-4 text-white bg-black min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading event...</div>
      </div>
    );

  if (!event)
    return (
      <div className="p-4 text-white bg-black min-h-screen flex items-center justify-center">
        <div className="text-xl">Event not found</div>
      </div>
    );

  return (
    <div className="bg-black text-white px-4 py-6 sm:px-6 md:py-15 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-8 lg:grid lg:grid-cols-[2fr_1fr] lg:gap-8 lg:space-y-0">
        {/* Left Content */}
        <div className="space-y-6">
          {/* Thumbnail */}
          <div className="relative aspect-video w-full overflow-hidden rounded-2xl shadow-md">
            <Image
              src={
                event.thumbnail ||
                `/placeholder.svg?height=400&width=800&query=${
                  encodeURIComponent(event.title) || "/placeholder.svg"
                }`
              }
              alt="Event Poster"
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1024px) 100vw, 66vw"
            />
          </div>

          {/* Mobile Info */}
          <Card className="md:hidden bg-zinc-900 border-zinc-800">
            <CardContent className="space-y-4 p-4">
              <h1 className="text-xl font-bold text-white">{event.title}</h1>
              <div className="space-y-2 text-sm text-gray-300">
                <div className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-5 w-5 text-orange-500" />
                  <span>{event.location}</span>
                </div>
                <div className="flex items-start gap-3">
                  <Calendar className="mt-0.5 h-5 w-5 text-orange-500" />
                  <span>
                    {format(new Date(event.startDate), "dd MMM yyyy")} -{" "}
                    {format(new Date(event.endDate), "dd MMM yyyy")}
                  </span>
                </div>
              </div>
              <hr className="border-t border-zinc-700" />
              
              {/* Mobile Admin Profile Section - Clickable */}
              <Link 
                href="/admin-profile" 
                className="flex items-center gap-3 hover:opacity-80 transition-opacity group cursor-pointer"
              >
                {event.admin?.pictureProfile ? (
                  <Image
                    src={event.admin.pictureProfile || "/placeholder.svg"}
                    alt={event.admin.name || "Admin"}
                    width={40}
                    height={40}
                    className="h-10 w-10 rounded-full object-cover group-hover:ring-2 group-hover:ring-orange-500 transition-all"
                  />
                ) : (
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-500 group-hover:bg-orange-600 transition-colors">
                    <span className="text-sm font-bold text-white">
                      {event.admin?.name?.charAt(0).toUpperCase() || "A"}
                    </span>
                  </div>
                )}
                <span className="text-sm font-medium text-white group-hover:text-orange-500 transition-colors">
                  {event.admin?.name || "Event Organizer"}
                </span>
              </Link>
            </CardContent>
          </Card>

          {/* Description & Tickets */}
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-zinc-900 border border-zinc-700 rounded-lg p-1 text-sm">
              <TabsTrigger
                value="description"
                className="data-[state=active]:bg-orange-500 data-[state=active]:text-white text-gray-400 hover:text-white rounded-md"
              >
                Description
              </TabsTrigger>
              <TabsTrigger
                value="tickets"
                className="data-[state=active]:bg-orange-500 data-[state=active]:text-white text-gray-400 hover:text-white rounded-md"
              >
                Tickets
              </TabsTrigger>
            </TabsList>
            <TabsContent
              value="description"
              className="pt-6 text-sm text-gray-300"
            >
              <Markdown
                description={event.description || "No description available."}
              />
            </TabsContent>
            <TabsContent value="tickets" className="space-y-4 pt-6">
              {!event.tickets || event.tickets.length === 0 ? (
                <p className="text-sm text-gray-400">No tickets available.</p>
              ) : (
                event.tickets.map((ticket) => (
                  <Card key={ticket.id} className="border-zinc-700 bg-zinc-900">
                    <CardContent className="space-y-4 px-4 py-5 sm:p-6">
                      <div className="space-y-1">
                        <h3 className="text-lg font-semibold text-white">
                          {ticket.title}
                        </h3>
                        <p className="text-sm text-gray-400">
                          {ticket.description}
                        </p>
                      </div>
                      <hr className="border-t border-zinc-700" />
                      <div className="flex items-center justify-between pt-2">
                        <span className="text-xl font-bold text-orange-500">
                          {ticket.price === 0
                            ? "Gratis"
                            : `Rp ${ticket.price.toLocaleString("id-ID")}`}
                        </span>
                        {ticket.price === 0 ? (
                          <div className="rounded-md bg-green-500/20 border border-green-500/30 px-3 py-1 text-sm font-medium text-green-400">
                            Free Event
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            <Button
                              type="button"
                              size="icon"
                              variant="outline"
                              className="bg-zinc-800 border-zinc-600 text-white hover:bg-orange-500/20 hover:border-orange-500"
                              onClick={() =>
                                handleQuantityChange(ticket.id, -1)
                              }
                              disabled={
                                !quantities[ticket.id] ||
                                quantities[ticket.id] === 0
                              }
                            >
                              -
                            </Button>
                            <span className="min-w-[24px] text-center text-sm font-medium text-white">
                              {quantities[ticket.id] || 0}
                            </span>
                            <Button
                              type="button"
                              size="icon"
                              variant="outline"
                              className="bg-zinc-800 border-zinc-600 text-white hover:bg-orange-500/20 hover:border-orange-500"
                              onClick={() => handleQuantityChange(ticket.id, 1)}
                            >
                              +
                            </Button>
                          </div>
                        )}
                      </div>
                      {quantities[ticket.id] > 0 && (
                        <div className="pt-2 text-right">
                          <span className="text-sm text-gray-400">
                            Subtotal: Rp{" "}
                            {(
                              ticket.price * quantities[ticket.id]
                            ).toLocaleString("id-ID")}
                          </span>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))
              )}
            </TabsContent>
          </Tabs>

          {/* Mobile Checkout */}
          <Card className="md:hidden bg-zinc-900 border-zinc-800">
            <CardContent className="space-y-4 p-6">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-300">
                  Total price
                </span>
                <span className="text-xl font-bold text-white">
                  Rp {totalPrice.toLocaleString("id-ID")}
                </span>
              </div>
              {totalTickets > 0 && (
                <div className="text-sm text-gray-400">
                  {totalTickets} ticket{totalTickets > 1 ? "s" : ""} selected
                </div>
              )}
              <Dialog open={showConfirm} onOpenChange={setShowConfirm}>
                <DialogTrigger asChild>
                  <Button
                    className="w-full bg-orange-500 py-3 text-sm font-medium text-white hover:bg-orange-600 disabled:opacity-50"
                    size="lg"
                    disabled={totalPrice === 0}
                  >
                    Checkout
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md bg-zinc-900 border-zinc-700 text-white">
                  <DialogHeader>
                    <DialogTitle className="text-white">
                      Confirm Purchase
                    </DialogTitle>
                    <DialogDescription className="text-gray-400">
                      Review your ticket selection before proceeding to payment.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <h4 className="font-medium text-white">
                        Selected Tickets:
                      </h4>
                      {event.tickets
                        ?.filter((ticket) => quantities[ticket.id] > 0)
                        .map((ticket) => (
                          <div
                            key={ticket.id}
                            className="flex justify-between text-sm"
                          >
                            <span className="text-gray-300">
                              {ticket.title} x {quantities[ticket.id]}
                            </span>
                            <span className="text-white">
                              Rp{" "}
                              {(
                                ticket.price * quantities[ticket.id]
                              ).toLocaleString("id-ID")}
                            </span>
                          </div>
                        ))}
                    </div>
                    <div className="border-t border-zinc-700 pt-2">
                      <div className="flex justify-between font-semibold">
                        <span className="text-white">Total:</span>
                        <span className="text-orange-500">
                          Rp {totalPrice.toLocaleString("id-ID")}
                        </span>
                      </div>
                    </div>
                  </div>
                  <DialogFooter className="mt-4 flex justify-end gap-2">
                    <Button
                      variant="outline"
                      className="bg-zinc-800 border-zinc-600 text-white hover:bg-zinc-700"
                      onClick={() => setShowConfirm(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handleCheckout}
                      className="bg-orange-500 text-white hover:bg-orange-600"
                    >
                      Proceed to Payment
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        </div>

        {/* Desktop Sidebar */}
        <div className="hidden space-y-6 md:block">
          <Card className="bg-zinc-900 border-zinc-800">
            <CardContent className="space-y-4 p-6">
              <h1 className="text-2xl font-bold text-white">{event.title}</h1>
              <div className="space-y-2 text-sm text-gray-300">
                <div className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-5 w-5 text-orange-500" />
                  <span>{event.location}</span>
                </div>
                <div className="flex items-start gap-3">
                  <Calendar className="mt-0.5 h-5 w-5 text-orange-500" />
                  <span>
                    {format(new Date(event.startDate), "dd MMM yyyy")} -{" "}
                    {format(new Date(event.endDate), "dd MMM yyyy")}
                  </span>
                </div>
              </div>
              <hr className="my-4 border-t border-zinc-700" />
              
              {/* Desktop Admin Profile Section - Clickable */}
              <Link 
                href="/admin" 
                className="flex items-center gap-3 hover:opacity-80 transition-opacity group cursor-pointer"
              >
                {event.admin?.pictureProfile ? (
                  <Image
                    src={event.admin.pictureProfile || "/placeholder.svg"}
                    alt={event.admin.name || "Admin"}
                    width={40}
                    height={40}
                    className="h-10 w-10 rounded-full object-cover group-hover:ring-2 group-hover:ring-orange-500 transition-all"
                  />
                ) : (
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-500 group-hover:bg-orange-600 transition-colors">
                    <span className="text-sm font-bold text-white">
                      {event.admin?.name?.charAt(0).toUpperCase() || "A"}
                    </span>
                  </div>
                )}
                <span className="text-sm font-medium text-white group-hover:text-orange-500 transition-colors">
                  {event.admin?.name || "Event Organizer"}
                </span>
              </Link>
            </CardContent>
          </Card>

          <Card className="bg-zinc-900 border-zinc-800">
            <CardContent className="space-y-4 p-6">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-300">
                  Total price
                </span>
                <span className="text-xl font-bold text-white">
                  Rp {totalPrice.toLocaleString("id-ID")}
                </span>
              </div>
              {totalTickets > 0 && (
                <div className="text-sm text-gray-400">
                  {totalTickets} ticket{totalTickets > 1 ? "s" : ""} selected
                </div>
              )}
              <Dialog open={showConfirm} onOpenChange={setShowConfirm}>
                <DialogTrigger asChild>
                  <Button
                    className="w-full bg-orange-500 py-3 text-sm font-medium text-white hover:bg-orange-600 disabled:opacity-50"
                    size="lg"
                    disabled={totalPrice === 0}
                  >
                    Checkout
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md bg-zinc-900 border-zinc-700 text-white">
                  <DialogHeader>
                    <DialogTitle className="text-white">
                      Confirm Purchase
                    </DialogTitle>
                    <DialogDescription className="text-gray-400">
                      Review your ticket selection before proceeding to payment.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <h4 className="font-medium text-white">
                        Selected Tickets:
                      </h4>
                      {event.tickets
                        ?.filter((ticket) => quantities[ticket.id] > 0)
                        .map((ticket) => (
                          <div
                            key={ticket.id}
                            className="flex justify-between text-sm"
                          >
                            <span className="text-gray-300">
                              {ticket.title} x {quantities[ticket.id]}
                            </span>
                            <span className="text-white">
                              Rp{" "}
                              {(
                                ticket.price * quantities[ticket.id]
                              ).toLocaleString("id-ID")}
                            </span>
                          </div>
                        ))}
                    </div>
                    <div className="border-t border-zinc-700 pt-2">
                      <div className="flex justify-between font-semibold">
                        <span className="text-white">Total:</span>
                        <span className="text-orange-500">
                          Rp {totalPrice.toLocaleString("id-ID")}
                        </span>
                      </div>
                    </div>
                  </div>
                  <DialogFooter className="mt-4 flex justify-end gap-2">
                    <Button
                      variant="outline"
                      className="bg-zinc-800 border-zinc-600 text-white hover:bg-zinc-700"
                      onClick={() => setShowConfirm(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handleCheckout}
                      className="bg-orange-500 text-white hover:bg-orange-600"
                    >
                      Proceed to Payment
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
