import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import "./css/NewMessageModal.css"; // 스타일링을 위한 CSS 파일

Modal.setAppElement("#root");

const NewMessageModal = ({ isOpen, onRequestClose, onStartChat }) => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          "http://localhost/api/api/accounts/users/",
          {
            headers: {
              Authorization: `Token ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch");
        }
        const data = await response.json();
        if (Array.isArray(data)) {
          setUsers(data);
        } else {
          setUsers([]); // Handle non-array response
        }
      } catch (error) {
        console.error("Error fetching users:", error);
        setUsers([]);
      }
    };

    fetchUsers();
  }, []);

  const handleStartChat = async () => {
    if (selectedUser) {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          "http://localhost/api/chat/create_chatroom/",
          {
            method: "POST",
            headers: {
              Authorization: `Token ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ participant_id: selectedUser.id }),
          }
        );
        if (!response.ok) {
          throw new Error("Failed to create chat room");
        }
        const chatRoom = await response.json();
        onStartChat(chatRoom);
        onRequestClose();
      } catch (error) {
        console.error("Error creating chat room:", error);
      }
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="New Message"
      className="modal"
      overlayClassName="overlay"
    >
      <h2>새로운 채팅방을 만들겠습니까?</h2>
      <ul className="user-list">
        {users.length === 0 ? (
          <li>사용자를 찾을 수 없습니다.</li>
        ) : (
          users.map((user) => (
            <li
              key={user.id}
              onClick={() => setSelectedUser(user)}
              className={
                selectedUser && selectedUser.id === user.id ? "selected" : ""
              }
            >
              {user.name}
            </li>
          ))
        )}
      </ul>
      <button onClick={handleStartChat} disabled={!selectedUser}>
        채팅 시작
      </button>
    </Modal>
  );
};

export default NewMessageModal;
