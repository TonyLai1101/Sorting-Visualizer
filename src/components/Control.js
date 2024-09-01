import React from 'react';
import '../style/Control.css';
import ControlButtons from './ControlButtons';
import AlgorithmSelector from './AlgorithmSelector';

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
        
}) => (
    <div className="controls">
        <button  onClick={() => onGenerateNewArray(10)} disabled={!paused && !completed}>Generate New Array</button>

        <AlgorithmSelector algorithm={algorithm} onAlgorithmChange={onAlgorithmChange} disabled={!paused}/>
       
        <div id="arraySize">Change Array Size
            <input
                type="range"
                min="5"
                max="50"
                onChange={(sizeValue) => onGenerateNewArray(sizeValue.target.value)}
                disabled={!paused}
                defaultValue={10}
            />
        </div>
            <div className="process-slider">
      <input
        type="range"
        min="0"
        max={steps.length - 1}
        value={currentStepIndex}
        onChange={(e) => onSliderChange(Number(e.target.value))}
        disabled={!paused}
      />
      <span>Step: {currentStepIndex + 1} / {steps.length}</span>
    </div>
        <ControlButtons
            onStart={onStart}
            onPause={onPause}
            onReset={onReset}
            onNextStep={onNextStep}
            onPreviousStep={onPreviousStep}
            paused={paused}
            completed={completed}
            currentStepIndex={currentStepIndex}
            stepGenerated = {stepGenerated}
        />
    </div>
);

export default React.memo(Controls);