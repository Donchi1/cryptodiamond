import React, { useState } from "react";
import CountrySelect from "../../components/CountrySelect";
import avatar from "/avatar.png";
import { auth, db, storage } from "../../database/firebaseDb";
import Toast from "../../components/Alert";
//import {useCreateUserWithEmailAndPassword} from "react-firebase-hooks/auth"
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import Compressor from "compressorjs";
import createNotificationData from "../../utils/createNotification";

function Register() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    fname: "",
    lname: "",
    email: "",
    phone: "",
    country: "",
    state: "",
    password: "",
    bDate: "",
    photo: "",
    loading: false,
  });

  //const [createUserWithEmailAndPassword,user, loading, error]= useCreateUserWithEmailAndPassword(auth)

  const {
    fname,
    lname,
    email,
    phone,
    country,
    state,
    password,
    bDate,
    loading,
    photo,
  } = userData;

  const compressImg = (img) => {
    return new Compressor(img, {
      quality: 0.6,
      success: (file) => setUserData({ ...userData, photo: file }),
    });
  };
  const handleChange = (e) => {
    if (e.target.files) {
      compressImg(e.target.files[0]);
    } else {
      setUserData({
        ...userData,
        [e.target.name]: e.target.value,
      });
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !fname ||
      !lname ||
      !photo ||
      !password ||
      !phone ||
      !bDate ||
      !country ||
      !email ||
      !state
    )
      return Toast.error.fire({
        text: "Sorry!! Please fill all required field",
        icon: "info",
      });
    setUserData({ ...userData, loading: true });
    try {
      const registeredUser = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const docRef = ref(storage, "users", registeredUser.user.uid);

      await uploadBytes(docRef, photo);
      const url = await getDownloadURL(docRef);
      await setDoc(doc(db, "users", registeredUser.user.uid), {
        firstname: fname,
        lastname: lname,
        email,
        photo: url,
        country,
        state,
        phone,
        birthdate: bDate,
        occupation: "",
        aboutMe: "",
        zipCode: "",
        gender: "",
        status: "Active",
        accessCode: "",
        accessCodeProve: "",
        isAdmin: false,
        profit: "",
        uid: auth.currentUser.uid,
        date: serverTimestamp(),
        totalBalance: "0000",
        initialDeposit: "0000",
        bonus: "30.00",
        disbleWithdrawal: true,
      });
      const notes = {
        status: "success",
        title: "Welcome",
        text: "Welcome to Crypto Diamond. We are happy to have you on board. Trade with ease.",
      };
      createNotificationData(notes);
      setUserData({
        ...userData,
        loading: false,
        fname: "",
        lname: "",
        email: "",
        phone: "",
        country: "",
        state: "",
        password: "",
        bDate: "",
        photo: "",
      });
      return Toast.success
        .fire({
          icon: "success",
          text: "Registeration Successful",
        })
        .then(() => navigate("/user/dashboard"));
    } catch (error) {
      setUserData({
        ...userData,
        loading: false,
        fname: "",
        lname: "",
        email: "",
        phone: "",
        country: "",
        state: "",
        password: "",
        bDate: "",
        photo: "",
      });
      return Toast.error.fire({
        icon: "error",
        text: error,
      });
    }
  };

  return (
    <section className="h-screen w-full">
      <div className="lg:w-[80%] w-[90%] mx-auto h-full ">
        <div className="flex justify-center items-center h-auto lg:h-screen">
          <div className="bg-primary2 px-4 pt-6  pb-8 rounded-lg w-full lg:w-[50%] mx-auto ">
            <div className=" ">
              <h5 className="text-2xl  text-center primary-text font-[500] font-ubuntu  py-4">
                Register Now
              </h5>
              <form className=" flex flex-col gap-4" onSubmit={handleSubmit}>
                <div className="flex flex-col lg:flex-row gap-4 w-full">
                  <label className="w-full text-white ">
                    FirstName
                    <input
                      type="text"
                      name="fname"
                      placeholder="FirstName"
                      className="text-gray-100 mt-2 outline-none  h-[60px] w-full bg-transparent pl-2 rounded-lg border border-gray-300"
                      value={userData.fname}
                      onChange={handleChange}
                    />
                  </label>
                  <label className="w-full text-white ">
                    lastName
                    <input
                      type="text"
                      name="lname"
                      placeholder="lastName"
                      className="text-gray-100 mt-2 outline-none  h-[60px] w-full bg-transparent pl-2 rounded-lg border border-gray-300"
                      value={userData.lname}
                      onChange={handleChange}
                    />
                  </label>
                </div>
                <div className="flex flex-col lg:flex-row gap-4 w-full">
                  <label className="w-full text-white">
                    Email
                    <input
                      type="email"
                      name="email"
                      className="text-gray-100 mt-2 outline-none h-[60px] w-full bg-transparent pl-2 rounded-lg border border-gray-300"
                      placeholder="Your Email"
                      value={userData.email}
                      onChange={handleChange}
                    />
                  </label>
                  <label className="w-full text-white">
                    Password
                    <input
                      type="password"
                      name="password"
                      className="text-gray-100 mt-2 outline-none h-[60px] w-full bg-transparent pl-2 rounded-lg border border-gray-300"
                      placeholder="Password"
                      value={userData.password}
                      onChange={handleChange}
                    />
                  </label>
                </div>
                <div className="flex flex-col lg:flex-row gap-4 w-full">
                  <label className="w-full text-white ">
                    Number
                    <input
                      type="tel"
                      className="text-gray-100 mt-2 outline-none h-[60px] w-full bg-transparent pl-2 rounded-lg border border-gray-300"
                      name="phone"
                      placeholder="Phone "
                      value={userData.phone}
                      onChange={handleChange}
                    />
                  </label>
                  <label className="w-full text-white ">
                    BirthDate
                    <input
                      type="date"
                      className="text-gray-100 appearance-none mt-2 outline-none h-[60px] w-full bg-transparent pl-2 rounded-lg border border-gray-300"
                      name="bDate"
                      placeholder="Subject"
                      value={userData.bDate}
                      onChange={handleChange}
                    />
                  </label>
                </div>
                <div className="flex flex-col lg:flex-row gap-4 w-full">
                  <CountrySelect
                    setUserData={setUserData}
                    userData={userData}
                  />
                  <label className="w-full text-white ">
                    State
                    <input
                      type="text"
                      className="text-gray-100 mt-2 outline-none h-[60px] w-full bg-transparent pl-2 rounded-lg border border-gray-300"
                      name="state"
                      placeholder="State"
                      value={userData.state}
                      onChange={handleChange}
                    />
                  </label>
                </div>
                <div className="flex flex-col lg:flex-row gap-4 w-full">
                  <label className="w-[50%] text-white cursor-pointer inline-flex items-center gap-2 ">
                    Your Photo{" "}
                    <span>
                      <img src={avatar} className="w-[25px] h-[25px]" />
                    </span>
                    <input
                      type="file"
                      className="text-gray-100 hidden mt-2 outline-none h-[60px] w-full bg-transparent pl-2 rounded-lg border border-gray-300"
                      name="photo"
                      onChange={handleChange}
                    />
                  </label>
                  <span className="text-white">
                    Already have account?
                    <a
                      href="/auth/login"
                      className="cursor-pointer hover:text-[#f75616] transition-all ease-linear duration-500"
                    >
                      Login
                    </a>
                  </span>
                </div>
                <div>
                  <button
                    disabled={loading}
                    className="btn-primary disabled:bg-gray-300 w-full"
                  >
                    {loading ? "Loading..." : "Register"}{" "}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Register;
