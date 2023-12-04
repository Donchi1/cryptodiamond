
import React from "react";
import UserNav from "../components/UserNav";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import ChatFooter from "../../user/components/ChatFooter";
import Message from "../../components/Message";
import ChatHeader from "../../user/components/ChatHeader";
import useGetDocWithClause from "../../components/hooks/UseGetDocWithClause";
import { useRef } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { auth, db } from "../../database/firebaseDb";
import { useEffect } from "react";
import { collection, doc, onSnapshot, orderBy, query, setDoc } from "firebase/firestore";
import ChatModal from "../components/ChatModal";
import { useDocumentVisible } from "../../components/hooks/GetVisibility";

function Messenger() {
  const scrollRef = useRef(null)

  const [admin] = useGetDocWithClause({colls:"users",q:{path:"isAdmin", condition:"==", value: true}})

  const combinedId = admin[0]?.uid + auth.currentUser?.uid

  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [openChatModal, setOpenChatModal] = useState(false);
  const [file, setFile] = useState(null)
  const activeTab = useDocumentVisible()


  const currentUser =  useSelector((state) => state.auth.userData)

  useEffect(() => {
 
    const unsubscribe = onSnapshot(
      query(collection(db, `chats/${combinedId}/messages`), orderBy("date")),
      (qsnap) => {
        const colData = qsnap.docs.map((each) => ({ ...each.data(), id: each.id }))
        setMessages(
          colData
        );
        setLoading(false);
        scrollRef.current && scrollRef.current.scrollIntoView({behavior: "smooth"})
        qsnap.docChanges().forEach(async (change) => {
          
          if(change.type === "added"){
           const dataInfo =  change.doc.data()
            
             if(!dataInfo.isAdmin) return            
             
             
             if(dataInfo.read) return
          
             
             if(activeTab) return
             
 
             if(Notification.permission === "granted") {
                new Notification("New message", {
                  body: dataInfo.text|| "",
                  icon: dataInfo.senderPhoto
 
                }).addEventListener("click", () => {
                  localStorage.setItem("storedUID", dataInfo.senderId)
                  //localStorage.setItem("storedUID", "DVsFfCsQbNXuLArq2hwGrpQCZVL2")
                  const link = window.location.href
                  window.location.assign(link)
                })
 
               await setDoc(doc(db,`chats/${combinedId}/messages/${change.doc.id}`), {
                 ...dataInfo,
                 read: true
               })
             }
          }
          
       
         
         } )
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
      <UserNav />
      <div className="flex">
        <Sidebar />
        <div className="flex-[4] h-screen ">
          <section className="w-[95%] h-screen mx-auto bg-primary2 mt-4  ">
            <div className=" h-screen">
              <ChatHeader />
              <ChatModal scrollRef={scrollRef} file={file}  setOpenChatModal={setOpenChatModal} openChatModal={openChatModal} />
              <div className="h-[73vh] bg-gray-300 overflow-y-scroll">
                <div className="w-[95%] mx-auto py-4 flex flex-col gap-4 ">
                {messages?.length > 0 ? messages.map(each => (
                 <Message message={each} key={each.id} />

             )) : 
             <div className="flex  justify-center h-full items-center text-5xl text-muted">
                <p className="text-center ">Write a message to start a chat</p>
             </div>}
                   <div ref={scrollRef}/>
                </div>
              </div>
              <ChatFooter setFile={setFile} setOpenChatModal={setOpenChatModal}  scrollRef={scrollRef} />
              
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Messenger;
