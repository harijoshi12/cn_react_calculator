import { useReducer } from 'react';
import './App.css';
import DigitBtn from './components/DigitBtn';
import OperationBtn from './components/OperationBtn';
import OutputDisplay from './components/OutputDisplay';

export const ACTIONS = {
  USER_INPUT: 'user-inpupt',
  CLEAR: 'clear',
  CHOOSE_OPERATION: 'choose-operation',
  DELETE_DIGIT: 'delete-digit',
  GET_RESULT: 'get-result',
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
      if (payload.digit === '0' && state.userInput === '0') {
        return state;
      }
      if (payload.digit === '.' && state.userInput.includes('.')) {
        return state;
      }
      const updatedUserInput = (state?.userInput || '') + payload.digit;
      return {
        ...state,
        userInput: updatedUserInput,
        result: state.operation
          ? getResult({ userInput: updatedUserInput })
          : null,
      };

    case ACTIONS.CLEAR:
      return {};

    case ACTIONS.CHOOSE_OPERATION:
      if (!state.userInput) return state;
      const lastChar = state.userInput.slice(-1);
      if (Object.values(OPERATIONS).includes(lastChar)) {
        // If the last character is already an operation
        if (lastChar === payload.operation) {
          // If the last operation is the same as the new one, do nothing
          return state;
        } else {
          // If the last operation is different, replace it with the new one
          const newUserInput = state.userInput.slice(0, -1) + payload.operation;
          return {
            ...state,
            userInput: newUserInput,
            operation: payload.operation,
          };
        }
      } else {
        // If the last character is not an operation, add the new operation
        return {
          ...state,
          userInput: state.userInput + payload.operation,
          operation: payload.operation,
        };
      }

    case ACTIONS.DELETE_DIGIT:
      const newUserInput = state.userInput.slice(0, -1);
      let newResult = state.result;
      // Check if the userInput contains only one operation
      const operationCount = Array.from(newUserInput).filter((char) =>
        Object.values(OPERATIONS).includes(char)
      ).length;
      if (
        operationCount === 1 &&
        Object.values(OPERATIONS).includes(newUserInput.slice(-1))
      ) {
        newResult = null;
      } else if (operationCount === 0 || newUserInput.length === 0) {
        newResult = null;
      } else {
        const lastChar = newUserInput.slice(-1);
        if (!Object.values(OPERATIONS).includes(lastChar)) {
          newResult = getResult({ userInput: newUserInput });
        } else {
          newResult = getResult({ userInput: newUserInput.slice(0, -1) });
        }
      }
      return {
        ...state,
        userInput: newUserInput,
        result: newResult,
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
  try {
    return eval(expression);
  } catch (e) {
    return 'Error';
  }
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
