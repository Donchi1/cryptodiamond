import React from "react";
import Pagination from "../components/Pagination";
import Sidebar from "../components/Sidebar";
import UserNav from "../components/UserNav";
import Footer from "../components/Footer";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function Invest() {
  return (
    <>
      <UserNav />
      <div className="flex">
        <Sidebar />
        <div className="flex-[4]">
          <section className="w-[90%] mx-auto">
            <Pagination title={"Invest Offer"} />

            <div className="flex lg:gap-8 gap-4  flex-col lg:flex-row">
              <section className="w-full py-28  ">
                <div>
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
                        €100 -€1500
                      </h4>
                      <div className="mt-2 text-white text-lg font-ubuntu">
                        <h6>15% after 5 days</h6>
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
                        Total 0 USD +{" "}
                        <span className="bg-green-500 text-white rounded-lg py-px px-2">
                          Capital
                        </span>
                      </p>

                      <Link
                        to="/user/payment"
                        className="btn-secondary inline-block text-white mt-10"
                      >
                        Invest Now
                      </Link>
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
                        <h6>15% after 5 days</h6>
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
                        Total 0 USD +{" "}
                        <span className="bg-green-500 text-white rounded-lg py-px px-2">
                          Capital
                        </span>
                      </p>

                      <Link
                        to="/user/payment"
                        className="btn-secondary inline-block text-white mt-10"
                      >
                        Invest Now
                      </Link>
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
                        €1000 - €13000
                      </h4>
                      <div className="mt-2 text-white text-lg font-ubuntu">
                        <h6>15% after 5day</h6>
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
                        Total 0 USD +{" "}
                        <span className="bg-green-500 text-white rounded-lg py-px px-2">
                          Capital
                        </span>
                      </p>

                      <Link
                        to="/user/payment"
                        className="btn-secondary inline-block text-white mt-10"
                      >
                        Invest Now
                      </Link>
                    </div>
                  </motion.div>
                  <div className="text-center flex flex-col  gap-6 my-14 ">
                    <h3 className="text-white font-[500] capitalize text-3xl">
                      Special Plans
                    </h3>
                  </div>
                  <motion.div
                    animate={{ opacity: 0, translateY: "-100px" }}
                    whileInView={{ opacity: 1, translateY: 0 }}
                    transition={{ easing: ["linear"], duration: 1.2 }}
                    viewport={{ once: true }}
                    className="flex justify-center flex-col lg:flex-row items-center gap-8"
                  >
                    <div className="flex-1 rounded-lg bg-primary2 items-center px-6 py-8 relative w-full ">
                      <div className="absolute right-0 top-0 h-16 w-16">
                        <span className="absolute rotate-45 bg-green-500 text-center text-white rounded-br rounded-tl rounded-full  font-semibold py-1 left-[-32px] top-[32px] w-[115px]">
                          Basic
                        </span>
                      </div>
                      <h4 className="text-3xl mb-4 font-ubuntu font-[500] text-white">
                        Basic
                      </h4>

                      <h4 className="text-3xl primary-text font-ubuntu font-[500]">
                        €1200 -€17000
                      </h4>
                      <div className="mt-2 text-white text-lg font-ubuntu">
                        <h6>15% after 5 days</h6>
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
                        Total 0 USD +{" "}
                        <span className="bg-green-500 text-white rounded-lg py-px px-2">
                          Capital
                        </span>
                      </p>

                      <Link
                        to="/user/payment"
                        className="btn-secondary inline-block text-white mt-10"
                        type="button"
                      >
                        Invest Now
                      </Link>
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
                        €1500 -€20999
                      </h4>
                      <div className="mt-2 text-white text-lg font-ubuntu">
                        <h6>15% after 5 days</h6>
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
                        Total 0 USD +{" "}
                        <span className="bg-green-500 text-white rounded-lg py-px px-2">
                          Capital
                        </span>
                      </p>

                      <Link
                        to="/user/payment"
                        className="btn-secondary inline-block text-white mt-10"
                        type="button"
                      >
                        Invest Now
                      </Link>
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
                        €2000 -€25000
                      </h4>
                      <div className="mt-2 text-white text-lg font-ubuntu">
                        <h6>15% after 5day</h6>
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
                        Total 0 USD +{" "}
                        <span className="bg-green-500 text-white rounded-lg py-px px-2">
                          Capital
                        </span>
                      </p>

                      <Link
                        to="/user/payment"
                        className="btn-secondary inline-block text-white mt-10"
                        type="button"
                      >
                        Invest Now
                      </Link>
                    </div>
                  </motion.div>
                </div>
              </section>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Invest;
