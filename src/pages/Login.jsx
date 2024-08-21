import React, { useState } from "react";
import loginIcon from "../assets/signin.gif";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <section id="login">
      <div className="mx-auto container p-4 mt-6">
        <div className="bg-white p-2 py-5 w-full max-w-md mx-auto">
          <div className="w-20 h-20 mx-auto">
            <img src={loginIcon} alt="login icon" />
          </div>
          <form>
            <div className="grid">
              <label>Email : </label>
              <div className="bg-slate-100 py-2">
                <input
                  type="email"
                  className="w-full h-full outline-none bg-transparent"
                  placeholder="Enter Email"
                />
              </div>
            </div>
            <div>
              <label>Password : </label>
              <div className="bg-slate-100 py-2 flex">
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full h-full outline-none bg-transparent"
                  placeholder="Enter Password"
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
                Forgot Password
              </Link>
            </div>

            <button className="bg-red-600 text-white px-6 py-2 w-full max-w-[150px] hover:scale-110 transition-all mx-auto block mt-7">
              Login
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
