import React from "react";
import members from "/member.png";
import supported from "/supported.png";
import invest from "/invest.png";
import { motion } from "framer-motion";

function Features() {
  return (
    <section className="w-full  overflow-x-hidden pb-20 mb-20">
      <div className="w-[90%] lg:w-[80%] mx-auto">
        <div className="flex justify-center flex-col lg:flex-row items-center gap-8">
          <motion.div
            className="rounded-lg py-[3.5rem] w-full shadow-lg bg-primary2  flex-1 flex justify-center gap-6 items-center flex-col text-center"
            animate={{ opacity: 0, translateX: "-100px" }}
            whileInView={{ opacity: 1, translateX: 0 }}
            transition={{ easing: ["linear"], duration: 1.2 }}
            viewport={{ once: true }}
          >
            <div className="rounded-full h-[80px] flex justify-center items-center w-[80px]   transition-all ease-linear duration-500 border-primary hover:bg-[#f75616] ">
              <img className="card-img-top" src={members} alt="...." />
            </div>
            <div className="text-white flex flex-col gap-4">
              <h3 className="text-4xl font-[500]">25609</h3>
              <h5 className="text-3xl font-[500] capitalize">All Members</h5>
            </div>
          </motion.div>

          <motion.div
            className="rounded-lg py-[3.5rem] w-full shadow-lg bg-primary2  flex-1 flex justify-center gap-6 items-center flex-col text-center"
            animate={{ opacity: 0, translateY: "100px" }}
            whileInView={{ opacity: 1, translateY: 0 }}
            transition={{ easing: ["linear"], duration: 1.2 }}
            viewport={{ once: true }}
          >
            <div className="rounded-full h-[80px] flex justify-center items-center w-[80px] border transition-all ease-linear duration-500 border-primary hover:bg-[#f75616] ">
              <img className="card-img-top" src={invest} alt="...." />
            </div>
            <div className="text-white flex flex-col gap-4">
              <h3 className="text-4xl font-[500]">$ 12.5M</h3>
              <h5 className="capitalize font-[500] text-3xl">
                Average Investment
              </h5>
            </div>
          </motion.div>

          <motion.div
            animate={{ opacity: 0, translateX: "100px" }}
            whileInView={{ opacity: 1, translateX: 0 }}
            transition={{ easing: ["linear"], duration: 1.2 }}
            viewport={{ once: true }}
            className="rounded-lg py-[3.5rem] w-full shadow-lg bg-primary2  flex-1 flex justify-center gap-6 items-center flex-col text-center"
          >
            <div className="rounded-full h-[80px] flex justify-center items-center w-[80px] border transition-all ease-linear duration-500 border-primary hover:bg-[#f75616] ">
              <img className="card-img-top" src={supported} alt="...." />
            </div>
            <div className="flex flex-col gap-4 text-white">
              <h3 className="text-4xl font-[500]">200</h3>
              <h5 className="capitalize text-3xl font-[500] ">
                Countries Supported
              </h5>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default Features;
