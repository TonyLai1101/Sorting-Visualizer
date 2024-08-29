import React from 'react';

const ControlButtons = ({
    onStart,
    onReset,
    onPause,
    onNextStep,
    onPreviousStep,
    sorting,
    paused,
    completed,
    currentStepIndex,
    stepCount,
    stepGenerated,
}) => (
    <div className="control-buttons">

        <button onClick={onReset} disabled={sorting && !paused && !completed  || !stepGenerated }>Reset</button>

        <button onClick={() => paused ? onStart() : onPause()} disabled={!stepGenerated || completed}>
            {paused ? 'Start' : 'Pause'}
            
        </button>
        <button onClick={onPreviousStep} disabled={!paused || currentStepIndex <= 0 || !stepGenerated}>
            Previous Step
        </button>
        <button onClick={onNextStep} disabled={!paused || completed || !stepGenerated}>
            Next Step
        </button>
        <span>{`Step ${currentStepIndex + 1} of ${stepCount}`}</span>
    </div>
);

export default ControlButtons;