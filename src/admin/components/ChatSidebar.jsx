import React from "react";
import useCollection from "../../components/hooks/UseCollection";
import { FaSearch } from "react-icons/fa";
import { useState } from "react";
import { useEffect } from "react";

function ChatSidebar({ setUserId, setOpenChatside }) {
  const [chats] = useCollection("userChats");
  const [filteredChats, setFilteredChats]= useState([])
 
const handleChatClick = (uid)=> {
  setUserId(uid)
  setOpenChatside(prev => !prev)
}

const keys = [ "lastname", "firstname", "lastMessage"]


useEffect(() => {
   setFilteredChats([...chats])
}, [chats])

const handleSearch = (text) => {
  const rr = chats.filter(each => keys.some(key => each[key].toLowerCase().includes(text.toLowerCase())))
setFilteredChats(rr)
}

  return (
    <div className="w-[95%] mx-auto ">
      <div className="pb-4 border-b border-gray-500 relative">
        <input
          type="search"
          onChange={(e) => handleSearch(e.target.value) }
          placeholder="Search chat"
          className="w-full pl-10 outline-none border focus:!border-gold focus:bg-transparent flex bg-gray-300 duration-500 ease-linear p-3 cursor-pointer text-gray-500   rounded-full"
        />
        <span className="absolute  top-[1.2rem] left-4">
          <FaSearch className="text-gray-300 " size={15} />
        </span>
      </div>
      {filteredChats?.map(({ uid, lastname, firstname, lastMessage, senderPhoto }) => (
        <div
          onClick={() => handleChatClick(uid)}
          key={uid}
          className="my-3 dark:hover:text-black bg-black/20 transition-all items-center gap-2 focus:bg-gold flex  duration-500 ease-linear p-2 text-gray-500  cursor-pointer   rounded-full  sidebar-link "
        >
          <img
            src={senderPhoto}
            className="w-[30px] h-[30px] object-cover  rounded-full"
          />
          <div className="flex justify-center  flex-col">
            <span className="text-white">
              {firstname} {lastname}
            </span>
            {lastMessage.length > 38 ? (
              <p className="self-end text-[14px] text-left">
                {lastMessage.slice(0, 35)}...
              </p>
            ) : (
              <p className="self-end text-[14px] text-left">{lastMessage}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default ChatSidebar;
