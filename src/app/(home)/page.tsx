import EventSlider from "./_components/EventSlider";
import HeroCarousel from "./_components/HeroCarousel";
import RecentEvent from "./_components/RecentEvent";

const Home = () => {
  return (
    <main className="bg-black text-white">
      <HeroCarousel />
      <section className="container mx-auto px-4 py-12">
        <EventSlider />
        <RecentEvent />
      </section>
    </main>
  );
};

export default Home;
