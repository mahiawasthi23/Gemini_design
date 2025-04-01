import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./Component/Main";
import Sidebar from "./Component/Sidebar";
import "./App.css";
import { AuthProvider } from './Component/AuthContext';
import Login from './Component/Login';
import Signup from './Component/Signup';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app-container">
          <Sidebar />
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;

