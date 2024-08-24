import React, { useMemo } from 'react';
import '../style/SortingVisualizer.css';
import { useSorting } from './useSorting';
import Controls from './Control';

const SortingVisualizer = () => {
  const {
    array,
    sorting,
    paused,
    completed,
    currentStepIndex,
    stepCount,
    algorithm,
    currentStep,
    sortedIndices,
    speed,
    
    startSorting,
    pauseSorting,
    resetArray,
    setAlgorithm,
    setSpeed,
    nextStep,
    previousStep,
    generateNewArray,
  } = useSorting();

  const handleStartPause = () => {
    if (paused) {
      startSorting();
    } else {
      pauseSorting();
    }
  };

  // Memoize the bar width calculation
  const barWidth = useMemo(() => Math.max(2, 100 / array.length - 1), [array.length]);
  const color = barWidth > 5 ? "white" : "transparent";

  // Memoize the className calculation
  const getBarClassName = (idx) => {
    let className = 'array-bar';
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
    <div className="sorting-visualizer">
      <Controls
        sorting={sorting}
        paused={paused}
        completed={completed}
        currentStepIndex={currentStepIndex}
        stepCount={stepCount}
        algorithm={algorithm}
        speed={speed}

        onStart={handleStartPause}
        onReset={() => resetArray(algorithm)}
        onAlgorithmChange={setAlgorithm}
        onSpeedChange={(newSpeed) => setSpeed(500 - newSpeed)}
        onNextStep={nextStep}
        onPreviousStep={previousStep}
        onSizeChange={(size)=> generateNewArray(size)}
        generateNewArrayButton= {()=>generateNewArray()}
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