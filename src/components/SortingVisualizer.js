import React, { useMemo , useEffect} from 'react';
import '../style/SortingVisualizer.css';
import { useSorting } from './useSorting';
import Controls from './Control';

const SortingVisualizer = () => {
	const {
		array,
		algorithm,
		steps,
		paused,
		currentStepIndex,
		sortedIndices,
		completed,

		generateNewArray,
        setAlgorithm,
        setStep,
        nextStep,
        previousStep,
        startSorting,
        pauseSorting,
        onReset,
		
	} = useSorting();


	// Memoize the bar width calculation
	const barWidth = useMemo(() => Math.max(2, 100 / array.length - 1), [array.length]);
	const color = barWidth > 5 ? "white" : "transparent";
	
	// Memoize the className calculation
	const getBarClassName = (idx) => {
		let className = 'array-bar';
		const currentStep = steps[currentStepIndex]
		if (sortedIndices.includes(idx)) {
			className += ' sorted';
		} else if (currentStep && currentStep.type === 'compare' && currentStep.indices.includes(idx)) {
			className += ' comparing';
		} else if (currentStep && currentStep.type === 'swap' && currentStep.indices.includes(idx)) {
			className += ' swapping';
		}
		return className;
	};

	return (
		<div className="sorting-visualizer" >
			<Controls
				steps={steps}
				stepGenerated= {steps.length > 1}
				paused={paused}
				completed={completed}
				currentStepIndex={currentStepIndex}
				algorithm={algorithm}

				onGenerateNewArray={generateNewArray}
				onStart={startSorting}
				onPause={pauseSorting}
				onReset={onReset}
				onNextStep={nextStep}
				onPreviousStep={previousStep}
				onAlgorithmChange={setAlgorithm}
				onSliderChange={setStep}
			/>


			<div className="array-container">
				{array.map((value, idx) => (
					<div
						key={idx}
						className={getBarClassName(idx)}
						style={{ 
							height: `${value}px`,
							width: `${barWidth}%`,
							color: color
						}}
					>
						{value}
					</div>
				))}
			</div>
		</div>
	);
};

export default React.memo(SortingVisualizer);