// import React, { useState } from "react";
// import axios from "axios";
// import "./Chatbot.css";

// const Chatbot = () => {
//   const [messages, setMessages] = useState([
//     { text: "Hi! Ask me anything about Anil's resume.", sender: "bot" }
//   ]);
//   const [input, setInput] = useState("");

//   const handleSend = async () => {
//     if (!input.trim()) return;

//     const userMessage = { text: input, sender: "user" };
//     setMessages([...messages, userMessage]);

//     try {
//       // Send the user question to backend
//       const response = await axios.post("https://neweg.onrender.com/chat", { question: input });

//       const botMessage = { text: response.data.answer, sender: "bot" };
//       setMessages([...messages, userMessage, botMessage]);
//     } catch (error) {
//       setMessages([...messages, userMessage, { text: "Error fetching response.", sender: "bot" }]);
//     }

//     setInput("");
//   };

//   return (
//     <div className="chatbot-container">
//       <div className="chatbox">
//         {messages.map((msg, index) => (
//           <div key={index} className={`message ${msg.sender}`}>
//             {msg.text}
//           </div>
//         ))}
//       </div>
//       <div className="input-container">
//         <input
//           type="text"
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           placeholder="Ask about Anil's resume..."
//         />
//         <button onClick={handleSend}>Send</button>
//       </div>
//     </div>
//   );
// };

// export default Chatbot;


import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./Chatbot.css";

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { text: "Hi! Ask me anything about Anil's resume.", sender: "bot" }
  ]);
  const [input, setInput] = useState("");
  const [open, setOpen] = useState(true);
  const chatEndRef = useRef(null);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { text: input, sender: "user" };
    setMessages(prev => [...prev, userMessage]);

    try {
      const response = await axios.post("https://neweg.onrender.com/chat", { question: input });
      const botMessage = { text: response.data.answer, sender: "bot" };
      setMessages(prev => [...prev, userMessage, botMessage]);
    } catch (error) {
      setMessages(prev => [...prev, userMessage, { text: "Error fetching response.", sender: "bot" }]);
    }

    setInput("");
  };

  // Get last 2 user questions and their bot responses
  const getLastTwoConversations = () => {
    const userMsgs = messages.filter(msg => msg.sender === "user").slice(-2);
    const result = [];
    userMsgs.forEach(userMsg => {
      result.push(userMsg);
      const botMsg = messages.find(
        (m, idx) => idx > messages.indexOf(userMsg) && m.sender === "bot"
      );
      if (botMsg) result.push(botMsg);
    });
    return result;
  };

  const displayedMessages = getLastTwoConversations();

  return (
    <div className={`chatbot-container ${open ? "open" : "closed"}`}>
      <div className="chatbot-header" onClick={() => setOpen(!open)}>
        Chatbot {open ? "▲" : "▼"}
      </div>

      {open && (
        <>
          <div className="chatbox">
            {displayedMessages.map((msg, index) => (
              <div key={index} className={`message ${msg.sender}`}>
                {msg.text}
              </div>
            ))}
            <div ref={chatEndRef}></div>
          </div>

          <div className="input-container">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about Anil's resume..."
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <button onClick={handleSend}>Send</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Chatbot;
