import React, { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import * as Icons from "react-icons/bs";
import avater from "/ecoms/images/avatar.jpg";
import { adminContext } from "../../New-Project/context/AdminContext";

export default function AdminNav() {
  const { setOpenSidebar, dark, setDark } = useContext(adminContext);
  const { pathname } = useLocation();
  const [openDropdown, setOpenDropdown] = useState(false);
  const user = true;

  const handleColorPreffrence = (value) => {
    setDark(value.dark);
    if (value.dark === true) {
      localStorage.setItem("dark", JSON.stringify(value));
      return document.documentElement.classList.add("dark");
    }
    localStorage.removeItem("dark");
    return document.documentElement.classList.remove("dark");
  };

  if (pathname.split("/")[1] === "admin") {
    return (
      <>
        <header
          className="flex
      max-h-screen
      h-16
      items-center  
      justify-between
      bg-gray-50
      dark:bg-gray-800
      dark:text-white
      sticky
      top-0
      z-40 shadow  px-4"
        >
          <div>
            <Link to="/">
              <h1 className="font-medium text-2xl text-gray-400">
                <span className=" italic font-semibold text-4xl text-blue-500">
                  G
                </span>
                olden
              </h1>
            </Link>
          </div>

          <div className="space-x-4 lg:space-x-8 flex items-center justify-center transition-all ease-linear duration-500">
            <div>
              {dark ? (
                <Icons.ToggleOn
                  onClick={() => handleColorPreffrence({ dark: false })}
                  size={35}
                  className=" text-blue-500 lg:text-2xl text-xl  cursor-pointer"
                />
              ) : (
                <Icons.ToggleOff
                  onClick={() => handleColorPreffrence({ dark: true })}
                  stroke="#93c5fd"
                  strokeWidth={0.2}
                  size={35}
                  className=" text-gray-400  lg:text-2xl text-xl  cursor-pointer"
                />
              )}
            </div>
            <div className="text-gray-400 relative flex gap-2 ml-6 lg:ml-0 text-xl items-center cursor-pointer">
              {user ? (
                <>
                  <img
                    src={avater}
                    onClick={() => setOpenDropdown((prev) => !prev)}
                    className="w-[40px] h-[40px] cursor-pointer rounded-full"
                  />
                  <span
                    onClick={() => setOpenDropdown((prev) => !prev)}
                    className="hidden lg:inline cursor-pointer"
                  >
                    Donald
                  </span>
                </>
              ) : (
                <Icons.Person
                  onClick={() => setOpenDropdown((prev) => !prev)}
                  className="text-gray-400 ml-6 lg:ml-0  text-xl lg:text-2xl cursor-pointer"
                />
              )}

              {openDropdown && (
                <div className="absolute rounded-lg w-[8rem] flex flex-col lg:right-0 right-1 gap-6 bg-white dark:bg-gray-800 shadow-2xl top-[3.3rem] p-4">
                  {user ? (
                    <>
                      <Link
                        onClick={() => setOpenDropdown((prev) => !prev)}
                        className="border-2 transition-all ease-linear duration-500 hover:opacity-60 border-blue-300 p-2 dark:text-white text-blue-300 rounded-lg "
                        to="profile"
                      >
                        Profile
                      </Link>
                      <Link
                        onClick={() => setOpenDropdown((prev) => !prev)}
                        className="border-2 transition-all ease-linear duration-500 hover:opacity-60 border-blue-300 dark:text-white p-2 text-blue-300 rounded-lg "
                        to="/"
                      >
                        LogOut
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link
                        onClick={() => setOpenDropdown((prev) => !prev)}
                        className="border-2 transition-all ease-linear duration-500 hover:opacity-60 border-blue-300 p-2 text-blue-300 rounded-lg "
                        to="login"
                      >
                        Login
                      </Link>
                      <Link
                        onClick={() => setOpenDropdown((prev) => !prev)}
                        className="border-2 transition-all ease-linear duration-500 hover:opacity-60 border-blue-300 p-2 text-blue-300 rounded-lg "
                        to="register"
                      >
                        Register
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>
            <div
              className="pr-3 cursor-pointer relative block lg:hidden "
              onClick={() => setOpenSidebar((prev) => !prev)}
            >
              <Icons.Justify
                size={28}
                className="lg:text-2xl  text-xl text-gray-400"
              />{" "}
            </div>
          </div>
        </header>
      </>
    );
  }
}
