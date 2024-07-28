export function generateRandomArray (size) {
  console.log("Running generateRandomArray Func")
  const array = [];
  for (let i = 0; i < size; i++) {
    array.push(randomIntFromInterval(100, 300));
  }
  console.log(array)
  return array;
};

const randomIntFromInterval = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};
