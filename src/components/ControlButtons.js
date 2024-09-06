import React from 'react';

const ControlButtons = ({
    onStart,
    onReset,
    onPause,
    onNextStep,
    onPreviousStep,
    paused,
    completed,
    currentStepIndex,
    stepGenerated,
}) => (
    
    <div className="control-buttons">

        <button onClick={()=>onReset(0)} disabled={!paused && !completed  || !stepGenerated }>Reset</button>

        <button onClick={() => paused ? onStart() : onPause()} disabled={!stepGenerated || completed}>
            {paused ? 'Start' : 'Pause'}
            
        </button>
        <button onClick={() => onPreviousStep(currentStepIndex-1)} disabled={!paused || currentStepIndex <= 0 || !stepGenerated}>
            Previous Step
        </button>
        <button onClick={() => onNextStep(currentStepIndex+1)} disabled={!paused || completed || !stepGenerated}>
            Next Step
        </button>
    </div>
);

export default ControlButtons;