import React from "react";
import { useLocation } from "react-router-dom";
import Faq from "../../components/Faq";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";

function Empty() {
  const { pathname } = useLocation();
  return (
    <>
      <Navbar />
      <section className="w-full h-screen mt-8">
        <div className="w-[90%] lg:w-[80%] mx-auto h-screen">
          <div className="h-full flex justify-center items-center bg-primary2 rounded-tl rounded-br rounded-full">
            <div className="text-center">
              <h1 className="lg:text-[15rem] text-[11rem] primary-text">404</h1>
              <p className="text-white">
                We cant find <em className="primary-text">{pathname}</em> you
                are looking for. Please check the link and try again
              </p>
              <a
                href="/"
                className="btn-secondary mt-4 inline-block uppercase w-full text-white"
              >
                Go back
              </a>
            </div>
          </div>
        </div>
      </section>
      <Faq />
      <Footer />
    </>
  );
}

export default Empty;
