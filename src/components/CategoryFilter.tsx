"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface CategoryFilterProps {
  value?: string
  onValueChange?: (value: string) => void
}

const categories = [
  { value: "all", label: "All Categories" },
  { value: "music", label: "Music" },
  { value: "nightlife", label: "Nightlife" },
  { value: "arts", label: "Arts" },
  { value: "food", label: "Food" },
  { value: "business", label: "Business" },
  { value: "dating", label: "Dating" },
]

export function CategoryFilter({ value = "all", onValueChange }: CategoryFilterProps) {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className="w-full h-12 bg-zinc-900 border-2 border-zinc-700 text-white hover:border-orange-400 focus:border-orange-500 focus-visible:ring-1 focus-visible:ring-orange-500 rounded-xl">
        <SelectValue placeholder="Select category" />
      </SelectTrigger>
      <SelectContent className="bg-zinc-900 border-2 border-zinc-700 rounded-xl shadow-lg p-2">
        {categories.map((category) => (
          <SelectItem
            key={category.value}
            value={category.value}
            className="px-3 py-2.5 rounded-lg text-white hover:bg-orange-500/20 focus:bg-orange-500/20 cursor-pointer transition-colors duration-150"
          >
            <span className="font-medium">{category.label}</span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
