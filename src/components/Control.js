import React from 'react';
import '../style/Control.css';
import ControlButtons from './ControlButtons';
import AlgorithmSelector from './AlgorithmSelector';

const Controls = ({
        stepGenerated,
        sorting,
        paused,
        completed,
        currentStepIndex,
        stepCount,
        speed,
        algorithm,

        onGenerateNewArray,
        onStart,
        onPause,
        onReset,
        onNextStep,
        onPreviousStep,
        onSpeedChange,
        onAlgorithmChange,
        
}) => (
    <div className="controls">
        <button onClick={() => onGenerateNewArray(10)} disabled={sorting && !paused}>Generate New Array</button>

        <AlgorithmSelector algorithm={algorithm} onAlgorithmChange={onAlgorithmChange} />
        <input
            type="range"
            min="1"
            max="100"
            onChange={(e) => onSpeedChange(e.target.value)}
            disabled={sorting && !paused}
        />
        <div id="arraySize">Change Array Size
            <input
                type="range"
                min="5"
                max="50"
                onChange={(sizeValue) => onGenerateNewArray(sizeValue.target.value)}
                disabled={sorting && !paused}
                defaultValue={10}
            />
        </div>
        <ControlButtons
            onStart={onStart}
            onPause={onPause}
            onReset={onReset}
            onNextStep={onNextStep}
            onPreviousStep={onPreviousStep}
            sorting={sorting}
            paused={paused}
            completed={completed}
            currentStepIndex={currentStepIndex}
            stepCount={stepCount}
            stepGenerated = {stepGenerated}
        />
    </div>
);

export default Controls;