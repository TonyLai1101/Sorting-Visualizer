import { useReducer, useEffect, useRef, useCallback } from 'react';
import * as algorithms from '../algorithms';
import { generateRandomArray } from '../helper/generateArray.js';

// Action types
const START_SORTING = 'START_SORTING';
const PAUSE_SORTING = 'PAUSE_SORTING';
const SET_ALGORITHM = 'SET_ALGORITHM';
const RESET_ARRAY = "RESET_ARRAY";
const SET_STEP = 'SET_STEP';
const GENERATE_ARRAY = 'GENERATE_ARRAY';
const initialSize = 10;

// Reducer function
// This reducer function handles various actions related to sorting
// It manages the state of the sorting process, including:
// - The current array being sorted
// - The selected sorting algorithm
// - The steps of the sorting process
// - The current step index
// - Whether the sorting is paused or not
// - The indices of sorted elements

// Each case in the switch statement corresponds to a different action:
// GENERATE_ARRAY: Creates a new random array
// SET_ALGORITHM: Sets the sorting algorithm and generates sorting steps
// SET_STEP: Moves to the next or previous step in the sorting process
// START_SORTING: Resumes the sorting process
// PAUSE_SORTING: Pauses the sorting process
// RESET_ARRAY: Resets the array to its initial state

// The reducer ensures that the state is updated immutably,
// always returning a new state object rather than modifying the existing one
const initialState = {
  array: [],
  algorithm: '',
  steps: [],
  currentStepIndex: 0,
  paused: true,
  sortedIndices: [],
};
function sortingReducer(state, action) {
    switch (action.type) {
        case SET_STEP: 
            let newIndex;
            if (typeof action.payload === 'number') {
              // Direct index set (for slider)
              newIndex = Math.max(0, Math.min(action.payload, state.steps.length - 1));
            } else if (action.payload === 'next') {
              // Next step
              newIndex = Math.min(state.currentStepIndex + 1, state.steps.length - 1);
            } else if (action.payload === 'previous') {
              // Previous step
              newIndex = Math.max(0, state.currentStepIndex - 1);
            } else {
              return state; // Invalid payload, no change
            }
        
            const newStep = state.steps[newIndex];
            const newSortedIndices = state.steps
              .slice(0, newIndex + 1)
              .filter(step => step.type === 'sorted')
              .flatMap(step => step.indices);
        
            return {
              ...state,
              currentStepIndex: newIndex,
              array: newStep.array,
              sortedIndices: newSortedIndices,
            };
        

        case START_SORTING:
            return { ...state, paused: false };

        case PAUSE_SORTING:
            return { ...state, paused: true };

        case GENERATE_ARRAY:
            return {
                ...state,
                array: action.payload,
                steps: [{ array: action.payload}], //First index of steps
                algorithm: '',
                currentStepIndex: 0,
                paused: true,
                sortedIndices: [],

            };
        

        case RESET_ARRAY:
            return {
                ...state,
                array: state.steps[0].array,
                currentStepIndex: 0,
                paused: true,
                sortedIndices: []
            };



        case SET_ALGORITHM:
            const initialStep = state.steps[0];
            const newSteps = algorithms[action.payload](initialStep.array.slice());
            return {
                ...state,
                algorithm: action.payload,
                steps: [initialStep, ...newSteps],
                array: initialStep.array.slice(),
                currentStepIndex: 0,
                paused: true,
                sortedIndices: [],
            };

        default:
            return state;
    }
}



export function useSorting() {

    const [state, dispatch] = useReducer(sortingReducer, initialState);
    const timeoutRef = useRef(null);

    const generateNewArray = useCallback((size) => {
        const newArray = generateRandomArray(Number(size));
        dispatch({ type: 'GENERATE_ARRAY', payload: newArray });
    }, []);

    const setAlgorithm = (newAlgorithm) => {
        dispatch({ type: 'SET_ALGORITHM', payload:( newAlgorithm)  });
    }

    const setStep = (step) => {
        dispatch({ type: SET_STEP, payload: step });
    };

    const nextStep = useCallback(() => {
        setStep('next');
    }, []);

    const previousStep = useCallback(() => {
        setStep('previous');
    }, []);

    const startSorting = () => {
        console.log("Running startSorting");
        dispatch({ type: START_SORTING });
    };

    const pauseSorting =() => {
        console.log("Running pauseSorting");
        dispatch({ type: PAUSE_SORTING });
    };

    const onReset = () => {
        console.log("Running resetArray:");
        dispatch({ type: RESET_ARRAY })
    };

    // This effect handles the automatic progression of sorting steps
    useEffect(() => {
        console.log("Running useEffect for sorting steps");
        const speed = 500; // Delay between steps in milliseconds
        if (!state.paused && state.currentStepIndex < state.steps.length - 1) {
            // Set a timeout to move to the next step if not paused and not at the end
            timeoutRef.current = setTimeout(nextStep, speed);
        }
        // Cleanup function to clear the timeout when the component unmounts or dependencies change
        return () => clearTimeout(timeoutRef.current);
    }, [state.paused, state.currentStepIndex]);

    // Initial render 
    useEffect(()=>{
        generateNewArray(initialSize);
        setAlgorithm('bubbleSort');
    },[])

    return {
        ...state,
        completed: state.currentStepIndex === state.steps.length - 1,
        generateNewArray,
        setAlgorithm,
        setStep,
        nextStep,
        previousStep,
        startSorting,
        pauseSorting,
        onReset,
    };
}