import React, { useState } from "react";
import avater from "/avatar.png";
import * as Icons from "react-icons/bs";
import Footer from "../components/Footer";
import Pagination from "../components/Pagination";
import Sidebar from "../components/Sidebar";
import AdminNav from "../components/AdminNav";
import Compressor from "compressorjs";
import { db, auth, storage } from "../../database/firebaseDb";
import { updateEmail, updatePassword } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Toast from "../../components/Alert";
import useGetDocument from "../../components/hooks/UseDocument";
import createNotificationData from "../../utils/createNotification";
import { useSelector } from "react-redux";

export default function Profile() {
  const user = JSON.parse(localStorage.getItem("admin"));
  const [formData, setFormData] = useState(user);
  console.log(user);

  const {
    firstname,
    lastname,
    email,
    phone,
    status,
    transactions,
    gender,
    occupation,
    country,
    birthdate,
    state,
    aboutMe,
  } = formData;

  const [passwordData, setPasswordData] = useState({
    password: "",
    password1: "",
  });

  const compressImg = (img) => {
    return new Compressor(img, {
      quality: 0.6,
      success: (file) => setFormData({ ...formData, photo: file }),
    });
  };

  // useEffect(() => {
  //   //api call for single user data
  //   const getUser = () => {
  //     const userForEdit = userRow.find((each) => each.id.toString() === "1");
  //     setFormData(userForEdit);
  //     setUser?(userForEdit);
  //   };
  //   getUser();
  // }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (e.target.files) {
      compressImg(e.target.files[0]);
    }
  };
  const handleChangePassword = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      (!firstname ||
        !lastname ||
        !email ||
        !phone ||
        !status ||
        !gender ||
        !occupation ||
        !country ||
        !birthdate ||
        !state,
      !aboutMe)
    ) {
      return Toast.error.fire({
        icon: "error",
        text: "Sorry!! Please fill all required fields",
      });
    }

    const docRef = ref(storage, `users/${auth.currentUser.uid}`);

    try {
      await updateEmail(auth.currentUser, formData.email);

      await uploadBytes(docRef, formData.photo);
      const url = await getDownloadURL(docRef);

      await updateDoc(doc(db, "users", auth.currentUser.uid), {
        firstname,
        lastname,
        email,
        phone,
        status,
        photo: url,
        transactions,
        gender,
        aboutMe,
        occupation,
        country,
        birthdate,
        state,
      });
      const noteData = {
        title: "Profile Update",
        message: "Your profile has been successfully updated",
        status: "success",
      };
      createNotificationData(noteData);
      return Toast.success.fire({
        icon: "success",
        text: "Profile update successfull",
      });
    } catch (err) {
      Toast.error.fire({
        icon: "error",
        text: error,
      });
    }
  };
  const handleSubmitPassword = async (e) => {
    e.preventDefault();
    if (!passwordData.password || !passwordData.password1)
      return Toast.error.fire({
        icon: "error",
        text: "Sorry!! Please fill all required field",
      });
    if (passwordData.password.length < 5 || passwordData.password1.length < 5)
      return Toast.error.fire({
        icon: "error",
        text: "Sorry!! Password length must be greater than 5",
      });
    if (passwordData.password === passwordData.password1) {
      try {
        await updatePassword(auth.currentUser, passwordData.password);
        Toast.success.fire({
          icon: "success",
          text: "Password updated successfully",
        });
      } catch (error) {
        Toast.error.fire({
          icon: "error",
          text: error,
        });
        return setPasswordData({
          ...passwordData,
          password1: "",
          password: "",
        });
      }
    } else {
      return Toast.error.fire({
        icon: "error",
        text: "Paasword must match",
      });
    }
  };

  return (
    <>
      <>
        <AdminNav />
        <div className="flex">
          <Sidebar />
          <div className="flex-[4] h-screen ">
            <section className="w-[90%]  mx-auto ">
              <Pagination title={"Profile"} />

              <div className="w-full bg-primary2  rounded-lg ">
                <div className="flex justify-around gap-4 lg:flex-row flex-col ">
                  <div className="flex flex-col gap-4 mt-4 flex-1  p-4 ">
                    <div className=" flex gap-4 items-center">
                      <img
                        src={user?.photo || avater}
                        className=" rounded-full h-[45px] w-[45px] object-cover"
                      />
                      <div className="flex gap-1 font-bold flex-col ">
                        <div className="flex  gap-2 primary-text">
                          <span>{user?.firstname}</span>
                          <span>{user?.lastname}</span>
                        </div>
                        <span className="text-gray-500 ">
                          {user?.occupation}
                        </span>
                      </div>
                    </div>

                    <div className=" flex  gap-4">
                      <div className="flex flex-col gap-4 justify-start">
                        <h4 className="font-bold text-xl text-white">
                          Account Details
                        </h4>
                        <p className="text-gray-500 text-md gap-2 items-center flex  capitalize ">
                          <Icons.BsPersonFill size={20} /> {user?.firstname}{" "}
                          {user?.lastname}
                        </p>
                        <p className="text-gray-500 text-md gap-2 items-center flex  capitalize ">
                          <Icons.BsCurrencyDollar size={20} />{" "}
                          {user?.totalBalance || "0000"}
                        </p>
                        <p className="text-gray-500 text-md gap-2 items-center flex  capitalize ">
                          <Icons.BsCalendar2Date size={20} /> {user?.birthdate}
                        </p>
                        <p className="text-gray-500 text-md gap-2 items-center flex  capitalize ">
                          <Icons.BsInfo size={20} /> {user?.status}
                        </p>
                        <h4 className="font-bold text-xl text-white">
                          Contact Information
                        </h4>
                        <p className="text-gray-500 text-md gap-2 items-center flex  capitalize ">
                          <Icons.BsEnvelope /> {user?.email}
                        </p>

                        <p className="text-gray-500 text-md gap-2 items-center flex  capitalize ">
                          <Icons.BsTelephone /> {user?.phone}
                        </p>
                        <p className="text-gray-500 text-md gap-2 items-center flex  capitalize ">
                          <Icons.BsGeoFill /> {user?.state} {user?.country}
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
                            name="img"
                            className="hidden"
                            onChange={handleChange}
                          />
                        </div>
                        <form onSubmit={handleSubmit}>
                          <div className="w-full flex flex-col lg:flex-row items-center space-x-0 lg:space-x-4 ">
                            <div className="w-full ">
                              <label
                                htmlFor="fname"
                                className=" py-3  text-gray-500"
                              >
                                Firstname
                              </label>
                              <input
                                type="text"
                                name="firstname"
                                id="fname"
                                value={formData?.firstname}
                                onChange={handleChange}
                                className="text-gray-100 mt-2 outline-none  h-[60px] w-full bg-transparent pl-2 rounded-lg border border-gray-300"
                              />
                            </div>
                            <div className="w-full ">
                              <label
                                htmlFor="lname"
                                className=" py-3 text-lg text-gray-500 "
                              >
                                Lastname
                              </label>
                              <input
                                type="text"
                                name="lastname"
                                id="lname"
                                value={formData?.lastname}
                                onChange={handleChange}
                                className="text-gray-100 mt-2 outline-none  h-[60px] w-full bg-transparent pl-2 rounded-lg border border-gray-300"
                              />
                            </div>
                          </div>
                          <div className="w-full flex flex-col lg:flex-row items-center space-x-0 lg:space-x-4">
                            <div className="w-full ">
                              <label
                                htmlFor="phone"
                                className=" py-4 text-lg text-gray-500"
                              >
                                Number
                              </label>
                              <input
                                type="tel"
                                name="phone"
                                id="phone"
                                value={formData?.phone}
                                onChange={handleChange}
                                className="text-gray-100 mt-2 outline-none  h-[60px] w-full bg-transparent pl-2 rounded-lg border border-gray-300"
                              />
                            </div>
                            <div className="w-full ">
                              <label
                                htmlFor="email"
                                className=" py-4 text-lg text-gray-500"
                              >
                                Email
                              </label>
                              <input
                                type="email"
                                name="email"
                                id="email"
                                value={formData?.email}
                                onChange={handleChange}
                                className="text-gray-100 mt-2 outline-none  h-[60px] w-full bg-transparent pl-2 rounded-lg border border-gray-300"
                              />
                            </div>
                          </div>
                          <div className="w-full flex flex-col lg:flex-row items-center space-x-0 lg:space-x-4 ">
                            <div className="w-full ">
                              <label
                                htmlFor="country"
                                className=" py-3 text-lg text-gray-500"
                              >
                                country
                              </label>
                              <input
                                type="text"
                                name="country"
                                id="country"
                                value={formData?.country}
                                onChange={handleChange}
                                className="text-gray-100 mt-2 outline-none  h-[60px] w-full bg-transparent pl-2 rounded-lg border border-gray-300"
                              />
                            </div>
                            <div className="w-full ">
                              <label
                                htmlFor="occupation"
                                className=" py-4 text-lg text-gray-500"
                              >
                                Occupation
                              </label>
                              <input
                                type="text"
                                name="occupation"
                                id="ocupation"
                                value={formData?.occupation}
                                onChange={handleChange}
                                className="text-gray-100 mt-2 outline-none  h-[60px] w-full bg-transparent pl-2 rounded-lg border border-gray-300"
                              />
                            </div>
                          </div>
                          <div className="w-full flex flex-col lg:flex-row items-center space-x-0 lg:space-x-4 ">
                            <div className="w-full ">
                              <label
                                htmlFor="bdate"
                                className=" py-3 text-lg text-gray-500"
                              >
                                Birth-Date
                              </label>
                              <input
                                type="date"
                                name="birthDate"
                                id="bdate"
                                value={formData?.birthdate}
                                onChange={handleChange}
                                className="text-gray-100 mt-2 outline-none  h-[60px] w-full bg-transparent pl-2 rounded-lg border border-gray-300"
                              />
                            </div>
                            <div className="w-full ">
                              <label
                                htmlFor="state"
                                className=" py-4 text-lg text-gray-500"
                              >
                                State
                              </label>
                              <input
                                type="text"
                                name="state"
                                id="state"
                                value={formData?.state}
                                onChange={handleChange}
                                className="text-gray-100 mt-2 outline-none  h-[60px] w-full bg-transparent pl-2 rounded-lg border border-gray-300"
                              />
                            </div>
                          </div>
                          <div className="w-full mb-2 ">
                            <label
                              htmlFor="aboutMe"
                              className=" py-4 text-lg mt-2 text-gray-500"
                            >
                              About Me
                            </label>
                            <textarea
                              type="text"
                              name="aboutMe"
                              id="aboutMe"
                              value={formData?.aboutMe}
                              onChange={handleChange}
                              className="text-gray-100 mt-2 outline-none  h-[75px] w-full bg-transparent pl-2 rounded-lg border border-gray-300"
                            ></textarea>
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
                              className="py-3  duration-500 px-4 outline-none focus:border-blue-400 focus:outline-none rounded bg-gray-100 border-2 transition-all ease-linear border-gray-400 hover:border-blue-400 "
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
                              className="py-3 duration-500 px-4 outline-none focus:border-blue-400 focus:outline-none rounded bg-gray-100 border-2 transition-all ease-linear border-gray-400 hover:border-blue-400 "
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
                              className="py-3 duration-500 px-4 outline-none focus:border-blue-400 focus:outline-none rounded bg-gray-100 border-2 transition-all ease-linear border-gray-400 hover:border-blue-400 "
                            />
                          </div>
                          <div className="mt-4 w-[100%] lg:w-[35%] lg:hidden block ">
                            <button className="btn-primary py-3 w-full rounded-lg text-white">
                              Update
                            </button>
                          </div>
                        </form>
                        <form onSubmit={handleSubmitPassword}>
                          <h4 className="text-white my-4 text-lg text-center font-bold">
                            Update Password
                          </h4>
                          <div className="w-full flex flex-col lg:flex-row items-center space-x-0 lg:space-x-4 ">
                            <div className="w-full ">
                              <label
                                htmlFor="password"
                                className=" py-3 text-lg text-gray-500"
                              >
                                New Password
                              </label>
                              <input
                                type="password"
                                name="password"
                                id="password"
                                value={passwordData.password}
                                onChange={handleChangePassword}
                                className="text-gray-100 mt-2 outline-none  h-[60px] w-full bg-transparent pl-2 rounded-lg border border-gray-300"
                              />
                            </div>
                            <div className="w-full ">
                              <label
                                htmlFor="password1"
                                className=" py-2 text-lg text-gray-500"
                              >
                                Repeat-Password
                              </label>
                              <input
                                type="password"
                                name="password1"
                                id="password1"
                                value={passwordData.password1}
                                onChange={handleChangePassword}
                                className="text-gray-100 mt-2 outline-none  h-[60px] w-full bg-transparent pl-2 rounded-lg border border-gray-300"
                              />
                            </div>
                          </div>
                          <div className="mt-4 w-full lg:w-[35%]">
                            <button className="btn-primary py-3 w-full rounded-lg text-white">
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
                            className=" cursor-pointer text-gray-300"
                          >
                            <Icons.BsUpload size={25} />
                          </label>
                          <input
                            type="file"
                            id="upload"
                            name="img"
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
            </section>
            <Footer />
          </div>
        </div>
      </>
    </>
  );
}
