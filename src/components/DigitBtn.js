import React from 'react';

function DigitBtn({ digit, span }) {
  return (
    <div className={span === 2 ? 'digit-span2-btn' : 'digit-btn'}>{digit}</div>
  );
}

export default DigitBtn;
