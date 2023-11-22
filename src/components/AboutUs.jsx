import React from "react";
import about from "/aboutbanner.jpg";
import { motion } from "framer-motion";

function About() {
  return (
    <section className="w-full pb-20 mb-20">
      <div className="w-[90%] lg:w-[80%] mx-auto  ">
        <div className="text-center flex flex-col gap-6 mb-20 ">
          <h6 className="primary-text font-ubuntu text-2xl">ABOUT US</h6>
          <h3 className="text-white font-[500] capitalize text-4xl">
            Welcome to UltimateFC
          </h3>
        </div>

        <div className=" flex justify-between flex-col lg:flex-row gap-14 ">
          <motion.div
            animate={{ opacity: 0, translateX: "-100px" }}
            whileInView={{ opacity: 1, translateX: 0 }}
            transition={{ easing: ["linear"], duration: 1.2 }}
            viewport={{ once: true }}
            className="flex relative flex-[1]"
          >
            <div className="lg:absolute static z-20 -top-10 left-10">
              <img
                src={about}
                alt="Image Missing"
                className="w-[500px] h-[400px] rounded-xl"
              />
            </div>
            <div className="hidden lg:block before:rounded-xl before:opacity-20 before:bg-[#f75616] before:absolute  before:w-[500px] before:h-[400px]  relative">
              <img
                src={about}
                alt="Image Missing"
                className="w-[500px]  h-[400px] rounded-xl"
              />
            </div>
          </motion.div>

          <motion.div
            animate={{ opacity: 0, translateX: "100px" }}
            whileInView={{ opacity: 1, translateX: 0 }}
            transition={{ easing: ["linear"], duration: 1.2 }}
            viewport={{ once: true }}
            className="items-end flex-[1] text-white lg:mt-0 mt-6"
          >
            <h6 className=" text-xl font-[500] font-ubuntu mb-8 first-letter:text-[#f75616] first-letter:font-bold first-letter:text-2xl">
              UltimateFC is an investment company, Working on
              cryptocurrency, expanding wealth, reaching out to people to for a
              great revenue.{" "}
            </h6>
            <div>
              <p>
                We are disciplined, we provide a you a financial access to tools
                that steadily grow your finances.
              </p>
              <p>
                We take extra steps in guiding and directing our clients to make
                the best of their money for a better revenue.
              </p>
              <p>
                <br />
              </p>
              <p>
                <br />
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default About;
