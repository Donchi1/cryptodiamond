import React, { useState, useEffect } from "react";
import avater from "/avatar.png";
import * as Icons from "react-icons/bs";
import Pagination from "../../components/Pagination";
import AdminNav from "../../components/AdminNav";
import Sidebar from "../../components/Sidebar";
import Footer from "../../components/Footer";
import { db, storage, auth } from "../../../database/firebaseDb";
import {
  updateDoc,
  doc,
  collection,
  where,
  getDocs,
  query,
  Timestamp,
} from "firebase/firestore";
import TimeAgo from "react-timeago";
import { updatePassword } from "firebase/auth";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Toast from "../../../components/Alert";

import { Link, useParams } from "react-router-dom";

export default function UserEdit() {
  const { id } = useParams();

  const [user, setUser] = useState([]);
  const [formData, setFormData] = useState({});
  useEffect(() => {
    const getUser = async () => {
      const use = await getDocs(
        query(collection(db, "users"), where("uid", "==", id))
      );
      const info = use.docs.map((each) => each.data());
      setUser(info[0]);
      setFormData(info[0]);
    };
    getUser();
  }, []);

  const [passwordData, setPasswordData] = useState({
    password: "",
    password1: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleChangePassword = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const docRef = ref(storage, `users/${auth.currentUser.uid}`);

    try {
      await uploadBytes(docRef, formData.photo);
      const url = await getDownloadURL(docRef);

      await updateDoc(doc(db, "users", id), { ...formData, photo: url });
      Toast.success.fire({
        icon: "success",
        text: "Update successful",
      });
    } catch (err) {
      Toast.error.fire({
        icon: "error",
        text: err,
      });
    }
  };

  const handleSubmitPassword = async (e) => {
    e.preventDefault();
    if (passwordData.password === passwordData.password1) {
      if (passwordData.password.length < 5)
        return Toast.error.fire({
          icon: "error",
          text: "Sorry password must not be less than 5",
        });

      try {
        await updatePassword(user, passwordData.password);
        Toast.error.fire({
          icon: "success",
          text: "Password has been updated successfully",
        });
        setPasswordData({ ...passwordData, password1: "", password: "" });
      } catch (err) {
        Toast.error.fire({
          icon: "error",
          text: err,
        });
        setPasswordData({ ...passwordData, password1: "", password: "" });
      }
    } else {
      return Toast.error.fire({
        icon: "error",
        text: "Password must match",
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

            <div className="w-full h-auto  ">
              <div className=" mt-10 bg-primary2 text-white rounded-lg ">
                <div className="flex justify-around gap-4 lg:flex-row flex-col ">
                  <div className="flex flex-col gap-4 mt-4 flex-1  p-4 shadow-lg">
                    <div className=" flex gap-4 items-center">
                      <img
                        src={user?.photo || avater}
                        className=" rounded-full h-[45px] w-[45px] object-cover"
                      />
                      <div className="flex gap-1 font-bold flex-col ">
                        <div className="flex  gap-2 dark:text-white">
                          <span>{user?.firstname}</span>
                          <span>{user?.lastname}</span>
                        </div>
                        <span className="text-gray-400 ">
                          {user?.occupation}
                        </span>
                      </div>
                    </div>

                    <div className=" flex  gap-4">
                      <div className="flex flex-col gap-4 justify-start">
                        <h4 className="font-bold text-xl text-white">
                          Account Details
                        </h4>
                        <p className="text-gray-400 text-md gap-2 items-center flex  capitalize ">
                          <Icons.BsPersonFill size={20} /> {user?.firstname}{" "}
                          {user?.lastname}
                        </p>
                        <p className="text-gray-400 text-md gap-2 items-center flex  capitalize ">
                          <Icons.BsCurrencyDollar size={20} />{" "}
                          {user?.transaction || "0000"}
                        </p>
                        <p className="text-gray-400 text-md gap-2 items-center flex  capitalize ">
                          <Icons.BsInfo size={20} /> {user?.status}
                        </p>
                        <p className="text-gray-400 text-md gap-2 items-center flex  capitalize ">
                          <Icons.BsClock size={20} />{" "}
                          <TimeAgo date={user?.date?.toDate()} />
                        </p>
                        <h4 className="font-bold text-xl text-white">
                          Contact Information
                        </h4>
                        <p className="text-gray-400 text-md gap-2 items-center flex  capitalize ">
                          <Icons.BsEnvelope /> {user?.email}
                        </p>

                        <p className="text-gray-400 text-md gap-2 items-center flex  capitalize ">
                          <Icons.BsTelephone /> {user?.phone}
                        </p>
                        <p className="text-gray-400 text-md gap-2 items-center flex  capitalize ">
                          <Icons.BsGeoFill />
                          {user?.country} {user?.country}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-white mt-4 mb-4 text-xl text-center">
                      Update User Profile information
                    </h4>
                    <div className=" mt-4 p-4 flex-[2] shadow-lg flex  ">
                      <div className="flex-[2]">
                        <div className="flex justify-center lg:hidden  gap-4">
                          <label htmlFor="upload" className="cursor-pointer">
                            <img
                              src={user?.photo}
                              alt="profile"
                              className="w-[300px] h-[300px] rounded-lg"
                            />
                          </label>
                          <input
                            type="file"
                            id="upload"
                            name="photo"
                            className="hidden"
                            onChange={handleChange}
                          />
                        </div>
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
                                className="py-3 px-4 outline-none focus:border-blue-400 focus:outline-none bg-transparent text-white duration-500  rounded border-2  w-full transition-all ease-linear border-gray-400 hover:border-blue-400"
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
                                className="py-3 px-4 outline-none focus:border-blue-400 focus:outline-none bg-transparent text-white  rounded border-2 transition-all ease-linear border-gray-400 hover:border-blue-400 w-full "
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
                                className="py-3 px-4 outline-none focus:border-blue-400 focus:outline-none bg-transparent text-white rounded duration-500  border-2 transition-all ease-linear border-gray-400 hover:border-blue-400 w-full "
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
                                className="py-3 duration-500 px-4 outline-none focus:border-blue-400 focus:outline-none bg-transparent text-white rounded  border-2 transition-all ease-linear border-gray-400 hover:border-blue-400 w-full"
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
                                value={formData?.address}
                                onChange={handleChange}
                                className="py-3 px-4 outline-none focus:border-blue-400 focus:outline-none bg-transparent text-white rounded duration-500  border-2 transition-all ease-linear border-gray-400 hover:border-blue-400 w-full "
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
                                value={formData?.occupation}
                                onChange={handleChange}
                                className="py-3 duration-500 px-4 outline-none focus:border-blue-400 focus:outline-none bg-transparent text-white rounded  border-2 transition-all ease-linear border-gray-400 hover:border-blue-400 w-full"
                              />
                            </div>
                          </div>
                          <div className="w-full flex flex-col lg:flex-row items-center space-x-0 lg:space-x-4 ">
                            <div className="w-full ">
                              <label
                                htmlFor="iniDep"
                                className="py-3 text-lg text-gray-500"
                              >
                                InitialDeposit
                              </label>
                              <input
                                type="text"
                                name="initialDeposit"
                                id="iniDep"
                                value={formData?.initialDeposit}
                                onChange={handleChange}
                                className="py-3 px-4 outline-none focus:border-blue-400 focus:outline-none bg-transparent text-white rounded duration-500  border-2 transition-all ease-linear border-gray-400 hover:border-blue-400 w-full "
                              />
                            </div>
                            <div className="w-full ">
                              <label
                                htmlFor="balance"
                                className="py-2 text-lg text-gray-500"
                              >
                                TotalBalance
                              </label>
                              <input
                                type="text"
                                name="totalBalance"
                                id="balance"
                                value={formData?.totalBalance}
                                onChange={handleChange}
                                className="py-3 duration-500 px-4 outline-none focus:border-blue-400 focus:outline-none bg-transparent text-white rounded  border-2 transition-all ease-linear border-gray-400 hover:border-blue-400 w-full"
                              />
                            </div>
                          </div>
                          <div className="w-full flex flex-col lg:flex-row items-center space-x-0 lg:space-x-4 ">
                            <div className="w-full ">
                              <label
                                htmlFor="profit"
                                className="py-3 text-lg text-gray-500"
                              >
                                Profit
                              </label>
                              <input
                                type="text"
                                name="profit"
                                id="profit"
                                value={formData?.profit}
                                onChange={handleChange}
                                className="py-3 px-4 outline-none focus:border-blue-400 focus:outline-none bg-transparent text-white rounded duration-500  border-2 transition-all ease-linear border-gray-400 hover:border-blue-400 w-full "
                              />
                            </div>
                            <div className="w-full ">
                              <label
                                htmlFor="bonus"
                                className="py-2 text-lg text-gray-500"
                              >
                                Bonus
                              </label>
                              <input
                                type="text"
                                name="bonus"
                                id="bonus"
                                value={formData?.bonus}
                                onChange={handleChange}
                                className="py-3 duration-500 px-4 outline-none focus:border-blue-400 focus:outline-none bg-transparent text-white rounded  border-2 transition-all ease-linear border-gray-400 hover:border-blue-400 w-full"
                              />
                            </div>
                          </div>
                          <div className="w-full flex flex-col lg:flex-row items-center space-x-0 lg:space-x-4 ">
                            <div className="w-full ">
                              <label
                                htmlFor="access"
                                className="py-3 text-lg text-gray-500"
                              >
                                Access Code
                              </label>
                              <input
                                type="text"
                                name="accessCode"
                                id="access"
                                value={formData?.accessCode}
                                onChange={handleChange}
                                className="py-3 px-4 outline-none focus:border-blue-400 focus:outline-none bg-transparent text-white rounded duration-500  border-2 transition-all ease-linear border-gray-400 hover:border-blue-400 w-full "
                              />
                            </div>
                            <div className="w-full ">
                              <label
                                htmlFor="disable"
                                className="py-2 text-lg text-gray-500"
                              >
                                DisableWithdrawal
                              </label>
                              <select
                                type="text"
                                name="disableWithdrawal"
                                id="disable"
                                value={formData?.disableWithdrawal}
                                onChange={handleChange}
                                className="py-3 duration-500 px-4 outline-none focus:border-blue-400 focus:outline-none bg-transparent text-white rounded  border-2 transition-all ease-linear border-gray-400 hover:border-blue-400 w-full"
                              >
                                <option value={true}>True</option>
                                <option value={false}>False</option>
                              </select>
                            </div>
                          </div>
                          <div className="w-full flex flex-col lg:flex-row items-center space-x-0 lg:space-x-4 ">
                            <div className="w-full ">
                              <label
                                htmlFor="vcode"
                                className="py-3 text-lg text-gray-500"
                              >
                                Verification Code
                              </label>
                              <input
                                type="number"
                                name="verificationCode"
                                id="vcode"
                                value={formData?.verificationCode}
                                onChange={handleChange}
                                className="py-3 px-4 outline-none focus:border-blue-400 focus:outline-none bg-transparent text-white rounded duration-500  border-2 transition-all ease-linear border-gray-400 hover:border-blue-400 w-full "
                              />
                            </div>
                            <div className="w-full ">
                              <label
                                htmlFor="verified"
                                className="py-2 text-lg text-gray-500"
                              >
                                Verified
                              </label>
                              <select
                                type="text"
                                name="verified"
                                id="disable"
                                value={formData?.verified}
                                onChange={handleChange}
                                className="py-3 duration-500 px-4 outline-none focus:border-blue-400 focus:outline-none bg-transparent text-white rounded  border-2 transition-all ease-linear border-gray-400 hover:border-blue-400 w-full"
                              >
                                <option value={true}>True</option>
                                <option value={false}>False</option>
                              </select>
                            </div>
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
                              className="py-3  duration-500 px-4 outline-none focus:border-blue-400 focus:outline-none bg-transparent text-white rounded  border-2 transition-all ease-linear border-gray-400 hover:border-blue-400 "
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
                              className="py-3 duration-500 px-4 outline-none focus:border-blue-400 focus:outline-none bg-transparent text-white rounded  border-2 transition-all ease-linear border-gray-400 hover:border-blue-400 "
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
                              className="py-3 duration-500 px-4 outline-none focus:border-blue-400 focus:outline-none bg-transparent text-white rounded  border-2 transition-all ease-linear border-gray-400 hover:border-blue-400 "
                            />
                          </div>
                          <div className="mt-4 w-[100%] lg:w-[35%] lg:hidden block ">
                            <button className="btn-primary py-3 w-full rounded-lg text-white">
                              Update
                            </button>
                          </div>
                        </form>
                        <form
                          className="hidden"
                          onSubmit={handleSubmitPassword}
                        >
                          <h4 className="text-white my-4 text-lg text-center font-bold">
                            Update Password
                          </h4>
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
                                disabled
                                value={passwordData.password}
                                onChange={handleChangePassword}
                                className="py-3 px-4 outline-none  focus:border-blue-400 focus:outline-none bg-transparent text-white rounded duration-500  border-2 transition-all ease-linear border-gray-400 hover:border-blue-400 w-full "
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
                                disabled
                                value={passwordData.password1}
                                onChange={handleChangePassword}
                                className="py-3 duration-500 px-4 outline-none focus:border-blue-400 focus:outline-none bg-transparent text-white rounded  border-2 transition-all ease-linear border-gray-400 hover:border-blue-400 w-full"
                              />
                            </div>
                          </div>
                          <div className="mt-4 w-full lg:w-[35%]">
                            <button
                              disabled
                              className="btn-primary py-3 w-full rounded-lg text-white"
                            >
                              Update
                            </button>
                          </div>
                        </form>
                      </div>
                      <div className="flex-1 hidden lg:flex mt-6 flex-col items-end gap-[45%] lg:gap-24">
                        <div className="flex items-center  gap-4">
                          <img
                            src={user?.photo}
                            alt="profile"
                            className="w-[100px] h-[100px] rounded-lg"
                          />
                          <label
                            htmlFor="upload"
                            className="cursor-pointer dark:text-gray-300"
                          >
                            <Icons.BsUpload size={25} />
                          </label>
                          <input
                            type="file"
                            id="upload"
                            name="photo"
                            className="hidden"
                            onChange={handleChange}
                          />
                        </div>
                        <div
                          className="mt-4 w-[90%] lg:w-[60%]"
                          onClick={handleSubmit}
                        >
                          <button className="btn-primary py-3 w-full rounded-lg text-white">
                            Update
                          </button>
                        </div>
                      </div>
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
