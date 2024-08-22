import React, { useState } from "react";
import { Link } from "react-router-dom";

import loginIcon from "../assets/signin.gif";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setData((prevData) => {
      return {
        ...prevData,
        [name]: value,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <section id="signup ">
      <div className="mx-auto container p-4 mt-2.9">
        <div className="bg-white p-2 py-5 w-full max-w-sm mx-auto">
          <div className="w-20 h-20 mx-auto mt-3">
            <img src={loginIcon} alt="login icon" />
          </div>
          <form className="pt-6" onSubmit={handleSubmit}>
            <div className="grid">
              <label>Name : </label>
              <div className="bg-slate-100 py-2">
                <input
                  type="text"
                  className="w-full h-full outline-none bg-transparent"
                  placeholder="Enter Name"
                  name="name"
                  value={data.name}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="grid">
              <label>Email : </label>
              <div className="bg-slate-100 py-2">
                <input
                  type="email"
                  className="w-full h-full outline-none bg-transparent"
                  placeholder="Enter Email"
                  name="email"
                  value={data.email}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="mt-4">
              <label>Password : </label>
              <div className="bg-slate-100 py-2 flex">
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full h-full outline-none bg-transparent"
                  placeholder="Enter Password"
                  name="password"
                  value={data.password}
                  onChange={handleChange}
                />
                <div
                  onClick={() => toggleShowPassword()}
                  className="cursor-pointer text-xl mr-2"
                >
                  <span>{showPassword ? <FaEyeSlash /> : <FaEye />}</span>
                </div>
              </div>
              <Link
                to="/forgot-password"
                className="block w-fit ml-auto mt-4 hover:underline hover:text-pink-300 "
              >
                Forgot Password?
              </Link>
            </div>

            <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 w-full max-w-[150px] hover:scale-110 transition-all mx-auto block mt-7">
              Login
            </button>
          </form>
          <p className="mt-4">
            Don't have account?{" "}
            <Link
              to={"/sign-up"}
              className="hover:text-red-700 hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
