import Footer from "@/app/(home)/_components/Footer";
import Loading from "@/components/Loading";
import Navbar from "@/components/Navbar";
import { Suspense } from "react";
import OrderDetails from "../components/OrderDetails";

const OrderDetailPage = async ({
  params,
}: {
  params: Promise<{ uuid: string }>;
}) => {
  const uuid = (await params).uuid;

  return (
    <main className="bg-black text-white">
      <Suspense fallback={<Loading />}>
        <Navbar />
        <OrderDetails uuid={uuid} />
        <Footer />
      </Suspense>
    </main>
  );
};

export default OrderDetailPage;
