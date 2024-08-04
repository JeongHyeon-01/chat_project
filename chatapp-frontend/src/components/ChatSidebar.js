import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import NewMessageModal from "./NewMessageModal";
import "./css/ChatSidebar.css"; // 스타일링을 위한 CSS 파일

const ChatSidebar = () => {
  const navigate = useNavigate();
  const [chatRooms, setChatRooms] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchChatRooms = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          "http://localhost/api/api/chat/user_chatrooms/",
          {
            headers: {
              Authorization: `Token ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch chat rooms");
        }
        const data = await response.json();
        setChatRooms(data);
      } catch (error) {
        console.error("Error fetching chat rooms:", error);
      }
    };

    fetchChatRooms();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleStartChat = (chatRoom) => {
    // Navigate to the new chat room
    navigate(`/chat/${chatRoom.name}`);
  };

  return (
    <div className="chat-sidebar">
      <div className="new-message-button" onClick={() => setIsModalOpen(true)}>
        + 새로운 메시지
      </div>
      <input type="text" placeholder="대화 검색하기" className="search-bar" />
      <div className="conversation-list">
        {chatRooms.length === 0 ? (
          <div>연결된 채팅방이 없습니다.</div>
        ) : (
          chatRooms.map((room) => (
            <Link
              to={`/chat/${room.name}`}
              key={room.id}
              className="conversation-link"
            >
              <div className="conversation">
                <div className="conversation-info">
                  <span className="conversation-name">{room.name}</span>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
      <button className="logout-button-sidebar" onClick={handleLogout}>
        로그아웃
      </button>
      <NewMessageModal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        onStartChat={handleStartChat}
      />
    </div>
  );
};

export default ChatSidebar;
