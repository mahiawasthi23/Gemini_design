import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Sidebar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faCog,
  faQuestionCircle,
  faHistory,
  faMoon,
  faGem,
} from "@fortawesome/free-solid-svg-icons";


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


    

  const handleNewChat = () => {
    localStorage.removeItem("chatHistory");
    window.location.reload();
  };

  return (
    <div
      className={`sidebar ${isOpen ? "open" : "closed"}`}
      onMouseLeave={handleMouseLeave}
    >

      <div className="top">
        <button className="open-btn" onClick={toggleSidebar}>
          ☰
        </button>
      </div>

      <div className="menu-items" onClick={toggleSidebar}>


        <div className="new-chat" onClick={handleNewChat}>
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
                {entry.fullPrompt || entry.keyword}
              </div>
            ))
          ) : (
            isOpen && <p className="no-data">No Recent Searches</p>
          )}
        </div>
        <div className="bottom">
          <div className="bottom-item" tabIndex={0}>
            <FontAwesomeIcon icon={faGem} />
            {isOpen && (
              <span>
                <a href="https://gemini.google.com/gem/chess-champ">
                 Gem Manager
                </a>
              </span>
            )}
          </div>

          <div className="bottom-item" tabIndex={0}>
            <FontAwesomeIcon icon={faQuestionCircle} />
            {isOpen && ( <span> <a href="https://gemini.google.com/faq?is_sa=1&is_sa=1&android-min-version=301356232&ios-min-version=322.0&campaign_id=bkws&utm_source=sem&utm_source=google&utm_medium=paid-media&utm_medium=cpc&utm_campaign=bkws&utm_campaign=2024enIN_gemfeb&pt=9008&mt=8&ct=p-growth-sem-bkws&gad_source=1&gclid=CjwKCAjw47i_BhBTEiwAaJfPpim-wUqzhZJddsgNnfyni2yKn60sWh8Z51pJfJzT20_aQh4CavXgpBoC2tgQAvD_BwE&gclsrc=aw.ds"> Help</a></span>)}
          </div>

          <div className="bottom-item" tabIndex={0}>
            <FontAwesomeIcon icon={faHistory} />

            {isOpen && ( <span> <a href="https://myactivity.google.com/product/gemini?utm_source=gemini"> Activity</a></span>)}
          </div>

          <div className="bottom-item" tabIndex={0} onClick={toggleSettings}>
            <FontAwesomeIcon icon={faCog} />
            {isOpen && <span> Settings</span>}
          </div>

          {isOpen && isSettingsOpen && (
            <div className="settings-menu">
              <button onClick={toggleTheme}>

                <span>
                  <FontAwesomeIcon icon={faMoon} />
                </span>{" "}
                Dark Theme
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
