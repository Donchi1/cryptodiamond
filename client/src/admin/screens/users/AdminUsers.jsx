import React, { useEffect, useState } from "react";
import UserDatalist from "../../components/UserDatalist";
import Pagination from "../../components/Pagination";
import AdminNav from "../../components/AdminNav";
import Sidebar from "../../components/Sidebar";
import Toast from "../../../components/Alert";
import { db } from "../../../database/firebaseDb";
import { getDocs, where, collection, query } from "firebase/firestore";
import Footer from "../../components/Footer";
import { Link } from "react-router-dom";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [refresh, setRefresh] = useState(false);
  useEffect(() => {
    const getUsers = async () => {
      const use = await getDocs(
        query(collection(db, "users"), where("isAdmin", "!=", true))
      );
      const info = use.docs.map((each) => each.data());
      setUsers(info);
    };
    getUsers();
  }, [refresh]);
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
            <UserDatalist users={users} setRefresh={setRefresh} />
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
}
