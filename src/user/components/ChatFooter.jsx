"use client"
import React,{useState} from 'react'
import { FaRegPaperPlane } from "react-icons/fa6";
import { BsCamera } from "react-icons/bs";
import useGetDocWithClause from '../../components/hooks/UseGetDocWithClause';
import { useSelector } from 'react-redux';
import { auth, db } from '../../database/firebaseDb';
import { addDoc, collection, doc, serverTimestamp, setDoc } from 'firebase/firestore';


function ChatFooter({scrollRef, setOpenChatModal, setFile}) {
const currentUser = useSelector((state) =>  state.auth.userData)
const [admin] = useGetDocWithClause({colls:"users",q:{path:"isAdmin", condition:"==", value:true}})
  

    const combinedId = `${admin[0]?.uid}${auth.currentUser?.uid}`

  const [message, setMessage] = useState("")


  const handleSend = async() => {
     if(!message) return 
     try{
       await addDoc(collection(db, `chats/${combinedId}/messages`), {
        senderId: auth.currentUser?.uid,
        isAdmin: false,
        text: message,
        date:serverTimestamp(),
        read: false,
        senderPhoto:currentUser?.photo,
        img: ""
       })
       scrollRef.current?.scrollIntoView({behavior: "smooth"})
       await setDoc(doc(db, `userChats/${auth.currentUser?.uid}`), {
         lastMessage: message,
         date:serverTimestamp(),
         senderPhoto:currentUser?.photo,
         firstname: currentUser?.firstname,
         lastname: currentUser?.lastname,
         uid: currentUser?.uid
       })
       setMessage("")
     }catch(err){
       console.log(err)
     }
  }



  const openModal = () => {
    const el = document.getElementById("photoModal")
    if(el){
      el.style.display = "block";
      el.classList.add("show");
  };
}
  //close modal
  const closeModal = () => { 
    setFile(null)
    const el = document.getElementById("photoModal") 
    if(el){
   el.style.display = "none";
   el.classList.remove("show");
   el.classList.add("hide");
  };

}
const handlePhotoChange = (e) => {
  if(e.target.files[0]){
    setFile(e.target.files[0])
    setOpenChatModal(true)
  }
}

return (
  <>
  <div className='h-[15vh] bg-gray-300 flex justify-center items-center border-t border-gray-500 shadow-xl'>
      <div className='w-[95%] mx-auto flex items-center bg-gray-500 rounded-full px-4'>
        <div className='w-[85%] lg:w-[90%] pr-2'>

       <textarea value={message} onChange={(e) => setMessage(e.target.value)} className='w-full mt-4 flex items-center h-full resize-none overflow-hidden placeholder:capitalize placeholder:text-white px-2 bg-transparent border-none outline-none' placeholder='write a message' ></textarea>
        </div>
       <div className='lg:w-[10%] w-[20%] flex justify-center items-center gap-4 pr-6 lg:pr-0'>
        <label  id='photo' className="cursor-pointer " >
          <BsCamera  className='text-gray-200' size={25}/>
          <input  type='file' id='photo' onChange={handlePhotoChange} className='hidden' />
        </label>
        <button  className='bg_gold p-2 rounded-full ' onClick={handleSend}>
          <FaRegPaperPlane size={20} className='text-[#000]/70'/>
        </button>
       </div>
      </div>
    </div>
  </>
)
}

export default ChatFooter