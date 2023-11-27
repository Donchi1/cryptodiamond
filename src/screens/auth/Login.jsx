import React, { useState } from "react";
import * as Icons from "react-icons/fa";
import { auth } from "../../database/firebaseDb";
import Toast from "../../components/Alert";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function Login() {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
    loading: false,
    remember: true,
  });
  const navigate = useNavigate();
  const { email, password, loading } = userData;
  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!password || !email)
      return Toast.error.fire({
        text: "Sorry!! Please fill all field",
        icon: "info",
      });
    setUserData({ ...userData, loading: true });
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setUserData({ ...userData, loading: false, email: "", password: "" });
      return Toast.success
        .fire({
          icon: "success",
          text: "login Successful",
        })
        .then(() => window.location.assign("/user/dashboard"));
    } catch (error) {
      setUserData({ ...userData, loading: false, email: "", password: "" });
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
                Login Now
              </h5>
              <form className=" flex flex-col gap-4" onSubmit={handleSubmit}>
                <label className="w-full text-white">
                  Email
                  <input
                    type="email"
                    name="email"
                    className="text-gray-100 mt-2 outline-none h-[60px] w-full bg-transparent pl-2 rounded-lg border border-gray-300 hover:border-gold focus:border-gold transition-all duration-500 ease-linear"
                    placeholder="Your Email"
                    value={userData.email}
                    onChange={handleChange}
                  />
                </label>
                <label className="w-full text-white ">
                  Password
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="text-gray-100 mt-2 outline-none  h-[60px] w-full bg-transparent pl-2 rounded-lg border border-gray-300 hover:border-gold focus:border-gold transition-all duration-500 ease-linear"
                    value={userData.password}
                    onChange={handleChange}
                  />
                </label>
                <div className="flex justify-between  w-full items-center">
                  

                  <label className="relative text-white gap-4 transition-all ease-linear duration-500 flex justify-center items-center cursor-pointer ">
                    <input
                      type="checkbox"
                      className=" w-5 h-5 relative peer appearance-none transition-all ease-linear duration-500
                       checked:bg-gold rounded-[0.300rem] checked:text-white  bg-[#111] checked:border-0 border border-gray-400"
                      name="remember"
                      value={userData.remember}
                      checked={userData.remember}
                      onChange={handleChange}
                    />
                    Remember Me
                  <svg
                          className="absolute  w-5 h-5 left-0 pointer-events-none text-white hidden peer-checked:block"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                  </label>
                  

                  <a
                    className="text-white hover:text-gold transition-all ease-linear duration-500"
                    href="/auth/forgot"
                  >
                    Forgot Password?
                  </a>
                </div>

                <div>
                  <button
                    disabled={loading}
                    className="btn-primary disabled:bg-gray-300 w-full"
                  >
                    {loading ? "Loading..." : "Submit"}
                  </button>
                </div>
              </form>
              <p className="text-center mt-6 text-white">
                Don't have account?{" "}
                <a
                  className="hover:text-gold transition-all ease-linear duration-500"
                  href="/auth/register"
                >
                  Sign Up
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
