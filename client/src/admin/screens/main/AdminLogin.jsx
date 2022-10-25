import React, { useEffect, useState } from "react";
import { auth, db } from "../../../database/firebaseDb";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Toast from "../../../components/Alert";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { getAdminUser } from "../../../state/adminAuthSlice";

const AdminLogin = function () {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    loading: false,
  });
  const navigate = useNavigate();
  const [admin, setAdmin] = useState({});
  const dispatch = useDispatch();

  const { email, password } = formData;

  useEffect(() => {
    const getAdmin = async () => {
      const q = query(collection(db, "users"), where("isAdmin", "==", true));
      const docs = await getDocs(q);
      const items = docs.docs.map((each) => each.data());
      setAdmin(items.map((each) => each));
      dispatch(getAdminUser(items[0]));
    };
    getAdmin();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!password || !email)
      return Toast.error.fire({
        text: "Sorry!! Please fill all field",
        icon: "info",
      });
    if (admin[0]?.email !== email)
      return Toast.error.fire({
        text: "Sorry!! Access not granted",
        icon: "error",
      });

    setFormData({ ...formData, loading: true });
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setFormData({ ...formData, loading: false, email: "", password: "" });
      localStorage.setItem("admin", JSON.stringify(admin[0]));
      return Toast.success
        .fire({
          icon: "success",
          text: "login Successful",
        })
        .then(() => navigate("/adm", { state: admin[0] }));
    } catch (error) {
      setFormData({ ...formData, loading: false, email: "", password: "" });
      return Toast.error.fire({
        icon: "error",
        text: error,
      });
    }
  };
  return (
    <form onSubmit={handleSubmit} className="overflow-hidden">
      <div className=" h-screen  px-8 py-8  flex justify-center items-center ">
        <div className="flex px-8 pb-8 shadow-lg rounded-lg bg-primary2 flex-col items-center lg:w-2/4 w-full mx-auto space-y-4 ">
          <div className="text-xl ml-4 mt-4 text-center uppercase font-bold  lg:ml-0 pt-4 text-white">
            <span>Welcome To Crypto Diamond Admin </span>
          </div>
          <p className="text-center primary-text">Login your account</p>
          <div className="w-full ">
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              required
              value={formData.email}
              onChange={handleChange}
              className="py-4 duration-500 rounded-full px-4 outline-none  focus:outline-none  bg-transparent border transition-all ease-linear border-gray-300 text-white  w-full"
            />
          </div>
          <div className="w-full ">
            <input
              placeholder="Password"
              type="password"
              name="password"
              id="password"
              required
              value={formData.password}
              onChange={handleChange}
              className="py-4 px-4 outline-none rounded-full focus:outline-none  duration-500 bg-transparent border transition-all ease-linear border-gray-300 text-white  w-full "
            />
          </div>

          <button className=" mt-6 py-4 w-full text-lg uppercase btn-primary text-white focus:outline-none outline-none rounded">
            Submit
          </button>
        </div>
      </div>
    </form>
  );
};

export default AdminLogin;
