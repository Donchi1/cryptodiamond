import React from "react";

import Toast from "../../../components/Alert";
import AdminNav from "../../components/AdminNav";
import Sidebar from "../../components/Sidebar";
import Pagination from "../../components/Pagination";
import useCollection from "../../../components/hooks/UseCollection";
import Contact from "../../components/Contact";
import Footer from "../../components/Footer";

export default function AdminContacts() {
  const [contacts, loading, error] = useCollection("contacts");
  return (
    <>
      <AdminNav />
      <div className="flex">
        <Sidebar />
        <div className="flex-[4] h-screen overflow-x-hidden">
          <section className="w-[90%]  mx-auto  ">
            <Pagination title={"Contacts"} />
            <Contact contacts={contacts} />
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
}
