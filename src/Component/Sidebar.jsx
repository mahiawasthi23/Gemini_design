import React, { useState } from "react";
import "./Sidebar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faCog, faQuestionCircle, faHistory, faMoon,faGem} from "@fortawesome/free-solid-svg-icons";


function Sidebar({ toggleTheme, recentSearches }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);


  const toggleSidebar = () => setIsOpen(!isOpen);
  const handleMouseLeave = () => setIsOpen(false);
  const toggleSettings = () => setIsSettingsOpen(!isSettingsOpen);

  return (
    <div 
      className={`sidebar ${isOpen ? "open" : "closed"}`} 
      onMouseLeave={handleMouseLeave}
    >
      <div className="top">
        <button className="open-btn" onClick={toggleSidebar}>☰</button>
      </div>
      <div className="menu-items" onClick={toggleSidebar}>
        <div className="new-chat" onClick={toggleSidebar}>
          <FontAwesomeIcon icon={faPlus} />
          {isOpen && <span> New Chat</span>}
        </div>
        <div className="recent">
          {isOpen && <p>Recent</p>}
          {isOpen && recentSearches.map((search, index) => (
            <div key={index} className="recent-item">{search}</div>
          ))}
        </div>
        <div className="bottom">
        <div className="bottom-item" tabIndex={0}>
            <FontAwesomeIcon icon={faGem} />
            {isOpen && <span> Gem  manager</span>}
          </div>
          <div className="bottom-item" tabIndex={0}>
            <FontAwesomeIcon icon={faQuestionCircle} />
            {isOpen && <span> Help</span>}
          </div>
          
          <div className="bottom-item" tabIndex={0}>
            <FontAwesomeIcon icon={faHistory} />
            {isOpen && <span> Activity</span>}
          </div>

          <div 
            className="bottom-item" 
            tabIndex={0}  
            onClick={toggleSettings}
          >
            <FontAwesomeIcon icon={faCog} />
            {isOpen && <span> Settings</span>}
          </div>

          {isSettingsOpen && (
            <div className="settings-menu">
              <button onClick={toggleTheme}>
                <span><FontAwesomeIcon icon={faMoon} /></span> Dark Theme
                <div className="toggle-div">
                  <div className="circle-div"></div>
                </div>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;


