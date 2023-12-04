import React from "react";
import CryptoWidget from "./CryptoWidget";
import * as Icons from "react-icons/hi";
import * as Icons1 from "react-icons/fa";
import Language from "./Language";

function Topbar() {
  return (
    <>
      <CryptoWidget />
      <section className="w-full h-auto lg:h-[8vh] bg-primary1 sticky top-0 z-40">
        <div className=" mx-auto  w-[90%] h-full lg:w-[80%]">
          <div className="flex flex-col lg:flex-row  lg:justify-between items-start lg:items-center">
            <ul className="flex justify-center flex-col lg:flex-row items-start gap-4 text-white">
              <a
                className="inline-flex items-center gap-1"
                href="mailto:support@ultimatefc.info"
              >
                <Icons.HiMail className="primary-text" />
                <span>support@ultimatefc.info</span>
              </a>

              <a
                className="inline-flex items-center gap-1"
                href="tel:+447466587402"
              >
                <Icons.HiPhone className="primary-text" />
                <span>+447466587402</span>
              </a>
            </ul>
            <div className="flex items-center justify-center gap-6 text-white  bg-inherit">
              <Language />
              <div className="flex gap-4 hover:[&_span]:text-[#cca354] transition-all duration-500 linear cursor-pointer">
                <span>
                  <Icons1.FaFacebookF />
                </span>
                <span>
                  <Icons1.FaTwitter />
                </span>
                <span>
                  <Icons1.FaLinkedinIn />
                </span>
                <span>
                  <Icons1.FaInstagram />
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Topbar;
