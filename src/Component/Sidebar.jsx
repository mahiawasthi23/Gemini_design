import React, { useState } from 'react';
import './Sidebar.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faCog, faQuestionCircle, faHistory } from '@fortawesome/free-solid-svg-icons';

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
    setIsClicked(!isClicked);
  };

  const openSidebar = () => {
    if (!isClicked){
      setIsOpen(true);
    }
  };


  const handleMouseLeave = () => {
    if (!isClicked) {
      setIsOpen(false);
    }
  };


  return (
    <div className={`sidebar ${isOpen ? 'open' : 'closed'}`} onMouseLeave={handleMouseLeave}>
      <div className='top'>
        <button className="open-btn" onClick={toggleSidebar}>
          ☰
        </button>
      </div>

      <div className='menu-items'>
        <div className='new-chat' onClick={toggleSidebar}>
          <FontAwesomeIcon icon={faPlus} />
          {isOpen && <span> New Chat</span>}
        </div>
        <div className='recent'>
          {isOpen ? <p>Recent</p> :""}
        </div>
        <div className='bottom'>
          <div className='bottom-item' onMouseEnter={openSidebar}>
            <FontAwesomeIcon icon={faQuestionCircle} />
            {isOpen && <span> Help</span>}
          </div>
          <div className='bottom-item' onMouseEnter={openSidebar} >
            <FontAwesomeIcon icon={faHistory} />
            {isOpen && <span> Activity</span>}
          </div>
          <div className='bottom-item' onMouseEnter={openSidebar}>
            <FontAwesomeIcon icon={faCog} />
            {isOpen && <span> Settings</span>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
