import React from "react";
import * as Icons from "react-icons/bs";
import TimeAgo from "react-timeago";

function NotifyMessage({ info }) {
  const time = new Date().getFullYear();
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
    <div className="bg-primary2 rounded-lg">
      <div className="flex gap-4 flex-col">
        {info?.map((each, idx) => (
          <div
            key={idx}
            className={`flex gap-4 ${
              checkForStyle(each.status).bg
            }  text-white   px-4 rounded-sm py-2`}
          >
            <span
              className={`flex justify-center items-center rounded-full w-[2.5rem] bg-white ${
                checkForStyle(each.status).text
              } h-[2.5rem] `}
            >
              {checkStatus(each.status)}
            </span>
            <div className="flex-[2]">
              <div className="flex justify-between items-center">
                <h4 className="text-lg font-bold capitalize">{each.title}</h4>
                <span className="primary-text hover:border rounded-full hover:border-[#f75616] text-xl cursor-pointer">
                  <Icons.BsX />
                </span>
              </div>
              <div className="flex gap-20 text-lg">
                <p>{each.text}</p>
                <span className="text-gray-800 text-[15px]">
                  sent: <TimeAgo date={each.date.toDate()} />
                </span>
              </div>
            </div>
          </div>
        ))}

        {info.length === 0 && (
          <h2 className="primary-text text-lg font-[500] pl-4 py-8">
            No Notifiction yet
          </h2>
        )}
      </div>
    </div>
  );
}

export default NotifyMessage;
