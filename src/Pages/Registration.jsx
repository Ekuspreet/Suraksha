import React,{useEffect} from "react";
import Navbar from "../Components/Navbar";
import Register from "../Components/Register";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Registration = () => {
  const navigate = useNavigate()
    useEffect(() => {
            if (Cookies.get('token')) {
                navigate("/dashboard")
            }
    
},[])
  return (
    <>
    <main className="p-2">
      <Navbar/>
      <Register/>
      </main>
    </>
  );
};

export default Registration;
