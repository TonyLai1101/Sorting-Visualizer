import React from 'react';

const AlgorithmSelector = ({ algorithm, onAlgorithmChange }) => (
    <div className="algorithm-selector">
        <div
            className={algorithm === 'bubbleSort' ? 'currentAlgorithmButton' : 'algorithmButton'}
            onClick={() => onAlgorithmChange('bubbleSort')}
        >
            Bubble Sort
        </div>
        <div
            className={algorithm === 'quickSort' ? 'currentAlgorithmButton' : 'algorithmButton'}
            onClick={() => onAlgorithmChange('quickSort')}
        >
            Quick Sort
        </div>
        {/* Add more divs for additional algorithms as needed */}
    </div>
);

export default AlgorithmSelector;
