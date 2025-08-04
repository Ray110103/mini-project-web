import Navbar from "@/components/Navbar";
import CategoryEvent from "./_components/CategoryEvent";
import Events from "./_components/Events";
import Footer from "./_components/Footer";
import HeroCarousel from "./_components/HeroCarousel";
import NewestEvent from "./_components/NewestEvent";

const Home = () => {
  return (
    <main className="bg-black text-white">
      <Navbar />
      <HeroCarousel />
      <CategoryEvent />
      <NewestEvent />
      <Events />
      <Footer />
    </main>
  );
};

export default Home;
