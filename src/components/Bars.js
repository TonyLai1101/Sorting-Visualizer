import React, { useMemo } from 'react';
import '../style/Bars.css';

const Bars = ({ array, step, algorithm }) => {

	const getBarColor = (idx,value) => {
		switch (algorithm) {
			case "bubbleSort":
				return getBubbleSortColor(idx,value, step);
			// case "quickSort":
			// 	return getQuickSortColor( value, step);
			// case "mergeSort":
			// 	return getMergeSortColor(value, step);
			// Add cases for other algorithms
			default:
				return "#1da4f2"; // Default blue color
		}
	};
  // if (step) {
	// 	console.log("test", step.compare_indices);
  // }
	const getBubbleSortColor = (idx,value, step) => {
		// console.log("step:", step, "value", value, "index:", idx);
		if (step.sorted_indices?.includes(idx)) return "green";
		if (step.swap_indices?.includes(idx)) return "red";
		if (step.compare_indices?.includes(idx)) return "yellow";
		return "#1da4f2"; // Default blue color
	};

	// const getQuickSortColor = (index, value, step) => {
	// 	if (step.sortedIndices?.includes(index)) return "green";
	// 	if (index === step.pivotIndex) return "yellow";
	// 	if (index === step.storeIndex) return "purple";
	// 	if (step.indices?.includes(index)) return "red";
	// 	return "blue";
	// };

	// const getMergeSortColor = (index, step) => {
	// 	if (step.sortedIndices?.includes(index)) return "green";
	// 	if (step.leftArray?.includes(index)) return "orange";
	// 	if (step.rightArray?.includes(index)) return "pink";
	// 	return "blue";
	// };



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