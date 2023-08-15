import React from 'react';
import { ACTIONS } from '../App';

function DigitBtn({ digit, dispatch, span }) {
  return (
    <div
      className={span === 2 ? 'digit-span2-btn' : 'digit-btn'}
      onClick={() => dispatch({ type: ACTIONS.USER_INPUT, payload: { digit } })}
    >
      {digit}
    </div>
  );
}

export default DigitBtn;
