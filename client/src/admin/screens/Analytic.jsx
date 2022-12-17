import React from "react";
import Footer from "../components/Footer";
import Pagination from "../components/Pagination";
import Sidebar from "../components/Sidebar";
import AdminNav from "../components/AdminNav";
import Toast from "../../components/Alert";
import useCollection from "../../components/hooks/UseCollection";
import Charts from "../components/Charts";
import InfoWidget from "../components/InfoWidget";

const Analytics = () => {
  const [users, loading, err] = useCollection("users");
  const data = users?.map((each) => {
    return [{ name: each.name, amount: each.initialDeposit }];
  });
  return (
    <>
      <AdminNav />
      <div className="flex">
        <Sidebar />
        <div className="flex-[4] h-screen ">
          <section className="w-[90%]  mx-auto ">
            <Pagination title="Analytics" />
            <Charts />
            <InfoWidget />
          </section>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Analytics;
