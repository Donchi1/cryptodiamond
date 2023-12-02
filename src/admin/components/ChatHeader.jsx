import React from "react";
import useGetDocument from "../../components/hooks/UseDocument";
import { useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../database/firebaseDb";
import { useState } from "react";
import { FaBars } from "react-icons/fa6";

function ChatHeader({ setOpenChatside, userId }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      const res = await getDoc(doc(db, "users", userId || "hgdhjhsj"));
      setUser(res.data());
    };
    getUser();
  }, [userId]);
  return (
    <div className="bg-primary2 h-[12vh] flex justify-center items-center shadow-xl">
      <div className="w-[98%] mx-auto flex justify-between items-center">
        <div className="flex gap-2 justify-center items-center">
          <img
            className="w-[50px] h-[50px] object-cover rounded-full"
            src={user?.photo || "/avatar.png"}
          />
          <span className="primary-text text-[17px]">
            {user?.firstname || "john"} {user?.lastname || "Doe"}
          </span>
          <span className="inline-block w-2 h-2 rounded-full bg-green-500"></span>
        </div>
        <div>
          <p className="text-white text-[17px] uppercase">
            <span className="hidden lg:inline">Support Center</span>
            <span
              onClick={() => setOpenChatside((prev) => !prev)}
              className="lg:hidden inline w-[35px] h-[35px] cursor-pointer inline-flex justify-center items-center rounded-sm hover:border-gold/70 border border-gold"
            >
              <FaBars size={20} />
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default ChatHeader;
