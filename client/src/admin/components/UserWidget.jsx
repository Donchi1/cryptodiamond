import React, { useEffect, useState } from "react";
import * as Icons from "react-icons/bs";
import { userRow } from "../utils/UserData";
import { useNavigate } from "react-router-dom";

export default function UserWidget() {
  const [recentUsers, setResentUsers] = useState([]);
  const navigate = useNavigate();

  return (
    <section className="widget2 shadow-lg mt-4 text-white  rounded-lg w-full dark:bg-gray-800 bg-primary2 h-full ">
      <div className="py-4">
        <h1 className=" pl-4 uppercase font-bold text-xl">Latest Users</h1>
      </div>

      <div className="dark:text-gray-500 pt-4">
        {userRow?.map((each) => (
          <div
            key={each.id}
            className="flex items-center justify-between px-4 pb-4 "
          >
            <img
              src={each.img}
              alt="profile"
              className="w-[40px] h-[40px] rounded-full object-cover"
            />
            <p>{each.date}</p>
            <p>{each.firstname}</p>
            <p
              onClick={() => navigate(`/adm/users/edit/${each.id}`)}
              className="flex gap-2 dark:text-white cursor-pointer capitalize transition-all duration-700 ease-linear hover:bg-gray-300 hover:text-blue-500 text-white bg-blue-500   py-2 px-4 rounded-lg"
            >
              <span>show</span>
              <Icons.BsEye size={24} />
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
