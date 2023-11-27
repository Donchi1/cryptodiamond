import React from "react";
import { motion } from "framer-motion";
import { auth } from "../database/firebaseDb";
import useGetDocument from "./hooks/UseDocument";

function Hero() {
  const authUser = auth.currentUser;
  const [user, loading, error] = useGetDocument("users", authUser?.uid, {
    snap: true,
  });

  return (
    <header className="w-full h-screen  hero -mb-14">
      <div className="flex h-screen items-center justify-center">
        <div className=" text-center text-white">
          <motion.h1
            initial={{ opacity: 0, translateY: "50px" }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ easing: ["linear"], duration: 1.2 }}
            className="lg:text-7xl text-5xl capitalize font-[600] font-Ubuntu"
          >
            Expand your
          </motion.h1>
          <h1 className="lg:text-7xl capitalize font-[600] text-5xl mt-10 mb-25 font-Ubuntu">
            fund for good{" "}
          </h1>
          <motion.h6
            className="mt-10 text-lg mb-14 wow fadeInUp"
            initial={{ opacity: 0, translateY: "50px" }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ easing: ["linear"], duration: 1.2 }}
          >
            Put your investing ideas and money into action with full range of
            Earnings. Enjoy real benefit and reward in Ultimatefc.{" "}
          </motion.h6>
          <motion.a
            className="btn-secondary  mt-30 "
            initial={{ opacity: 0, translateY: "60px" }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ easing: ["linear"], duration: 1, delay: 0.8 }}
            href={`${
              authUser && user?.verified ? "/user/dashboard" : "/auth/login"
            }`}
          >
            <motion.span
              initial={{ opacity: 0, translateY: "60px" }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{ easing: ["linear"], duration: 1, delay: 0.8 }}
            >
              {authUser && user?.verified ? "Dashboard" : "Get Started"}
            </motion.span>
          </motion.a>
        </div>
      </div>
    </header>
  );
}

export default Hero;
