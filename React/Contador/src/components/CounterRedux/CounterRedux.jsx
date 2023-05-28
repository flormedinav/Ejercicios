import { useDispatch, useSelector } from "react-redux";
import { increaseCounter, decreaseCounter } from "../../redux/actions";
import styles from "./CounterRedux.module.css";

function CounterRedux() {
  const counter = useSelector((state) => state.counter);
  const dispatch = useDispatch();

  const handleClickIncrease = () => {
    dispatch(increaseCounter());
  };

  const handleClickDecrease = () => {
    if (counter > 0) {
      dispatch(decreaseCounter());
    }
  };

  return (
    <div className={styles.container}>
      <h1>Contador Redux</h1>
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

export default CounterRedux;
