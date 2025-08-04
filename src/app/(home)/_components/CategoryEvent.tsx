"use client"
import { Music, Martini, Paintbrush, Utensils, Briefcase, Heart } from "lucide-react"

const categories = [
  { icon: Music, label: "Music" },
  { icon: Martini, label: "Nightlife" },
  { icon: Paintbrush, label: "Arts" },
  { icon: Utensils, label: "Food" },
  { icon: Briefcase, label: "Business" },
  { icon: Heart, label: "Dating" },
]

const CategoryEvent = () => {
  return (
    <section className="container mx-auto px-4 py-8">
      <h2 className="text-2xl md:text-3xl font-semibold text-white mb-6">Browse Categories</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
        {categories.map(({ icon: Icon, label }, index) => (
          <button
            key={index}
            className="flex flex-col items-center justify-center p-6 bg-gray-900 border border-gray-700 rounded-xl shadow-sm transition-all hover:bg-gray-800 hover:border-orange-500 hover:shadow-lg group"
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
