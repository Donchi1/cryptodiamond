import React from "react";
import * as Icons from "react-icons/bs";
import { Link } from "react-router-dom";
function NotifyDropdown({ info }) {
  const checkStatus = (status) => {
    if (status === "success") return <Icons.BsCheck className="text-xl" />;
    if (status === "pending") return <Icons.BsInfo className="text-xl" />;
    if (status === "failed") return <Icons.BsX className="text-xl" />;
  };
  const checkForStyle = (status) => {
    if (status === "success")
      return { text: "text-green-300", bg: "bg-green-500" };
    if (status === "pending")
      return { text: "text-blue-300", bg: "bg-blue-500" };
    if (status === "failed") return { text: "text-red-300", bg: "bg-red-500" };
  };

  return (
    <div className="absolute rounded-lg w-[20rem] lg:w-[40rem] flex flex-col -right-[6.2rem] lg:right-0 gap-4 bg-primary2  shadow-2xl top-[3.3rem] p-4">
      {info?.map((each, idx) => (
        <div
          key={idx}
          className={`flex gap-4 ${
            checkForStyle(each.status).bg
          } text-white w-full  px-4 rounded-sm py-2`}
        >
          <span
            className={`flex justify-center items-center rounded-full w-[2rem] bg-white ${
              checkForStyle(each.status).text
            } h-[2rem] `}
          >
            {checkStatus(each.status)}
          </span>
          <div className="flex-[2]">
            <div className="flex justify-between items-center">
              <h4 className=" font-bold capitalize">{each.title}</h4>
              <span className="primary-text hover:border rounded-full hover:border-[#f75616] text-xl cursor-pointer">
                <Icons.BsX />
              </span>
            </div>
            <div className=" text-sm">
              <p className="text-truncate">{each.text}</p>
            </div>
          </div>
        </div>
      ))}

      {info.length === 0 && (
        <h2 className="primary-text text-lg font-[500]">No Notifiction yet</h2>
      )}
      {info.length !== 0 && (
        <div className="self-center relative">
          <Link
            to="/user/messages"
            className="bg-[#f75616] text-white rotate-[180deg] absolute py-px px-2 rounded-lg  text-center"
          >
            <Icons.BsTriangle />
          </Link>
        </div>
      )}
    </div>
  );
}

export default NotifyDropdown;
