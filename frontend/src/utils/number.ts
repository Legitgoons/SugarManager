const extractNumber = (str: string) => {
  const matches = str.match(/\d+(\.\d+)?/);
  return matches ? Number(matches[0]) : 0;
};

export default extractNumber;
