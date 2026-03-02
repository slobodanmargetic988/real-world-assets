import React, { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";
import AboutUs from "./pages/AboutUs";
import NavBar from "./components/navbar/Navbar";
import Developers from "./pages/Developers";
import Footer from "./pages/Footer";
import Join from "./pages/Join";
import Loading from "./pages/Header";
import Partners from "./pages/Partners";
import Properties from "./pages/Properties";
import Subscribe from "./pages/Subscribe";

function App() {
  
  useEffect(() => {
    // Check user authentication status on load
    const verifyAuth = async () => {
      try {
        await axios.get("/api/user/me");
      } catch (error) {
        // Silent fail - user is just not authenticated
      }
    };
    verifyAuth();
  }, []);
  
  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Loading />
        <Partners />
        <Properties />
        <AboutUs />
        <Developers />
        <Join />
        <Subscribe />
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
