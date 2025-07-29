import Navbar from "@/components/Navbar";
import CategoryEvent from "./_components/CategoryEvent";
import EventSlider from "./_components/CategoryEvent";
import Footer from "./_components/Footer";
import HeroCarousel from "./_components/HeroCarousel";
import RecentEvent from "./_components/RecentEvent";

const Home = () => {
  return (
    <main className="bg-black text-white py-12 ">
      <Navbar />
      <HeroCarousel />
      <CategoryEvent />
      <RecentEvent />
      <Footer />
    </main>
  );
};

export default Home;
