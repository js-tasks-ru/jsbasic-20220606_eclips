function getMinMax(str) {
  let onlyNumbers = str.split(" ").filter(  (word) => !isNaN(Number(word)) ).map(Number);
  return { "min" : Math.min(...onlyNumbers), "max" : Math.max(...onlyNumbers) };
}