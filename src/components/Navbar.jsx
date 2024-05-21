import React, { useState } from "react";
import Topbar from "./Topbar";
import * as Icons from "react-icons/fa";
import logo from "/logo.png";
import InvestmentPopup from "./InvestmentPopup";

function Navbar() {
  const [openBar, setOpenBar] = useState(false);
  return (
    <>
      <Topbar />
      <section className="w-full h-[12vh] bg-primaryb relative">
        <nav className="w-[90%] lg:w-[80%] mx-auto">
          <div className="flex justify-between items-center pt-2">
            <a href="/">
              <img className="w-[150px] h-[60px]" src={logo} alt="Logo" />
            </a>

            <button
              className="primary-text text-3xl inline-block lg:hidden"
              onClick={() => setOpenBar((prev) => !prev)}
            >
              <Icons.FaBars className="text-white" />
            </button>

            <ul
              className={`
                
               lg:flex hidden text-center gap-6 [&_li]:transition-all [&_li]:ease-linear [&_li]:duration-50 text-white text-xl hover:[&_li]:text-[#b38728]`}
            >
              <li>
                <a href="/">Home</a>
              </li>
              <li className=" border-l border-[#b38728] ">
                <a className="pl-2 " href="/about">
                  About Us
                </a>
              </li>
              <li className="border-l border-[#b38728]">
                <a className="pl-2" href="/pricing">
                  Pricing
                </a>
              </li>

              <li className="border-l border-[#b38728]">
                <a className="pl-2" href="/contact">
                  Contact
                </a>
              </li>
            </ul>

            <ul className="hidden lg:block">
              <a
                href="/auth/login"
                className="btn-primary hover:opacity-90 transition-all ease-linear duration-500"
              >
                <span>Login</span>
              </a>
            </ul>
            <ul
              className={`${
                !openBar && "-translate-x-full"
              } flex lg:hidden w-[50%] z-20 text-center transition-all ease-linear duration-500 h-[76vh] absolute py-4 left-0 top-[4.5rem] bg-primaryb flex-col gap-4 [&_li]:transition-all [&_li]:ease-linear [&_li]:duration-50 text-white text-xl hover:[&_li]:text-[#b38728]`}
            >
              <li className=" transition-all ease-linear duration-700 hover:border py-2 hover:border-[#b38728] rounded-lg ">
                <a href="/">Home</a>
              </li>
              <li className=" transition-all ease-linear duration-700 hover:border py-2 hover:border-[#b38728] rounded-lg ">
                <a className="" href="/about">
                  About Us
                </a>
              </li>
              <li className=" transition-all ease-linear duration-700 hover:border py-2 hover:border-[#b38728] rounded-lg ">
                <a className="" href="/pricing">
                  Pricing
                </a>
              </li>

              <li className=" transition-all ease-linear duration-700 hover:border py-2 hover:border-[#b38728] rounded-lg ">
                <a className="" href="/contact">
                  Contact
                </a>
              </li>
              <li className=" transition-all ease-linear duration-700  pt-2 px-2  ">
                <a
                  href="/auth/login"
                  className="btn-primary inline-block w-full hover:opacity-90 transition-all ease-linear duration-500"
                >
                  <span>Login</span>
                </a>
              </li>
              <li className=" transition-all ease-linear duration-700   px-2  ">
                <a
                  href="/auth/register"
                  className="btn-secondary inline-block w-full hover:opacity-90 transition-all ease-linear duration-500"
                >
                  <span>Register</span>
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </section>
      <InvestmentPopup />
    </>
  );
}

export default Navbar;
