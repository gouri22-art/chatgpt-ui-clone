import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Message from "./Message";
import "../styles/chat.css";

const Chat = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState(
    JSON.parse(localStorage.getItem("chatHistory")) || []
  );
  const [input, setInput] = useState("");

  useEffect(() => {
    localStorage.setItem("chatHistory", JSON.stringify(messages));
  }, [messages]);

  const sendMessage = () => {
    if (input.trim() === "") return;
    const newMessages = [...messages, { text: input, sender: "user" }];
    setMessages(newMessages);
    setInput("");

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { text: "Hello! How can I help you today?", sender: "bot" },
      ]);
    }, 1000);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="chat-container">
      <header>
        <img src="https://static.vecteezy.com/system/resources/previews/024/558/807/non_2x/openai-chatgpt-logo-icon-free-png.png" alt="Logo" className="chat-logo" />
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </header>
      <div className="chat-area">
        {messages.map((msg, index) => (
          <Message key={index} text={msg.text} sender={msg.sender} />
        ))}
      </div>
      <footer>
        <input 
          type="text" 
          placeholder="Type a message..." 
          value={input} 
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button onClick={sendMessage}>Send</button>
      </footer>
    </div>
  );
};

export default Chat;
