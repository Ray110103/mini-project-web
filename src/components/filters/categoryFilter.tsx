"use client"

import { ChevronDown } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CATEGORIES } from "@/app/types/event"

interface CategoryFilterProps {
  value?: string
  onValueChange?: (value: string) => void
}

export function CategoryFilter({ value = "all", onValueChange }: CategoryFilterProps) {
  return (
    <div className="relative">
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger className="w-full sm:w-[220px] h-12 px-4 bg-white border-2 border-gray-200 hover:border-orange-300 focus:border-orange-500 focus-visible:ring-1 focus-visible:ring-orange-500 rounded-xl">
          <SelectValue placeholder="Select category" />
          <ChevronDown className="h-4 w-4 text-gray-500" />
        </SelectTrigger>
        <SelectContent className="w-[220px] bg-white border-2 border-gray-100 rounded-xl shadow-lg p-2">
          {CATEGORIES.map((category) => (
            <SelectItem
              key={category.value}
              value={category.value}
              className="px-3 py-2.5 rounded-lg hover:bg-orange-50 focus:bg-orange-50 cursor-pointer transition-colors duration-150"
            >
              <span className="font-medium text-gray-700">{category.label}</span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
