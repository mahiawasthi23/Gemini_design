import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom"; 
import Main from "./Component/Main";
import Sidebar from "./Component/Sidebar";
import { AuthProvider, useAuth } from "./Component/AuthContext";
import Login from "./Component/Login";
import Signup from "./Component/Signup";
import "./App.css";

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

function AppContent() {
  const { user } = useAuth();
  console.log("Current User:", user);
  const [recentSearches, setRecentSearches] = useState([]);

  useEffect(() => {
    const savedSearches = JSON.parse(localStorage.getItem("recentSearches")) || [];
    setRecentSearches(savedSearches);
  }, []);

  const addToRecent = (search) => {
    setRecentSearches((prev) => {
      const updatedSearches = [search, ...prev].slice(0, 5);
      localStorage.setItem("recentSearches", JSON.stringify(updatedSearches));
      return updatedSearches;
    });
  };

  const toggleTheme = () => {
    document.body.classList.toggle("dark-theme");
  };

  return (
    <div className="app-container">
      <Routes>
        {user ? (
          <>
            <Route path="/" element={<><Sidebar recentSearches={recentSearches} toggleTheme={toggleTheme} /><Main addToRecent={addToRecent} /></>} />
            <Route path="*" element={<Navigate to="/" />} />
          </>
        ) : (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </>
        )}
      </Routes>
    </div>
  );
}

export default App;