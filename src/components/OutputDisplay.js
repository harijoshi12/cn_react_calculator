import React from 'react';

function OutputDisplay({ userInput, result }) {
  return (
    <div className="output">
      <div className="user-input-display">{userInput}</div>
      <div className="result-display">{result}</div>
      <div className="dot">
        <span id="dot1"></span>
        <span id="dot2"></span>
        <span id="dot3"></span>
      </div>
    </div>
  );
}

export default OutputDisplay;
