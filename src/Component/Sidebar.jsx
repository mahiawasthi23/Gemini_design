import React, { useState } from 'react';
import './Sidebar.css';

function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      <div className='top'>
        <button className="open-btn" onClick={toggleSidebar}>
           ☰
        </button>
      </div>
      {isOpen && (
        <>
          <div className='new-chat'>
            <p>New Chat</p>
          </div>
          <div className='recent'>
            <p>Recent</p>
          </div>
          <div className='botton'>
            <div className='botton-item recent-entry'>
              <p>Help</p>
            </div>
            <div className='botton-item recent-entry'>
              <p>Activity</p>
            </div>
            <div className='botton-item recent-entry'>
              <p>setting</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Sidebar;