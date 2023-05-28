import { INCREASE, DECREASE } from "./actionsTypes";

export const increaseCounter = () => {
  return { type: INCREASE };
};

export const decreaseCounter = () => {
  return { type: DECREASE };
};
