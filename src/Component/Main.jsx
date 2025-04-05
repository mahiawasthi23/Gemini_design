import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import Navbar from "./Navbar";
import "./Main.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane, faPlus } from "@fortawesome/free-solid-svg-icons";

const Main = ({ addToRecent }) => {
  const [chats, setChats] = useState([]);
  const [text, setText] = useState("");
  const [typing, setTyping] = useState("");

  const key = import.meta.env.VITE_APP_URI;
  const URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${key}`;
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const savedChats = JSON.parse(localStorage.getItem(`chatHistory_${userId}`)) || [];
    setChats(savedChats);
  }, [userId]);

  const showTyping = async (message) => {
    setTyping("");
    for (let i = 0; i < message.length; i++) {
      setTyping((prev) => prev + message[i]);
      await new Promise((done) => setTimeout(done, 30));
    }

    const newChat = { who: "bot", message };
    setChats((prev) => {
      const updatedChats = [...prev, newChat];
      localStorage.setItem(`chatHistory_${userId}`, JSON.stringify(updatedChats));
      return updatedChats;
    });

    setTyping("");
  };

  const sendMsg = async () => {
    if (!text.trim()) return;

    const userMessage = { who: "me", message: text };
    setChats((prev) => {
      const updatedChats = [...prev, userMessage];
      localStorage.setItem(`chatHistory_${userId}`, JSON.stringify(updatedChats));
      return updatedChats;
    });

    addToRecent(text);

    const token = localStorage.getItem("token");
    setText("");

    try {
      const res = await fetch(URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contents: [{ parts: [{ text }] }] }),
      });

      const data = await res.json();
      const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text || "No reply";

      if (token) {
        await fetch(`${BACKEND_URL}/api/auth/search`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ userId, userPrompt: text, gptResponse: reply }),
        });
      }

      await showTyping(reply);
    } catch (error) {
      console.error("Error:", error);
      setChats((prev) => [
        ...prev,
        {
          who: "bot",
          message: "Sorry, I'm having trouble connecting. Please try again later.",
        },
      ]);
    }
  };

  return (
    <div className="chat-container">
      <div className="main_header">
        <Navbar />
      </div>

      <div className="main">
      <div className="messages">
          {chats.map((chat, index) => (
            <div key={index} className={`message ${chat.who}`}>
              <ReactMarkdown>{chat.message}</ReactMarkdown>
            </div>
          ))}

          {typing && (
            <div className="message bot typing">
              <ReactMarkdown>{typing}</ReactMarkdown>
            </div>
          )}
        </div>

        <div className="input-container">
          <input
            type="text"
            placeholder="Type your message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMsg()}
          />
          <button onClick={sendMsg}>
            <FontAwesomeIcon icon={faPaperPlane} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Main;

