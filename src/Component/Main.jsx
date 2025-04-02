import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import Navbar from "./Navbar";
import "./Main.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane} from "@fortawesome/free-solid-svg-icons";

const Main = ({ addToRecent }) => {
  const [chats, setChats] = useState([]);
  const [text, setText] = useState("");
  const [typing, setTyping] = useState("");

  const key = import.meta.env.VITE_APP_URI; 
  const URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${key}`;
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";
  
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
      localStorage.setItem("chatHistory", JSON.stringify(updatedChats));
      return updatedChats;
    });

    setTyping("");
  };

  const sendMsg = async () => {
    if (!text.trim()) return;

    const userMessage = { who: "me", message: text };
    setChats((prev) => {
      const updatedChats = [...prev, userMessage];
      localStorage.setItem("chatHistory", JSON.stringify(updatedChats));
      return updatedChats;
    });

    addToRecent(text);
    const userId = localStorage.getItem("userId");

    try {
      const token = localStorage.getItem("token");
      if (token) {
        await fetch(`${BACKEND_URL}/api/auth/search`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
          body: JSON.stringify({ userId, query: text }),
        }).catch(error => {
          console.error("Backend API error:", error);
        });
      }

      setText("");

      const res = await fetch(URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contents: [{ parts: [{ text }] }] }),
      });
      const data = await res.json();
      const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text || "No reply";
      await showTyping(reply);
    } catch (error) {
      console.error("Error:", error);
      setChats((prev) => [...prev, { 
        who: "bot", 
        message: "Sorry, I'm having trouble connecting. Please try again later." 
      }]);
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
              onKeyDown={(e) => (e.key === "Enter" ? sendMsg() : null)}
            />
            <button className="send-button " onClick={sendMsg}><span>
                 <FontAwesomeIcon icon={faPaperPlane} /></span></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;



