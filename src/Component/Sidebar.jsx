import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Sidebar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faCog, faQuestionCircle, faHistory, faMoon, faGem } from "@fortawesome/free-solid-svg-icons";

function Sidebar({ toggleTheme, recentSearches = [] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => setIsOpen(!isOpen);
  const handleMouseLeave = () => setIsOpen(false);
  const toggleSettings = () => setIsSettingsOpen(!isSettingsOpen);

  const handleSearchClick = (query) => {
    navigate(`/search/${encodeURIComponent(query)}`);
  };

  return (
    <div className={`sidebar ${isOpen ? "open" : "closed"}`} onMouseLeave={handleMouseLeave}>
      <div className="top">
        <button className="open-btn" onClick={toggleSidebar}>☰</button>
      </div>

      <div className="menu-items" onClick={toggleSidebar}>
        <div className="new-chat">
          <FontAwesomeIcon icon={faPlus} />
          {isOpen && <span> New Chat</span>}
        </div>

        <div className="recent">
          {isOpen && <p>Recent</p>}
          {isOpen && recentSearches.length > 0 ? (
            recentSearches.map((entry, index) => (
              <div 
                key={index} 
                className="recent-item" 
                onClick={() => handleSearchClick(entry.keyword)}
              >
                {entry.keyword}
              </div>
            ))
          ) : (
            isOpen && <p className="no-data">No Recent Searches</p>
          )}
        </div>

        <div className="bottom">
          <div className="bottom-item">
            <FontAwesomeIcon icon={faGem} />
            {isOpen && <span> Gem Manager</span>}
          </div>
          <div className="bottom-item">
            <FontAwesomeIcon icon={faQuestionCircle} />
            {isOpen && <span> Help</span>}
          </div>
          <div className="bottom-item">
            <FontAwesomeIcon icon={faHistory} />
            {isOpen && <span> Activity</span>}
          </div>
          <div className="bottom-item" onClick={toggleSettings}>
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


