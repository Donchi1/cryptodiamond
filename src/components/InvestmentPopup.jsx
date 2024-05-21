import React, { useEffect, useState } from "react";
import { dataPop } from "../utils/testimonialData";

function InvestmentPopup() {
  const investItem = [];
  const [popIndex, setPopIndex] = useState(0);
  const [openPop, setOpenPop] = useState(false);

  useEffect(() => {
    (() => {
      let pop = popIndex + 1
      if (pop > dataPop.length - 1) pop = 0;
      setTimeout(() => {
        setPopIndex(pop);
        setOpenPop(true);
        setTimeout(() => {
          setOpenPop(false);
        }, 2000);
      }, 4000);
    })();
  },[popIndex]);

  console.log(popIndex)

  return (
    <section className="absolute z-50 w-[70%] lg:w-[30%] top-[80%] right-10">
      {openPop && (
        <div className="w-full py-2 px-4 bg-white rounded-md  ">
          <p className="[&_b]:text-gold [&_b]:capitalize">
            Someone from <b>{dataPop[popIndex].country}</b> just{" "}
            {dataPop[popIndex].type} <b>{dataPop[popIndex].amount}</b> dollars
          </p>
        </div>
      )}
    </section>
  );
}

export default InvestmentPopup;
