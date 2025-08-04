import Link from "next/link";
import { ArrowRight } from "lucide-react";

const NewestEvent = () => {
  return (
    <div className="container mx-auto px-4 py-8 ">
      <div>
        <h3 className="text-2xl font-bold text-white md:text-3xl">
          Newest Events
        </h3>
        <p className="text-gray-400 text-sm mt-1">
          Discover the latest events happening around you
        </p>
      </div>
      <Link
        href="/events"
        className="inline-flex items-center gap-2 text-sm font-medium text-orange-500 hover:text-orange-400 transition-colors group"
      >
        See all
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </Link>
    </div>
  );
};

export default NewestEvent;
