import React, { useState } from "react";
import {auth} from "../../database/firebaseDb"
import Toast from "../../components/Alert";
import {
  sendPasswordResetEmail
} from "firebase/auth"


function Forgot() {
  const [userData, setUserData] = useState({
    email: "",
    loading: false
  });
  const {email, loading} = userData
  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async(e) => {
    e.preventDefault();
    if( !email )
      return Toast.error.fire({ text: "Sorry!! Please fill all field", icon: "info" })
    setUserData({ ...userData, loading: true });
      try{
   const user = await sendPasswordResetEmail(auth,email) 
     setUserData({...userData, loading:false, email: ""})
    return   Toast.success.fire({
        icon: "success",
        text: "An email for your password reset information has been sent to you."
      })
      }catch(error){
     setUserData({...userData, loading:false, email: "",})
   return  Toast.error.fire({
       icon: "error",
       text: error
     })
  
      }

  };
  return (
    <section className="h-screen w-full">
      <div className="lg:w-[80%] w-[90%] mx-auto">
        <div className="flex justify-center items-center h-screen">
          <div className="bg-primary2 px-4 pt-6  pb-8 rounded-lg w-full lg:w-[50%] mx-auto ">
            <div className=" ">
              <h5 className="text-2xl  text-center primary-text font-[500] font-ubuntu  py-8">
                Forgot Password
              </h5>
              <form className=" flex flex-col gap-4" onSubmit={handleSubmit}>
                <div className="flex flex-col lg:flex-row gap-4 w-full">
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
                </div>

                <div className="mt-2">
                  <button disabled={loading} className="btn-primary w-full"> {loading? "Loading..." :"Submit"}</button>
                </div>
                <div className="mt-2">
                  <a 
                    href="/auth/login"
                    className="btn-secondary inline-block text-center text-white uppercase w-full"
                  >
                   Login
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Forgot;
