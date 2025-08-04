import Navbar from "@/components/Navbar";
import Events from "../(home)/_components/Events";
import Footer from "../(home)/_components/Footer";
import PaginationSection from "@/components/PaginationSection";
import { CategoryFilter } from "@/components/CategoryFilter";

export default function Page() {
  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <Events />
      <Footer />
    </div>
  );
}
