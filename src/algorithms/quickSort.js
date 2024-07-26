export function quickSort(array) {
  const steps = [];
  const auxArray = array.slice();

  function partition(low, high) {
    const pivot = auxArray[high];
    let i = low - 1;
    for (let j = low; j < high; j++) {
      steps.push({ array: auxArray.slice(), type: 'compare', indices: [j, high] });
      if (auxArray[j] < pivot) {
        i++;
        [auxArray[i], auxArray[j]] = [auxArray[j], auxArray[i]];
        steps.push({ array: auxArray.slice(), type: 'swap', indices: [i, j] });
      }
    }
    [auxArray[i + 1], auxArray[high]] = [auxArray[high], auxArray[i + 1]];
    steps.push({ array: auxArray.slice(), type: 'swap', indices: [i + 1, high] });
    return i + 1;
  }

  function quickSortHelper(low, high) {
    if (low < high) {
      const pi = partition(low, high);
      quickSortHelper(low, pi - 1);
      quickSortHelper(pi + 1, high);
    }
  }

  quickSortHelper(0, auxArray.length - 1);

  // Mark all elements as sorted
  for (let i = 0; i < auxArray.length; i++) {
    steps.push({ array: auxArray.slice(), type: 'sorted', indices: [i] });
  }

  return steps;
}
