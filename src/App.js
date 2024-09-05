import "./App.css";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import SummaryApi from "./common";

function App() {
  const fetchUserDetails = async () => {
    const dataResponse = await fetch(SummaryApi.CurrentUser.url, {
      method: SummaryApi.CurrentUser.method,
      credentials: "include",
    });
    const dataApi = await dataResponse.json();
    console.log("Data User", dataApi);
  };

  useEffect(() => {
    // User Details
    fetchUserDetails();
  }, []);
  return (
    <>
      <ToastContainer />
      <Header />
      <main className="min-h-[calc(100vh-120px)]">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default App;
