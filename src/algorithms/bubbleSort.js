export function bubbleSort(array) {
  const steps = [];
  let auxArray = array.slice();
  let n = auxArray.length;
  
  for (let round = 0; round < n; round++) {
    let swapped = false;
    for (let i = 0; i < n - 1 - round; i++) {
      steps.push({ array: auxArray.slice(), type: 'compare', indices: [i, i + 1] });

      if (auxArray[i] > auxArray[i + 1]) {
        steps.push({ array: auxArray.slice(), type: 'swap', indices: [i, i + 1] });

        [auxArray[i], auxArray[i + 1]] = [auxArray[i + 1], auxArray[i]];
        steps.push({ array: auxArray.slice(), type: 'swap', indices: [i, i + 1] });
        swapped = true;
      }
    }
    steps.push({ array: auxArray.slice(), type: 'sorted', indices: [n - 1 - round] }); // Mark the current last element as sorted
    if (!swapped) break;
  }

  // Mark all remaining elements as sorted (for cases where the array is already sorted or becomes sorted before the loop finishes)
  for (let i = 0; i < n; i++) {
    steps.push({ array: auxArray.slice(), type: 'sorted', indices: [i] });
  }

  return steps;
}

