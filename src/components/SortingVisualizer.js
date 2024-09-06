import React, { useMemo , useEffect} from 'react';
import '../style/SortingVisualizer.css';
import { useSorting } from './useSorting';
import Controls from './Control';
import Bars from './Bars'

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
        startSorting,
        pauseSorting,
        onReset,
		
	} = useSorting();

	// This component visualizes sorting algorithms
	// It uses the useSorting hook to manage the sorting state and operations
	// The Controls component handles user interactions
	// The Bars component renders the visual representation of the array
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
				onReset={setStep}
				onNextStep={setStep}
				onPreviousStep={setStep}
				onAlgorithmChange={setAlgorithm}
				onSliderChange={setStep}
			/>

        	<Bars
          		array={array}
          		steps={steps}
          		currentStepIndex={currentStepIndex}
          		sortedIndices={sortedIndices}
        	/>
      		

			
		</div>
	);
};

export default React.memo(SortingVisualizer);