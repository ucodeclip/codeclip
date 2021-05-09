import { Breakpoint } from "constants/constants";
export const mq = (min, size) => {
  const mw = min === "min" ? Breakpoint[size] : Breakpoint[size] - 1;

  return `@media screen and (${min}-width:${mw}px)`;
};

export const calcSpVw = (size) => {
  const vw = (size / 750) * 100;
  const roundVw = Math.round(vw * 100) / 100;
  return roundVw + "vw";
};
