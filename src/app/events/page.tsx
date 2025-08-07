import Navbar from "@/components/Navbar";
import Events from "../(home)/_components/Events";
import Footer from "../(home)/_components/Footer";
import EventList from "./_components/EventList";
import { Suspense } from "react";

export default function Page() {
  return (
    <div className="bg-black text-white">
      <Navbar />
      <Suspense>
        <EventList />
      </Suspense>
      <Footer />
    </div>
  );
}
