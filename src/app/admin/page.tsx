import Navbar from "@/components/Navbar";
import React from "react";
import Footer from "../(home)/_components/Footer";
import AdminProfile from "./components/AdminProfile";

const page = () => {
  return (
    <div className="bg-black">
      <Navbar />
      <AdminProfile />
      <Footer />
    </div>
  );
};

export default page;
