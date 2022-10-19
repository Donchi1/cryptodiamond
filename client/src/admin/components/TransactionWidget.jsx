import React from "react";
import { Link } from "react-router-dom";
import TimeAgo from "react-timeago";

export default function TransactionWidget({ transactions }) {
  return (
    <div className="pb-4 shadow-lg mt-4 rounded-lg  lg:overflow-x-hidden overflow-x-scroll dark:bg-gray-800 bg-primary2">
      <div className="py-4 flex justify-between items-center pr-2">
        <h1 className="text-white pl-4 uppercase font-bold text-xl">
          Latest Transactions
        </h1>
        <Link to="/user/history" className="btn-primary">
          View More
        </Link>
      </div>
      <table className=" w-full  overflow-x-scroll rounded-lg ">
        <thead>
          <tr className=" border-b border-gray-300 border-t mb-2 text-white ">
            <td className=" p-4" scope="row">
              Id
            </td>
            <td className=" p-4" scope="row">
              Type
            </td>
            <td className=" p-4" scope="row">
              Date
            </td>
            <td className=" p-4" scope="row">
              Amount
            </td>

            <td className=" p-4" scope="row">
              status
            </td>
          </tr>
        </thead>
        <tbody className=" pt-4  dark:bg-gray-800 dark:text-white">
          {transactions?.map((each) => (
            <tr className="text-gray-500">
              <td className=" flex p-4  items-center gap-2">
                {each.uid.slice(1, 20)}
              </td>
              <td className="p-4  whitespace-nowrap">{each.type}</td>
              <td className="  pl-2">
                <TimeAgo date={each.date.toDate()} />
              </td>
              <td className="p-4  whitespace-nowrap">{each.amount}</td>
              <td className="p-4  whitespace-nowrap">
                {each.status === "success" && (
                  <span className="rounded-full border pb-3 bg-green-400 text-white border-green-400 text-center py-2 px-4">
                    success
                  </span>
                )}
                {each.status === "pending" && (
                  <span className="rounded-full border pb-3 bg-yellow-400 text-white border-yellow-400 text-center py-2 px-4">
                    Pending
                  </span>
                )}
                {each.status === "failed" && (
                  <span className="rounded-full border pb-3 bg-red-400 text-white border-red-400 text-center py-2 px-4">
                    Failed
                  </span>
                )}
              </td>
            </tr>
          ))}

          {transactions?.length === 0 && (
            <tr className="primary-text text-center mt-8 text-lg capitalize">
              <td>No transaction yet</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
