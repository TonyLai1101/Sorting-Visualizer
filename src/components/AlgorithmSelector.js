// import React from 'react';

// const AlgorithmSelector = ({ algorithm, onAlgorithmChange }) => (
//     <div className="algorithm-selector">
//         <div
//             className={algorithm === 'bubbleSort' ? 'currentAlgorithmButton' : 'algorithmButton'}
//             onClick={() => onAlgorithmChange('bubbleSort')}
//         >
//             Bubble Sort
//         </div>
//         <div
//             className={algorithm === 'quickSort' ? 'currentAlgorithmButton' : 'algorithmButton'}
//             onClick={() => onAlgorithmChange('quickSort')}
//         >
//             Quick Sort
//         </div>
//         {/* Add more divs for additional algorithms as needed */}
//     </div>
// );

// export default AlgorithmSelector;
import '../style/AlgorithmSelector.css';

import React from 'react';

const AlgorithmSelector = ({ algorithm, onAlgorithmChange, disabled }) => (
    <div className="algorithm-selector">
        <select 
            value={algorithm} 
            onChange={(e) => onAlgorithmChange(e.target.value)}
            disabled={disabled}
            className="algorithm-dropdown"
        >
            <option value="">Select an algorithm</option>
            <option value="bubbleSort">Bubble Sort</option>
            <option value="quickSort">Quick Sort</option>
            {/* Add more options for additional algorithms as needed */}
        </select>
        <p className="current-algorithm">Current Algorithm: {algorithm || 'None'}</p>
    </div>
);

export default AlgorithmSelector;