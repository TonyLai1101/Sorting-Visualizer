import React from 'react';

const ControlButtons = ({
    onStart,
    onReset,
    onNextStep,
    onPreviousStep,
    sorting,
    paused,
    completed,
    currentStepIndex,
    stepCount,
}) => (
    <div className="control-buttons">
        <button onClick={onReset} disabled={sorting && !paused}>Generate New Array</button>
        <button onClick={onStart}>
            {paused ? 'Start' : 'Pause'}
        </button>
        <button onClick={onPreviousStep} disabled={!paused || currentStepIndex <= 0}>
            Previous Step
        </button>
        <button onClick={onNextStep} disabled={!paused || completed }>
            Next Step
        </button>
        <span>{`Step ${currentStepIndex + 1} of ${stepCount}`}</span>
    </div>
);

export default ControlButtons;
