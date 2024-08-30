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
// Reducer function
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
              completed: newIndex === state.steps.length - 1
            };
        
    // ... other cases ...
  



        case START_SORTING:
            return { ...state, paused: false };

        case PAUSE_SORTING:
            return { ...state, paused: true };

        case GENERATE_ARRAY:
            return {
                ...state,
                algorithm: '',
                steps: [{ array: action.payload, type: 'initial' }],
                array: action.payload,
                completed: false,
                currentStepIndex: 0,
                paused: true,
                sortedIndices: [],
                stepGenerated: false,

                arrayGenerated: true
            };
        

        case RESET_ARRAY:
            return {
                ...state,
                array: state.steps[0].array,
            
                currentStepIndex: 0,
                completed: false,
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
                completed: false,
                paused: true,
                sortedIndices: [],
                stepGenerated : true,
            };

   

        

        default:
            return state;
    }
}

export function useSorting(initialSize = 10) {
    const [state, dispatch] = useReducer(sortingReducer, initialSize, (size) => ({
        array: [],
        completed: false,
        algorithm: '',
        steps: [],
        currentStepIndex: 0,
        paused: true,
        sortedIndices: [],
        arrayGenerated: false,
        stepGenerated: false,
    }));

    const timeoutRef = useRef(null);

   


    const setStep = useCallback((step) => {
        dispatch({ type: SET_STEP, payload: step });
    }, []);

    const nextStep = useCallback(() => {
        setStep('next');
    }, [setStep]);

    const previousStep = useCallback(() => {
        setStep('previous');
    }, [setStep]);

    const startSorting = useCallback(() => {
        console.log("Running startSorting");
        dispatch({ type: START_SORTING });
    }, []);

    const pauseSorting = useCallback(() => {
        console.log("Running pauseSorting");
        dispatch({ type: PAUSE_SORTING });
        clearTimeout(timeoutRef.current);
    }, []);

      const generateNewArray = useCallback((size) => {
            console.log("Running generateNewArray: size: ", size);

            const newArray = generateRandomArray(size);
            dispatch({ type: 'GENERATE_ARRAY', payload: newArray });
    }, []);

    const onReset = useCallback(() => {
        console.log("Running resetArray:");
        
        dispatch({ type: RESET_ARRAY })
    }, [state.steps, state.algorithm]);


    const setAlgorithm = useCallback((newAlgorithm) => {
        dispatch({ type: 'SET_ALGORITHM', payload:( newAlgorithm)  });
    }, []);






    useEffect(() => {
        console.log("Running useEffect for sorting steps");
        const speed = 500; 
        if (!state.paused && state.currentStepIndex < state.steps.length - 1) {
            timeoutRef.current = setTimeout(nextStep, speed);
        }
        return () => clearTimeout(timeoutRef.current);
    }, [state.paused, state.currentStepIndex]);


    return {
        ...state,
        currentStep: state.steps[state.currentStepIndex],
        stepCount: state.steps.length,
        startSorting,
        pauseSorting,
        generateNewArray,
        setAlgorithm,
        nextStep,
        previousStep,
        onReset,
        setStep,
    };
}