import React, { useState, useRef } from "react";
import Message from "../../../components/Message";
import ChatFooter from "../../components/ChatFooter";
import ChatHeader from "../../../admin/components/ChatHeader";

import { db } from "../../../database/firebaseDb";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import useGetDocWithClause from "../../../components/hooks/UseGetDocWithClause";
import ChatSidebar from "../../components/ChatSidebar";
import { FaRegPaperPlane, FaX } from "react-icons/fa6";
import ChatModal from "../../components/ChatModal";


function Messenger() {
  const scrollRef = useRef(null);
  const [userId, setUserId] = useState("")

  const [admin] = useGetDocWithClause({
    colls: "users",
    q: { path: "isAdmin", condition: "==", value: true },
  });

  const combinedId = admin[0]?.uid + userId

  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [openChatside, setOpenChatside] = useState(false);
  const [openChatModal, setOpenChatModal] = useState(false);
  const [file, setFile] = useState(null)

 
  

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, `chats/${combinedId}/messages`), orderBy("date")),
      (qsnap) => {
        const colData = qsnap.docs.map((each) => ({
          ...each.data(),
          id: each.id,
        }));
       
        setMessages(colData);
        setLoading(false);
        if (colData.length > 0) {
          scrollRef.current &&
            scrollRef.current.scrollIntoView({ behavior: "smooth" });
        }
      },
      (err) => {
        setError(err.message);
        setLoading(false);
      }
    );
    return unsubscribe;
  }, [combinedId]);

 


  return (
    <>
      <div className="">
        <div className="flex- h-screen ">
          <section className=" h-screen mx-auto bg-primary2  w-full ">
            <div className=" h-screen">
              <ChatHeader userId={userId} setOpenChatside={setOpenChatside} />
              <div className="flex relative">
                
                <div className={`${openChatside? "translate-x-0 lg:translate-x-0": "translate-x-[-105%] lg:translate-x-0"} transition-all duration-500 ease-linear flex-1 pt-6 absolute sm:static bg-[#222]  top-0 h-[calc(100vh-27vh)] lg:h-auto overflow-y-scroll`}>

                 <ChatSidebar setOpenChatside={setOpenChatside}  setUserId={setUserId}  />
                </div>
                 <ChatModal scrollRef={scrollRef} file={file} userId={userId} setOpenChatModal={setOpenChatModal} openChatModal={openChatModal} />
                <div className="flex-[3]">
                  <div className="h-[73vh] bg-gray-300 overflow-y-scroll">
                    <div className="w-[95%] mx-auto py-4 flex flex-col gap-4 ">
                      {messages?.length > 0 ? (
                        messages.map((each) => (
                          <Message message={each} key={each.id} />
                        ))
                      ) : (
                        <div className="flex  justify-center h-screen items-center text-5xl text-muted">
                          <p className="text-center ">
                            Write a message to start a chat
                          </p>
                        </div>
                      )}
                      <div ref={scrollRef} />
                    </div>
                  </div>
                  <ChatFooter setFile={setFile} setOpenChatModal={setOpenChatModal} userId={userId} scrollRef={scrollRef} />
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
      {/* <Footer /> */}
    </>
  );
}

export default Messenger;
