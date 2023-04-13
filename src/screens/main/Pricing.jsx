import React from "react";
import Navbar from "../../components/Navbar";
import ReuseHero from "../../components/ReuseHero";
import Pagination from "../../components/Pagination";
import Plan2 from "../../components/Plan2";

function Pricing() {
  return (
    <>
      <Navbar />
      <ReuseHero title={"Our Plans"} style={"plan-hero"} />
      <Pagination />

      <Plan2 />
    </>
  );
}

export default Pricing;
