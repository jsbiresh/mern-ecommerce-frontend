import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import loginIcon from "../assets/signin.gif";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import imageToBase64 from "../helpers/imageToBase64";
import SummaryApi from "../common";
import { toast } from "react-toastify";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const [data, setData] = useState({
    email: "",
    password: "",
    name: "",
    confirmPassword: "",
    profilePic: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setData((prevData) => {
      return {
        ...prevData,
        [name]: value,
      };
    });
  };

  const handleUploadPic = async (e) => {
    const file = e.target.files[0];
    const imagePic = await imageToBase64(file);
    console.log(imagePic, "file");
    setData((prevData) => {
      return {
        ...prevData,
        profilePic: imagePic,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (data.password === data.confirmPassword) {
      const dataResponse = await fetch(SummaryApi.SignUp.url, {
        method: SummaryApi.SignUp.method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const dataApi = await dataResponse.json();
      console.log("Data", dataApi);
      if (dataApi.success) {
        toast(dataApi.message);
        navigate("/login");
      }
      if (dataApi.error) {
        toast.error(dataApi.message);
      }
    } else {
      toast.error("Password and Confirm Password should be same");
      // alert("Password and Confirm Password should be same");
      return;
    }
  };
  return (
    <section id="signup ">
      <div className="mx-auto container p-4 mt-2.9">
        <div className="bg-white p-4 py-5 w-full max-w-lg mx-auto">
          <div className="w-20 h-20 mx-auto mt-3 relative overflow-hidden rounded-full">
            <div>
              <img
                src={data.profilePic ? data.profilePic : loginIcon}
                alt="login icon"
              />
            </div>
            <form>
              <label>
                <div className="text-xxs bg-opacity-0 cursor-pointer text-center absolute bottom-0 w-full bg-slate-200 py-3">
                  {data.profilePic ? "" : "Upload Photo"}
                </div>
                <input
                  type="file"
                  onChange={handleUploadPic}
                  className="hidden"
                />
              </label>
            </form>
          </div>
          <form className="pt-6 flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="grid">
              <label>Name : </label>
              <div className="bg-slate-100 py-2">
                <input
                  type="text"
                  required
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
                  required
                  className="w-full h-full outline-none bg-transparent"
                  placeholder="Enter Email"
                  name="email"
                  value={data.email}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="">
              <label>Password : </label>
              <div className="bg-slate-100 py-2 flex">
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full h-full outline-none bg-transparent"
                  placeholder="Enter Password"
                  name="password"
                  required
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
            </div>
            <div className="">
              <label>Confirm Password : </label>
              <div className="bg-slate-100 py-2 flex">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  className="w-full h-full outline-none bg-transparent"
                  placeholder="Enter Password"
                  name="confirmPassword"
                  required
                  value={data.confirmPassword}
                  onChange={handleChange}
                />
                <div
                  onClick={() => toggleShowConfirmPassword()}
                  className="cursor-pointer text-xl mr-2"
                >
                  <span>
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
              </div>
            </div>

            <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 w-full max-w-[150px] hover:scale-110 transition-all mx-auto block mt-7">
              Sign Up
            </button>
          </form>
          <p className="mt-4">
            Already have account?{" "}
            <Link to={"/login"} className="hover:text-red-700 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
