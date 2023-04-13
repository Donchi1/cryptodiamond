import React from "react";
import { useLocation } from "react-router-dom";

function Pagaination() {
  const location = useLocation();

  const url = location.pathname.split("/")[1];
  return (
    <div className="w-full mb-20">
      <div className="w-[90%] lg:w-[80%] h-[70px] flex justify-center items-center mx-auto bg-primary2 rounded-sm">
        <h2 className="text-white font-[500] text-xl">
          {" "}
          <a href="/" className="hover:text-[#f75616]">
            {" "}
            Home{" "}
          </a>
          {" > "}
          <span>{url}</span>
        </h2>
      </div>
    </div>
  );
}

export default Pagaination;
