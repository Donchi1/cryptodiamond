import React from "react";
import { db, auth } from "../../database/firebaseDb";
import { addDoc, collection, doc, serverTimestamp } from "firebase/firestore";
import Toast from "../../components/Alert";
import createNotification from "../../utils/createNotification";

function WithdrawalDropdown({
  withdrawalInfo,
  setWithdrawalInfo,
  withdrawalBank,
  setWithdrawalBank,
  method,
}) {
  const handleBankChange = (e) => {
    setWithdrawalBank({ ...withdrawalBank, [e.target.name]: e.target.value });
  };
  const handleChange = (e) => {
    setWithdrawalInfo({ ...withdrawalInfo, [e.target.name]: e.target.value });
  };

  const handleBankSubmit = async (e) => {
    e.preventDefault();
    const { open, loading, ...others } = withdrawalBank;
    const { amount, accountNumber, accountName, bankName } = withdrawalBank;
    if (!accountNumber || !accountName || !bankName || !amount)
      return Toast.error.fire({
        text: "Sorry!! Please fill all field",
        icon: "info",
      });
    setWithdrawalBank({ ...withdrawalBank, loading: true });
    try {
      const docRef = doc(db, "transactions", auth.currentUser.uid);
      await addDoc(collection(db, docRef, "transactionDatas"), {
        ...others,
        date: serverTimestamp(),
        uid: auth.currentUser.uid,
        type: "withdrawal",
      });
      const noteData = {
        title: "Withdrawal Success",
        message:
          "Your withdrawal has been placed successfully.Info will get back to you soon",
        status: "success",
      };
      createNotification(noteData);
      setWithdrawalBank({
        ...withdrawalBank,
        loading: false,
        accountNumber: "",
        accountName: "",
        bankName: "",
        amount: "",
      });
      return Toast.success.fire({
        icon: "success",
        text: "Congrats!! Your withdrawal has been placed successfully. Wait for confirmation or contact our suport team.",
      });
    } catch (error) {
      setWithdrawalBank({
        ...withdrawalBank,
        accountNumber: "",
        accountName: "",
        bankName: "",
        amount: "",

        loading: false,
      });
      return Toast.error.fire({
        icon: "error",
        text: error,
      });
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { open, loading, ...others } = withdrawalInfo;
    const { walletAddress, name, email, amount } = withdrawalInfo;
    if (!name || !email || !amount || !walletAddress)
      return Toast.error.fire({
        text: "Sorry!! Please fill all field",
        icon: "info",
      });
    setWithdrawalInfo({ ...withdrawalInfo, loading: true });
    try {
      const docRef = doc(db, "transactions", auth.currentUser.uid);
      await addDoc(collection(db, docRef, "transactionDatas"), {
        ...others,
        date: serverTimestamp(),
        uid: auth.currentUser.uid,
        type: "withdrawal",
      });
      const noteData = {
        title: "Withdrawal Success",
        message:
          "Your withdrawal has been placed successfully.Info will get back to you soon",
        status: "success",
      };
      createNotification(noteData);
      setWithdrawalInfo({
        ...withdrawalInfo,
        loading: false,
        walletAddress: "",
        name: "",
        email: "",
        amount: "",
      });
      return Toast.success.fire({
        icon: "success",
        text: "Congrats!! Your withdrawal has been placed successfully. Wait for confirmation or contact our suport team.",
      });
    } catch (error) {
      setWithdrawalInfo({
        ...withdrawalInfo,
        loading: false,
        walletAddress: "",
        name: "",
        email: "",
        amount: "",
      });
      return Toast.error.fire({
        icon: "error",
        text: error,
      });
    }
  };

  return (
    <div
      className={`${
        withdrawalInfo?.open || withdrawalBank?.open ? "h-auto mt-6 " : "h-0"
      } pb-4 transition-all ease-linear duration-500  `}
    >
      <div
        className={`${
          withdrawalInfo?.open || withdrawalBank?.open ? "block" : "hidden"
        } bg-primary2 rounded-lg`}
      >
        {method === "bank" ? (
          <form onSubmit={handleBankSubmit}>
            <h4 className="font-bold text-xl py-4 text-white">
              Input Your withdrawal Information
            </h4>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <input
                  onChange={handleBankChange}
                  placeholder="Account Name"
                  name="accountName"
                  className="text-gray-100 mt-2 outline-none  h-[60px] w-full bg-transparent pl-2 rounded-lg border border-gray-300"
                  value={withdrawalBank?.accountName}
                  type="text"
                />
              </div>
              <div>
                <input
                  className="text-gray-100 mt-2 outline-none  h-[60px] w-full bg-transparent pl-2 rounded-lg border border-gray-300"
                  value={withdrawalBank?.bankName}
                  type="text"
                  placeholder="BankName"
                  name="bankName"
                  onChange={handleBankChange}
                />
              </div>

              <div>
                <input
                  className="text-gray-100 mt-2 outline-none  h-[60px] w-full bg-transparent pl-2 rounded-lg border border-gray-300"
                  value={withdrawalBank?.accountNumber}
                  type="number"
                  placeholder="Account Number"
                  name="accountNumber"
                  onChange={handleBankChange}
                />
              </div>
              <div>
                <input
                  className="text-gray-100 mt-2 outline-none  h-[60px] w-full bg-transparent pl-2 rounded-lg border border-gray-300"
                  value={withdrawalBank?.amount}
                  type="text"
                  placeholder="Amount"
                  name="amount"
                  onChange={handleBankChange}
                />
              </div>
            </div>
            <div className="mt-4">
              <button type="submit" className="btn-secondary text-white">
                Submit
              </button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleSubmit}>
            <h4 className="font-bold text-xl py-4 text-white">
              Input Your withdrawal Information
            </h4>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <input
                  onChange={handleChange}
                  placeholder="Name"
                  name="name"
                  className="text-gray-100 mt-2 outline-none  h-[60px] w-full bg-transparent pl-2 rounded-lg border border-gray-300"
                  value={withdrawalInfo?.name}
                  type="text"
                />
              </div>
              <div>
                <input
                  className="text-gray-100 mt-2 outline-none  h-[60px] w-full bg-transparent pl-2 rounded-lg border border-gray-300"
                  value={withdrawalInfo?.walletAddress}
                  type="text"
                  placeholder="Wallet Address"
                  name="walletAddress"
                  onChange={handleChange}
                />
              </div>

              <div>
                <input
                  className="text-gray-100 mt-2 outline-none  h-[60px] w-full bg-transparent pl-2 rounded-lg border border-gray-300"
                  value={withdrawalInfo?.email}
                  type="email"
                  placeholder="Email"
                  name="email"
                  onChange={handleChange}
                />
              </div>
              <div>
                <input
                  className="text-gray-100 mt-2 outline-none  h-[60px] w-full bg-transparent pl-2 rounded-lg border border-gray-300"
                  value={withdrawalInfo?.amount}
                  type="text"
                  placeholder="Amount"
                  name="amount"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="mt-4">
              <button type="submit" className="btn-secondary text-white">
                Submit
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default WithdrawalDropdown;
