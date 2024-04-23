import React from "react";
import Sidebar from "../Components/Sidebar";
import Content from "../Components/Content";

const Landing = () => {
  return (
    <>
      <div className="navbar bg-base-200 ">
        <button className="btn btn-ghost text-xl">CSV CONVERTER</button>
      </div>

      <div className="flex ">
     
        <Sidebar/>
        <Content/>
      </div>
    </>
  );
};

export default Landing;
