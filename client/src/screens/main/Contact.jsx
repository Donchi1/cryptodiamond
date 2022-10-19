import React from "react";
import Navbar from "../../components/Navbar";
import Pagaination from "../../components/Pagination";
import ReuseHero from "../../components/ReuseHero";
import * as Icon2 from "react-icons/hi";
import { useState } from "react";
import { motion } from "framer-motion";
import Faq from "../../components/Faq";
import Footer from "../../components/Footer";
import {db} from "../../database/firebaseDb"
import {collection, addDoc} from "firebase/firestore"
import Toast from "../../components/Alert";


function Contact() {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    loading: false
  });
  const {name,
    email,
    subject,
    loading,
    message} = userData
  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
   
    if(!name || !email || !message) return Toast.error.fire({ text: "Sorry!! Please fill all required field", icon: "info" });
    setUserData({ ...userData, loading: true });
    try{

    await addDoc(collection(db, "contacts"), {
      email,
    subject,
    message
    })
    setUserData({ ...userData, loading: false, name: "",
    email: "",
    subject: "",
    message: "",  });
     return Toast.success.fire({ text: "Thanks for contacting us we will get back to you soon.", icon: "success" });
    }catch(err){
      setUserData({ ...userData, loading: false,  name: "",
    email: "",
    subject: "",
    message: "" });
     return Toast.error.fire({ text: "Sorry your message could not be sent.", icon: "error" });
      
    }
  };
  return (
    <>
      <Navbar />
      <ReuseHero title={"Contact-Us"} style={"contact-hero"} />
      <Pagaination />
      <section className="w-full h-[90%]">
        <div className="w-[90%] lg:w-[80%] mx-auto  py-6 flex flex-col lg:flex-row  gap-8 rounded-xl">
          <motion.div
            animate={{ opacity: 0, translateX: "-100px" }}
            whileInView={{ opacity: 1, translateX: 0 }}
            transition={{ easing: ["linear"], duration: 1 }}
            viewport={{ once: true }}
            className="bg-primary2 px-4 flex-1 shadow-lg  rounded-lg pt-8 w-full"
          >
            <div className="pb-6 flex-1">
              <h5 className="text-xl font-[500] font-ubuntu text-white py-6">
                Contact
              </h5>
              <ul className="text-lg">
                <li className="flex items-center mb-4 text-white gap-2">
                  <Icon2.HiPhone />
                  <a href="tel:+4477-0688-1200" className="">
                    +4477-0688-1200
                  </a>
                </li>
                <li className="flex gap-2 text-white items-center mb-4">
                  <Icon2.HiMail />
                  <span className="">
                    <a
                      href="mailto:support@cryptodiamond.info"
                      className="__cf_email__"
                    >
                      support@cryptodiamond.info
                    </a>
                  </span>
                </li>
                <li className="flex gap-2 text-white items-center">
                  <Icon2.HiLocationMarker size={30} />
                  <span className="">
                    Kingsway House 9, Bank st, Aberdeen, Scothland United Kingdom, AB11 7QST
                  </span>
                </li>
              </ul>
            </div>
          </motion.div>
          <motion.div
            animate={{ opacity: 0, translateX: "100px" }}
            whileInView={{ opacity: 1, translateX: 0 }}
            transition={{ easing: ["linear"], duration: 1 }}
            viewport={{ once: true }}
            className="bg-primary2 px-4 pt-6 flex-1 pb-4 rounded-lg w-full"
          >
            <div className=" ">
              <h5 className="text-xl font-[500] font-ubuntu text-white py-6">
                Message
              </h5>
              <form className=" flex flex-col gap-4" onSubmit={handleSubmit}>
                <div className="flex flex-col lg:flex-row gap-4 w-full">
                  <label className="w-full text-white ">
                    Name
                    <input
                      type="text"
                      name="name"
                      placeholder="Your Name"
                      className="text-gray-100 mt-2 outline-none  h-[60px] w-full bg-transparent pl-2 rounded-lg border border-gray-300"
                      value={userData.name}
                      onChange={handleChange}
                      
                    />
                  </label>
                  <label className="w-full text-white">
                    Email
                    <input
                      type="email"
                      name="email"
                      className="text-gray-100 mt-2 outline-none h-[60px] w-full bg-transparent pl-2 rounded-lg border border-gray-300"
                      placeholder="Your Email"
                      value={userData.email}
                      onChange={handleChange}
                      
                    />
                  </label>
                </div>
                <label className="w-full text-white ">
                  Subject
                  <input
                    type="text"
                    className="text-gray-100 mt-2 outline-none h-[60px] w-full bg-transparent pl-2 rounded-lg border border-gray-300"
                    name="subject"
                    placeholder="Subject"
                    value={userData.subject}
                    onChange={handleChange}
                   
                  />
                </label>
                <label className="w-full text-white ">
                  Message
                  <textarea
                    value={userData.message}
                    onChange={handleChange}
                    
                    name="message"
                    className="text-gray-100 mt-2 outline-none h-[80px] w-full bg-transparent pl-2 rounded-lg border border-gray-300"
                  ></textarea>
                </label>
                <div>
                  <button className="btn-primary w-full">send</button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </section>
      <Faq />
      <Footer />
    </>
  );
}

export default Contact;
