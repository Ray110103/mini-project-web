"use client";

import {
  Music,
  Martini,
  Paintbrush,
  Utensils,
  Briefcase,
  Heart,
} from "lucide-react";
import React from "react";

const categories = [
  { icon: Music, label: "Music" },
  { icon: Martini, label: "Nightlife" },
  { icon: Paintbrush, label: "Arts" },
  { icon: Utensils, label: "Food" },
  { icon: Briefcase, label: "Business" },
  { icon: Heart, label: "Dating" },
];

const CategoryEvent = () => {
  return (
    <section className="w-full container mx-auto px-4 py-4 ">
      <h2 className="text-2xl md:text-3xl font-semibold text-white mb-6">
        Category Event
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
        {categories.map(({ icon: Icon, label }, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center p-4  border rounded-xl shadow-sm transition"
          >
            <Icon className="w-8 h-8 md:w-10 md:h-10 text-white mb-2" />
            <span className="text-sm md:text-base font-medium text-white">
              {label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategoryEvent;
