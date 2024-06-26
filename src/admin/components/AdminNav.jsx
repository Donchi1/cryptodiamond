import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as Icons from "react-icons/bs";
import * as Icons1 from "react-icons/im";
import avater from "/avatar.png";
import logo from "/logo.png";
import { handleSidebar } from "../../state/mainSlice";
import { auth, db } from "../../database/firebaseDb";
import NotifyDropdown from "./NotifyDropdown";
import { motion } from "framer-motion";
import useGetCollection from "../../components/hooks/UseCollection";
import useGetDocument from "../../components/hooks/UseDocument";
import {
  query,
  collection,
  getDocs,
  doc,
  where,
  updateDoc,
} from "firebase/firestore";
import { getAllUsers } from "../../state/adminAuthSlice";

//import { adminContext } from "../../New-Project/context/AdminContext";

const AdminNav = () => {
  const [user] = useGetDocument("users", auth.currentUser?.uid, {snap: true})
  const dispatch = useDispatch();
 



  //const { setOpenSidebar, dark, setDark } = useContext(adminContext);
  const [notifications, loading, error] = useGetCollection(
    `notifications/${auth.currentUser.uid}/notificationDatas`
  );
  useEffect(() => {
    const getUsers = async () => {
      const use = await getDocs(
        query(collection(db, "users"), where("isAdmin", "!=", true))
      );
      const info = use.docs.map((each) => each.data());

      dispatch(getAllUsers(info));
    };
    getUsers();
  }, []);
  const { pathname } = useLocation();
  const [openDropdown, setOpenDropdown] = useState(false);
  const [openDropdownM, setOpenDropdownM] = useState(false);
  const url = pathname.split("/")[2];

  const filteredNotes = () => {
    return notifications?.find((each) => each.recent === true);
  };

  const handleBellClick = async () => {
    setOpenDropdownM((prev) => !prev);
    if (filteredNotes()?.recent) {
      const snapShot = await getDocs(
        query(
          collection(
            db,
            "notifications",
            auth.currentUser.uid,
            "notificationDatas"
          ),
          where("recent", "==", true)
        )
      );
      snapShot.forEach(async (each) => {
        await updateDoc(
          doc(
            db,
            "notifications",
            auth.currentUser.uid,
            "notificationDatas",
            each?.uid
          ),
          {
            recent: false,
          }
        );
      });
    }
  };

  return (
    <>
      <header
        className="flex
      max-h-screen
      h-16
      items-center  
      justify-between
      bg-primary2
      dark:bg-gray-800
      dark:text-white
      sticky
      top-0
      w-full
      z-40 shadow  px-4"
      >
        <div className="flex-1">
          <Link to="/">
            <img src={logo} className="w-[150px] h-[50px] " />
          </Link>
        </div>

        <div className="space-x-4  lg:space-x-8 flex items-center justify-center transition-all ease-linear duration-500">
          <div className="relative">
            <Icons1.ImBell
              stroke="#93c5fd"
              strokeWidth={0.1}
              className=" text-white lg:text-[25px] text-[20px] cursor-pointer "
              onClick={handleBellClick}
            />
            {filteredNotes()?.recent && (
              <motion.span
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: [1, 0, 1.5, 2] }}
                transition={{
                  easing: [0.42, 0.58, 1, 1.5],
                  duration: 1,
                  repeat: Infinity,
                }}
                className="absolute top-0 right-0   inline-block h-3 w-3 rounded-full bg-[#f75616]"
              ></motion.span>
            )}
            {openDropdownM && url !== "messages" && (
              <NotifyDropdown info={notifications} />
            )}
          </div>
          <div className="text-gray-400 relative flex gap-2 ml-6 lg:ml-0 text-xl items-center cursor-pointer">
            <img
              src={user?.photo || avater}
              onClick={() => setOpenDropdown((prev) => !prev)}
              className="lg:w-[40px] lg:h-[40px] w-[30px] h-[30px] cursor-pointer rounded-full"
            />
            <span
              onClick={() => setOpenDropdown((prev) => !prev)}
              className="hidden text-sm text-white lg:inline cursor-pointer"
            >
              {user?.firstname || "Donald"}
            </span>

            {openDropdown && (
              <div className="absolute rounded-lg w-[8rem] flex flex-col lg:right-0 right-1 gap-6 bg-primary2 dark:bg-gray-800 shadow-2xl top-[3.3rem] p-4">
                <>
                  <Link
                    onClick={() => setOpenDropdown((prev) => !prev)}
                    className=" transition-all text-sm ease-linear duration-500 hover:bg-gray-  dark:text-white  border-primar p-1 text-center rounded-lg "
                    to="/user/profile"
                  >
                    Profile
                  </Link>
                  <Link
                    onClick={() => setOpenDropdown((prev) => !prev)}
                    className=" transition-all text-sm ease-linear duration-500 hover:bg-gray- dark:text-white   border-ray-300 p-1 text-center rounded-lg "
                    to="/"
                  >
                    Log-out
                  </Link>
                </>
              </div>
            )}
          </div>
          <div
            className="lg:pr-3 pr-px cursor-pointer relative block lg:hidden "
            onClick={() => dispatch(handleSidebar())}
          >
            <Icons.BsList
              size={28}
              className="lg:text-2xl  text-xl text-white"
            />{" "}
          </div>
        </div>
      </header>
    </>
  );
};

export default AdminNav;
