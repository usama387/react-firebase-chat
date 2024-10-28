import { useState } from "react";
import "./chatList.css";

const ChatList = () => {
  // to manage add user icon state
  const [addMode, setAddMode] = useState(false);

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

      {/* chat items logic */}
      <div className="item">
        <img src="./avatar.png" alt="" />
        <div className="texts">
          <span>Usama Razaaq</span>
          <p>Hello</p>
        </div>
      </div>
      <div className="item">
        <img src="./avatar.png" alt="" />
        <div className="texts">
          <span>Usama Razaaq</span>
          <p>Hello</p>
        </div>
      </div>
      <div className="item">
        <img src="./avatar.png" alt="" />
        <div className="texts">
          <span>Usama Razaaq</span>
          <p>Hello</p>
        </div>
      </div>


    </div>
  );
};

export default ChatList;
