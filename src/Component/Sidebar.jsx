import React from 'react';
import './Sidebar.css';

function Sidebar (){
  return (
    <>
     <div className="sidebar">
    <div className='top'>
    <button className="open-btn">
          ☰ 
        </button>
    </div>
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
      
    </div>
  </>
  );
};
export default Sidebar;
