import React from "react";
import Timeago from "react-timeago";
import { BsTrash } from "react-icons/bs";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../database/firebaseDb";
import Toast from "../../components/Alert";

function Contact({ contacts }) {
  const handleDelete = async (item) => {
    await deleteDoc(doc(db, "contacts", item));
    Toast.success.fire({
      text: "successfully deleted contact",
      icon: "success",
    });
  };
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
            {contacts?.map((each) => (
              <tr className="relative">
                <td className="p-3 px-4">{each.name}</td>
                <td className="p-3 px-4">{each.email}</td>
                <td className="p-3 px-4">
                  <Timeago date={each.date} />
                </td>
                <td className="p-3 px-4">{each.subject}</td>
                <td className="p-3 px-4 break-words hidden lg:block">
                  {each.message}
                </td>
                <td className="p-3 px-4">
                  <span className="inline-block py-2 px-4 bg-green-500 rounded-full">
                    success
                  </span>
                </td>
                <td className="p-3 px-4" onClick={() => handleDelete(each.uid)}>
                  <BsTrash size={24} className="text-red-500 cursor-pointer" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Contact;
