import React from "react";
import TimeAgo from "react-timeago";
import { BsTrash } from "react-icons/bs";
import useCollection from "../../components/hooks/UseCollection";
import { db } from "../../database/firebaseDb";
import { deleteDoc, doc } from "firebase/firestore";
import Toast from "../../components/Alert";

function Subcribe() {
  const handleDelete = async (item) => {
    try {
      await deleteDoc(doc(db, "newsletters", item));
      Toast.success.fire({ text: "Subscriber successfully deleted" });
    } catch (error) {
      Toast.error.fire({ text: error.message });
    }
  };
  const [subscribers, loading, error] = useCollection("newsletters");
  subscribers.sort((a, b) => b.date - a.date).slice(0, 10);

  return (
    <div className="max-w-[100%] ">
      <div className="bg-primary2 w-full rounded-lg lg:overflow-x-hidden overflow-x-scroll">
        <table className="table text-white border-separate space-y-6">
          <thead>
            <tr>
              <td className="p-3 px-10 font-bold text-lg uppercase ">Name</td>
              <td className="p-3 px-10 font-bold text-lg uppercase ">Email</td>
              <td className="p-3 px-10 font-bold text-lg uppercase ">date</td>
              <td className="p-3 px-10 font-bold text-lg uppercase ">Status</td>
              <td className="p-3 px-10 font-bold text-lg uppercase ">Action</td>
            </tr>
          </thead>
          <tbody className="">
            {subscribers?.map((each) => (
              <tr>
                <td className="p-3 px-10">{each.name}</td>
                <td className="p-3 px-10">{each.email}</td>
                <td className="p-3 px-10">
                  <TimeAgo date={each.date.toDate()} />
                </td>
                <td className="p-3 px-10">
                  <span className="inline-block py-2 px-4 bg-green-500 rounded-full">
                    success
                  </span>
                </td>
                <td className="p-3 px-10" onClick={() => handleDelete(each.id)}>
                  <BsTrash size={24} className="text-red-500 cursor-pointer" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {subscribers.length < 1 && (
          <div className="text-center py-6 font-bold primary-text">
            <span>No Subscriber</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default Subcribe;
