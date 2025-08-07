"use client"

import { Music, Martini, Paintbrush, Utensils, Briefcase, Heart } from 'lucide-react'
import { useRouter } from "next/navigation"

const categories = [
  { icon: Music, label: "Music", value: "music" },
  { icon: Martini, label: "Nightlife", value: "nightlife" },
  { icon: Paintbrush, label: "Arts", value: "arts" },
  { icon: Utensils, label: "Food", value: "food" },
  { icon: Briefcase, label: "Business", value: "business" },
  { icon: Heart, label: "Dating", value: "dating" },
]

const CategoryEvent = () => {
  const router = useRouter()

  const handleCategoryClick = (categoryValue: string) => {
    // Navigate to events page with category filter
    router.push(`/events?category=${categoryValue}`)
  }

  return (
    <section className="container mx-auto px-4 py-8">
      <h2 className="text-2xl md:text-3xl font-semibold text-white mb-6">Browse Categories</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
        {categories.map(({ icon: Icon, label, value }, index) => (
          <button
            key={index}
            onClick={() => handleCategoryClick(value)}
            className="flex flex-col items-center justify-center p-6 bg-gray-900 border border-gray-700 rounded-xl shadow-sm transition-all hover:bg-gray-800 hover:border-orange-500 hover:shadow-lg group cursor-pointer"
          >
            <Icon className="w-8 h-8 md:w-10 md:h-10 text-gray-400 mb-3 group-hover:text-orange-500 transition-colors" />
            <span className="text-sm md:text-base font-medium text-white group-hover:text-orange-500 transition-colors">
              {label}
            </span>
          </button>
        ))}
      </div>
    </section>
  )
}

export default CategoryEvent
