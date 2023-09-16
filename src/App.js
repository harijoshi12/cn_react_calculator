// Importing required modules and components
import { useReducer } from 'react';
import './App.css';
import DigitBtn from './components/DigitBtn';
import OperationBtn from './components/OperationBtn';
import OutputDisplay from './components/OutputDisplay';

// Action types for the reducer
export const ACTIONS = {
  USER_INPUT: 'user-inpupt',
  CLEAR: 'clear',
  CHOOSE_OPERATION: 'choose-operation',
  DELETE_DIGIT: 'delete-digit',
  GET_RESULT: 'get-result',
};

// Operation symbols
export const OPERATIONS = {
  ADD: '+',
  SUBTRACT: '−',
  MULTIPLY: '×',
  DIVIDE: '÷',
  DELETE: '⌫',
  CLEAR: 'C',
  EQUAL: '=',
};

// Reducer function to handle state changes
const reducer = (state, { type, payload }) => {
  switch (type) {
    // Handle digit input
    case ACTIONS.USER_INPUT:
      // Prevent leading zeros and multiple dots
      if (payload.digit === '0' && state.userInput === '0') {
        return state;
      }
      if (payload.digit === '.' && state.userInput.includes('.')) {
        return state;
      }
      // Update the user input and calculate the result
      const updatedUserInput = (state?.userInput || '') + payload.digit;
      return {
        ...state,
        userInput: updatedUserInput,
        result: state.operation
          ? getResult({ userInput: updatedUserInput })
          : null,
      };
    // Clear the state
    case ACTIONS.CLEAR:
      return {};

    // Handle operation input
    case ACTIONS.CHOOSE_OPERATION:
      // Skip if no user input
      if (!state.userInput) return state;
      // Logic to handle operation replacement or addition
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

    // Handle digit deletion
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

    // Handle result calculation
    case ACTIONS.GET_RESULT:
      let evaluatedResult = null;
      let finalUserInput = state.userInput;

      if (state.userInput) {
        const lastChar = state.userInput.slice(-1);
        const operationCount = Array.from(state.userInput).filter((char) =>
          Object.values(OPERATIONS).includes(char)
        ).length;

        // Do nothing if there's only one operation and it's the last character, or if there are no operations
        if (
          (operationCount === 1 &&
            Object.values(OPERATIONS).includes(lastChar)) ||
          operationCount === 0
        ) {
          return state;
        }

        // Remove the last character if it's an operation
        if (Object.values(OPERATIONS).includes(lastChar)) {
          finalUserInput = state.userInput.slice(0, -1);
        }

        evaluatedResult = getResult({ userInput: finalUserInput });
      }

      return {
        ...state,
        userInput: evaluatedResult !== null ? String(evaluatedResult) : '',
        result: null,
      };
    default:
      return state;
  }
};

// Function to evaluate the expression and format the result
const getResult = ({ userInput }) => {
  // Replace operation symbols with their JavaScript equivalents
  let expression = userInput
    ?.replace(/×/g, '*')
    .replace(/÷/g, '/')
    .replace(/−/g, '-');
  try {
    // Evaluate the expression and format the result
    let rawResult = eval(expression);
    let formattedResult = parseFloat(rawResult.toFixed(3)).toLocaleString();
    return formattedResult;
  } catch (e) {
    return 'Error';
  }
};

// Main App component
function App() {
  // Initialize state and reducer
  const initialState = {
    userInput: '',
    result: null,
    operation: null,
  };

  const [{ userInput, result }, dispatch] = useReducer(reducer, initialState);

  // Render the calculator UI
  return (
    <>
      <div className="calc-container">
        <OutputDisplay userInput={userInput} result={result} />
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
    </>
  );
}

export default App;
