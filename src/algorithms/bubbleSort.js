export function bubbleSort(arr) {
	const n = arr.length;
	const auxArray = arr.slice();
	const steps = [];
  	let sortedIndices = [];

	const pseudoCode = [
		{ code: "for i = 0 to array.length-1", action: "" },
		{ code: "  swapped = false", action: "initialize" },
		{ code: "  for j = 0 to array.length - i - 1 (Length of Unsort Element)", action: "initialize" },
		{ code: "    if leftElement > rightElement", action: "compare" },
		{ code: "      swap(leftElement, rightElement)", action: "swap" },
		{ code: "      swapped = true", action: "swap" },
		{ code: "  if not swapped", action: "sorted" },
		{ code: "    break", action: "sorted" },
	];


	for (let i = 0; i < n - 1; i++) {
		let swapped = false;
		steps.push({
			array: auxArray.slice(),
			type: "",
			indices: [],
			action: "initialize",
			explanation: {
				__html: `<div>Set <b>swapped</b> = <span style="color: red;">false</span></div> 
						 <div>Then iterate from 0 to ${n - i - 1}</div>
						 <p>Current variables:</p>
          					    <ul>
          					      <li>i: ${i}</li>
          					      <li>swapped: ${swapped}</li>
          					    </ul>`,
			},
			sorted_indices: [...sortedIndices],
		});
		
		for (let j = 0; j < n - i - 1; j++) {
			const isGreater = auxArray[j] > auxArray[j + 1];

			steps.push({
				array: auxArray.slice(),
				action: "compare",
				compare_indices: [j, j + 1],
				explanation: {
					__html: `
          					  <div>
          					    <p>Check if ${auxArray[j]} > ${auxArray[j + 1]} ?  => <b>${isGreater ? "YES, need to swap" : "NO, do not need to swap"}</b></p>
          					    <p>Current variables:</p>
          					    <ul>
          					      <li>i: ${i}</li>
          					      <li>j: ${j}</li>
          					      <li>swapped: ${swapped}</li>
          					    </ul>
          					  </div>
          					`,
				},
				sorted_indices: [...sortedIndices],
			});
			if (auxArray[j] > auxArray[j + 1]) {
				[auxArray[j], auxArray[j + 1]] = [auxArray[j + 1], auxArray[j]];
				swapped = true;
				steps.push({
					array: auxArray.slice(),
					swap_indices: [j, j + 1],
					action: "swap",
					explanation: {
						__html: `<div>Swapped ${auxArray[j + 1]} and ${auxArray[j]}; <b>swapped</b> = ${swapped}.</div>
						<p>Current variables:</p>
                <ul>
                  <li>i: ${i}</li>
                  <li>j: ${j}</li>
                  <li>swapped: ${swapped}</li>
                </ul>`,
					},
					sorted_indices: [...sortedIndices],
				});
				
			}
		}

		// Mark the last unsorted element as sorted
		const lastUnsortedIndex = n - i - 1;
		if (!sortedIndices.includes(lastUnsortedIndex)) {
			sortedIndices.push(lastUnsortedIndex);
			steps.push({
				array: auxArray.slice(),
				type: "sorted",
				sorted_indices: [...sortedIndices],
				explanation: {
					__html: `<div>This element is sorted</div>
					<p>Current variables:</p>
                <ul>
                  <li>i: ${i}</li>
                  <li>j: </li>
                  <li>swapped: ${swapped}</li>
                </ul>`,
				},
			});
			
		}

		if (!swapped) break; // If no swapping occurred, array is sorted
	}

	// Mark any remaining unsorted elements
	let unsorted = [];
	for (let i = 0; i < n; i++) {
		if (!sortedIndices.includes(i)) {
			sortedIndices.push(i);
		}
	}
	steps.push({
		array: auxArray.slice(),
		type: "sorted",
		sorted_indices: [...sortedIndices],
		explanation: {
			__html: `<div>Done !</div>`,
		},
	});

  	return { steps, pseudoCode };
}
