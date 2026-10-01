import React, { useState, useEffect, useRef } from "react";
import '../ChatBox/BoxStyle.css'
import { marked } from 'marked';

function Chatbox({ onClose, isVisible }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);


  useEffect(() => {
    marked.setOptions({
      breaks: true,
    });
    scrollToBottom();
  }, [messages]);
  
  // Scroll to bottom whenever messages change
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (input.trim() === "") return;

    setMessages([...messages, { text: input, sender: "user" }]);
    setInput("");

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: input }),
      });
      const data = await response.json();
      setMessages((msgs) => [...msgs, { text: data.response, sender: "bot" }]);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className={`chatbox ${isVisible ? "active" : ""}`}>
      <div className="chatbox-header">

          <h2>Chatbot</h2>

        <button onClick={onClose}>
          <i className="icon-cross"></i>
        </button>
      </div>
      <div className="chatbox-messages">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.sender}`}>
            {message.sender === "bot" ? (
              <div dangerouslySetInnerHTML={{ __html: marked(message.text) }} />
            ) : (
              <span>{message.text}</span>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSubmit} className="chatbox-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default Chatbox;
