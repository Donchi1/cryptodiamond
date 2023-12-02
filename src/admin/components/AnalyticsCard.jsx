import React from "react";
import * as Icons from "react-icons/bs";

export default function AnalyticsCard({ title, success, arrow, icon, info }) {
  const checkArrow = (arr) => {
    if (arr === "up") return "text-green-400";
    if (arr === "down") return "text-yellow-400";
    if (arr === "fail") return "text-red-500";
  };
  return (
    <div className="rounded-lg bg-primary2 basis-[33%]   shadow-md px-6 py-4 mt-4">
      <div>
        <h1 className="uppercase text-lg primary-text py-4">{title}</h1>
        <div className="flex justify-between text-3xl gap-4 items-center text-gray-400">
          {icon === "s" && <Icons.BsPerson />}
          {icon === "u" && <Icons.BsCurrencyExchange />}
          {icon === "t" && <Icons.BsCurrencyDollar />}
          <p className="text-xl  font-bold text-white">{info}</p>
        </div>
        <div
          className={`${checkArrow(
            arrow
          )} flex items-center justify-end pt-1 gap-4 mt-2`}
        >
          <p className="text-gray-400">This month so far</p>
          {success ? <Icons.BsArrowUp /> : <Icons.BsArrowDown />}
        </div>
      </div>
    </div>
  );
}
