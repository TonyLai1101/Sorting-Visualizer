export function bubbleSort(arr) {
  const n = arr.length;
  const auxArray = arr.slice();
  const steps = [];
  let sortedIndices = new Set();
  for (let i = 0; i < n - 1; i++) {
    let swapped = false;
    for (let j = 0; j < n - i - 1; j++) {
      steps.push({ array: auxArray.slice(), type: 'compare', indices: [j, j + 1] });
      if (auxArray[j] > auxArray[j + 1]) {
        [auxArray[j], auxArray[j + 1]] = [auxArray[j + 1], auxArray[j]];
        steps.push({ array: auxArray.slice(), type: 'swap', indices: [j, j + 1] });
        swapped = true;
      }
    }
    
    // Mark the last unsorted element as sorted
    const lastUnsortedIndex = n - i - 1;
    if (!sortedIndices.has(lastUnsortedIndex)) {
      steps.push({ array: auxArray.slice(), type: 'sorted', indices: [lastUnsortedIndex] });
      sortedIndices.add(lastUnsortedIndex);
    }

    if (!swapped) break;  // If no swapping occurred, array is sorted
  }

  // Mark any remaining unsorted elements
  let unsorted = [];
  for (let i = 0; i < n; i++) {
    if (!sortedIndices.has(i)) {
      unsorted.push(i)
    }
  }
  steps.push({ array: auxArray.slice(), type: 'sorted', indices: unsorted });

  return steps;
}

