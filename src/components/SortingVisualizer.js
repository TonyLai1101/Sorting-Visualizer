import React from 'react';
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
    
    startSorting,
    pauseSorting,
    resetArray,
    setAlgorithm,
    setSpeed,
    nextStep,
    previousStep,
    

  } = useSorting();


  const handleStartPause = () => {

    if (paused) {
      startSorting();
    } else {
      pauseSorting();
    }
    
  };
   // Calculate the width of each bar based on the array size
  const barWidth = Math.max(2, 100 / array.length - 1); 
  // console.log("Current step:", currentStep);
  const color = barWidth > 5 ? "white" : "transparent";


  return (

    <div className="sorting-visualizer">
      <Controls
        sorting={sorting}
        paused={paused}
        completed={completed}
        currentStepIndex={currentStepIndex}
        stepCount={stepCount}
        algorithm={algorithm}

        onStart={handleStartPause}
        onReset={() => resetArray(10)} 
        onAlgorithmChange={(algo) => setAlgorithm(algo)}
        onSpeedChange={(speed) => setSpeed(500-speed)}
        onNextStep={nextStep}
        onPreviousStep={previousStep}
        onSizeChange={(size) => resetArray(size)  }


        
      />
      <div className="array-container">
        {array.map((value, idx) => {
          let className = 'array-bar';
          if (sortedIndices && sortedIndices.includes(idx)) {
            className += ' sorted';
          } else if (currentStep && currentStep.type === 'compare' && currentStep.indices.includes(idx)) {
            className += ' comparing';
          } else if (currentStep && currentStep.type === 'swap' && currentStep.indices.includes(idx)) {
            className += ' swapping';
          }
          return (
            <div
              key={idx}
              className={className}
              style={{ height: `${value}px` , width: `${barWidth}%`, color: color}}
            >
            {value}
            </div>
            
          );
        })}




      </div>
    </div>
  );
};

export default SortingVisualizer;
