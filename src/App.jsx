import React from 'react';
import Main from "./Component/Main";
import Sidebar from "./Component/Sidebar";
import "./App.css";

function App() {

  const toggleTheme = () => {
    document.body.classList.toggle('dark-theme');
  };
  
  return (
    <div className="app-container">
      <Sidebar toggleTheme={toggleTheme}/>
      <Main />
    </div>
  );
}

export default App;