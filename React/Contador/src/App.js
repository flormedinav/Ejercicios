import "./App.css";
import { useState } from "react";

function App() {
  const [counter, setCounter] = useState(0);

  const handleClickIncrease = () => {
    setCounter(counter + 1);
  };

  const handleClickDecrease = () => {
    if (counter > 0) {
      setCounter(counter - 1);
    }
  };

  return (
    <div className="container">
      <h1>Contador</h1>
      <p>
        <strong>{counter}</strong>
      </p>
      <div className="divButton">
        <button onClick={handleClickIncrease}>+</button>
        <button onClick={handleClickDecrease}>-</button>
      </div>
    </div>
  );
}

export default App;
