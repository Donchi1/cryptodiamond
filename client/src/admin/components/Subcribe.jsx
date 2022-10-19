import React from "react";
import TimeAgo from "react-timeago";
import { BsTrash } from "react-icons/bs";

function Subcribe({ subscribers }) {
  const handleDelete = (item) => {};
  return (
    <div className="max-w-[100%] ">
      <div className="bg-primary2 w-full rounded-lg lg:overflow-x-hidden overflow-x-scroll">
        <table className="table text-white border-separate space-y-6">
          <thead>
            <tr>
              <td className="p-3 px-4 font-bold text-lg uppercase ">Name</td>
              <td className="p-3 px-4 font-bold text-lg uppercase ">Email</td>
              <td className="p-3 px-4 font-bold text-lg uppercase ">date</td>
              <td className="p-3 px-4 font-bold text-lg uppercase ">Status</td>
            </tr>
          </thead>
          <tbody className="">
            <tr>
              <td className="p-3 px-4">Donchi</td>
              <td className="p-3 px-4">Donchi@gmail.com</td>
              <td className="p-3 px-4">
                <TimeAgo date="29/09/2011" />
              </td>
              <td className="p-3 px-4">
                <span className="inline-block py-2 px-4 bg-green-500 rounded-full">
                  success
                </span>
              </td>
            </tr>
            <tr>
              <td className="p-3 px-4">Donchi</td>
              <td className="p-3 px-4">Donchi@gmail.com</td>
              <td className="p-3 px-4">
                <TimeAgo date="29/09/2011" />
              </td>
              <td className="p-3 px-4">
                <span className="inline-block py-2 px-4 bg-green-500 rounded-full">
                  success
                </span>
              </td>
            </tr>
            <tr>
              <td className="p-3 px-4">Donchi</td>
              <td className="p-3 px-4">Donchi@gmail.com</td>
              <td className="p-3 px-4">
                <TimeAgo date="29/09/2011" />
              </td>
              <td className="p-3 px-4">
                <span className="inline-block py-2 px-4 bg-green-500 rounded-full">
                  success
                </span>
              </td>
              <td className="p-3 px-4" onClick={() => handleDelete()}>
                <BsTrash size={24} className="text-red-500 cursor-pointer" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Subcribe;
