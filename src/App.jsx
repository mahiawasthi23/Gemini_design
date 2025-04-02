import React from 'react';
import { useState ,useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./Component/Main";
import Sidebar from "./Component/Sidebar";
import "./App.css";
import { AuthProvider } from './Component/AuthContext';
import Login from './Component/Login';
import Signup from './Component/Signup';

function App() {


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
    document.body.classList.toggle('dark-theme');
  };
  

  return (
    <AuthProvider>
      <Router>
        <div className="app-container">

          <Sidebar recentSearches={recentSearches} toggleTheme={toggleTheme}/>
          
      
          <Routes>
            <Route path="/" element={<Main  addToRecent={addToRecent}/>}  />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;






