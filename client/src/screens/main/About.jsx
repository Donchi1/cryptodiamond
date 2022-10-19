import React from "react";
import Navbar from "../../components/Navbar";
import ReuseHero from "../../components/ReuseHero";
import Team from "../../components/Team";
import Faq from "../../components/Faq";
import Footer from "../../components/Footer";
import AboutUs from "../../components/AboutUs";
import Pagination from "../../components/Pagination";
import ManagerTalk from "../../components/ManagerTalk";

function About() {
  return (
    <>
      <Navbar />
      <ReuseHero title={"About-Us"} style={"about-hero"} />
      <Pagination />
      <AboutUs />
      <ManagerTalk /> 
      <Team />
      <Faq />
      <Footer />
    </>
  );
}

export default About;
