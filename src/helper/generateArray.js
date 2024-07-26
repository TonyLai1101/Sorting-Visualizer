export const generateRandomArray = (size) => {
  console.log("Running generateRandomArray Func")
  const array = [];
  for (let i = 0; i < size; i++) {
    array.push(randomIntFromInterval(100, 500));
  }
  return array;
};

const randomIntFromInterval = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};
