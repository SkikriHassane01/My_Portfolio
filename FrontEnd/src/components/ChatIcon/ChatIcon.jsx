import React from 'react';
import '../ChatIcon/IconStyle.css'
function ChatIcon({ onClick }) {
  return (
    <div className="chat-icon" onClick={onClick} >
      <i className="icon-comments"></i>
    </div>
  );
}

export default ChatIcon;