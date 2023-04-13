import React from "react";
import logo from "/logo.png";
import * as Icons from "react-icons/fa";
import * as Icon2 from "react-icons/hi";
import { motion } from "framer-motion";

function Footer() {
  return (
    <footer className="w-full lg:h-[80vh] h-auto pt-6 lg:pt-0  bg-primary2">
      <div className="lg:w-[80%] w-[90%] mx-auto lg:h-[70vh] h-full">
        <motion.div
          animate={{ opacity: 0, translateX: "100px" }}
          whileInView={{ opacity: 1, translateX: 0 }}
          transition={{ easing: ["linear"], duration: 1.5, delay: 1 }}
          viewport={{ once: true }}
          className="flex  justify-between lg:flex-row flex-col lg:items-center items-start h-full"
        >
          <div className="flex-1">
            <div className="">
              <a href="/">
                <img src={logo} alt="..." />
              </a>
            </div>
            <div className="flex gap-4 mt-10 text-white ">
              <a
                className="w-[40px] h-[40px] inline-flex justify-center transition-color ease-linear duration-500 items-center hover:bg-[#f75616] rounded-full border-primary"
                href="https://www.facebook.com/"
              >
                <Icons.FaFacebookF size={20} />
              </a>
              <a
                className="w-[40px] h-[40px] inline-flex justify-center transition-color ease-linear duration-500 items-center hover:bg-[#f75616] rounded-full border-primary"
                href="https://twitter.com/"
              >
                <Icons.FaTwitter size={20} />
              </a>
              <a
                className="w-[40px] h-[40px] inline-flex justify-center transition-color ease-linear duration-500 items-center hover:bg-[#f75616] rounded-full border-primary"
                href="https://bd.linkedin.com/"
              >
                <Icons.FaLinkedin size={20} />
              </a>
              <a
                className="w-[40px] h-[40px] inline-flex justify-center transition-color ease-linear duration-500 items-center hover:bg-[#f75616] rounded-full border-primary"
                href="https://www.instagram.com/"
              >
                <Icons.FaInstagram size={20} />
              </a>
            </div>
          </div>

          <div className="flex-1 pb-4 mt-4 lg:mt-0">
            <h5 className="text-xl pb-6 font-[500] font-ubuntu text-white">
              Useful Links
            </h5>
            <ul className=" [&_a]:transition-all [&_a]:ease-linear [&_a]:duration-500 text-white [&_a]:items-center [&_a]:inline-flex [&_a]:gap-2 hover:[&_a]:text-[#f75616] [&_a_svg]:text-xs flex flex-col gap-4">
              <div className="grid lg:grid-cols-2 grid-cols-1 gap-y-5">
                <li>
                  <a href="/">
                    <Icons.FaArrowRight /> Home
                  </a>
                </li>
                <li>
                  <a href="/about">
                    <Icons.FaArrowRight /> About Us
                  </a>
                </li>

                <li>
                  <a href="/pricing">
                    <Icons.FaArrowRight /> Plan
                  </a>
                </li>
                <li>
                  <a href="/contact">
                    <Icons.FaArrowRight /> Contact
                  </a>
                </li>
              </div>
            </ul>
          </div>

          <div className="pb-4 lg:mt-8 mt-0 flex-1">
            <h5 className="text-xl  font-[500] font-ubuntu text-white py-6 ">
              Contact
            </h5>
            <ul>
              <li className="flex items-center mb-4 text-white gap-2">
                <Icon2.HiPhone />
                <a href="tel:+4477-0688-1200" className="">
                +447706881200
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
                <Icon2.HiLocationMarker />
                <span className="">
                  Kingsway House 9, Bank st, Aberdeen, Scothland United Kingdom, AB11 7QST
                </span>
              </li>
            </ul>
          </div>
        </motion.div>
      </div>

      <div className="bg-primary1 h-[10vh] w-full">
        <div className="flex justify-center h-full items-center primary-text">
          <p
            
          >
            Copyright &copy; {new Date().getFullYear()}{" "}
            <strong>Crypto Diamond</strong> All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
