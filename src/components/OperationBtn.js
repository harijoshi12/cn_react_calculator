import React from 'react';
import { ACTIONS } from '../App';

function OperationBtn({ operation, dispatch, span }) {
  const handleClick = () => {
    if (operation === 'C') {
      dispatch({ type: ACTIONS.CLEAR });
    } else if (operation === '=' || operation === '⌫') return;
    else {
      dispatch({ type: ACTIONS.CHOOSE_OPERATION, payload: { operation } });
    }
  };
  return (
    <div
      className={span === 2 ? 'digit-span2-btn op-btn' : 'op-btn'}
      onClick={handleClick}
    >
      {operation}
    </div>
  );
}

export default OperationBtn;
