import styles from "./Timer.module.css";
import { useState } from "react";

const Timer2 = () => {
  const [seconds, setSeconds] = useState(0);
  const [intervalId, setIntervalId] = useState(null);

  const handleStart = () => {
    if (intervalId === null) {
      const id = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds + 1);
      }, 1000);
      setIntervalId(id);
    }
  };

  const handlePause = () => {
    if (intervalId !== null) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
  };

  const handleReset = () => {
    setSeconds(0);
    if (intervalId !== null) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Temporizador 2</h1>
      <p>{seconds} segundos</p>

      <div className={styles.divButton}>
        <button onClick={handleStart}>Iniciar</button>
        <button onClick={handlePause}>Pausar</button>
        <button onClick={handleReset}>Reiniciar</button>
      </div>
    </div>
  );
};

export default Timer2;
