import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./Component/Main";
import Sidebar from "./Component/Sidebar";
import "./App.css";
import { AuthProvider } from "./Component/AuthContext";
import Login from "./Component/Login";
import Signup from "./Component/Signup";
import SearchRecent from "./Component/SearchRecent";

function App() {
  const [recentSearches, setRecentSearches] = useState([]);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (userId) {
      const saved = JSON.parse(localStorage.getItem(`recentSearches_${userId}`)) || [];
      setRecentSearches(saved);
    }
  }, [userId]);

  const extractKeyword = (search) => {
    const words = search.trim().toLowerCase().split(" ");
    return words[words.length - 1];
  };

  const addToRecent = (search) => {
    if (!search.trim() || !userId) return;

    const keyword = extractKeyword(search);
    const newEntry = { fullPrompt: search, keyword };
    const key = `recentSearches_${userId}`;

    setRecentSearches((prev) => {
      const filtered = prev.filter((entry) => entry.keyword !== keyword);
      const updated = [newEntry, ...filtered].slice(0, 5);
      localStorage.setItem(key, JSON.stringify(updated));
      return updated;
    });
  };

  const toggleTheme = () => {
    document.body.classList.toggle("dark-theme");
  };

  return (
    <AuthProvider>
      <Router>
        <div className="app-container">
          <Sidebar recentSearches={recentSearches} toggleTheme={toggleTheme} />
          <Routes>
            <Route path="/" element={<Main addToRecent={addToRecent} />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/search/:query" element={<SearchRecent />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
