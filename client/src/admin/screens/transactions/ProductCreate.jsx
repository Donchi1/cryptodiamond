import React, { useState, useEffect } from "react";
import avater from "/ecoms/images/avatar.jpg";
import * as Icons from "react-bootstrap-icons";
import { Link } from "react-router-dom";

export default function ProductCreate() {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    inStock: "",
    img: "",
    description: "",
  });
  const [userDisplay, setUserDisplay] = useState({
    name: "",
    category: "",
    price: "",
    inStock: "",
    img: "",
    description: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //api call
    setFormData(formData);
    setUserDisplay(formData);
    alert("update was successful");
  };

  return (
    <div className="w-full h-auto lg:h-screen  dark:bg-black ">
      <div className="flex  justify-between items-center mx-4 mt-8 mb-4">
        <h1 className="dark:text-white text-gray-800  font-extrabold text-3xl    uppercase">
          Create Product
        </h1>
        <Link to="/admin/products">
          <button className=" py-2 px-4 bg-green-400 text-white  rounded-lg">
            Products
          </button>
        </Link>
      </div>
      <div className="mx-4  mt-10 bg-gray-50 rounded-lg dark:bg-gray-800">
        <div className="flex justify-around gap-4 lg:flex-row flex-col ">
          <div>
            <h4 className="font-bold text-blue-500 mt-4 mb-4 text-xl text-center">
              Create Product
            </h4>
            <div className=" mt-4 p-4 flex-[2] shadow-lg flex  ">
              <div className="flex-[2]">
                <form onSubmit={handleSubmit}>
                  <div className="w-full flex flex-col lg:flex-row items-center space-x-0 lg:space-x-4 ">
                    <div className="w-full ">
                      <label htmlFor="name" className="py-3  text-gray-500">
                        Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        required
                        value={formData?.name}
                        onChange={handleChange}
                        className="py-3 px-4 outline-none focus:border-blue-400 focus:outline-none duration-500 bg-gray-100 rounded border-2  w-full transition-all ease-linear border-gray-400 hover:border-blue-400"
                      />
                    </div>
                    <div className="w-full ">
                      <label
                        htmlFor="price"
                        className="py-3 text-lg text-gray-500 "
                      >
                        Price
                      </label>
                      <input
                        type="text"
                        name="price"
                        required
                        id="price"
                        value={formData?.price}
                        onChange={handleChange}
                        className="py-3 px-4 outline-none focus:border-blue-400 focus:outline-none bg-gray-100 rounded border-2 transition-all ease-linear border-gray-400 hover:border-blue-400 w-full "
                      />
                    </div>
                  </div>
                  <div className="w-full flex flex-col lg:flex-row items-center space-x-0 lg:space-x-4">
                    <div className="w-full ">
                      <label
                        htmlFor="inStock"
                        className="py-2 text-lg text-gray-500"
                      >
                        InStock
                      </label>
                      <select
                        name="inStock"
                        id="inStock"
                        required
                        value={formData?.inStock}
                        onChange={handleChange}
                        className="py-3 duration-500 px-4 outline-none focus:border-blue-400 focus:outline-none rounded bg-gray-100 border-2 transition-all ease-linear border-gray-400 hover:border-blue-400 w-full"
                      >
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                      </select>
                    </div>
                    <div className="w-full ">
                      <label
                        htmlFor="category"
                        className="py-2 text-lg text-gray-500"
                      >
                        Category
                      </label>
                      <select
                        name="category"
                        id="category"
                        required
                        value={formData?.category}
                        onChange={handleChange}
                        className="py-3 duration-500 px-4 outline-none focus:border-blue-400 focus:outline-none rounded bg-gray-100 border-2 transition-all ease-linear border-gray-400 hover:border-blue-400 w-full"
                      >
                        <option value="cheapest">Chepest</option>
                        <option value="latest">Latest</option>
                      </select>
                    </div>
                  </div>
                  <div className="w-full flex flex-col lg:flex-row items-center space-x-0 lg:space-x-4 ">
                    <div className="w-full ">
                      <label htmlFor="img" className="py-3  text-gray-500">
                        Image
                      </label>
                      <input
                        type="file"
                        name="img"
                        id="img"
                        required
                        value={formData?.img}
                        onChange={handleChange}
                        className="py-3 px-4 outline-none focus:border-blue-400 focus:outline-none duration-500 bg-gray-100 rounded border-2  w-full transition-all ease-linear border-gray-400 hover:border-blue-400"
                      />
                    </div>
                  </div>
                  <div className="w-full flex flex-col lg:flex-row items-center space-x-0 lg:space-x-4 ">
                    <div className="w-full ">
                      <label
                        htmlFor="description"
                        className="py-3 text-lg text-gray-500"
                      >
                        Description
                      </label>
                      <textarea
                        multiple
                        cols={4}
                        rows={4}
                        name="description"
                        id="description"
                        value={formData?.description}
                        onChange={handleChange}
                        className="py-3 h-[20%] overflow-hidden px-4 outline-none focus:border-blue-400 focus:outline-none rounded duration-500 bg-gray-100 border-2 transition-all ease-linear border-gray-400 hover:border-blue-400 w-full "
                      ></textarea>
                    </div>
                  </div>

                  <div className="mt-4 w-[100%] lg:w-[35%]  ">
                    <button className="bg-blue-500 py-3 w-full rounded-lg text-white">
                      Create
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
