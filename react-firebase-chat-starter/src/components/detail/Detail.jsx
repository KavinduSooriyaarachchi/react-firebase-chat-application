import React from "react";
import "../detail/detail.css";
import { auth } from "../../lib/firebase";

const Detail = () => {
  return (
    <div className="detail">
      <div className="user">
        <img src="./avatar.png" alt="" className="src" />
        <h2>Jane Doe</h2>
        <p>Lorem, ipsum dolor sit </p>
      </div>
      <div className="info">
        <div className="option">
          <div className="title">
            <span>Chat Settings</span>
            <img src="./arrowUp.png" alt="" className="src" />
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Privacy & Help</span>
            <img src="./arrowUp.png" alt="" className="src" />
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Shared Photos</span>
            <img src="./arrowDown.png" alt="" className="src" />
          </div>
          <div className="photos">
            <div className="photoItem">
              <div className="photoDetail">
                <img
                  src="https://carsguide.ikman.lk/wp-content/uploads/2023/08/bmw-i8-car-scaled-e1691999629250.jpg"
                  alt=""
                  className="src"
                />
                <span>photo_2024_2.png</span>
              </div>
              <img src="./download.png" alt="" className="icon" />
            </div>
            <div className="photoItem">
              <div className="photoDetail">
                <img
                  src="https://carsguide.ikman.lk/wp-content/uploads/2023/08/bmw-i8-car-scaled-e1691999629250.jpg"
                  alt=""
                  className="src"
                />
                <span>photo_2024_2.png</span>
              </div>
              <img src="./download.png" alt="" className="icon" />
            </div>
            <div className="photoItem">
              <div className="photoDetail">
                <img
                  src="https://carsguide.ikman.lk/wp-content/uploads/2023/08/bmw-i8-car-scaled-e1691999629250.jpg"
                  alt=""
                  className="src"
                />
                <span>photo_2024_2.png</span>
              </div>
              <img src="./download.png" alt="" className="icon" />
            </div>
            <div className="photoItem">
              <div className="photoDetail">
                <img
                  src="https://carsguide.ikman.lk/wp-content/uploads/2023/08/bmw-i8-car-scaled-e1691999629250.jpg"
                  alt=""
                  className="src"
                />
                <span>photo_2024_2.png</span>
              </div>
              <img src="./download.png" alt="" className="icon" />
            </div>
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Shared Files</span>
            <img src="./arrowUp.png" alt="" className="src" />
          </div>
        </div>
        {/* <div className="option">
          <div className="title">
            <span>Chat Settings</span>
            <img src="./arrowUp.png" alt="" className="src" />
          </div>
        </div> */}
        <button>Block User</button>
        <button className="logout" onClick={() => auth.signOut()}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Detail;
