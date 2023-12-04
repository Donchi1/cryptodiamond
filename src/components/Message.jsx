import React from 'react'
import { auth } from '../database/firebaseDb'
import moment from "moment"

function Message({message}) {
  
    const sender = message.senderId === auth.currentUser?.uid
  return (
    <div className={`${sender ? "self-end bg-primary2  rounded-bl-xl " :  " rounded-br-xl bg-gray-500 self-start"} rounded-tl-xl rounded-tr-xl px-3 py-4 max-w-[80%]  `}>
            <div className='flex items-center flex-col gap-1  max-w-fit'>

            <p className='text-white  self-start'>{message.text !== "" && message.text}</p>
            {message.img && (
              <img  className="mt-2  object-cover max-w-[300px] h-[300px]" src={message.img} alt="photo" />
            )}
             <span className={`text-[15px] ${sender ? "primary-text" : " text-black" } self-end `}>{moment(message.date?.toDate()).fromNow()}</span>
            </div>
           
          
          </div>
  )
}

export default Message