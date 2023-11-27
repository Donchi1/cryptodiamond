import React from "react";
import bonus from "/bonus.png";
import { motion } from "framer-motion";
import { useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../database/firebaseDb";
import Toast from "./Alert";
import { useSelector } from "react-redux";

function News() {
  const [userEmail, setUserEmail] = useState("");
  const user = useSelector((state) => state.auth.user);

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!userEmail)
      return Toast.error.fire({
        text: "Please all inputs are required",
        icon: "info",
      });

    try {
      await addDoc(collection(db, "newsletters"), {
        email: userEmail,
        date: serverTimestamp(),
        name: user ? user.firstname : "visitor",
      });
      return Toast.success.fire({
        text: "Subcription successfull. Thanks for subcribing to our newsletter",
        icon: "success",
      });
    } catch (error) {
      return Toast.error.fire({ text: error, icon: "error" });
    }
  };
  return (
    <section className="w-full h-[70vh]  mt-48 lg:mt-0  lg:pt-0">
      <div className="flex justify-center flex-col lg:flex-row items-center h-full">
        <div className="flex pt-10 w-full  lg:pt-0 flex-1 h-full flex-col pb-10 lg:pb-0 items-center justify-center bg-primary2  lg:bg-gold">
          <motion.div
            animate={{ opacity: 0, translateX: "-100px" }}
            whileInView={{ opacity: 1, translateX: 0 }}
            transition={{ easing: ["linear"], duration: 1 }}
            viewport={{ once: true }}
            className="text-white w-[86%] lg:w-auto mx-auto "
          >
            <h3 className="capitalize font-[500] lg:text-4xl text-3xl">
              Join Our Newsletter
            </h3>
            <p className="text mt-6 mb-10 text-lg ">
              Put your your fund into action with full investments
            </p>
            <form className="subscribe-form" onSubmit={handleSubmit}>
              <div className="bg-white lg:w-[500px] w-full  border-none  rounded-full pl-4 h-[50px] flex items-center justify-between">
                <input
                  className="border-none mr-2 placeholder:gray-900 outline-none bg-transparent w-[70%] h-full text-gray-900"
                  name="email"
                  type="email"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  placeholder="Email Address"
                />
                <button
                  className="bg-primary1 rounded-full h-full lg:w-[30%] w-[40%] uppercase font-bold  "
                  type="submit"
                >
                  Subscribe
                </button>
              </div>
            </form>
          </motion.div>
        </div>

        <div className=" flex-1 bg-primary2 h-full flex justify-start items-center w-full pb-20 lg:pb-0">
          <motion.div
            animate={{ opacity: 0, translateX: "100px" }}
            whileInView={{ opacity: 1, translateX: 0 }}
            transition={{ easing: ["linear"], duration: 1 }}
            viewport={{ once: true }}
            className="lg:ml-20 ml-6"
          >
            <h3 className="lg:text-4xl text-3xl font-[500] text-white capitalize">
              Referral Bonus Level
            </h3>
            <p className="text-white text-lg capitalize mt-6 mb-8">
              Get On First Level Refferal Commission{" "}
            </p>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full">
              <div className="flex gap-4">
                <div className="w-[50px] h-[50px] p-2 rounded-full border border-primary">
                  <img src={bonus} alt="Icon Missing" className="w-full" />
                </div>
                <div className=" flex-1">
                  <p className="text-white">
                    Level 1 Instant <strong className="primary-text">3%</strong>
                  </p>
                  <p className="text-white">Bonus Reward</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-[50px] h-[50px] p-2 rounded-full border border-primary">
                  <img src={bonus} alt="Icon Missing" className="w-full" />
                </div>
                <div className=" flex-1">
                  <p className="text-white">
                    Level 2 Instant{" "}
                    <strong className="primary-text">2.5%</strong>
                  </p>
                  <p className="text-white">Bonus Reward</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-[50px] h-[50px] p-2 rounded-full border border-primary">
                  <img src={bonus} alt="Icon Missing" className="w-full" />
                </div>
                <div className=" flex-1">
                  <p className="text-white">
                    Level 3 Instant <strong className="primary-text">2%</strong>
                  </p>
                  <p className="text-white">Bonus Reward</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-[50px] h-[50px] p-2 rounded-full border border-primary">
                  <img src={bonus} alt="Icon Missing" className="w-full" />
                </div>
                <div className=" flex-1">
                  <p className="text-white">
                    Level 4 Instant <strong className="primary-text">1%</strong>
                  </p>
                  <p className="text-white">Bonus Reward</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default News;
