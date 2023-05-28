import { useState } from "react";

const Timer = () => {
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
    if (intervalId !== null) {
      setSeconds(0);
      clearInterval(intervalId);
      setIntervalId(null);
    }
  };

  return (
    <div>
      <h1>Repaso temporizador 2</h1>
      <p>{seconds} segundos</p>

      <div>
        <button onClick={handleStart}>Iniciar</button>
        <button onClick={handlePause}>Pausar</button>
        <button onClick={handleReset}>Reiniciar</button>
      </div>
    </div>
  );
};

export default Timer;

/* 
Al iniciar el temporizador, se ejecuta la función handleStart.

Dentro de handleStart, se verifica si el estado intervalId es null, lo que indica que el temporizador no está activo.

Si intervalId es null, se crea un nuevo intervalo utilizando setInterval. La función pasada a setInterval es una función que incrementa los segundos en 1 utilizando setSeconds.

El segundo argumento de setInterval es el intervalo de tiempo en milisegundos, en este caso, 1000ms (1 segundo).

El resultado de setInterval es el identificador único del intervalo creado, que se almacena en la variable id.

A continuación, se asigna id al estado intervalId utilizando setIntervalId(id), lo que indica que el temporizador está activo.

El temporizador ahora comenzará a incrementar los segundos en 1 cada segundo.

Al hacer clic en el botón "Pausar", se ejecuta la función handlePause.

Dentro de handlePause, se verifica si el estado intervalId es diferente de null, lo que indica que el temporizador está activo.

Si intervalId no es null, se utiliza clearInterval(intervalId) para detener y limpiar el intervalo.
Además, se establece intervalId como null utilizando setIntervalId(null), lo que indica que el temporizador está pausado.

Al hacer clic en el botón "Reiniciar", se ejecuta la función handleReset.

Dentro de handleReset, se verifica si el estado intervalId es diferente de null, lo que indica que el temporizador está activo.

Si intervalId no es null, se utiliza clearInterval(intervalId) para detener y limpiar el intervalo.

Luego, se establece seconds en 0 utilizando setSeconds(0) para restablecer los segundos a cero.

Finalmente, se establece intervalId como null utilizando setIntervalId(null), indicando que el temporizador está reiniciado y pausado.

Al utilizar clearInterval(intervalId), se detiene y se elimina el intervalo creado por setInterval. Si no se utiliza clearInterval, el temporizador continuaría ejecutándose incluso si el estado intervalId es null, lo que podría generar comportamientos inesperados o fugas de memoria. Es importante limpiar los intervalos cuando ya no se necesiten para evitar problemas.

*/
