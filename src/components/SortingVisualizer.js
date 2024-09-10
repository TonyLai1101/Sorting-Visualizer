import React, { useMemo , useEffect} from 'react';
import '../style/SortingVisualizer.css';
import { useSorting } from './useSorting';
import Controls from './Control';
import Bars from './Bars'
import ExplanationSection from './ExplanationSection';


const SortingVisualizer = () => {
	const {
		array,
		algorithm,
		steps,
		paused,
		currentStepIndex,
		completed,
		pseudoCode,
		isExplanationOpen,

		generateNewArray,
        setAlgorithm,
        setStep,
        startSorting,
        pauseSorting,
        onReset,
		toggleExplanation,

		

		explanation

		
	} = useSorting();
	//   const toggleExplanation = () => setIsExplanationOpen(!isExplanationOpen);

	


	// This component visualizes sorting algorithms
	// It uses the useSorting hook to manage the sorting state and operations
	// The Controls component handles user interactions
	// The Bars component renders the visual representation of the array
	return (
		<div className="sorting-visualizer">
			<div className="controls">
				<Controls
					steps={steps}
					stepGenerated={steps.length > 1}
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
					toggleExplanation={toggleExplanation}
					isExplanationOpen={isExplanationOpen}
				/>
			</div>

			<div className="top-section">{isExplanationOpen && <ExplanationSection step={steps[currentStepIndex]} pseudoCode={pseudoCode} />}</div>
			<div className="bars-container">
				<Bars array={array} step={steps[currentStepIndex]} algorithm={algorithm} />
			</div>
		</div>
	);
};

export default React.memo(SortingVisualizer);