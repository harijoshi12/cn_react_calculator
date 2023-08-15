import './App.css';
import DigitBtn from './components/DigitBtn';
import OperationBtn from './components/OperationBtn';

function App() {
  return (
    <div className="calc-container">
      <div className="output">
        <div className="prev-operand">234234.234jhjkhkh.23</div>
        <div className="curr-operand">curr operand</div>
      </div>
      <div className="calc-keyboard">
        <div className="row">
          <OperationBtn operation={'C'} />
          <OperationBtn operation={'%'} />
          <OperationBtn operation={'⌫'} />
          <OperationBtn operation={'÷'} />
        </div>
        <div className="row">
          <DigitBtn digit={'7'} />
          <DigitBtn digit={'8'} />
          <DigitBtn digit={'9'} />
          <OperationBtn operation={'×'} />
        </div>
        <div className="row">
          <DigitBtn digit={'4'} />
          <DigitBtn digit={'5'} />
          <DigitBtn digit={'6'} />
          <OperationBtn operation={'−'} />
        </div>
        <div className="row">
          <DigitBtn digit={'1'} />
          <DigitBtn digit={'2'} />
          <DigitBtn digit={'3'} />
          <OperationBtn operation={'+'} />
        </div>
        <div className="row">
          <DigitBtn digit={'0'} span={2} />
          <DigitBtn digit={'.'} />
          <OperationBtn operation={'='} />
        </div>
      </div>
    </div>
  );
}

export default App;
