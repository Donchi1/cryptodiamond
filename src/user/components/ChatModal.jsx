import React from "react";
import { FaRegPaperPlane, FaX } from "react-icons/fa6";
import { auth, db, storage } from "../../database/firebaseDb";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useSelector } from "react-redux";
import useGetDocWithClause from "../../components/hooks/UseGetDocWithClause";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { compressImg } from "../../utils/comprossor";


function ChatModal({ openChatModal, setOpenChatModal, file, scrollRef }) {
  
  const currentUser = useSelector((state) => state.auth.userData);
  const [admin] = useGetDocWithClause({
    colls: "users",
    q: { path: "isAdmin", condition: "==", value: true },
  });

  const combinedId = `${admin[0]?.uid}${auth.currentUser?.uid}`;

  

  const handleSendPhoto = async () => {
    if (!file) return;
    const uuid = Math.random() + Date.now();
    compressImg(file, async(compImg) => {
      
      try {
        const fileRef = ref(storage, `messages/${uuid.toString()}`);
        await uploadBytes(fileRef, compImg);
        const url = await getDownloadURL(fileRef);
        await addDoc(collection(db, `chats/${combinedId}/messages`), {
          senderId: auth.currentUser?.uid,
          isAdmin: false,
          text: "",
          date: serverTimestamp(),
          senderPhoto: currentUser?.photo,
          img: url,
        });
        setOpenChatModal(false);
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
      } catch (err) {
        console.log(err);
      }
    })
  };

  return (
    <div
      className={`${
        openChatModal ? "translate-y-0" : "translate-y-[-115%]"
      } w-full h-screen absolute z-[100] left-0 right-0 bottom-0 top-0 bg-black/50`}
    >
      <div className="flex justify-center items-center lg:h-[70vh] h-[80%] mt-4 lg:mt-0 ">
        <div className="bg-gray-600 w-[80%] lg:w-[30%] h-[80%]">
          <img
            className="max-w-[100%] mx-auto  object-cover "
            src={file ? URL.createObjectURL(file) : "/avatar.png"}
            alt="ceo"
          />
          <div className=" flex justify-between">
            <button
              className="bg_gold p-2 rounded-full "
              onClick={() => setOpenChatModal(false)}
            >
              <FaX size={20} className="text-red-500" />
            </button>
            <button
              className="bg_gold p-2 rounded-full "
              onClick={handleSendPhoto}
            >
              <FaRegPaperPlane size={20} className="text-[#000]/70" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatModal;
