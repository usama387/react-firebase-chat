import { useEffect, useState } from "react";
import AddUser from "./addUser/AddUser";
import "./chatList.css";
import { useUserStore } from "../../../lib/userStore";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { database } from "../../../lib/firebase";

const ChatList = () => {
  // to manage add user icon state
  const [addMode, setAddMode] = useState(false);

  // after fetching chats with useEffect storing it in useState
  const [chats, setChats] = useState([]);

  // getting currentUser
  const { currentUser } = useUserStore();

  useEffect(() => {
    // fetching chats by passing id and userChats key from db
    const unSub = onSnapshot(
      doc(database, "userChats", currentUser.id),
      async (response) => {
        
        const items = response.data().chats();

        const promises = items.map(async (item) => {
          const userDocRef = doc(database, "users", item.receiverId);
          const userDocSnap = await getDoc(userDocRef);

          const user = userDocSnap.data();

          return { ...item, user };
        });

        const chatData = await Promise.all(promises);
        // updating state with setChats
        setChats(chatData.sort((a, b) => b.updatedAt - a.updatedAt));
      }
    );
    return () => {
      unSub();
    };
  }, [currentUser.id]);

  return (
    <div className="chatList">
      {/* search input logic */}
      <div className="search">
        <div className="searchBar">
          <img src="./search.png" />
          <input type="text" placeholder="search user" />
        </div>
        <img
          src={addMode ? "./minus.png" : "./plus.png"}
          alt="add"
          className="add"
          onClick={() => setAddMode(!addMode)}
        />
      </div>

      {/* chat content logic */}
      {chats.map((chat) => (
        <div className="item" key={chat.chatId}>
          <img src="./avatar.png" alt="" />
          <div className="texts">
            <span>Usama Razaaq</span>
            <p>{chat.lastMessage}</p>
          </div>
        </div>
      ))}

      {/* when addMode is true the addUser component is rendered */}
      {addMode && <AddUser />}
    </div>
  );
};

export default ChatList;
