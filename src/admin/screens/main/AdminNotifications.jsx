import React from "react";
import Footer from "../../components/Footer";
import Pagination from "../../components/Pagination";
import Sidebar from "../../components/Sidebar";
import AdminNav from "../../components/AdminNav";
import { auth } from "../../../database/firebaseDb";
import NotifyMessage from "../../components/NotifyMessage";
import useGetCollection from "../../../components/hooks/UseCollection";

function AdminNotifications() {
  const [notifications, loading, error] = useGetCollection(
    `notifications/${auth.currentUser.uid}/notificationDatas`
  );

  return (
    <>
      <AdminNav />
      <div className="flex">
        <Sidebar />
        <div className="flex-[4]  ">
          <section className="w-[90%]  mx-auto h-screen">
            <Pagination title={"Messages"} />
            <NotifyMessage info={notifications} />
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default AdminNotifications;
