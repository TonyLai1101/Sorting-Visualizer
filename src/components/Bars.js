import React, { useMemo } from 'react';
import '../style/Bars.css';

const Bars = ({ array, step, algorithm }) => {

	const getBarColor = (idx,value) => {
		switch (algorithm) {
			case "bubbleSort":
				return getBubbleSortColor(idx, step);
			case "insertionSort":
				return getInsertionSortColor(idx,step);
			case "selectionSort":
				return getSelectionSortColor(idx, step);
			// case "quickSort":
			// 	return getQuickSortColor( value, step);
			// case "mergeSort":
			// 	return getMergeSortColor(value, step);
			// Add cases for other algorithms
			default:
				return "#1da4f2"; // Default blue color
		}
	};
	const getBubbleSortColor = (idx, step) => {
		// console.log("step:", step, "value", value, "index:", idx);
		if (step.sorted_indices?.includes(idx)) return "green";
		if (step.swap_indices?.includes(idx)) return "red";
		if (step.compare_indices?.includes(idx)) return "yellow";
		return "#1da4f2"; // Default blue color
	};

	const getSelectionSortColor = (idx, step) => {
		if (step.sorted_indices?.includes(idx)) return "green"; // Sorted elements
		if (step.current_min?.includes(idx)) return "red"; // Sorted elements
		if (step.action === "compare" && step.indices.includes(idx)) return "orange"; // Picked up element (key)
		if (step.action === "swap" && step.indices?.includes(idx)) return "red"; // Elements being shifted
		if (step.action === "insert" && step.indices.includes(idx)) return "blue"; // Inserted element (key)
		return "#1da4f2"; // Default color
	};


	const getInsertionSortColor = (idx, step) => {
		if (step.sorted_indices?.includes(idx)) return "green"; // Sorted elements
		if (step.action === "pick-up" && step.indices.includes(idx)) return "orange"; // Picked up element (key)
		if (step.action === "shift" && step.compare_indices?.includes(idx)) return "red"; // Elements being shifted
		if (step.action === "insert" && step.indices.includes(idx)) return "blue"; // Inserted element (key)
		return "#1da4f2"; // Default color
	}

	// Memoize the bar width calculation
	const barWidth = useMemo(() => Math.max(2, 100 / array.length - 1), [array.length]);

	return (
		<div className="array-container">
			{array.map((value, idx) => (
				<div
					key={idx}
					className="array-bar"
					style={{
						height: `${value*5}px`,
						width: `${barWidth}%`,
						backgroundColor: getBarColor(idx, value),
					}}
				>
					{value}
				</div>
			))}
		</div>
	);
      }
export default React.memo(Bars);