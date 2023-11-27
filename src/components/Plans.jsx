import React from "react";
import { motion } from "framer-motion";

function Plans() {
  return (
    <section className="w-full py-28  bg-primaryb">
      <div className="w-[90%] lg:w-[80%] mx-auto">
        <div className="text-center flex flex-col  gap-6 mb-20 ">
          <h6 className="primary-text font-ubuntu text-2xl">INVEST OFFER</h6>
          <h3 className="text-white font-[500] capitalize text-4xl">
            Investment Plans
          </h3>
          <p className="text-lg text-white">
            Select an investment plan to get started{" "}
          </p>
        </div>

        <motion.div
          animate={{ opacity: 0, translateY: "-100px" }}
          whileInView={{ opacity: 1, translateY: 0 }}
          transition={{ easing: ["linear"], duration: 1.2 }}
          viewport={{ once: true }}
          className="flex justify-center flex-col lg:flex-row items-center gap-8"
        >
          <div
            className="flex-1 rounded-lg bg-primary2 items-center px-6 py-8 relative w-full "
            data-wow-duration="1s"
            data-wow-delay="0.15s"
          >
            <div className="absolute right-0 top-0 h-16 w-16">
              <span className="absolute rotate-45 bg-green-500 text-center text-white rounded-br rounded-tl rounded-full  font-semibold py-1 left-[-32px] top-[32px] w-[115px]">
                Basic
              </span>
            </div>
            <h4 className="text-3xl mb-4 font-ubuntu font-[500] text-white">
              Basic
            </h4>

            <h4 className="text-3xl primary-text font-ubuntu font-[500]">
              €200 - €3000
            </h4>
            <div className="mt-2 text-white text-lg font-ubuntu">
              <h6>10% after 5 days</h6>
            </div>
            <hr className="my-8" />

            <p className="text-[500] text-lg text-white">
              Profit For Every Day
            </p>
            <p className="text-[500] text-lg text-white mt-2">
              Capital will back :
              <span className="bg-green-500 text-white rounded-lg px-2 py-1 ml-1">
                Yes
              </span>
            </p>

            <p className="text-[500] text-lg text-white mt-2">
              Total 3000 EURO +{" "}
              <span className="bg-green-500 text-white rounded-lg py-px px-2">
                Capital
              </span>
            </p>

            <a
              href="/user/dashboard"
              className="btn-secondary inline-block text-white mt-10"
            >
              Invest Now
            </a>
          </div>

          <div
            className="flex-1 rounded-lg bg-primary2 items-center px-6 py-8 relative w-full"
            data-wow-duration="1s"
            data-wow-delay="0.15s"
          >
            <div className="absolute right-0 top-0 h-16 w-16">
              <span className="absolute rotate-45 bg-green-500 text-center text-white rounded-br rounded-tl rounded-full  font-semibold py-1 left-[-32px] top-[32px] w-[115px]">
                Bronze
              </span>
            </div>
            <h4 className="text-3xl mb-4 font-ubuntu font-[500] text-white">
              Bronze
            </h4>

            <h4 className="text-3xl primary-text font-ubuntu font-[500]">
              €500 -€5999
            </h4>
            <div className="mt-2 text-white text-lg font-ubuntu">
              <h6>10% after 5 days</h6>
            </div>
            <hr className="my-8" />

            <p className="text-[500] text-lg text-white">
              Profit For Every Day
            </p>
            <p className="text-[500] text-lg text-white mt-2">
              Capital will back :
              <span className="bg-green-500 text-white rounded-lg px-2 py-1 ml-1">
                Yes
              </span>
            </p>

            <p className="text-[500] text-lg text-white mt-2">
              Total 5999 EURO +{" "}
              <span className="bg-green-500 text-white rounded-lg py-px px-2">
                Capital
              </span>
            </p>

            <a
              href="/user/dashboard"
              className="btn-secondary inline-block text-white mt-10"
            >
              Invest Now
            </a>
          </div>

          <div
            className="flex-1 rounded-lg bg-primary2 items-center px-6 py-8 relative w-full"
            data-wow-duration="1s"
            data-wow-delay="0.15s"
          >
            <div className="absolute right-0 top-0 h-16 w-16">
              <span className="absolute rotate-45 bg-green-500 text-center text-white rounded-br rounded-tl rounded-full  font-semibold py-1 left-[-32px] top-[32px] w-[115px]">
                Gold
              </span>
            </div>
            <h4 className="text-3xl mb-4 font-ubuntu font-[500] text-white">
              Gold
            </h4>

            <h4 className="text-3xl primary-text font-ubuntu font-[500]">
              €1000 -€13000
            </h4>
            <div className="mt-2 text-white text-lg font-ubuntu">
              <h6>10% after 5day</h6>
            </div>
            <hr className="my-8" />

            <p className="text-[500] text-lg text-white ">
              Profit For Every Day
            </p>
            <p className="text-[500] text-lg text-white mt-2">
              Capital will back :
              <span className="bg-green-500 text-white rounded-lg px-2 py-1 ml-1">
                Yes
              </span>
            </p>

            <p className="text-[500] text-lg text-white mt-2">
              Total 13000 EURO +{" "}
              <span className="bg-green-500 text-white rounded-lg py-px px-2">
                Capital
              </span>
            </p>

            <a
              href="/user/dashboard"
              className="btn-secondary inline-block text-white mt-10"
            >
              Invest Now
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Plans;
