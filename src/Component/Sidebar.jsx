import React, { useState, useEffect } from "react";
import "./Sidebar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faCog, faQuestionCircle, faHistory } from "@fortawesome/free-solid-svg-icons";
function Sidebar({ recentSearches }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

function Sidebar({toggleTheme}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);


  const toggleSidebar = () => {
    setIsOpen(!isOpen);
    setIsClicked(!isClicked);
  };

  const openSidebar = () => {
    if (!isClicked) {
      setIsOpen(true);
    }
  };

  const handleMouseLeave = () => {
    if (!isClicked) {
      setIsOpen(false);
    }
  };

  const showHistoryTemporarily = () => {
    setShowHistory(true);
    setTimeout(() => {
      setShowHistory(false);
    }, 2000); 
  };

  const toggleSettings = () => {
    setIsSettingsOpen(!isSettingsOpen);
  };

  return (
    <div className={`sidebar ${isOpen ? "open" : "closed"}`} onMouseLeave={handleMouseLeave}>
      <div className="top">
        <button className="open-btn" onClick={toggleSidebar}>
          ☰
        </button>
      </div>

      <div className="menu-items">
        <div className="new-chat" onClick={toggleSidebar}>
          <FontAwesomeIcon icon={faPlus} />
          {isOpen && <span> New Chat</span>}
        </div>
        <div className="recent">
          {isOpen && <p>Recent</p>}
          {isOpen &&
            recentSearches.map((search, index) => (
              <div key={index} className="recent-item">
                {search}
              </div>
            ))}
        </div>
        <div className="bottom">
          <div className="bottom-item" onMouseEnter={openSidebar}>
            <FontAwesomeIcon icon={faQuestionCircle} />
            {isOpen && <span> Help</span>}
          </div>
          <div className="bottom-item" onMouseEnter={showHistoryTemporarily}>
            <FontAwesomeIcon icon={faHistory} />
            {isOpen && <span> Activity</span>}
          </div>

          <div className="bottom-item" onMouseEnter={openSidebar}>

          <div className='bottom-item' onMouseEnter={openSidebar} onClick={toggleSettings}>
            <FontAwesomeIcon icon={faCog} />
            {isOpen && <span> Settings</span>}
          </div>
          {isSettingsOpen && (
            <div className="settings-menu">
              <button onClick={toggleTheme}>Dark Theme</button>
            </div>
          )}
        </div>
      </div>

     
      {showHistory && (
        <div className="history-popup">
          <p>Recent Activity</p>
          {recentSearches.map((search, index) => (
            <div key={index} className="history-item">
              {search}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Sidebar;
