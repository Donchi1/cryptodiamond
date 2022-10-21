import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import * as Icons from "react-icons/bs";
import { auth, storage, db } from "../../database/firebaseDb";
import { signOut } from "firebase/auth";
import { uploadBytes, ref, getDownloadURL } from "firebase/storage";
import { doc, updateDoc } from "firebase/firestore";

import Compressor from "compressorjs";
import useGetDocument from "../../components/hooks/UseDocument";
import Toast from "../../components/Alert";
import qrcode from "/qrcode.jpg";

export default function Sidebar() {
  const { openSidebar } = useSelector((state) => state.app);
  const [user, loading, error] = useGetDocument("users", auth.currentUser.uid, {
    snap: true,
  });

  const { pathname } = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    signOut(auth).then(() => navigate("/"));
  };

  const compressImg = (img) => {
    return new Compressor(img, {
      quality: 0.6,
      success: (file) => file,
    });
  };

  const uploadProve = async (prove) => {
    const compressedFile = compressImg(prove);
    try {
      const docRef = ref(storage, "accessCodeProves", auth.currentUser.uid);
      await uploadBytes(docRef, compressedFile);
      const url = await getDownloadURL(docRef);
      await updateDoc(doc(db, "users", auth.currentUser.uid), {
        accessCodeProve: url,
      });
      Toast.success.fire({
        icon: "success",
        text: "Your access code prove upload successful. Kindly wait while we review your prove.",
      });
    } catch (err) {
      Toast.error.fire({
        icon: "error",
        text: err,
      });
    }
  };

  return (
    <>
      <aside className="flex-[1] hidden h-screen   lg:flex flex-col  ">
        <div className="fixed top-14 w-[20%] bg-primary2 h-full">
          <div className="p-5 text-gray-600 ">
            <div className="mb-3">
              <h3 className="text-lg mb-2 font-bold uppercase text-white ">
                Dashboard
              </h3>
              <ul className="flex flex-col gap-1  ">
                <li>
                  <Link
                    to="/adm"
                    className="dark:hover:text-black transition-all items-center gap-2 focus:bg-blue-100 flex duration-500 ease-linear p-2 text-gray-500  cursor-pointer   rounded-lg  hover:bg-blue-100 "
                  >
                    <Icons.BsHouse size={22} className="primary-text" />
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/adm/profile"
                    className="dark:hover:text-black transition-all items-center gap-2 focus:bg-blue-100 flex duration-500 ease-linear p-2 text-gray-500  cursor-pointer   rounded-lg  hover:bg-blue-100 "
                  >
                    <Icons.BsPerson size={22} className="primary-text" />
                    Profile
                  </Link>
                </li>
                <li>
                  <Link
                    to="/adm/analytics"
                    className="dark:hover:text-black transition-all items-center gap-2 focus:bg-blue-100 flex duration-500 ease-linear p-2 text-gray-500  cursor-pointer   rounded-lg  hover:bg-blue-100 "
                  >
                    <Icons.BsFileBarGraph size={22} className="primary-text" />
                    Analytics
                  </Link>
                </li>
              </ul>
            </div>
            <div className="mb-3">
              <h3 className="text-lg mb-2 font-bold uppercase text-white ">
                Menu
              </h3>
              <ul className="flex flex-col gap-1  ">
                <li>
                  <Link
                    to="/adm/contacts"
                    className="dark:hover:text-black transition-all items-center gap-2 focus:bg-blue-100 flex duration-500 ease-linear p-2 text-gray-500  cursor-pointer   rounded-lg  hover:bg-blue-100 "
                  >
                    <Icons.BsGraphUp size={22} className="primary-text" />
                    Contacts
                  </Link>
                </li>
                <li>
                  <Link
                    to="/adm/transactions"
                    className="dark:hover:text-black w-full transition-all items-center gap-2 focus:bg-blue-100 flex duration-500 ease-linear p-2 text-gray-500  cursor-pointer   rounded-lg  hover:bg-blue-100 "
                  >
                    <Icons.BsFilterRight size={22} className="primary-text" />
                    Transactions
                  </Link>
                </li>
                <li>
                  <Link
                    to="/adm/users"
                    className="dark:hover:text-black transition-all items-center gap-2 focus:bg-blue-100 flex duration-500 ease-linear p-2 text-gray-500  cursor-pointer   rounded-lg  hover:bg-blue-100 "
                  >
                    <Icons.BsFolder2 size={22} className="primary-text" />
                    Users
                  </Link>
                </li>
                <li>
                  <Link
                    to="/adm/subcribers"
                    className="dark:hover:text-black transition-all items-center gap-2 focus:bg-blue-100 flex duration-500 ease-linear p-2 text-gray-500  cursor-pointer   rounded-lg  hover:bg-blue-100 "
                  >
                    <Icons.BsSortDownAlt size={22} className="primary-text" />
                    Suscribers
                  </Link>
                </li>
              </ul>
            </div>
            <div className="mb-3">
              <h3 className="text-lg mb-2 font-bold uppercase text-white ">
                Notifications
              </h3>
              <ul className="flex flex-col gap-1  ">
                <li>
                  <Link
                    to="/adm/messages"
                    className="dark:hover:text-black transition-all items-center gap-2 focus:bg-blue-100 flex duration-500 ease-linear p-2 text-gray-500  cursor-pointer   rounded-lg  hover:bg-blue-100 "
                  >
                    <Icons.BsBell size={22} className="primary-text" />
                    Messages
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className=" flex justify-end flex-col h-20 mx-4 ">
            <ul className="flex flex-col gap-1  ">
              <li>
                <button
                  onClick={handleLogout}
                  className="btn-primary transition-all text-white  gap-2  flex items-center duration-500 ease-linear p-2 cursor-pointer   rounded-lg   "
                >
                  <Icons.BsDoorClosed size={22} className="text-white" />
                  Log-out
                </button>
              </li>
            </ul>
          </div>
        </div>
      </aside>

      <aside
        className={`${
          openSidebar ? "-translate-x-full" : "translate-x-0"
        } transition-all z-40 ease-linear duration-500  sidebar w-2/4  h-screen bg-primary2 lg:hidden block fixed top-[4rem] `}
      >
        <div className="p-5 text-gray-600">
          <div className="mb-3">
            <h3 className="text-lg mb-2 font-bold uppercase text-white ">
              Dashboard
            </h3>
            <ul className="flex flex-col gap-1  ">
              <li>
                <Link
                  to="/adm"
                  className="dark:hover:text-black transition-all items-center gap-2 focus:bg-blue-100 flex duration-500 ease-linear p-2 text-gray-500  cursor-pointer   rounded-lg  hover:bg-blue-100 "
                >
                  <Icons.BsHouse size={22} className="primary-text" />
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/adm/profile"
                  className="dark:hover:text-black transition-all items-center gap-2 focus:bg-blue-100 flex duration-500 ease-linear p-2 text-gray-500  cursor-pointer   rounded-lg  hover:bg-blue-100 "
                >
                  <Icons.BsPerson size={22} className="primary-text" />
                  Profile
                </Link>
              </li>
              <li>
                <Link
                  to="/adm/analytics"
                  className="dark:hover:text-black transition-all items-center gap-2 focus:bg-blue-100 flex duration-500 ease-linear p-2 text-gray-500  cursor-pointer   rounded-lg  hover:bg-blue-100 "
                >
                  <Icons.BsFileBarGraph size={22} className="primary-text" />
                  Analytics
                </Link>
              </li>
            </ul>
          </div>
          <div className="mb-3">
            <h3 className="text-lg mb-2 font-bold uppercase text-white ">
              Menu
            </h3>
            <ul className="flex flex-col gap-1  ">
              <li>
                <Link
                  to="/adm/contacts"
                  className="dark:hover:text-black transition-all items-center gap-2 focus:bg-blue-100 flex duration-500 ease-linear p-2 text-gray-500  cursor-pointer   rounded-lg  hover:bg-blue-100 "
                >
                  <Icons.BsGraphUp size={22} className="primary-text" />
                  Contacts
                </Link>
              </li>
              <li>
                <Link
                  to="/adm/transactions"
                  className="dark:hover:text-black w-full transition-all items-center gap-2 focus:bg-blue-100 flex duration-500 ease-linear p-2 text-gray-500  cursor-pointer   rounded-lg  hover:bg-blue-100 "
                >
                  <Icons.BsFilterRight size={22} className="primary-text" />
                  Transactions
                </Link>
              </li>
              <li>
                <Link
                  to="/adm/users"
                  className="dark:hover:text-black transition-all items-center gap-2 focus:bg-blue-100 flex duration-500 ease-linear p-2 text-gray-500  cursor-pointer   rounded-lg  hover:bg-blue-100 "
                >
                  <Icons.BsFolder2 size={22} className="primary-text" />
                  Users
                </Link>
              </li>
              <li>
                <Link
                  to="/adm/subcribers"
                  className="dark:hover:text-black transition-all items-center gap-2 focus:bg-blue-100 flex duration-500 ease-linear p-2 text-gray-500  cursor-pointer   rounded-lg  hover:bg-blue-100 "
                >
                  <Icons.BsSortDownAlt size={22} className="primary-text" />
                  Suscribers
                </Link>
              </li>
            </ul>
          </div>
          <div className="mb-3">
            <h3 className="text-lg mb-2 font-bold uppercase text-white ">
              Notifications
            </h3>
            <ul className="flex flex-col gap-1  ">
              <li>
                <Link
                  to="/adm/messages"
                  className="dark:hover:text-black transition-all items-center gap-2 focus:bg-blue-100 flex duration-500 ease-linear p-2 text-gray-500  cursor-pointer   rounded-lg  hover:bg-blue-100 "
                >
                  <Icons.BsBell size={22} className="primary-text" />
                  Messages
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className=" flex justify-end flex-col h-20 ">
          <ul className="flex flex-col gap-1  ">
            <li>
              <button
                onClick={handleLogout}
                className="transition-all rounded-lg items-center gap-2 btn-primary flex duration-500 ease-linear p-2 text-white  cursor-pointer  "
              >
                <Icons.BsDoorClosed size={22} className="primary-text" />
                Log-out
              </button>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
}
