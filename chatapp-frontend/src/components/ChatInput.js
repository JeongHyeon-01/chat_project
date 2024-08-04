import React, { useState } from "react";
import "./css/ChatInput.css"; // 스타일링을 위한 CSS 파일

const ChatInput = ({ onSendMessage }) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    onSendMessage(message);
    setMessage("");
  };

  return (
    <div className="chat-input">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="내용 작성해 주세요."
          required
        />
        <button type="submit">보내기</button>
      </form>
    </div>
  );
};

export default ChatInput;
