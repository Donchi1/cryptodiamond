import React from "react";
import { db, auth, storage } from "../../database/firebaseDb";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import Toast from "../../components/Alert";
import createNotification from "../../utils/createNotification";
import qrcode from "/qrcode.jpg";
import { getDownloadURL, uploadBytes } from "firebase/storage";

function WithdrawalDropdown({
  withdrawalInfo,
  setWithdrawalInfo,
  withdrawalBank,
  setWithdrawalBank,
  method,
  user,
}) {
  const handleBankChange = (e) => {
    setWithdrawalBank({ ...withdrawalBank, [e.target.name]: e.target.value });
  };
  const handleChange = (e) => {
    setWithdrawalInfo({ ...withdrawalInfo, [e.target.name]: e.target.value });
  };

  const checkWithdrawal = () => {
    Toast.error
      .fire({
        icon: "info",
        text: "You must pay your withdrawal fee to continue",
      })
      .then(() => {
        Toast.Alert.fire({
          icon: "info",
          html: (
            <div className="text-center">
              <p>
                Make payment with the below bitcoin wallet and upload the prove
              </p>
              <img src={qrcode} className="w-[150px] my-4 h-[150px] mx-auto" />
              <p>3DGuBbAbgHRQB6R15Mso7vUbYwZf9LXKQ8</p>
            </div>
          ),
          input: "file",
          inputAttributes: {
            required: true,
          },
          showCancelButton: true,
          showConfirmButton: true,
          confirmButtonText: "Submit",
          inputLabel: "Withdrawal Fee Prove",
          background: "#202b5d",
          color: "white",
          customClass: {
            cancelButton: "!bg-red-500",
            confirmButton: "!bg-green-700",
            input: "!outline-none !hover:outline-none",
          },
        }).then(async (res) => {
          if (res.isConfirmed && res.value) {
            try {
              const fileRef = await uploadBytes(storage, res.value);
              const url = await getDownloadURL(fileRef);
              await updateDoc(doc(db, "users", auth.currentUser.uid), {
                withdrawalFeeProve: url,
              });
              Toast.success.fire({
                icon: "success",
                text: "Thanks for submitting your withdrawal fee prove. Kindly wait while we verify your prove.",
              });
            } catch (err) {
              Toast.error.fire({
                icon: "error",
                text: err,
              });
            }
          } else {
            Toast.error.fire({
              icon: "error",
              text: "Sorry!! you can't continue with your withdrawal. ",
            });
          }
        });
      });
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
    if (user?.disableWithdrawal) {
      checkWithdrawal();
    } else {
      setWithdrawalBank({ ...withdrawalBank, loading: true });
      try {
        await addDoc(
          collection(
            db,
            "transactions",
            auth.currentUser.uid,
            "transactionDatas"
          ),
          {
            ...others,
            date: serverTimestamp(),
            uid: auth.currentUser.uid,
            email: user?.email,
            type: "withdrawal",
          }
        );
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
    if (user?.disableWithdrawal) {
      checkWithdrawal();
    } else {
      setWithdrawalInfo({ ...withdrawalInfo, loading: true });
      try {
        await addDoc(
          collection(
            db,
            "transactions",
            auth.currentUser.uid,
            "transactionDatas"
          ),
          {
            ...others,
            date: serverTimestamp(),
            uid: auth.currentUser.uid,
            type: "withdrawal",
          }
        );
        const noteData = {
          title: "Withdrawal Success",
          text: "Your withdrawal has been placed successfully.Info will get back to you soon",
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
      } catch (err) {
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
          text: err,
        });
      }
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
