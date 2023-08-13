import React from 'react';

function Button({ title, handleClick, col }) {
  return (
    <div className="btn" onClick={() => handleClick()}>
      {title}
    </div>
  );
}

export default Button;
