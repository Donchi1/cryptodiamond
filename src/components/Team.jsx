import React from "react";
import team1 from "/team-male-s.jpg";
import team2 from "/team-male2.jpg";
import team3 from "/accountant.jpg";
import team4 from "/team-female-suit.jpg";
import team5 from "/acc-man.jpg";
import team6 from "/ceo.jpg";
import * as Icons from "react-icons/hi";
import { motion } from "framer-motion";

export default function Team() {
  return (
    <section className="w-full mt-28 py-20 mb-20 bg-primaryb ">
      <div className="w-[90%] lg:w-[80%] mx-auto">
        <div className="flex flex-col justify-center items-center mb-20">
          <div className="text-center">
            <h3 className="primary-text font-ubuntu text-2xl">Team</h3>
            <h6 className="text-white font-[500] capitalize text-4xl">
              Meet Our Expert Team Members
            </h6>
            <p className="textlg text-white mt-4">
              We have a great team including developers, designers, and Traders.
              The Team always working hard to give you the maximum profit.
            </p>
          </div>
        </div>

        <motion.div
          animate={{ opacity: 0, translateY: "50px" }}
          whileInView={{ opacity: 1, translateY: 0 }}
          transition={{ easing: ["linear"], duration: 1 }}
          viewport={{ once: true }}
          className="grid lg:grid-cols-3 grid-cols-1 gap-8 place-content-center place-items-center"
        >
          <div className="rounded-lg bg-primary2 px-4 py-4 w-full">
            <div className="lg:lg:w-[300px] h-[300px] w-auto ">
              <img
                src={team1}
                alt="Image Missing"
                className="w-full rounded-lg h-full"
              />
            </div>

            <h5 className="primary-text text-xl font-[500] mt-5 mb-5">
              Jose Luke
            </h5>
            <div className="flex justify-between items-center">
              <p className="text-lg text-white">Chief Operating Manager </p>
              <span className="flex gap-2 ">
                <a
                  href="mailto:support@ultimatefc.info"
                  className="font-[500] border-primary text-white p-2 rounded-xl "
                >
                  <Icons.HiMail />
                </a>
                <a
                  href="tel:+447405711527"
                  className="font-[500] border-primary text-white p-2 rounded-xl "
                >
                  <Icons.HiPhone />
                </a>
              </span>
            </div>
          </div>
          <div className="rounded-lg bg-primary2 px-4 py-4 w-full">
            <div className="lg:w-[300px] h-[300px] w-auto ">
              <img
                src={team2}
                alt="Image Missing"
                className="w-full rounded-lg h-full"
              />
            </div>
            <h5 className="primary-text text-xl font-[500] mt-5 mb-5">
              Director
            </h5>
            <div className="flex justify-between items-center">
              <p className="text-lg text-white">Jose Luke</p>
              <span className="flex gap-2 ">
                <a
                  href="mailto:support@cryptodiamond.info"
                  className="font-[500] border-primary text-white p-2 rounded-xl "
                >
                  <Icons.HiMail />
                </a>
                <a
                  href="tel:+4477-0688-1200"
                  className="font-[500] border-primary text-white p-2 rounded-xl "
                >
                  <Icons.HiPhone />
                </a>
              </span>
            </div>
          </div>
          <div className="rounded-lg bg-primary2 px-4 py-4 w-full">
            <div className="lg:w-[300px] h-[300px] w-auto ">
              <img
                src={team3}
                alt="Image Missing"
                className="w-full rounded-lg h-full"
              />
            </div>
            <h5 className="primary-text text-xl font-[500] mt-5 mb-5">
              Olivia Joel
            </h5>
            <div className="flex justify-between items-center">
              <p className="text-lg text-white">Accountant</p>
              <span className="flex gap-2 ">
                <a
                  href="mailto:support@cryptodiamond.info"
                  className="font-[500] border-primary text-white p-2 rounded-xl "
                >
                  <Icons.HiMail />
                </a>
                <a
                  href="tel:+4477-0688-1200"
                  className="font-[500] border-primary text-white p-2 rounded-xl "
                >
                  <Icons.HiPhone />
                </a>
              </span>
            </div>
          </div>
          <div className="rounded-lg bg-primary2 px-4 py-4 w-full">
            <div className="lg:w-[300px] h-[300px] w-auto ">
              <img
                src={team5}
                alt="Image Missing"
                className="w-full rounded-lg h-full"
              />
            </div>
            <h5 className="primary-text text-xl font-[500] mt-5 mb-5">
              Jeo Kennedy
            </h5>
            <div className="flex justify-between items-center">
              <p className="text-lg text-white">Account Manager</p>
              <span className="flex gap-2 ">
                <a
                  href="mailto:support@cryptodiamond.info"
                  className="font-[500] border-primary text-white p-2 rounded-xl "
                >
                  <Icons.HiMail />
                </a>
                <a
                  href="tel:+4475-6108-0562"
                  className="font-[500] border-primary text-white p-2 rounded-xl "
                >
                  <Icons.HiPhone />
                </a>
              </span>
            </div>
          </div>
          <div className="rounded-lg bg-primary2 px-4 py-4 w-full">
            <div className="lg:w-[300px] h-[300px] w-auto ">
              <img
                src={team4}
                alt="Image Missing"
                className="w-full rounded-lg h-full"
              />
            </div>
            <h5 className="primary-text text-xl font-[500] mt-5 mb-5">
              Angela Joshua
            </h5>
            <div className="flex justify-between items-center">
              <p className="text-lg text-white">Secretary</p>
              <span className="flex gap-2 ">
                <a
                  href="mailto:support@cryptodiamond.info"
                  className="font-[500] border-primary text-white p-2 rounded-xl "
                >
                  <Icons.HiMail />
                </a>
                <a
                  href="tel:+4477-0688-1200"
                  className="font-[500] border-primary text-white p-2 rounded-xl "
                >
                  <Icons.HiPhone />
                </a>
              </span>
            </div>
          </div>
          <div className="rounded-lg bg-primary2 px-4 py-4 w-full">
            <div className="lg:w-[300px] h-[300px] w-auto ">
              <img
                src={team6}
                alt="Image Missing"
                className="w-full rounded-lg h-full"
              />
            </div>
            <h5 className="primary-text text-xl font-[500] mt-5 mb-5">
              Judge Owen
            </h5>
            <div className="flex justify-between items-center">
              <p className="text-lg text-white">C.E.O</p>
              <span className="flex gap-2 ">
                <a
                  href="mailto:support@cryptodiamond.info"
                  className="font-[500] border-primary text-white p-2 rounded-xl "
                >
                  <Icons.HiMail />
                </a>
                <a
                  href="tel:+4477-0688-1200"
                  className="font-[500] border-primary text-white p-2 rounded-xl "
                >
                  <Icons.HiPhone />
                </a>
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
