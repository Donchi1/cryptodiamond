import React from "react";
import UserDatalist from "../../components/UserDatalist";
import Pagination from "../../components/Pagination";
import AdminNav from "../../components/AdminNav";
import Sidebar from "../../components/Sidebar";
import Footer from "../../components/Footer";
import { Link } from "react-router-dom";
import useCollection from "../../../components/hooks/UseCollection";

export default function AdminUsers() {
  let [users, loading, error] = useCollection("users");

  users = users.filter((each) => each.isAdmin === false);

  return (
    <>
      <AdminNav />
      <div className="flex">
        <Sidebar />
        <div className="flex-[4] h-screen ">
          <section className="w-[90%]  mx-auto ">
            <Pagination title={"Users"} />
            <Link
              to="/adm/users/create"
              className="bg-green-500 py-2 px-2 rounded-lg mb-2 text-white inline-block"
            >
              Create
            </Link>
            <UserDatalist users={users} loading={loading} />
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
}
