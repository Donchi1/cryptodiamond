import React from "react";

import Toast from "../../../components/Alert";
import TransactionDatalist from "../../components/TransactionDatalist";
import AdminNav from "../../components/AdminNav";
import Sidebar from "../../components/Sidebar";
import Pagination from "../../components/Pagination";
import Footer from "../../components/Footer";
import useCollectionGroup from "../../../components/hooks/UseCollectionGroup";

export default function AdminTransactions() {
  const [transactions, loading, error] = useCollectionGroup("transactionDatas");

  return (
    <>
      <AdminNav />
      <div className="flex">
        <Sidebar />
        <div className="flex-[4] h-screen ">
          <section className="w-[90%]  mx-auto ">
            <Pagination title={"Transactions"} />
            <TransactionDatalist />
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
}
