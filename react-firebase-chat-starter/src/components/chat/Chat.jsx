import React, { useEffect, useState, useRef } from "react";
import "./chat.css";
import EmojiPicker from "emoji-picker-react";
import {
  arrayUnion,
  doc,
  getDoc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../lib/firebase";
import { useChatStore } from "../../lib/chatStore";
import { useUserStore } from "../../lib/userStore";

const Chat = () => {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [chat, setChat] = useState();
  const [img, setImg] = useState({
    file: null,
    url: "",
  });

  const { currentUser } = useUserStore();
  const { chatId, user, isCurrentUserBlocked, isReceiverBlocked } =
    useChatStore();

  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const handleEmoji = (e) => {
    setText((prev) => prev + e.emoji);
    setOpen(false);
  };

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", chatId), (res) => {
      setChat(res.data());
    });

    return () => {
      unSub();
    };
  }, [chatId]);

  console.log(chat);

  const handleSend = async () => {
    if (text === "") return;

    try {
      await updateDoc(doc(db, "chats", chatId), {
        messages: arrayUnion({
          senderId: currentUser.id,
          text,
          createdAt: new Date(),
        }),
      });

      const userIDs = [currentUser.id, user.id];

      userIDs.forEach(async (id) => {
        const userChatsRef = doc(db, "userchats", id);
        const userChatsSnapshot = await getDoc(userChatsRef);

        if (userChatsSnapshot.exists()) {
          const userChatsData = userChatsSnapshot.data();

          const chatIndex = userChatsData.chats.findIndex(
            (c) => c.chatId === chatId
          );
          userChatsData.chats[chatIndex].lastMessage = text;
          userChatsData.chats[chatIndex].isSeen =
            id === currentUser.id ? true : false;
          userChatsData.chats[chatIndex].updatedAt = Date.now();

          await updateDoc(userChatsRef, {
            chats: userChatsData.chats,
          });
        }
      });

      setText("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="chat">
      <div className="top">
        <div className="user">
          <img src="./avatar.png" alt="" className="src" />
          <div className="texts">
            <span>{user.username}</span>
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
        {chat?.messages?.map((message) => (
          <div className="massage own" key={message?.createAt}>
            {/* <img src="./avatar.png" alt="" className="src" /> */}
            <div className="texts">
              {message.img && <img src={message.img} alt="" className="src" />}
              <p>{message.text}</p>
              {/* <span>1 min ago</span> */}
            </div>
          </div>
        ))}

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
          placeholder={
            isCurrentUserBlocked || isReceiverBlocked
              ? "You can't send a message"
              : "Type a massage..."
          }
          value={text}
          onChange={(e) => setText(e.target.value)}
          disabled={isCurrentUserBlocked || isReceiverBlocked}
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
        <button
          className="sendButton"
          onClick={handleSend}
          disabled={isCurrentUserBlocked || isReceiverBlocked}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
