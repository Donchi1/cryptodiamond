import React, { useState } from "react";
import { auth, db } from "../../database/firebaseDb";
import Toast from "../../components/Alert";
import { updateDoc, doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

function Verify() {
  const [userData, setUserData] = useState({
    verificationCode: "",

    loading: false,
  });
  const navigate = useNavigate();
  const { verificationCode, loading } = userData;
  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!verificationCode)
      return Toast.error.fire({
        text: "Sorry!! Please fill all field",
        icon: "info",
      });
    setUserData({ ...userData, loading: true });
    try {
      const docRef = doc(db, "users", auth.currentUser.uid);
      const dbCode = await getDoc(docRef);
      console.log(dbCode);
      if (dbCode.data().verificationCode !== verificationCode) {
        setUserData({ ...userData, loading: false, verificationCode: "" });
        return Toast.error.fire({
          text: "Wrong Verification Code. Please contact our support team for one.",
          icon: "error",
        });
      }
      await updateDoc(docRef, { verified: true });
      setUserData({ ...userData, loading: false, verificationCode: "" });
      return Toast.success
        .fire({
          icon: "success",
          text: "Account successfully registered and verified",
        })
        .then(() => navigate("/user/dashboard"));
    } catch (error) {
      setUserData({ ...userData, loading: false, verificationCode: "" });
      return Toast.error.fire({
        icon: "error",
        text: error,
      });
    }
  };
  return (
    <section className="h-screen w-full">
      <div className="lg:w-[80%] w-[90%] mx-auto">
        <div className="flex justify-center items-center h-screen">
          <div className="bg-primary2 px-4 pt-6  pb-8 rounded-lg w-full lg:w-[50%] mx-auto ">
            <div className=" ">
              <h5 className="text-3xl  text-center primary-text font-[500] font-ubuntu  py-8">
                Verify Your Account To Proceed.
              </h5>
              <form className=" flex flex-col gap-4" onSubmit={handleSubmit}>
                <label className="w-full text-white">
                  Code
                  <input
                    type="number"
                    name="verificationCode"
                    className="text-gray-100 mt-2 outline-none h-[50px] w-full bg-transparent pl-2 rounded-lg border border-gray-300"
                    placeholder="Verification Code"
                    value={userData.email}
                    onChange={handleChange}
                  />
                </label>

                <div>
                  <button
                    disabled={loading}
                    className="btn-primary disabled:bg-gray-300 w-full"
                  >
                    {loading ? "Loading..." : "Submit"}
                  </button>
                </div>
              </form>
              {/* <p className="text-center mt-6 text-white">
                Don't have account?{" "}
                <a
                  className="hover:text-[#f75616] transition-all ease-linear duration-500"
                  href="/auth/register"
                >
                  Sign Up
                </a>
              </p> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Verify;
