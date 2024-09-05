import "./App.css";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import SummaryApi from "./common";
import Context from "./context";
import { useDispatch } from "react-redux";
import { setUserDetails } from "./store/userSlice";

function App() {
  const dispatch = useDispatch();
  const fetchUserDetails = async () => {
    const dataResponse = await fetch(SummaryApi.CurrentUser.url, {
      method: SummaryApi.CurrentUser.method,
      credentials: "include",
    });
    const dataApi = await dataResponse.json();
    // console.log("Data User", dataApi);
    if (dataApi.success) {
      dispatch(setUserDetails(dataApi.data));
    }
    // console.log("Data User : ", dataApi);
  };

  useEffect(() => {
    // User Details
    fetchUserDetails();
  }, []);
  return (
    <>
      <Context.Provider
        value={{
          // will fetch User detail
          fetchUserDetails,
        }}
      >
        <ToastContainer />
        <Header />
        <main className="min-h-[calc(100vh-120px)]">
          <Outlet />
        </main>
        <Footer />
      </Context.Provider>
    </>
  );
}

export default App;
