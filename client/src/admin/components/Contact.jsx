import React from "react";
import Timeago from "react-timeago";
import { BsTrash } from "react-icons/bs";

function Contact() {
  const handleDelete = (item) => {};
  return (
    <div className="max-w-[100%] ">
      <div className="bg-primary2 w-full rounded-lg lg:overflow-x-hidden  overflow-x-scroll">
        <table className="table text-white border-separate space-y-6">
          <thead>
            <tr>
              <td className="p-3 px-4 font-bold text-lg uppercase ">Name</td>
              <td className="p-3 px-4 font-bold text-lg uppercase ">Email</td>
              <td className="p-3 px-4 font-bold text-lg uppercase ">Subject</td>
              <td className="p-3 px-4 font-bold text-lg uppercase ">date</td>
              <td className="p-3 px-4 font-bold text-lg uppercase hidden lg:block ">
                message
              </td>
              <td className="p-3 px-4 font-bold text-lg uppercase ">Status</td>
            </tr>
          </thead>
          <tbody className="">
            <tr className="relative">
              <td className="p-3 px-4">Donchi</td>
              <td className="p-3 px-4">Donchi@gmail.com</td>
              <td className="p-3 px-4">
                <Timeago date="29/09/2011" />
              </td>
              <td className="p-3 px-4">Withdrawal</td>
              <td className="p-3 px-4 break-words hidden lg:block">
                Hello is me Donchi, i have been trying to withdraw in your
                company but no. I have invested and invested yet you are still
                asking for more.
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
            <tr>
              <td className="p-3 px-4">Donchi</td>
              <td className="p-3 px-4">Donchi@gmail.com</td>

              <td className="p-3 px-4">
                <Timeago date="29/09/2011" />
              </td>

              <td className="p-3 px-4">Withdrawal</td>
              <td className="p-3 px-4 break-words hidden lg:block">
                Hello is me Donchi, i have been trying to withdraw in your
                company but no. I have invested and invested yet you are still
                asking for more.
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
            <tr>
              <td className="p-3 px-4">Donchi</td>
              <td className="p-3 px-4">Donchi@gmail.com</td>
              <td className="p-3 px-4">
                <Timeago date="29/09/2011" />
              </td>
              <td className="p-3 px-4">Withdrawal</td>
              <td className="p-3 px-4 break-words hidden lg:block">
                Hello is me Donchi, i have been trying to withdraw in your
                company but no. I have invested and invested yet you are still
                asking for more.
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

export default Contact;
