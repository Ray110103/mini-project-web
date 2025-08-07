"use client"

import { CategoryFilter } from "@/components/CategoryFilter"
import PaginationSection from "@/components/PaginationSection"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { useDebounceValue } from "usehooks-ts"
import useGetEvents from "../_hooks/useGetEvents"
import EventCard from "./EventCard"
import EventCardSkeleton from "./EventCardSkeleton"

const EventList = () => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(1)
  const [category, setCategory] = useState("all")
  const [location, setLocation] = useState("all")
  const [debounceSearch] = useDebounceValue(search, 500)

  useEffect(() => {
    const urlCategory = searchParams.get("category")
    const urlLocation = searchParams.get("location")
    if (urlCategory) setCategory(urlCategory)
    if (urlLocation) setLocation(urlLocation)
  }, [searchParams])

  useEffect(() => {
    const params = new URLSearchParams(searchParams)
    category !== "all" ? params.set("category", category) : params.delete("category")
    location !== "all" ? params.set("location", location) : params.delete("location")
    router.replace(`/events?${params.toString()}`)
  }, [category, location])

  const { data: events, isPending } = useGetEvents({
    page,
    search: debounceSearch,
    take: 3,
    sortBy: "createdAt",
    sortOrder: "desc",
    category: category === "all" ? undefined : category,
    location: location === "all" ? undefined : location,
  })

  return (
    <div className="bg-black">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-6">Discover Events</h1>

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search Input */}
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Search events..."
                className="w-full pl-10 h-12 bg-zinc-900 border-2 border-zinc-700 text-white placeholder:text-gray-400 hover:border-orange-400 focus:border-orange-500 focus-visible:ring-1 focus-visible:ring-orange-500 rounded-xl"
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            {/* Category Filter */}
            <div className="w-full [&>div]:w-full [&>div>button]:w-full [&>div>button]:h-12 [&>div>button]:bg-zinc-900 [&>div>button]:border-2 [&>div>button]:border-zinc-700 [&>div>button]:text-white [&>div>button]:hover:border-orange-400 [&>div>button]:focus:border-orange-500 [&>div>button]:rounded-xl">
              <CategoryFilter value={category} onValueChange={setCategory} />
            </div>

            {/* Location Filter */}
            <Select value={location} onValueChange={setLocation}>
              <SelectTrigger className="w-full h-12 bg-zinc-900 border-2 border-zinc-700 text-white hover:border-orange-400 focus:border-orange-500 focus-visible:ring-1 focus-visible:ring-orange-500 rounded-xl">
                <SelectValue placeholder="Select location" />
              </SelectTrigger>
              <SelectContent className="bg-zinc-900 border-2 border-zinc-700 rounded-xl shadow-lg p-2">
                <SelectItem
                  value="all"
                  className="px-3 py-2.5 rounded-lg text-white hover:bg-orange-500/20 focus:bg-orange-500/20 cursor-pointer transition-colors duration-150"
                >
                  <span className="font-medium">All Locations</span>
                </SelectItem>
                <SelectItem
                  value="jakarta"
                  className="px-3 py-2.5 rounded-lg text-white hover:bg-orange-500/20 focus:bg-orange-500/20 cursor-pointer transition-colors duration-150"
                >
                  <span className="font-medium">Jakarta</span>
                </SelectItem>
                <SelectItem
                  value="bandung"
                  className="px-3 py-2.5 rounded-lg text-white hover:bg-orange-500/20 focus:bg-orange-500/20 cursor-pointer transition-colors duration-150"
                >
                  <span className="font-medium">Bandung</span>
                </SelectItem>
                <SelectItem
                  value="bali"
                  className="px-3 py-2.5 rounded-lg text-white hover:bg-orange-500/20 focus:bg-orange-500/20 cursor-pointer transition-colors duration-150"
                >
                  <span className="font-medium">Bali</span>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Event Grid */}
        <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {isPending && <EventCardSkeleton count={3} />}
          {events?.data.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </section>

        {/* Empty State */}
        {!isPending && events && events.data.length === 0 && (
          <div className="text-center py-20">
            <div className="max-w-md mx-auto">
              <div className="w-16 h-16 bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">No events found</h3>
              <p className="text-gray-400">Try adjusting your search filters to discover more events</p>
            </div>
          </div>
        )}

        {/* Pagination */}
        {events && (
          <div className="mt-12 flex justify-center">
            <PaginationSection meta={events.meta} setPage={setPage} />
          </div>
        )}
      </div>
    </div>
  )
}

export default EventList
