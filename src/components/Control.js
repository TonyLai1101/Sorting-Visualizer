import React from 'react';
import '../style/Control.css';
import ControlButtons from './ControlButtons';
import AlgorithmSelector from './AlgorithmSelector';

const Controls = ({
    onStart,
    onReset,
    onAlgorithmChange,
    onSpeedChange,
    onNextStep,
    onPreviousStep,
    sorting,
    paused,
    completed,
    currentStepIndex,
    stepCount,
    algorithm,
    onSizeChange,
}) => (
    <div className="controls">
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
                onChange={(sizeValue) => onSizeChange(sizeValue.target.value)}
                disabled={sorting && !paused}
                defaultValue={10}
            />
        </div>
        <ControlButtons
            onStart={onStart}
            onReset={onReset}
            onNextStep={onNextStep}
            onPreviousStep={onPreviousStep}
            sorting={sorting}
            paused={paused}
            completed={completed}
            currentStepIndex={currentStepIndex}
            stepCount={stepCount}
        />
    </div>
);

export default Controls;
