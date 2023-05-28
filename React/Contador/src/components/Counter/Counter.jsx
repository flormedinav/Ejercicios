import styles from "./Counter.module.css";
import { useState } from "react";

function Counter() {
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
    <div className={styles.container}>
      <h1>Contador</h1>
      <p>
        <strong>{counter}</strong>
      </p>
      <div className={styles.divButton}>
        <button onClick={handleClickIncrease}>+</button>
        <button onClick={handleClickDecrease}>-</button>
      </div>
    </div>
  );
}

export default Counter;
