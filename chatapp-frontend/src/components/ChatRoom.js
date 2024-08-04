import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ChatSidebar from "./ChatSidebar";
import ChatHeader from "./ChatHeader";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";
import "./css/ChatRoom.css"; // 스타일링을 위한 CSS 파일

const ChatRoom = () => {
  const { roomName } = useParams();
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost/api/api/chat/messages/${roomName}/`,
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      const data = await response.json();
      setMessages(data);
    };

    fetchMessages();
  }, [roomName]);

  const handleSendMessage = async (message) => {
    const token = localStorage.getItem("token");
    const response = await fetch(
      `http://localhost/api/api/chat/messages/${roomName}/`,
      {
        method: "POST",
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      }
    );
    const newMessage = await response.json();
    setMessages((prevMessages) => [...prevMessages, newMessage]);
  };

  return (
    <div className="chat-room-container">
      <ChatSidebar />
      <div className="chat-main">
        <ChatHeader roomName={roomName} />
        <ChatMessages messages={messages} />
        <ChatInput onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
};

export default ChatRoom;
