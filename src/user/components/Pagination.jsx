import React from "react";
import { useLocation, Link } from "react-router-dom";

const Pagination = ({ title }) => {
  const location = useLocation();

  const url = location.pathname.split("/")[2];

  return (
    <div className="flex justify-between  text-white items-center h-[15vh] ">
      <h4 className="lg:text-4xl text-3xl flex-1 font-ubuntu font-[500]">
        {title}
      </h4>
      <div
        className={`${url == "dashboard" && "invisible pointer-events-none"} `}
      >
        <Link
          to="/user/dashboard"
          className="hover:text-[#f75616] transition-allease-linear"
        >
          Home{" "}
        </Link>
        {" > "}
        <span>{url}</span>
      </div>
    </div>
  );
};
export default Pagination;
