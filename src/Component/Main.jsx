import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import "./Main.css";
import Navbar from "./Navbar";

const Main = ({ addToRecent }) => {
  const [chats, setChats] = useState([]);
  const [text, setText] = useState("");
  const [typing, setTyping] = useState("");

  const key = import.meta.env.VITE_APP_URI;
  const URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${key}`;

  useEffect(() => {
    const savedChats = JSON.parse(localStorage.getItem("chatHistory")) || [];
    setChats(savedChats);
  }, []);

  const showTyping = async (message) => {
    setTyping("");
    for (let i = 0; i < message.length; i++) {
      setTyping((prev) => prev + message[i]);
      await new Promise((done) => setTimeout(done, 30));
    }

    const newChat = { who: "bot", message };
    setChats((prev) => {
      const updatedChats = [...prev, newChat];
      localStorage.setItem("chatHistory", JSON.stringify(updatedChats)); // ✅ Save history
      return updatedChats;
    });

    setTyping("");
  };

  const sendMsg = async () => {
    if (!text.trim()) return;
    const userMessage = { who: "me", message: text };
    
    setChats((prev) => {
      const updatedChats = [...prev, userMessage];
      localStorage.setItem("chatHistory", JSON.stringify(updatedChats)); // ✅ Save history
      return updatedChats;
    });

    addToRecent(text); // ✅ Recent section me add karne ke liye
    const ask = text;
    setText("");

    try {
      const res = await fetch(URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: `${ask}` }],
            },
          ],
        }),
      });
      const data = await res.json();
      const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text || "No reply";
      await showTyping(reply);
    } catch {
      setChats((prev) => [...prev, { who: "bot", message: "API error." }]);
    }
  };

  return (
    <div className="chat-container">
      <div className="header">
        <Navbar />
      </div>
      <div className="main">
        <div className="message-box">
          {chats.map((c, i) => (
            <div key={i} className={c.who === "bot" ? "bot-message" : "message"}>
              <ReactMarkdown>{c.message}</ReactMarkdown>
            </div>
          ))}
          {typing && (
            <div className="bot-message">
              <ReactMarkdown>{typing}</ReactMarkdown>
            </div>
          )}
        </div>
        <div className="input-container-wrapper">
          <div className="input-container">
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter a prompt for Gemini"
              onKeyDown={(e) => e.key === "Enter" && sendMsg()}
            />
            <button className="send-button" onClick={sendMsg}>
              <span>&#10148;</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
