export function insertionSort(arr) {
	const n = arr.length;
	const auxArray = arr.slice();
	const steps = [];
	let sortedIndices = [];

	const pseudoCode = [
		{ code: "for i = 1 to array.length - 1", action: "" },
		{ code: "  key = array[i]", action: "set key" },
		{ code: "  j = i - 1", action: "set j" },
		{ code: "  while j >= 0 and array[j] > key", action: "compare" },
		{ code: "    array[j + 1] = array[j]", action: "shift" },
		{ code: "    j--", action: "decrement j" },
		{ code: "  array[j + 1] = key", action: "insert key" },
	];

	for (let i = 1; i < n; i++) {
		const key = auxArray[i];
		let j = i - 1;

		// Pick up the key element
		steps.push({
			array: auxArray.slice(),
			action: "pick-up",
			indices: [i],
			explanation: {
				__html: `<div>Pick the key <b>${key}</b> at index ${i}</div>`,
			},
			sorted_indices: [...sortedIndices],
		});

		while (j >= 0 && auxArray[j] > key) {
			auxArray[j + 1] = auxArray[j]; // Shift element to the right
			steps.push({
				array: auxArray.slice(),
				action: "shift",
				compare_indices: [j, j + 1],
				explanation: {
					__html: `<div>Shift ${auxArray[j]} to index ${j + 1}</div>`,
				},
				sorted_indices: [...sortedIndices],
			});
			j--;
		}

		auxArray[j + 1] = key; // Insert the key in its sorted position
		steps.push({
			array: auxArray.slice(),
			action: "insert",
			indices: [j + 1],
			explanation: {
				__html: `<div>Insert key <b>${key}</b> at index ${j + 1}</div>`,
			},
			sorted_indices: [...sortedIndices],
		});

		// Mark the sorted elements
		sortedIndices.push(i);
	}

	return { steps, pseudoCode };
}
