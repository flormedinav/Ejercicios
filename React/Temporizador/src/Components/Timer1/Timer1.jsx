import styles from "./Timer.module.css";
import { useEffect, useState } from "react";

function Timer1() {
  //Estado es para almacenar los segundos transcurridos
  const [seconds, setSeconds] = useState(0);
  //Estado para controlar que el temporizador esté activo o no
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval = null;

    // El efecto se ejecuta cuando cambia el estado de 'isActive' o 'seconds'
    if (isActive) {
      // Si el temporizador está activo, se crea un intervalo que incrementa los segundos en 1 cada 1000ms (1 segundo)
      interval = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds + 1);
      }, 1000);
      // Si el temporizador está pausado y los segundos no son cero, se limpia el intervalo
      // } else if (!isActive && seconds !== 0) {
      //   clearInterval(interval);
      // }
    }
    // La función de retorno del efecto se ejecuta cuando se desmonta el componente o cuando cambia el estado de 'isActive' o 'seconds'
    // La función de retorno del efecto se encarga de limpiar el intervalo al desmontar el componente o cuando cambia el estado de isActive o seconds.
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  // Manejador de evento para iniciar el temporizador
  const handleStart = () => {
    setIsActive(true);
  };

  // Manejador de evento para pausar el temporizador
  const handlePause = () => {
    setIsActive(false);
  };

  // Manejador de evento para reiniciar el temporizador
  const handleReset = () => {
    setSeconds(0);
    setIsActive(false);
  };

  return (
    <div className={styles.container}>
      <h1>Temporizador</h1>
      <p>{seconds} segundos</p>

      <div className={styles.divButton}>
        <button onClick={handleStart}>Iniciar</button>
        <button onClick={handlePause}>Pausar</button>
        <button onClick={handleReset}>Reiniciar</button>
      </div>
    </div>
  );
}

export default Timer1;

/*

El useEffect se utiliza para ejecutar código adicional cuando se producen cambios en las dependencias especificadas, en este caso, isActive y seconds.

let interval = null;: Aquí se declara una variable interval e inicialmente se le asigna el valor null. Esta variable se utilizará para almacenar el identificador del intervalo creado por setInterval.

if (isActive) { ... }: Si el estado isActive es true, se ejecuta el bloque de código dentro de este if. Aquí, utilizamos setInterval para crear un nuevo intervalo que se ejecuta cada 1000 ms (1 segundo). En cada ejecución del intervalo, incrementamos los segundos mediante setSeconds utilizando la función de actualización del estado anterior (prevSeconds) => prevSeconds + 1.

else if (!isActive && seconds !== 0) { ... }: Si el estado isActive es false y los segundos no son cero, se ejecuta este bloque de código. Aquí, llamamos a clearInterval(interval) para detener el intervalo previamente creado.

return () => clearInterval(interval);: Esta es la función de retorno del useEffect. Se ejecuta cuando el componente se desmonta o cuando cambian las dependencias del useEffect. En este caso, se utiliza para limpiar el intervalo creado, asegurándose de que no siga ejecutándose después de que el componente se haya desmontado o cuando cambien las dependencias.

Resumiendo, el useEffect se encarga de controlar el inicio y la pausa del temporizador. Cuando isActive es true, se crea un nuevo intervalo que incrementa los segundos cada segundo. Cuando isActive se vuelve false, el intervalo se limpia y deja de ejecutarse. La función de retorno garantiza que el intervalo se limpie adecuadamente cuando el componente se desmonte o cuando cambien las dependencias.
*/
