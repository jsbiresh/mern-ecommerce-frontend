import React, { useState, useContext } from "react";
import loginIcon from "../assets/signin.gif";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import SummaryApi from "../common";
import { toast } from "react-toastify";
import Context from "../context";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const navigate = useNavigate();
  // const generalContext = useContext(Context);
  const { fetchUserDetails } = useContext(Context);

  // console.log("GENERAL CONTEXT", generalContext.fetchUserDetails());
  // console.log("GENERAL CONTEXT", fetchUserDetails);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    // ===============================
    // API CALL
    const dataResponse = await fetch(SummaryApi.SignIn.url, {
      method: SummaryApi.SignIn.method,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const dataApi = await dataResponse.json();
    // =========================
    if (dataApi.success) {
      toast.success(dataApi.message);
      navigate("/");
      fetchUserDetails();
      // localStorage.setItem("token", dataApi.data);
      // window.location.href = "/";
    }
    if (dataApi.error) {
      toast.error(dataApi.message);
    }

    // ===============================
  };
  // 24px
  return (
    <section id="login">
      <div className="mx-auto container p-4 mt-2.9">
        <div className="bg-white p-2 py-5 w-full max-w-sm mx-auto">
          <div className="w-20 h-20 mx-auto mt-3">
            <img src={loginIcon} alt="login icon" />
          </div>
          <form className="pt-6 flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="grid">
              <label>Email : </label>
              <div className="bg-slate-100 py-2">
                <input
                  type="email"
                  className="w-full h-full outline-none bg-transparent"
                  placeholder="Enter Email"
                  name="email"
                  required
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

export default Login;
