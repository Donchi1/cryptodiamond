import React from 'react'
import logo from "/logo.png";
import { motion } from "framer-motion";

function Loader() {
  return (
    <div className="w-full h-screen ">
    <div className="h-full flex justify-center items-center flex-col ">
      <img src={logo} alt="logo" className="animate-bounce" />
      <motion.p
        animate={{ opacity: 0, translateX: "-150px" }}
        whileInView={{ opacity: 1, translateX: 0 }}
        transition={{ easing: ["linear"], duration: 1.5 }}
        className="text-white text-lg italic"
      >
        Loading...
      </motion.p>
    </div>
  </div>
  )
}

export default Loader