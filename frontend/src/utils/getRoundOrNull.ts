const getRoundOrNull = (num: number | null) =>
  num !== null ? Math.round(num) : null;

export default getRoundOrNull;
