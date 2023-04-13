import React from "react";
import About from "../../components/AboutUs";
import Features from "../../components/Features";
import Hero from "../../components/Hero";
import News from "../../components/News";
import Plans from "../../components/Plans";
import Services from "../../components/Services";
import Team from "../../components/Team";
import Testimonial from "../../components/Testimonial";
import TopInvestors from "../../components/TopInvestors";
import Ways from "../../components/Ways";
import Faq from "../../components/Faq";
import Footer from "../../components/Footer";

function Home() {
  return (
    <div className="overflow-x-hidden">
      <Hero />
      <Features />
      <About />
      <Services />
      <Plans />
      <Ways />
      <Testimonial />
      <News />
      <TopInvestors />
      <Team />
      <Faq />
      <Footer />
    </div>
  );
}

export default Home;
