import Loading from "@/components/Loading";
import { Suspense } from "react";
import EventDetails from "../_components/EventTabs";
import EventHeader from "../_components/EventHeader";
import EventTabs from "../_components/EventTabs";
import EventSample from "../_components/EventSample";
import Navbar from "@/components/Navbar";
import Footer from "@/app/(home)/_components/Footer";

const EventDetail = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const slug = (await params).slug;

  return (
    <main className="bg-black text-white">
      <Suspense fallback={<Loading />}>
        <Navbar />
        <EventSample slug={slug} />
        <Footer />
      </Suspense>
    </main>
  );
};

export default EventDetail;
