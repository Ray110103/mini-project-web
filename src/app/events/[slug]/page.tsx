import Footer from "@/app/(home)/_components/Footer";
import Loading from "@/components/Loading";
import Navbar from "@/components/Navbar";
import { Suspense } from "react";
import EventDetails from "../_components/EventDetails";

const EventDetail = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const slug = (await params).slug;

  return (
    <main className="bg-black text-white">
      <Navbar />
      <EventDetails slug={slug} />
      <Footer />
    </main>
  );
};

export default EventDetail;
