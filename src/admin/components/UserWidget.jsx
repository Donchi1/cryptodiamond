import React, { useState } from "react";
import { useEffect } from "react";
import * as Icons from "react-icons/bs";
//import { userRow } from "../utils/UserData";
import { useNavigate } from "react-router-dom";

export default function UserWidget({ users }) {
  const [recentUsers, setRecentUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const convDateInfo = users.map(each =>{
      const convDate = (each.date.seconds + each.date.nanoseconds / 100000000)* 1000
        return {
          ...each,
          date: new Date(convDate)
        } 
    })
      const filtered = convDateInfo.filter((each, index) => index < 10).sort((a, b) => b.date - a.date)
      setRecentUsers(filtered)
      
  }, [users])
  return (
    <section className="widget2 shadow-lg mt-4 text-white flex-[2]   rounded-lg  dark:bg-gray-800 bg-primary2 h-full ">
      <div className="py-4">
        <h1 className=" pl-4 uppercase font-bold text-xl">Latest Users</h1>
      </div>

      <div className="dark:text-gray-500 pt-4 lg:overflow-x-hidden overflow-x-scroll">
        <table className="table">
          <tbody className="px-4 pb-4 ">
            {recentUsers?.map((each) => (
              <tr key={each.uid}>
                <td className="px-6 py-2">
                  <img
                    src={each.photo}
                    alt="profile"
                    className="w-[40px] h-[40px] rounded-full object-cover"
                  />
                </td>
                <td className="px-4">
                  <p>{each.firstname}</p>
                </td>
                <td className="px-4">
                  <span>{each.email}</span>
                </td>
                <td className="px-4">
                  <span>{each.initialDeposit}</span>
                </td>
                <td className="px-4">
                  <span
                    onClick={() => navigate(`/adm/users/edit/${each.uid}`)}
                    className="flex gap-2 dark:text-white cursor-pointer capitalize transition-all duration-700 ease-linear hover:bg-gray-300 hover:text-blue-500 text-white bg-blue-500   py-2 px-4 rounded-lg"
                  >
                    <span>show</span>
                    <Icons.BsEye size={24} />
                  </span>
                </td>
              </tr>
            ))}
            {users?.length === 0 && (
              <tr className="inline-block text-center primary-text pl-4 pb-4 uppercase ">
                <td>
                  <span>No user Yet</span>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
