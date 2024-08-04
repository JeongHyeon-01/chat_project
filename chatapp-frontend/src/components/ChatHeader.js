import React from "react";
import { useNavigate } from "react-router-dom";
import "./css/ChatHeader.css"; // 스타일링을 위한 CSS 파일

const ChatHeader = ({ roomName }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="chat-header">
      <div className="chat-room-info">
        <h2>{roomName}</h2>
      </div>
      <button className="logout-button" onClick={handleLogout}>
        로그아웃
      </button>
    </div>
  );
};

export default ChatHeader;
