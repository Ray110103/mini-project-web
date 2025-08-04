"use client"

import { MapPin } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { LOCATIONS } from "@/app/types/event"

interface LocationFilterProps {
  value?: string
  onValueChange?: (value: string) => void
}

export function LocationFilter({ value = "all", onValueChange }: LocationFilterProps) {
  return (
    <div className="relative">
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger className="w-full sm:w-[220px] h-12 px-4 bg-white border-2 border-gray-200 hover:border-orange-300 focus:border-orange-500 focus-visible:ring-1 focus-visible:ring-orange-500 rounded-xl">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-gray-500" />
            <SelectValue placeholder="Select location" />
          </div>
        </SelectTrigger>
        <SelectContent className="w-[220px] bg-white border-2 border-gray-100 rounded-xl shadow-lg p-2">
          {LOCATIONS.map((location) => (
            <SelectItem
              key={location.value}
              value={location.value}
              className="px-3 py-2.5 rounded-lg hover:bg-orange-50 focus:bg-orange-50 cursor-pointer transition-colors duration-150"
            >
              <span className="font-medium text-gray-700">{location.label}</span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
