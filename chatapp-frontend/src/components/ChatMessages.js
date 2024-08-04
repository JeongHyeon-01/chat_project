import React, { useEffect } from "react";
import "./css/ChatMessages.css"; // 스타일링을 위한 CSS 파일

const ChatMessages = ({ messages, onReadMessage }) => {
  const userId = localStorage.getItem("user_id");

  useEffect(() => {
    messages.forEach((msg) => {
      if (msg.sender !== parseInt(userId) && !msg.read) {
        onReadMessage(msg.id);
      }
    });
  }, [messages, onReadMessage, userId]);

  return (
    <div className="chat-messages">
      {messages.length === 0 ? (
        <div className="no-messages">채팅이 없습니다.</div>
      ) : (
        messages.map((msg, index) => (
          <div
            className={`message-container ${
              msg.sender === parseInt(userId) ? "sent" : "received"
            }`}
            key={index}
          >
            <div className="message">
              <div className="message-header">
                <span className="message-sender">{msg.sender_name}</span>
                <span className="message-time">
                  {new Date(msg.timestamp).toLocaleTimeString()}
                </span>
              </div>
              <div className="message-content">{msg.content}</div>
              {msg.sender !== parseInt(userId) && !msg.read && (
                <span className="message-unread">1</span>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ChatMessages;
