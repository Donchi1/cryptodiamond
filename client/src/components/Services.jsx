import React from "react";
import legal from "/legal.png";
import referal from "/referral.png";
import secured from "/secured.png";
import verified from "/verified.png";
import instant from "/instant.png";
import support from "/supported.png";
import { motion } from "framer-motion";

function Services() {
  return (
    <section className="w-full mb-20 pb-20">
      <div className="w-[90%] lg:w-[80%] mx-auto">
        <div className="text-center flex flex-col gap-6 mb-20 ">
          <h6 className="primary-text font-ubuntu text-2xl">Our Services</h6>
          <h3 className="text-white font-[500] capitalize text-4xl">
            What You Get From Us
          </h3>
          <p className="text-white text-lg ">
            Our goal is to provide our investors with a reliable source of high
            income, while minimizing any possible risks and offering a
            high-quality service in due time.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8  lg:grid-cols-2">
          <motion.div
            animate={{ opacity: 0, translateX: "100px" }}
            whileInView={{ opacity: 1, translateX: 0 }}
            transition={{ easing: ["linear"], duration: 1.2 }}
            viewport={{ once: true }}
            className=" bg-primary2 rounded-lg p-10 text-white flex gap-4 hover:border hover:border-[#f75616] transition-all ease-linear duration-500"
          >
            <div className="w-[80px] h-[80px]  rounded-full border-primary flex justify-center items-center ">
              <img src={legal} alt="..." />
            </div>
            <div className="flex-1 ">
              <h5 className="text-2xl font-[500] font-ubuntu mb-4">
                Legal Company
              </h5>
              <p className="leading-7">
                Our company conducts absolutely legal activities in the legal
                field. We are certified to operate investment business, we are
                legal and safe.{" "}
              </p>
            </div>
          </motion.div>

          <motion.div
            animate={{ opacity: 0, translateX: "-100px" }}
            whileInView={{ opacity: 1, translateX: 0 }}
            transition={{ easing: ["linear"], duration: 1.2 }}
            viewport={{ once: true }}
            className=" bg-primary2 rounded-lg p-10 text-white flex gap-4 hover:border hover:border-[#f75616] transition-all ease-linear duration-500"
          >
            <div className="w-[80px] h-[80px]  rounded-full border-primary flex justify-center items-center ">
              <img src={referal} alt="..." />
            </div>
            <div className="flex-1 ">
              <h5 className="text-2xl font-[500] font-ubuntu mb-4">
                Referral Program
              </h5>
              <p className="leading-7">
                We are offering a certain level of referral income through our
                referral program. you can increase your income by simply refer a
                few people.
              </p>
            </div>
          </motion.div>

          <motion.div
            animate={{ opacity: 0, translateX: "100px" }}
            whileInView={{ opacity: 1, translateX: 0 }}
            transition={{ easing: ["linear"], duration: 1.2 }}
            viewport={{ once: true }}
            className=" bg-primary2 rounded-lg p-10 text-white flex gap-4 hover:border hover:border-[#f75616] transition-all ease-linear duration-500"
          >
            <div className="w-[80px] h-[80px]  rounded-full border-primary flex justify-center items-center ">
              <img src={secured} alt="..." />
            </div>
            <div className="flex-1 ">
              <h5 className="text-2xl font-[500] font-ubuntu mb-4">
                Secure Investment
              </h5>
              <p className="leading-7">
                We are using one of the most experienced, professional, and
                trusted DDoS Protection and mitigation provider.
              </p>
            </div>
          </motion.div>

          <motion.div
            animate={{ opacity: 0, translateX: "-100px" }}
            whileInView={{ opacity: 1, translateX: 0 }}
            transition={{ easing: ["linear"], duration: 1.2 }}
            viewport={{ once: true }}
            className=" bg-primary2 rounded-lg p-10 text-white flex gap-4 hover:border hover:border-[#f75616] transition-all ease-linear duration-500"
          >
            <div className="w-[80px] h-[80px]  rounded-full border-primary flex justify-center items-center ">
              <img src={verified} alt="..." />
            </div>
            <div className="flex-1 ">
              <h5 className="text-2xl font-[500] font-ubuntu mb-4">
                Verified Security
              </h5>
              <p className="leading-7">
                Comodo Essential-SSL Security encryption confirms that the
                presented content is genuine and legitimate.{" "}
              </p>
            </div>
          </motion.div>

          <motion.div
            animate={{ opacity: 0, translateX: "100px" }}
            whileInView={{ opacity: 1, translateX: 0 }}
            transition={{ easing: ["linear"], duration: 1.2 }}
            viewport={{ once: true }}
            className=" bg-primary2 rounded-lg p-10 text-white flex gap-4 hover:border hover:border-[#f75616] transition-all ease-linear duration-500"
          >
            <div className="w-[80px] h-[80px]  rounded-full border-primary flex justify-center items-center ">
              <img src={instant} alt="..." />
            </div>
            <div className="flex-1 ">
              <h5 className="text-2xl font-[500] font-ubuntu mb-4">
                Instant Withdrawal
              </h5>
              <p className="leading-7">
                Our all retreats are treated spontaneously once requested. There
                are high maximum limits. The minimum withdrawal amount is only
                $10 .
              </p>
            </div>
          </motion.div>

          <motion.div
            animate={{ opacity: 0, translateX: "-100px" }}
            whileInView={{ opacity: 1, translateX: 0 }}
            transition={{ easing: ["linear"], duration: 1.2 }}
            viewport={{ once: true }}
            className=" bg-primary2 rounded-lg p-10 text-white flex gap-4 hover:border hover:border-[#f75616] transition-all ease-linear duration-500"
          >
            <div className="w-[80px] h-[80px]  rounded-full border-primary flex justify-center items-center ">
              <img src={support} alt="..." />
            </div>
            <div className="flex-1 ">
              <h5 className="text-2xl font-[500] font-ubuntu mb-4">
                24/7 Support
              </h5>
              <p className="leading-7">
                We provide 24/7 customer support through e-mail and telegram.
                Our support representatives are periodically available to
                elucidate any difficulty.{" "}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default Services;
