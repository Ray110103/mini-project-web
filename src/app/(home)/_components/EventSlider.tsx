import { Music, Moon, Paintbrush, Utensils, Briefcase, Heart } from "lucide-react";

const categories = [
  { icon: <Music />, label: "Music" },
  { icon: <Moon />, label: "Nightlife" },
  { icon: <Paintbrush />, label: "Arts" },
  { icon: <Utensils />, label: "Food" },
  { icon: <Briefcase />, label: "Business" },
  { icon: <Heart />, label: "Dating" },
];

export default function CategorySlider() {
  return (
    <section className="py-6">
      <h3 className="text-lg font-semibold mb-4">Category Event</h3>
      <div className="flex items-center gap-6 overflow-x-auto pb-2">
        {categories.map((cat, index) => (
          <div
            key={index}
            className="flex flex-col items-center min-w-[80px] text-center text-white hover:text-sky-400 transition"
          >
            <div className="w-14 h-14 rounded-full bg-sky-900 flex items-center justify-center mb-2">
              {cat.icon}
            </div>
            <span className="text-sm">{cat.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
