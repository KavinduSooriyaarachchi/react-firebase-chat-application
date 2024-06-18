import React from "react";
import "./userinfo.css";
import { useUserStore } from "../../../lib/userStore";

const Userinfo = () => {
  const { currentUser } = useUserStore();
  return (
    <div className="userinfo">
      <div className="user">
        <img src={currentUser.avatar || "./avatar.png"} alt="" />
        <h2>{currentUser.username}</h2>
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
