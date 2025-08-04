"use client"

import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"

interface SearchFilterProps {
  value?: string
  onChange: (value: string) => void
}

export function SearchFilter({ value = "", onChange }: SearchFilterProps) {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
      <Input
        type="text"
        placeholder="Search events..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-10 h-12 bg-white border-2 border-gray-200 hover:border-orange-300 focus:border-orange-500 focus-visible:ring-1 focus-visible:ring-orange-500 rounded-xl"
      />
    </div>
  )
}
