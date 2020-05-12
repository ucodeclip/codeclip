export const calcSpVw = (size) => {
  const vw = (size/ 750) * 100
  const roundVw = Math.round(vw * 100)/100;
  return roundVw + 'vw';
}