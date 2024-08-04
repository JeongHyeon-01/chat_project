import React from "react";
import ChatSidebar from "./ChatSidebar";
import "./css/Chat.css"; // 스타일링을 위한 CSS 파일

const Chat = () => {
  return (
    <div className="chat-container">
      <ChatSidebar />
      <div className="chat-welcome">
        <h2>Welcome to the Chat Application</h2>
        <p>Select a chat room to start chatting.</p>
      </div>
    </div>
  );
};

export default Chat;
