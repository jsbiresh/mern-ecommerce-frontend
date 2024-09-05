import React from "react";
import Logo from "./Logo";
import { GrSearch } from "react-icons/gr";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import SummaryApi from "../common";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setUserDetails } from "../store/userSlice";

const Header = () => {
  const user = useSelector((state) => state?.user?.user);
  console.log("User", user);
  const dispatch = useDispatch();
  // ===============================
  const handleLogout = async () => {
    try {
      const fetchData = await fetch(SummaryApi.LogOutUser.url, {
        method: SummaryApi.LogOutUser.method,
        credentials: "include",
      });
      const data = await fetchData.json();

      if (data.success) {
        toast.success(data.message);
        dispatch(setUserDetails(null));
        // Optionally, redirect the user after logout
        // window.location.href = "/login";
        // or use history.push('/login') if using react-router
      }
      if (data.error) {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("An error occurred during logout");
    }
  };

  // ===============================
  return (
    <header className="h-16 shadow-md bg-white">
      <div className="h-full container mx-auto flex items-center px-4 justify-between">
        <div className="">
          <Link to={"/"}>
            <Logo width={90} height={50} />
          </Link>
        </div>
        <div className="hidden lg:flex items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow pl-2">
          <input
            type="text"
            placeholder="Search Product"
            className="w-full outline-none"
          />
          <div className="text-lg min-w-[50px] h-8 bg-red-600 flex items-center justify-center rounded-r-full text-white">
            <GrSearch />
          </div>
        </div>
        <div className="flex items-center gap-7">
          <div className="text-3xl cursor-pointer">
            {user?.profilePic ? (
              <img
                src={user?.profilePic}
                alt={user?.name}
                className="w-10 h-10 rounded-full"
              />
            ) : (
              <FaRegCircleUser />
            )}
          </div>
          <div className="text-2xl relative">
            <span>
              <FaShoppingCart />
            </span>
            <div className="bg-red-600 text-white w-5 h5 rounded-full p-1 flex items-center justify-center absolute top-0 -right-3">
              <p className="text-xs">0</p>
            </div>
          </div>
          <div>
            {user?._id ? (
              <button
                onClick={handleLogout}
                className=" px-3 py-1 rounded-full bg-red-600 text-white hover:bg-red-700"
              >
                Logout
              </button>
            ) : (
              <Link
                to={"/login"}
                className=" px-3 py-1 rounded-full bg-red-600 text-white hover:bg-red-700"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
