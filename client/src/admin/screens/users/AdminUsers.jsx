import React, { Suspense } from "react";
import UserDatalist from "../../components/UserDatalist";
import Pagination from "../../components/Pagination";
import AdminNav from "../../components/AdminNav";
import Sidebar from "../../components/Sidebar";
import Toast from "../../../components/Alert";
import useCollection from "../../../components/hooks/UseCollection";
import Footer from "../../components/Footer";

export default function AdminUsers() {
  const [users, loading, error] = useCollection("users");
  return (
    <Suspense fallback={loading && Toast.modal()}>
      <AdminNav />
      <div className="flex">
        <Sidebar />
        <div className="flex-[4] h-screen ">
          <section className="w-[90%]  mx-auto ">
            <Pagination title={"Users"} />

            <UserDatalist users={users} />
          </section>
        </div>
      </div>
      <Footer />
    </Suspense>
  );
}
