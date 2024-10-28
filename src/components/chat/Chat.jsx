import { useState } from "react";
import "./chat.css";
import EmojiPicker from "emoji-picker-react";

const Chat = () => {
  //state for emoji picker
  const [open, setOpen] = useState(false);

  // text state is updated with setText event in input
  const [text, setText] = useState("");

  console.log(text);

  const handleEmoji = (e) => {
    // the updated text is then added with emoji
    setText((prev) => prev + e.emoji);
    setOpen(false);
  };

  return (
    <div className="chat">
      <div className="top">
        <div className="user">
          <img src="./avatar.png" alt="" />
          <div className="texts">
            <span>Usama Razaaq</span>
            <p>Lorem ipsum dolor sit amet.</p>
          </div>
        </div>
        <div className="icons">
          <img src="./phone.png" alt="" />
          <img src="./video.png" alt="" />
          <img src="./info.png" alt="" />
        </div>
      </div>
      <div className="center">
        <div className="message">
          <img src="./avatar.png" alt="" />
          <div className="texts">
            <p>Lorem ipsum dolor sit amet.</p>
            <span>1 min ago</span>
          </div>
        </div>
        <div className="message own">
          <div className="texts">
            <img src="./avatar.png" alt="" />
            <p>Lorem ipsum dolor sit amet.</p>
            <span>1 min ago</span>
          </div>
        </div>
        <div className="message own">
          <div className="texts">
            <p>Lorem ipsum dolor sit amet.</p>
            <span>1 min ago</span>
          </div>
        </div>
      </div>

      {/* Text and emoji and files send logic */}
      <div className="bottom">
        <div className="icons">
          <img src="./img.png" alt="" />
          <img src="./camera.png" alt="" />
          <img src="./mic.png" alt="" />
          <input
            type="text"
            placeholder="Type a message..."
            // whenever a text is entered it will update the text state with setText
            onChange={(e) => setText(e.target.value)}
            // renders updated text with emoji if any
            value={text}
          />
          <div className="emoji">
            <img src="./emoji.png" alt="" onClick={() => setOpen(!open)} />

            <div className="picker">
              <EmojiPicker open={open} onEmojiClick={handleEmoji} />
            </div>
          </div>
          <button className="sendButton">Send</button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
