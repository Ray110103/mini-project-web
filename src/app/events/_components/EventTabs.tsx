import type { Event, Organizer } from "@/app/types/event"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image"
import type { FC } from "react"
import { getEvent } from "../_api/get-event"

interface EventDetailsProps {
  event: Event
  slug: string
  organizer: Organizer
  // Ensure organizer is part of the props
}

const EventTabs: FC<EventDetailsProps> = async ({ slug }) => {
  // Fetch the event data using the slug
  const event = await getEvent(slug)
  // Assuming you fetch the organizer based on the event's adminId or another mechanism
  const organizer = await getOrganizer(event.adminId) // Fetch the organizer's data

  return (
    <div className="p-6 space-y-6 bg-black text-white">
      <h1 className="text-3xl font-bold text-white">{event.title}</h1>
      <Tabs defaultValue="description" className="w-full">
        <TabsList className="flex space-x-4 bg-transparent border-b border-gray-700 rounded-none p-0 h-auto">
          <TabsTrigger
            value="description"
            className="px-6 py-3 font-medium bg-transparent text-gray-400 hover:text-white data-[state=active]:text-white data-[state=active]:border-b-2 data-[state=active]:border-orange-500 data-[state=active]:bg-transparent rounded-none border-b-2 border-transparent"
          >
            Description
          </TabsTrigger>
          <TabsTrigger
            value="event-details"
            className="px-6 py-3 font-medium bg-transparent text-gray-400 hover:text-white data-[state=active]:text-white data-[state=active]:border-b-2 data-[state=active]:border-orange-500 data-[state=active]:bg-transparent rounded-none border-b-2 border-transparent"
          >
            Event Details
          </TabsTrigger>
          <TabsTrigger
            value="tickets"
            className="px-6 py-3 font-medium bg-transparent text-gray-400 hover:text-white data-[state=active]:text-white data-[state=active]:border-b-2 data-[state=active]:border-orange-500 data-[state=active]:bg-transparent rounded-none border-b-2 border-transparent"
          >
            Tickets
          </TabsTrigger>
        </TabsList>

        {/* Description Tab */}
        <TabsContent value="description" className="py-6">
          <div className="space-y-4 text-gray-300 leading-relaxed">
            <p>{event.description}</p>
          </div>
        </TabsContent>

        {/* Event Details Tab */}
        <TabsContent value="event-details" className="py-6">
          <div className="space-y-4 text-gray-300">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold text-white mb-2">Event Information</h4>
                <div className="space-y-2 text-sm">
                  <p>
                    <span className="text-orange-500">Category:</span> {event.category}
                  </p>
                  <p>
                    <span className="text-orange-500">Location:</span> {event.location}
                  </p>
                  <p>
                    <span className="text-orange-500">Date:</span> {new Date(event.startDate).toLocaleDateString()} -{" "}
                    {new Date(event.endDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-2">Organizer</h4>
                <div className="flex items-center space-x-3">
                  <Image
                    src={organizer.avatar || "/placeholder.svg?height=40&width=40"}
                    alt={organizer.name}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <p className="font-medium text-white">{organizer.name}</p>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Tickets Tab */}
        <TabsContent value="tickets" className="py-6">
          <div className="space-y-4 text-gray-300">
            <div className="bg-gray-800 rounded-lg p-6">
              <h4 className="font-semibold text-white mb-4">Ticket Information</h4>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-gray-700 rounded-lg">
                  <div>
                    <h5 className="font-medium text-white">General Admission</h5>
                    <p className="text-sm text-gray-400">Access to all event activities</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-orange-500">
                      {event.price === 0 ? "Free" : `Rp ${event.price.toLocaleString()}`}
                    </p>
                    <p className="text-xs text-gray-400">per person</p>
                  </div>
                </div>
                <button className="w-full px-4 py-3 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-lg transition-colors">
                  Register Now
                </button>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

// Helper function to fetch the organizer by ID (you should implement this)
const getOrganizer = async (adminId: number) => {
  // Replace this with actual logic to fetch the organizer based on adminId
  return {
    name: "Daniel Reinhard",
    avatar: "/path/to/avatar.jpg", // Example, replace with real data
  }
}

export default EventTabs
