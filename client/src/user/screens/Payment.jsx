import React, { useState } from "react";
import Pagination from "../components/Pagination";
import Sidebar from "../components/Sidebar";
import UserNav from "../components/UserNav";
import Footer from "../components/Footer";
import img1 from "/qrcode.jpg";
import Compressor from "compressorjs";
import Toast from "../../components/Alert";
import { storage, auth, db } from "../../database/firebaseDb";
import { getDownloadURL, uploadBytes, ref } from "firebase/storage";
import { addDoc, collection, doc, serverTimestamp } from "firebase/firestore";
import useGetDocument from "../../components/hooks/UseDocument";

function Payment() {
  const [user, loading, error] = useGetDocument("users", auth.currentUser.uid, {
    snap: true,
  });
  const [paymentData, setPaymentData] = useState({
    IsSubmitting: false,
    amount: "",
    method: "",
    prove: "",
  });

  const compressPhoto = (img) => {
    new Compressor(img, {
      quality: 0.8,
      success: (file) => setPaymentData({ ...paymentData, prove: file }),
    });
  };

  const { IsSubmitting, amount, method, prove } = paymentData;

  const handleProve = async (e) => {
    e.preventDefault();
    if (!prove || !amount || !method)
      return Toast.error.fire({
        text: "All fields are required",
        icon: "info",
      });
    setPaymentData({ ...paymentData, IsSubmitting: true });
    const { uid, email } = auth.currentUser;
    const docRef = ref(storage, "paymentProves", uid);
    try {
      await uploadBytes(docRef, prove);
      const url = await getDownloadURL(docRef);
      await addDoc(collection(db, "transactions", uid, "transactionDatas"), {
        uid,
        email,
        name: user.firstname,
        date: serverTimestamp(),
        amount,
        method,
        prove: url,
        type: "payment",
        status: "pending",
      });
      setPaymentData({ ...paymentData, IsSubmitting: false, amount: "" });
      Toast.success.fire({
        icon: "success",
        text: "Your payment prove has sent successfully.Wait while we review your payment.",
      });
    } catch (error) {}
    setPaymentData({ ...paymentData, IsSubmitting: false, amount: "" });
    Toast.success.fire({
      icon: "error",
      text: error,
    });
  };

  return (
    <>
      <UserNav />
      <div className="flex">
        <Sidebar />
        <div className="flex-[4]">
          <section className="w-[90%] mx-auto">
            <Pagination title="Payment" />

            <div className="  flex justify-center">
              <div className="w-full  bg-primary2 shadow rounded-lg flex justify-center flex-1  flex-wrap">
                <div className="lg:w-1/2 xl:w-5/12 sm:w-full p-6 sm:p-12 order-2">
                  <div className="mt-12 flex flex-col items-center">
                    <h1 className="text-2xl  font-bold uppercase text-center text-white">
                      Payment Methods
                    </h1>
                    <h4 className="text-sm mt-4 capitalized text-center text-white">
                      Invest in cryptoDiamond and never regret <br />
                      choose your investment method
                    </h4>

                    <form
                      className="w-full flex-1 mt-4 "
                      onSubmit={handleProve}
                    >
                      <div className="form-group col-md-12 ">
                        <input
                          className="text-gray-100 mt-2 outline-none  h-[60px] w-full bg-transparent pl-2 rounded-lg border border-gray-300"
                          type="number"
                          placeholder="Enter Amount"
                          value={paymentData.amount}
                          onChange={(e) => {
                            setPaymentData({
                              ...paymentData,
                              amount: e.target.value,
                            });
                          }}
                        />
                      </div>
                      <div className="mt-4 ">
                        <select
                          className="text-gray-100 mt-2 outline-none  h-[60px] w-full bg-transparent pl-2 rounded-lg border border-gray-300"
                          type="text"
                          placeholder="Payment Method"
                          value={paymentData.method}
                          onChange={(e) => {
                            setPaymentData({
                              ...paymentData,
                              method: e.target.value,
                            });
                          }}
                        >
                          <option className="bg-primary1 text-gray-500">
                            Choose Method
                          </option>
                          <option className="bg-primary1 " value="Bitcoin">
                            Bitcoin
                          </option>
                          <option className="bg-primary1 " value="Bank">
                            Bank
                          </option>
                          <option className="bg-primary1 " value="Ethereum">
                            Ethereum
                          </option>
                          <option className="bg-primary1 " value="Litecoin">
                            Litecoin
                          </option>
                          <option className="bg-primary1 " value="Paypal">
                            Paypal
                          </option>
                        </select>
                      </div>

                      <div className="">
                        <h5 className="text-white uppercase mt-4 ">
                          Upload prove
                        </h5>
                        <input
                          type="file"
                          className="text-gray-100 mt-2 outline-none py-[15px]  w-full bg-transparent pl-2 rounded-lg border border-gray-300"
                          label="Upload Prove"
                          onChange={(e) => {
                            const newFile = e.target.files[0];
                            compressPhoto(newFile);
                          }}
                        />
                      </div>
                      <div className="mt-8 text-center ">
                        <button
                          type="submit"
                          disabled={IsSubmitting}
                          className="btn-primary w-full"
                        >
                          {IsSubmitting ? "Submitting..." : "Submit"}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="flex-1 bg-gray-400 rounded-lg text-center ">
                  <div className="lg:m-12 xl:m-16 lg:w-80 w-60 mx-auto  ">
                    <div>
                      <div>
                        <h4 className="text-center text-lg mb-2 capitalize">
                          Make payment with the below bitcoin wallet and upload
                          prove.
                        </h4>
                      </div>
                      <img
                        src={img1}
                        alt="code"
                        className="w-[200px] lg:w-auto mx-auto"
                      />
                      <h4 className="mt-8 primary-text text-xl text-center break-words">
                        3DGuBbAbgHRQB6R15Mso7vUbYwZf9LXKQ8
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Payment;
