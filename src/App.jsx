import React from 'react';
import Main from "./Component/Main";
import Sidebar from "./Component/Sidebar";
import "./App.css";


function App() {
  return (
      <div className="app-container">
        <Sidebar />
        <Main />
      </div>
    
  );
}

export default App;