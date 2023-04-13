import React from "react";
import pointer from "/newpoint.png";
import { motion } from "framer-motion";

function ManagerTalk() {
  return (
    <section className="w-full lg:h-[70vh] h-auto">
      <div className="w-[90%] lg:w-[80%] mx-auto">
        <div className="flex justify-center flex-col lg:flex-row gap-8">
          <div className="text-white flex-1">
            <motion.p
              animate={{ opacity: 0, translateX: "-100px" }}
              whileInView={{ opacity: 1, translateX: 0 }}
              transition={{ easing: ["linear"], duration: 1.5, delay: 1 }}
              viewport={{ once: true }}
            >
              We stand out strong with all the requirements to expand your fund
              for a better future
            </motion.p>
            <motion.div
              animate={{ opacity: 0, translateX: "-100px" }}
              whileInView={{ opacity: 1, translateX: 0 }}
              transition={{ easing: ["linear"], duration: 1.5, delay: 1 }}
              viewport={{ once: true }}
            >
              <h4 className="text-2xl font-[500] font-ubuntu primary-text mt-5 mb-3">
                Our Mission
              </h4>
              <p>
                Our mission is to provide a revenue booster for all who really
                wants to reach a better level of of wealth in life.We are stable
                and ready to reach out to people of low and high income to make
                the best of their funds and optimize revenue.
              </p>
            </motion.div>
            <motion.div
              animate={{ opacity: 0, translateX: "-100px" }}
              whileInView={{ opacity: 1, translateX: 0 }}
              transition={{ easing: ["linear"], duration: 1.5, delay: 1 }}
              viewport={{ once: true }}
            >
              <h4 className="text-2xl font-[500] font-ubuntu primary-text mt-5 mb-3">
                Our Vision
              </h4>
              <p>
                Our vision is to make about 20000 people wealthy with ease
                before the year 2026. We stand out, working hard to reach this
                goal. We are happy you are here, with you we can do better.{" "}
              </p>
            </motion.div>
            <motion.div
              animate={{ opacity: 0, translateX: "-100px" }}
              whileInView={{ opacity: 1, translateX: 0 }}
              transition={{ easing: ["linear"], duration: 1.5, delay: 1 }}
              viewport={{ once: true }}
            >
              <h4 className="text-2xl font-[500] font-ubuntu primary-text mt-5 mb-3">
                Acheivements
              </h4>
              <p>
                We have succeeded in making about 200 wealthy people who are
                testifying today. We have established a global platform for
                investment round the whole world.We are recognized in almost all
                the countries of the world.We have build a stable and reliable
                payment getway No need to go to the bank because our platform
                got you.Government awards.
              </p>
            </motion.div>
          </div>
          <motion.div
            animate={{ opacity: 0, translateX: "100px" }}
            whileInView={{ opacity: 1, translateX: 0 }}
            transition={{ easing: ["linear"], duration: 1.5, delay: 1 }}
            viewport={{ once: true }}
          >
            <img
              src={pointer}
              alt="pointer"
              className="h-[450px] w-full rounded-lg"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default ManagerTalk;
