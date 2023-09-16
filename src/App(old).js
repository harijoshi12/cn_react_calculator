import { useReducer } from 'react';
import './App.css';
import DigitBtn from './components/DigitBtn';
import OperationBtn from './components/OperationBtn';
import OutputDisplay from './components/OutputDisplay';

export const ACTIONS = {
  USER_INPUT: 'user-inpupt',
  CLEAR: 'clear',
  CHOOSE_OPERATION: 'choose-operation',

  // GET_RESULT: 'get-result',
  // ADD_DIGIT: 'remove-digit',
  // DELETE_DIGIT: 'delete-digit',
};
export const OPERATIONS = {
  ADD: '+',
  SUBTRACT: '−',
  MULTIPLY: '×',
  DIVIDE: '÷',
  DELETE: '⌫',
  CLEAR: 'C',
  EQUAL: '=',
};

const reducer = (state, { type, payload }) => {
  switch (type) {
    case ACTIONS.USER_INPUT:
      if (
        (payload.digit === '0' && state.currOperand === '0') ||
        (payload.digit === '.' && state.currOperand.includes('.'))
      )
        return state;

      if (state.prevOperand != null && state.currOperand == null) {
        console.log('state = ', state);
        return {
          ...state,
          userInput: (state?.userInput || '') + payload.digit,
          currOperand: payload.digit,

          result: getResult({
            ...state,
            userInput: (state?.userInput || '') + payload.digit,
            currOperand: payload.digit,
          }),
        };
      }
      if (state.prevOperand != null && state.currOperand != null) {
        console.log('state = ', state);
        return {
          ...state,
          userInput: (state?.userInput || '') + payload.digit,
          currOperand: (state?.currOperand || '') + payload?.digit,
          result: getResult({
            ...state,
            userInput: (state?.userInput || '') + payload.digit,
            currOperand: (state?.currOperand || '') + payload?.digit,
          }),
        };
      }
      return {
        ...state,
        userInput: (state?.userInput || '') + payload.digit,
        currOperand: (state?.currOperand || '') + payload?.digit,
      };

    case ACTIONS.CLEAR:
      return {};

    case ACTIONS.CHOOSE_OPERATION:
      if (state.currOperand == null && state.prevOperand == null) return state;
      if (state.prevOperand == null) {
        return {
          ...state,
          userInput: state.userInput + payload.operation,
          operation: payload.operation,
          prevOperand: state.currOperand,
          currOperand: null,
        };
      }
      if (state.currOperand == null) {
        return {
          ...state,
          userInput: state.userInput.slice(0, -1) + payload.operation,
          operation: payload.operation,
        };
      }
      return {
        ...state,
        userInput: state.userInput + payload.operation,
        prevOperand: state.result,
        currOperand: null,
        operation: payload.operation,
      };
    default:
      return state;
  }
};

const getResult = ({ userInput }) => {
  let expression = userInput
    ?.replace(/×/g, '*')
    .replace(/÷/g, '/')
    .replace(/−/g, '-');
  return eval(expression);
};

function App() {
  const [{ userInput, result, currOperand, prevOperand, operation }, dispatch] =
    useReducer(reducer, {});

  return (
    <>
      <div className="calc-container">
        <OutputDisplay
          // currOperand={currOperand}
          // prevOperand={prevOperand}
          // operation={operation}
          userInput={userInput}
          result={result}
        />
        <div className="calc-keyboard">
          <div className="row">
            <OperationBtn
              dispatch={dispatch}
              operation={OPERATIONS.CLEAR}
              span={2}
            />
            <OperationBtn dispatch={dispatch} operation={OPERATIONS.DELETE} />
            <OperationBtn dispatch={dispatch} operation={OPERATIONS.DIVIDE} />
          </div>
          <div className="row">
            <DigitBtn dispatch={dispatch} digit={'7'} />
            <DigitBtn dispatch={dispatch} digit={'8'} />
            <DigitBtn dispatch={dispatch} digit={'9'} />
            <OperationBtn dispatch={dispatch} operation={OPERATIONS.MULTIPLY} />
          </div>
          <div className="row">
            <DigitBtn dispatch={dispatch} digit={'4'} />
            <DigitBtn dispatch={dispatch} digit={'5'} />
            <DigitBtn dispatch={dispatch} digit={'6'} />
            <OperationBtn dispatch={dispatch} operation={OPERATIONS.SUBTRACT} />
          </div>
          <div className="row">
            <DigitBtn dispatch={dispatch} digit={'1'} />
            <DigitBtn dispatch={dispatch} digit={'2'} />
            <DigitBtn dispatch={dispatch} digit={'3'} />
            <OperationBtn dispatch={dispatch} operation={OPERATIONS.ADD} />
          </div>
          <div className="row">
            <DigitBtn dispatch={dispatch} digit={'0'} span={2} />
            <DigitBtn dispatch={dispatch} digit={'.'} />
            <OperationBtn dispatch={dispatch} operation={OPERATIONS.EQUAL} />
          </div>
        </div>
      </div>
      <div className="show">
        <div className="">prev operand : {prevOperand}</div>
        <div className="">curr operand : {currOperand}</div>
        <div className="">operation : {operation}</div>
        <div className="">user input : {userInput}</div>
        <div className="">result : {result}</div>
      </div>
    </>
  );
}

export default App;
