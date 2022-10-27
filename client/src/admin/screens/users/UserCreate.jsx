import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
  serverTimestamp,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import React, { useState } from "react";
import createNotificationData from "../../../utils/createNotification";
import { auth, db, storage } from "../../../database/firebaseDb";
import AdminNav from "../../components/AdminNav";
import Footer from "../../components/Footer";
import Pagination from "../../components/Pagination";
import Sidebar from "../../components/Sidebar";
import Toast from "../../../components/Alert";

export default function UserEdit() {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    status: "",
    img: "",
    transactions: "",
    gender: "",
    occupation: "",
    address: "",
    password: "",
    password1: "",
    isSubmitting: false,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormData({ ...formData, isSubmitting: true });
    const { email, password } = formData;
    try {
      const registeredUser = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const docRef = ref(storage, `users/${registeredUser.user.uid}`);

      await uploadBytes(docRef, formData.img);
      const url = await getDownloadURL(docRef);
      await setDoc(doc(db, "users", registeredUser.user.uid), {
        firstname: formData.firstname,
        lastname: formData.lastname,
        email: formData.email,
        photo: url,
        country: "",
        state: "",
        phone: formData.phone,
        birthdate: bDate,
        occupation: formData.occupation,
        aboutMe: "",
        zipCode: "",
        gender: formData.gender,
        status: "Active",
        accessCode: "",
        accessCodeProve: "",
        isAdmin: false,
        profit: "",
        disbleWithdrawalFeeProve: "",
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
      setFormData({
        ...formData,
        firstname: "",
        lastname: "",
        email: "",
        phone: "",
        status: "",
        img: "",
        transactions: "",
        gender: "",
        occupation: "",
        address: "",
        password: "",
        password1: "",
        isSubmitting: false,
      });
      return Toast.success
        .fire({
          icon: "success",
          text: "Registeration Successful",
        })
        .then(async () => {
          const adm = await getDocs(
            query(collection(db, "users"), where("isAdmin", "==", true))
          );
          const admin = adm.docs.map((each) => each.data());
          const password = JSON.parse(localStorage.getItem("pass"));
          signInWithEmailAndPassword(auth, admin[0].email, password);
        });
    } catch (error) {
      setFormData({
        ...formData,
        firstname: "",
        lastname: "",
        email: "",
        phone: "",
        status: "",
        img: "",
        transactions: "",
        gender: "",
        occupation: "",
        address: "",
        password: "",
        password1: "",
        isSubmitting: false,
      });
      return Toast.error.fire({
        icon: "error",
        text: error,
      });
    }
  };

  return (
    <>
      <AdminNav />
      <div className="flex">
        <Sidebar />
        <div className="flex-[4] h-screen ">
          <section className="w-[90%]  mx-auto ">
            <Pagination title={"Users"} />

            <div className="mx-4  mt-10 bg-primary2 rounded-lg ">
              <div className="flex justify-around gap-4 lg:flex-row flex-col ">
                <div>
                  <div className=" mt-4 p-4 flex-[2] shadow-lg flex  ">
                    <div className="flex-[2]">
                      <form onSubmit={handleSubmit}>
                        <div className="w-full flex flex-col lg:flex-row items-center space-x-0 lg:space-x-4 ">
                          <div className="w-full ">
                            <label
                              htmlFor="fname"
                              className="py-3  text-gray-500"
                            >
                              Firstname
                            </label>
                            <input
                              type="text"
                              name="firstname"
                              id="fname"
                              required
                              value={formData?.firstname}
                              onChange={handleChange}
                              className="py-3 px-4 outline-none focus:border-blue-400 focus:outline-none duration-500 bg-transparent rounded border-2  w-full transition-all ease-linear border-gray-400 hover:border-blue-400"
                            />
                          </div>
                          <div className="w-full ">
                            <label
                              htmlFor="lname"
                              className="py-3 text-lg text-gray-500 "
                            >
                              Lastname
                            </label>
                            <input
                              type="text"
                              name="lastname"
                              required
                              id="lname"
                              value={formData?.lastname}
                              onChange={handleChange}
                              className="py-3 px-4 outline-none focus:border-blue-400 focus:outline-none bg-transparent rounded border-2 transition-all ease-linear border-gray-400 hover:border-blue-400 w-full "
                            />
                          </div>
                        </div>
                        <div className="w-full flex flex-col lg:flex-row items-center space-x-0 lg:space-x-4">
                          <div className="w-full ">
                            <label
                              htmlFor="phone"
                              className="py-3 text-lg text-gray-500"
                            >
                              Number
                            </label>
                            <input
                              type="tel"
                              name="phone"
                              id="phone"
                              required
                              value={formData?.phone}
                              onChange={handleChange}
                              className="py-3 px-4 outline-none focus:border-blue-400 focus:outline-none rounded duration-500 bg-transparent border-2 transition-all ease-linear border-gray-400 hover:border-blue-400 w-full "
                            />
                          </div>
                          <div className="w-full ">
                            <label
                              htmlFor="email"
                              className="py-2 text-lg text-gray-500"
                            >
                              Email
                            </label>
                            <input
                              type="email"
                              name="email"
                              id="email"
                              required
                              value={formData?.email}
                              onChange={handleChange}
                              className="py-3 duration-500 px-4 outline-none focus:border-blue-400 focus:outline-none rounded bg-transparent border-2 transition-all ease-linear border-gray-400 hover:border-blue-400 w-full"
                            />
                          </div>
                        </div>
                        <div className="w-full flex flex-col lg:flex-row items-center space-x-0 lg:space-x-4 ">
                          <div className="w-full ">
                            <label
                              htmlFor="address"
                              className="py-3 text-lg text-gray-500"
                            >
                              Address
                            </label>
                            <input
                              type="text"
                              name="address"
                              id="address"
                              required
                              value={formData?.address}
                              onChange={handleChange}
                              className="py-3 px-4 outline-none focus:border-blue-400 focus:outline-none rounded duration-500 bg-transparent border-2 transition-all ease-linear border-gray-400 hover:border-blue-400 w-full "
                            />
                          </div>
                          <div className="w-full ">
                            <label
                              htmlFor="occupation"
                              className="py-2 text-lg text-gray-500"
                            >
                              Occupation
                            </label>
                            <input
                              type="text"
                              name="occupation"
                              id="ocupation"
                              required
                              value={formData?.occupation}
                              onChange={handleChange}
                              className="py-3 duration-500 px-4 outline-none focus:border-blue-400 focus:outline-none rounded bg-transparent border-2 transition-all ease-linear border-gray-400 hover:border-blue-400 w-full"
                            />
                          </div>
                        </div>
                        <div className="w-full ">
                          <label
                            htmlFor="img"
                            className="py-2 text-lg text-gray-500"
                          >
                            Picture
                          </label>
                          <input
                            type="file"
                            name="img"
                            id="img"
                            required
                            value={formData?.img}
                            onChange={handleChange}
                            className="py-3 duration-500 px-4 outline-none focus:border-blue-400 focus:outline-none rounded bg-transparent border-2 transition-all ease-linear border-gray-400 hover:border-blue-400 w-full"
                          />
                        </div>
                        <label className="py-2 text-lg text-gray-500">
                          Gender
                        </label>
                        <div className="w-full flex items-center gap-2 ">
                          <label className="dark:text-gray-300">Male</label>
                          <input
                            type="radio"
                            name="male"
                            id="male"
                            value="Male"
                            checked={formData.gender === "Male"}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                gender: e.target.value,
                              })
                            }
                            className="py-3  duration-500 px-4 outline-none focus:border-blue-400 focus:outline-none rounded bg-transparent border-2 transition-all ease-linear border-gray-400 hover:border-blue-400 "
                          />
                          <label className="dark:text-gray-300">Female</label>
                          <input
                            type="radio"
                            name="female"
                            id="female"
                            value="Female"
                            checked={formData.gender === "Female"}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                gender: e.target.value,
                              })
                            }
                            className="py-3 duration-500 px-4 outline-none focus:border-blue-400 focus:outline-none rounded bg-transparent border-2 transition-all ease-linear border-gray-400 hover:border-blue-400 "
                          />
                          <label className="dark:text-gray-300">Others</label>
                          <input
                            type="radio"
                            name="others"
                            id="others"
                            value="Others"
                            checked={formData.gender === "Others"}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                gender: e.target.value,
                              })
                            }
                            className="py-3 duration-500 px-4 outline-none focus:border-blue-400 focus:outline-none rounded bg-transparent border-2 transition-all ease-linear border-gray-400 hover:border-blue-400 "
                          />
                        </div>

                        <div className="w-full flex flex-col lg:flex-row items-center space-x-0 lg:space-x-4 ">
                          <div className="w-full ">
                            <label
                              htmlFor="password"
                              className="py-3 text-lg text-gray-500"
                            >
                              New Password
                            </label>
                            <input
                              type="password"
                              name="password"
                              id="password"
                              required
                              value={formData.password}
                              onChange={handleChange}
                              className="py-3 px-4 outline-none focus:border-blue-400 focus:outline-none rounded duration-500 bg-transparent border-2 transition-all ease-linear border-gray-400 hover:border-blue-400 w-full "
                            />
                          </div>
                          <div className="w-full ">
                            <label
                              htmlFor="password1"
                              className="py-2 text-lg text-gray-500"
                            >
                              Repeat-Password
                            </label>
                            <input
                              type="password"
                              name="password1"
                              id="password1"
                              required
                              value={formData.password1}
                              onChange={handleChange}
                              className="py-3
                         duration-500 px-4 outline-none focus:border-blue-400 focus:outline-none rounded bg-transparent border-2 transition-all ease-linear border-gray-400 hover:border-blue-400 w-full"
                            />
                          </div>
                        </div>
                        <div className="mt-4 w-full lg:w-[35%]">
                          <button
                            type="submit"
                            disabled={formData.isSubmitting}
                            className="btn-primary py-3 w-full rounded-lg text-white"
                          >
                            Submit
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <Footer />
        </div>
      </div>
    </>
  );
}
