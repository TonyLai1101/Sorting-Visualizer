export function bubbleSort(arr) {
	const n = arr.length;
	const auxArray = arr.slice();
	const steps = [];
	let sortedIndices = new Set();
	
	const pseudoCode = [
	{ code: "for i = 0 to array.length-1", action: "initialize" },
	{ code: "  swapped = false", action: "initialize" },
	{ code: "  for j = 0 to n - i - 1 (Length of Unsort Element)", action: "compare" },
	{ code: "    if leftElement > rightElement", action: "compare" },
	{ code: "      swap(leftElement, rightElement)", action: "swap" },
	{ code: "      swapped = true", action: "swap" },
	{ code: "  if not swapped", action: "sorted" },
	{ code: "    break", action: "sorted" },
];

	for (let i = 0; i < n - 1; i++) {
		let swapped = false;
		for (let j = 0; j < n - i - 1; j++) {
			const isGreater = auxArray[j] > auxArray[j + 1];

			steps.push({
				array: auxArray.slice(),
				type: "compare",
				indices: [j, j + 1],
				action: "compare",
				explanation: {
					__html: `<div>If ${auxArray[j]} > ${auxArray[j + 1]} => <b>${isGreater ? "YES" : "NO"}<b></div>`,
				},
			});
			if (auxArray[j] > auxArray[j + 1]) {
				[auxArray[j], auxArray[j + 1]] = [auxArray[j + 1], auxArray[j]];
				steps.push({
					array: auxArray.slice(),
					type: "swap",
					indices: [j, j + 1],
					action: "swap",
					explanation: {
						__html: `<div>Swapped ${auxArray[j + 1]} and ${auxArray[j]}; <b>swapped</b> = ${swapped}.</div>`,
					},
				});
				swapped = true;
			}
		}

		// Mark the last unsorted element as sorted
		const lastUnsortedIndex = n - i - 1;
		if (!sortedIndices.has(lastUnsortedIndex)) {
			steps.push({
				array: auxArray.slice(),
				type: "sorted",
				indices: [lastUnsortedIndex],
			});
			sortedIndices.add(lastUnsortedIndex);
		}

		if (!swapped) break; // If no swapping occurred, array is sorted
	}

	// Mark any remaining unsorted elements
	let unsorted = [];
	for (let i = 0; i < n; i++) {
		if (!sortedIndices.has(i)) {
			unsorted.push(i);
		}
	}
	steps.push({ array: auxArray.slice(), type: "sorted", indices: unsorted });

  	return { steps, pseudoCode };
}
