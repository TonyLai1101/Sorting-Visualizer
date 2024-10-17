export function selectionSort(arr) {
	const n = arr.length;
	const auxArray = arr.slice();
	const steps = [];
	let sortedIndices = [];
	let minIndex;

	const pseudoCode = [
		{ code: "for i = 0 to array.length - 1", action: "initialize" },
		{ code: "  minIndex = i", action: "initialize" },
		{ code: "  for j = i + 1 to array.length", action: "initialize" },
		{ code: "    if array[j] < array[minIndex]", action: "compare" },
		{ code: "      minIndex = j", action: "select new min" },
		{ code: "  swap(array[i], array[minIndex])", action: "swap" },
	];

	for (let i = 0; i < n - 1; i++) {
		minIndex = i;
		steps.push({
			array: auxArray.slice(),
			action: "initialize",
			indices: [i],
			explanation: {
				__html: `
					<div>Start iterating from index <b>i = ${i}</b>. Set <b>minIndex = ${minIndex}</b>.</div>
					<p>Current variables: <span class="variables">i: ${i}, minIndex: ${minIndex}</span></p>`,
			},
			sorted_indices: [...sortedIndices],
			current_min: [minIndex],
		});

		// Find the minimum element in the unsorted part of the array
		for (let j = i + 1; j < n; j++) {
			const currentElement = auxArray[j];
			const currentMinElement = auxArray[minIndex];

			steps.push({
				array: auxArray.slice(),
				action: "compare",
				indices: [j],
				explanation: {
					__html: `
						<div>Checking if element at index <b>j = ${j}</b> (${currentElement}) < current min at index <b>minIndex = ${minIndex}</b> (${currentMinElement}). 
                        <b>${currentElement < currentMinElement ? "YES, need to update" : "NO, do not need to update"}</b></div>
						<p>Current variables: <span class="variables">i: ${i}, j: ${j}, minIndex: ${minIndex}</span></p>`,
				},
				sorted_indices: [...sortedIndices],
				current_min: [minIndex],
			});

			if (currentElement < currentMinElement) {
				minIndex = j;
				steps.push({
					array: auxArray.slice(),
					action: "select new min",
					indices: [minIndex],
					explanation: {
						__html: `
							<div>New minimum found at index <b>minIndex = ${minIndex}</b> (${auxArray[minIndex]}).</div>
							<p>Current variables: <span class="variables">i: ${i}, j: ${j}, minIndex: ${minIndex}</span></p>`,
					},
					sorted_indices: [...sortedIndices],
				    current_min: [minIndex],
				});
			}
		}

		// Swap the found minimum element with the first unsorted element
		if (minIndex !== i) {
			const elementAtI = auxArray[i];
			const elementAtMinIndex = auxArray[minIndex];

            steps.push({
				array: auxArray.slice(),
				action: "swap",
				indices: [i, minIndex],
				explanation: {
					__html: `
						<div>Swapped elements at index <b>i = ${i}</b> (${elementAtI}) and index <b>minIndex = ${minIndex}</b> (${elementAtMinIndex}).</div>
						<p>Current variables: <span class="variables">i: ${i}, minIndex: ${minIndex}</span></p>`,
				},
				sorted_indices: [...sortedIndices],
			});

			[auxArray[i], auxArray[minIndex]] = [auxArray[minIndex], auxArray[i]];

			steps.push({
				array: auxArray.slice(),
				action: "swap",
				indices: [i, minIndex],
				explanation: {
					__html: `
						<div>Swapped elements at index <b>i = ${i}</b> (${elementAtI}) and index <b>minIndex = ${minIndex}</b> (${elementAtMinIndex}).</div>
						<p>Current variables: <span class="variables">i: ${i}, minIndex: ${minIndex}</span></p>`,
				},
				sorted_indices: [...sortedIndices],
			});
		}

		// Mark the element at index i as sorted
		sortedIndices.push(i);
		steps.push({
			array: auxArray.slice(),
			action: "sorted",
			indices: [i],
			explanation: {
				__html: `<div>Element at index <b>i = ${i}</b> is now sorted.</div>
						 <p>Current variables: <span class="variables">i: ${i}</span></p>`,
			},
			sorted_indices: [...sortedIndices],
		});
	}

	// Mark the last element as sorted
	sortedIndices.push(n - 1);
	steps.push({
		array: auxArray.slice(),
		action: "sorted",
		indices: [n - 1],
		explanation: {
			__html: `<div>Array is fully sorted. The last element at index <b>${n - 1}</b> is sorted.</div>`,
		},
		sorted_indices: [...sortedIndices],
	});

	return { steps, pseudoCode };
}
