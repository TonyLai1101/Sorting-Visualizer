import React from "react";
import "../style/Control.css";
import ControlButtons from "./ControlButtons";
import AlgorithmSelector from "./AlgorithmSelector";

const Controls = ({
	stepGenerated,
	paused,
	completed,
	currentStepIndex,
	steps,
	algorithm,
	onGenerateNewArray,
	onStart,
	onPause,
	onReset,
	onNextStep,
	onPreviousStep,
	onAlgorithmChange,
	onSliderChange,
	isExplanationOpen,
   toggleExplanation,
}) => (
	<div className="controls">
		<button onClick={() => onGenerateNewArray(10)} disabled={!paused && !completed}>
			Generate New Array
		</button>
		<AlgorithmSelector algorithm={algorithm} onAlgorithmChange={onAlgorithmChange} disabled={!paused} />
		<div className="sliders-wrapper">
			<div className="slider-container">
				<label htmlFor="arraySize">Array Size</label>
				<input
					id="arraySize"
					type="range"
					min="5"
					max="20"
					onChange={(e) => onGenerateNewArray(e.target.value)}
					disabled={!paused}
					defaultValue={10}
				/>
			</div>

			<div className="slider-container">
				<label htmlFor="progressSlider">Progress</label>
				<input
					id="progressSlider"
					type="range"
					min="0"
					max={steps.length - 1}
					value={currentStepIndex}
					onChange={(e) => onSliderChange(Number(e.target.value))}
					disabled={!paused}
				/>
				<span>
					Step: {currentStepIndex + 1} / {steps.length}
				</span>
			</div>
		</div>

		<div className="control-buttons">
			<ControlButtons
				onStart={onStart}
				onPause={onPause}
				onReset={onReset}
				onNextStep={onNextStep}
				onPreviousStep={onPreviousStep}
				paused={paused}
				completed={completed}
				currentStepIndex={currentStepIndex}
				stepGenerated={stepGenerated}
				isExplanationOpen={isExplanationOpen}
				toggleExplanation={toggleExplanation}
			/>
		</div>
	</div>
);

export default React.memo(Controls);
