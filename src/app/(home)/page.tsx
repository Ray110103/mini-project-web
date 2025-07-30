import Navbar from "@/components/Navbar";
import CategoryEvent from "./_components/CategoryEvent";
import EventHome from "./_components/EventHome";
import Footer from "./_components/Footer";
import HeroCarousel from "./_components/HeroCarousel";

const Home = () => {
  return (
    <main className="bg-black text-white  ">
      <Navbar />
      <HeroCarousel />
      <CategoryEvent />
      <EventHome />
      <Footer />
    </main>
  );
};

export default Home;
