import React, { Suspense } from "react";
import Footer from "../components/Footer";
import Pagination from "../components/Pagination";
import Sidebar from "../components/Sidebar";
import UserNav from "../components/UserNav";
import { auth } from "../../database/firebaseDb";
import NotifyMessage from "../components/NotifyMessage";
import useGetCollection from "../../components/hooks/UseCollection";
import Toast from "../../components/Alert";

function Notifications() {
  const [notifications, loading, error] = useGetCollection(
    `notifications/${auth.currentUser.uid}/notificationDatas`
  );

  return (
    <Suspense fallback={Toast.modal()}>
      <UserNav />
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
    </Suspense>
  );
}

export default Notifications;
