import { useState } from "react";
import styles from "./Timer.module.css";

const Timer3 = () => {
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [timeoutId, setTimeoutId] = useState(null);

  const startTimer = () => {
    setTimeoutId(
      setTimeout(() => {
        setSeconds((prevSeconds) => prevSeconds + 1);
        startTimer();
      }, 1000)
    );
  };
  
  const handleStart = () => {
    if (!isActive) {
      setIsActive(true);
      startTimer();
    }
  };

  function handlePause() {
    if (isActive && seconds !== 0) {
      setIsActive(false);
      clearInterval(timeoutId);
      setTimeoutId(null);
    }
  }

  const handleReset = () => {
    setSeconds(0);
    if (isActive) {
      setIsActive(false);
      clearTimeout(timeoutId);
      setTimeoutId(null);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Temporizador 3</h1>
      <p>{seconds} segundos</p>

      <div className={styles.divButton}>
        <button onClick={handleStart}>Iniciar</button>
        <button onClick={handlePause}>Pausar</button>
        <button onClick={handleReset}>Reiniciar</button>
      </div>
    </div>
  );
};

export default Timer3;
