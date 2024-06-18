// import React, { useEffect, useState } from "react";
// import "./chatlist.css";
// import AddUser from "./addUser/AddUser";
// import { useUserStore } from "../../../lib/userStore";
// import { doc, getDoc, onSnapshot } from "firebase/firestore";
// import { db } from "../../../lib/firebase";

// const Chatlist = () => {
//   const [chats, setChats] = useState([]);
//   const [addMode, setAddMode] = useState(false);

//   const { currentUser } = useUserStore();

//   useEffect(() => {
//     if (!currentUser) return;

//     const unSub = onSnapshot(
//       doc(db, "userchats", currentUser.id),
//       async (res) => {
//         if (!res.exists()) return;

//         const items = res.data().chats;

//         const promises = items.map(async (item) => {
//           if (!item.receiverID) {
//             console.error("Receiver ID is undefined for item:", item);
//             return { ...item, user: null };
//           }

//           const userDocRef = doc(db, "users", item.receiverID);
//           const userDocSnap = await getDoc(userDocRef);

//           if (!userDocSnap.exists()) {
//             console.error(
//               "User document does not exist for receiverID:",
//               item.receiverID
//             );
//             return { ...item, user: null };
//           }

//           const user = userDocSnap.data();

//           return { ...item, user };
//         });

//         const chatData = await Promise.all(promises);

//         setChats(chatData.sort((a, b) => b.updatedAt - a.updatedAt));
//       }
//     );

//     return () => {
//       unSub();
//     };
//   }, [currentUser]);

//   return (
//     <div className="chatlist">
//       <div className="search">
//         <div className="searchBar">
//           <img src="./search.png" alt="" className="src" />
//           <input type="text" placeholder="Search" />
//         </div>
//         <img
//           src={addMode ? "./minus.png" : "./plus.png"}
//           alt=""
//           className="add"
//           onClick={() => setAddMode((prev) => !prev)}
//         />
//       </div>
//       {chats.map((chat) => (
//         <div className="item" key={chat.chatID}>
//           <img
//             src={chat.user?.avatarUrl || "./avatar.png"}
//             alt=""
//             className="src"
//           />
//           <div className="texts">
//             <span>{chat.user?.name || "Unknown User"}</span>
//             <p>{chat.lastMessage}</p>
//           </div>
//         </div>
//       ))}
//       {addMode && <AddUser />}
//     </div>
//   );
// };

// export default Chatlist;

import React, { useEffect, useState } from "react";
import "./chatlist.css";
import AddUser from "./addUser/AddUser";
import { useUserStore } from "../../../lib/userStore";
import { doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../../../lib/firebase";
import { useChatStore } from "../../../lib/chatStore";

const Chatlist = () => {
  const [chats, setChats] = useState([]);
  const [addMode, setAddMode] = useState(false);
  const [input, setInput] = useState("");

  const { currentUser } = useUserStore();
  const { chatId, changeChat } = useChatStore();

  useEffect(() => {
    const unSub = onSnapshot(
      doc(db, "userchats", currentUser.id),
      async (res) => {
        const items = res.data().chats;

        const promises = items.map(async (item) => {
          const userDocRef = doc(db, "users", item.receiverId);
          const userDocSnap = await getDoc(userDocRef);

          const user = userDocSnap.data();

          return { ...item, user };
        });

        const chatData = await Promise.all(promises);

        setChats(chatData.sort((a, b) => b.updatedAt - a.updatedAt));
      }
    );

    return () => {
      unSub();
    };
  }, [currentUser.id]);

  const handleSelect = async (chat) => {
    const userChats = chats.map((item) => {
      const { user, ...rest } = item;

      return rest;
    });

    const chatIndex = userChats.findIndex(
      (item) => item.chatId === chat.chatId
    );

    userChats[chatIndex].isSeen = true;

    const userChatsRef = doc(db, "userchats", currentUser.id);

    try {
      await updateDoc(userChatsRef, { chats: userChats });
      changeChat(chat.chatId, chat.user);
    } catch (err) {
      console.log(err);
    }
  };

  const filterdChats = chats.filter((c) =>
    c.user.username.toLowerCase().includes(input.toLowerCase())
  );

  return (
    <div className="chatlist">
      <div className="search">
        <div className="searchBar">
          <img src="./search.png" alt="" className="src" />
          <input
            type="text"
            placeholder="Search"
            onChange={(e) => setInput(e.target.value)}
          />
        </div>
        <img
          src={addMode ? "./minus.png" : "./plus.png"}
          alt=""
          className="add"
          onClick={() => setAddMode((prev) => !prev)}
        />
      </div>

      {filterdChats.map((chat) => (
        <div
          className="item"
          key={chat.chatId}
          onClick={() => handleSelect(chat)}
          style={{
            backgroundColor: chat?.isSeen ? "transparent" : "#5183fe",
          }}
        >
          <img src={chat.user.avatar || "./avatar.png"} alt="" />
          <div className="texts">
            <span>
              {chat.user.blocked.includes(currentUser.id)
                ? "User"
                : chat.user.username}
            </span>
            <p>{chat.lastMessage}</p>
          </div>
        </div>
      ))}
      {addMode && <AddUser />}
    </div>
  );
};

export default Chatlist;

// import React, { useEffect, useState } from "react";
// import "./chatlist.css";
// import AddUser from "./addUser/AddUser";
// import { useUserStore } from "../../../lib/userStore";
// import { doc, getDoc, onSnapshot } from "firebase/firestore";
// import { db } from "../../../lib/firebase";

// const Chatlist = () => {
//   const [chats, setChats] = useState([]);
//   const [addMode, setAddMode] = useState(false);

//   const { currentUser } = useUserStore();

//   useEffect(() => {
//     if (!currentUser) return;

//     const unSub = onSnapshot(
//       doc(db, "userchats", currentUser.id),
//       async (res) => {
//         const items = res.data().chats;

//         const promises = items.map(async (item) => {
//           const userDocRef = doc(db, "users", item.receiverID);
//           const userDocSnap = await getDoc(userDocRef);

//           const user = userDocSnap.data();

//           return { ...item, user };
//         });

//         const chatData = await Promise.all(promises);

//         setChats(chatData.sort((a, b) => b.updatedAt - a.updatedAt));
//       }
//     );

//     return () => {
//       unSub();
//     };
//   }, [currentUser]);

//   return (
//     <div className="chatlist">
//       <div className="search">
//         <div className="searchBar">
//           <img src="./search.png" alt="" className="src" />
//           <input type="text" placeholder="Search" />
//         </div>
//         <img
//           src={addMode ? "./minus.png" : "./plus.png"}
//           alt=""
//           className="add"
//           onClick={() => setAddMode((prev) => !prev)}
//         />
//       </div>
//       {chats.map((chat) => (
//         <div className="item" key={chat.chatID}>
//           <img
//             src={chat.user?.avatarUrl || "./avatar.png"}
//             alt=""
//             className="src"
//           />
//           <div className="texts">
//             <span>{chat.user?.name || "Unknown User"}</span>
//             <p>{chat.lastMessage}</p>
//           </div>
//         </div>
//       ))}
//       {addMode && <AddUser />}
//     </div>
//   );
// };

// export default Chatlist;
