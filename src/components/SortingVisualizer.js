import React, { useMemo , useEffect} from 'react';
import '../style/SortingVisualizer.css';
import { useSorting } from './useSorting';
import Controls from './Control';

const SortingVisualizer = () => {
  const {
    array,
    algorithm,
    arrayGenerated,
    stepGenerated,

    sorting,
    paused,
    completed,
    currentStepIndex,
    stepCount,
    speed,
    sortedIndices,
    
    startSorting,
    pauseSorting,
    generateNewArray,
    setAlgorithm,
    onReset,
    nextStep,
    previousStep,
    setSpeed,
    
    currentStep,
  } = useSorting();

  const handleStartPause = () => {
    if (paused) {
      startSorting();
    } else {
      pauseSorting();
    }
  };

   useEffect(() => {
    if (!arrayGenerated) {
      generateNewArray(10);
    }
  }, []);

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
        stepGenerated={stepGenerated}
        arrayGenerated={arrayGenerated}
        sorting={sorting}
        paused={paused}
        completed={completed}
        currentStepIndex={currentStepIndex}
        stepCount={stepCount}
        speed={speed}
        algorithm={algorithm}
        handleStartPause ={handleStartPause}
        onGenerateNewArray={generateNewArray}
        onStart={startSorting}
        onPause={pauseSorting}
        onReset={onReset}
        onNextStep={nextStep}
        onPreviousStep={previousStep}
        onSpeedChange={setSpeed}
        onAlgorithmChange={setAlgorithm}
        onSizeChagne={generateNewArray}
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