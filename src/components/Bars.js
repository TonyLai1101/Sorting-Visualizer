import React, { useMemo } from 'react';
import '../style/Bars.css';

const Bars = ({ array, steps, currentStepIndex, sortedIndices }) => {
  // Memoize the bar width calculation
  const barWidth = useMemo(() => Math.max(2, 100 / array.length - 1), [array.length]);
  const color = barWidth > 5 ? "white" : "transparent";
  // Memoize the className calculation
  const getBarClassName = (idx) => {
    let className = 'array-bar';
    const currentStep = steps[currentStepIndex];
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
  );
};

export default React.memo(Bars);