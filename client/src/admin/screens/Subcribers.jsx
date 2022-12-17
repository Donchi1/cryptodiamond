import React from "react";

import AdminNav from "../components/AdminNav";
import Sidebar from "../components/Sidebar";
import Pagination from "../components/Pagination";
import useCollection from "../../components/hooks/UseCollection";
import Subcribe from "../components/Subcribe";
import Footer from "../components/Footer";

export default function Subcribers() {
  const [subcribers, loading, error] = useCollection("newsletters");

  return (
    <>
      <AdminNav />
      <div className="flex">
        <Sidebar />
        <div className="flex-[4] h-screen overflow-x-hidden ">
          <section className="w-[90%] mx-auto ">
            <Pagination title={"Subscribers"} />
            <Subcribe />
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
}
