import React, { useEffect, useState, useRef } from "react";
import "./chat.css";
import EmojiPicker from "emoji-picker-react";

const Chat = () => {
  const [open, setOpen] = useState(false);
  const [Text, setText] = useState("");

  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const handleEmoji = (e) => {
    setText((prev) => prev + e.emoji);
    setOpen(false);
  };

  return (
    <div className="chat">
      <div className="top">
        <div className="user">
          <img src="./avatar.png" alt="" className="src" />
          <div className="texts">
            <span>Jane Doe</span>
            <p>Lorem ipsum dolor sit amet.</p>
          </div>
        </div>
        <div className="icons">
          <img src="./phone.png" alt="" className="src" />
          <img src="./video.png" alt="" className="src" />
          <img src="./info.png" alt="" className="src" />
        </div>
      </div>
      <div className="center">
        <div className="massage own">
          {/* <img src="./avatar.png" alt="" className="src" /> */}
          <div className="texts">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum,
              pariatur.
            </p>
            <span>1 min ago</span>
          </div>
        </div>
        <div className="massage">
          <img src="./avatar.png" alt="" className="src" />
          <div className="texts">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum,
              pariatur.
            </p>
            <span>1 min ago</span>
          </div>
        </div>
        <div className="massage own">
          {/* <img src="./avatar.png" alt="" className="src" /> */}
          <div className="texts">
            <img
              src="https://carsguide.ikman.lk/wp-content/uploads/2023/08/bmw-i8-car-scaled-e1691999629250.jpg"
              alt=""
              className="src"
            />
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum,
              pariatur.
            </p>
            <span>1 min ago</span>
          </div>
        </div>
        <div className="massage">
          <img src="./avatar.png" alt="" className="src" />
          <div className="texts">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum,
              pariatur.
            </p>
            <span>1 min ago</span>
          </div>
        </div>
        {<div ref={endRef}></div>}
      </div>
      <div className="bottom">
        <div className="icons">
          <img src="./img.png" alt="" className="src" />
          <img src="./camera.png" alt="" className="src" />
          <img src="./mic.png" alt="" className="src" />
        </div>
        <input
          type="text"
          placeholder="Type a massage..."
          value={Text}
          onChange={(e) => setText(e.target.value)}
        />
        <div className="emoji">
          <img
            src="./emoji.png"
            alt=""
            className="src"
            onClick={() => setOpen((prev) => !prev)}
          />

          <div className="picker">
            <EmojiPicker open={open} onEmojiClick={handleEmoji} />
          </div>
        </div>
        <button className="sendButton">Send</button>
      </div>
    </div>
  );
};

export default Chat;
