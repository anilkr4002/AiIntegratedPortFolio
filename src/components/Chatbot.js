import React, { useState } from "react";
import axios from "axios";
import "./Chatbot.css";

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { text: "Hi! Ask me anything about Anil's resume.", sender: "bot" }
  ]);
  const [input, setInput] = useState("");

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { text: input, sender: "user" };
    setMessages([...messages, userMessage]);

    try {
      // Send the user question to backend
      const response = await axios.post("https://neweg.onrender.com/chat", { question: input });

      const botMessage = { text: response.data.answer, sender: "bot" };
      setMessages([...messages, userMessage, botMessage]);
    } catch (error) {
      setMessages([...messages, userMessage, { text: "Error fetching response.", sender: "bot" }]);
    }

    setInput("");
  };

  return (
    <div className="chatbot-container">
      <div className="chatbox">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>
            {msg.text}
          </div>
        ))}
      </div>
      <div className="input-container">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about Anil's resume..."
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default Chatbot;
