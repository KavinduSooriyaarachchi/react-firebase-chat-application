import React from "react";
import "./userinfo.css";

const Userinfo = () => {
  return (
    <div className="userinfo">
      <div className="user">
        <img src="./avatar.png" alt="" className="src" />
        <h2>John Doe</h2>
      </div>
      <div className="icons">
        <img src="./more.png" alt="" className="src" />
        <img src="./video.png" alt="" className="src" />
        <img src="./edit.png" alt="" className="src" />
      </div>
    </div>
  );
};

export default Userinfo;
