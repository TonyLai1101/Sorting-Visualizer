import { useReducer, useEffect, useRef, useCallback } from 'react';
import * as algorithms from '../algorithms';
import { generateRandomArray } from '../helper/generateArray.js';

// Action types
const NEXT_STEP = 'NEXT_STEP';
const PREVIOUS_STEP = 'PREVIOUS_STEP';
const START_SORTING = 'START_SORTING';
const PAUSE_SORTING = 'PAUSE_SORTING';
const NEW_ARRAY = 'NEW_ARRAY';
const SET_ALGORITHM = 'SET_ALGORITHM';
const SET_SPEED = 'SET_SPEED';
const RESET_ARRAY = "RESET_ARRAY";
const NEW_STEP = 'NEW_STEP';
const GENERATE_ARRAY = 'GENERATE_ARRAY';
// Reducer function
function sortingReducer(state, action) {
    switch (action.type) {
        case NEXT_STEP:
            if (state.currentStepIndex < state.steps.length - 1) {
                const nextIndex = state.currentStepIndex + 1;
                const step = state.steps[nextIndex];
                console.log(step)
                return {
                    ...state,
                    currentStepIndex: nextIndex,
                    array: step.array,
                    sortedIndices: step.type === 'sorted' 
                        ? [...state.sortedIndices, ...step.indices]
                        : state.sortedIndices,
                    completed: nextIndex === state.steps.length - 1,
                    
                };
            }
            return state;

        case PREVIOUS_STEP:
            if (state.currentStepIndex > 0) {
                const newIndex = state.currentStepIndex - 1;
                return {
                    ...state,
                    currentStepIndex: newIndex,
                    array: state.steps[newIndex].array,
                    sortedIndices: state.steps.slice(0, newIndex + 1)
                        .filter(step => step.type === 'sorted')
                        .flatMap(step => step.indices),
                    completed: false
                };
            }
            return state;

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
                speed: 50,
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

        case SET_SPEED:
            return { ...state, speed: action.payload };

        default:
            return state;
    }
}

export function useSorting(initialSize = 10) {
    const [state, dispatch] = useReducer(sortingReducer, initialSize, (size) => ({
        array: [],
        completed: false,
        algorithm: '',
        speed: 50,
        steps: [],
        currentStepIndex: 0,
        paused: true,
        sortedIndices: [],
        arrayGenerated: false,
        stepGenerated: false,
    }));

    const timeoutRef = useRef(null);

   


    const nextStep = useCallback(() => {
        console.log("Running nextStep");
        dispatch({ type: NEXT_STEP });
    }, []);

    const previousStep = useCallback(() => {
        console.log("Running previousStep");
        dispatch({ type: PREVIOUS_STEP });
    }, []);

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
        if (!state.paused && state.currentStepIndex < state.steps.length - 1) {
            timeoutRef.current = setTimeout(nextStep, state.speed);
        }
        return () => clearTimeout(timeoutRef.current);
    }, [state.paused, state.currentStepIndex, state.steps.length, state.speed, nextStep]);


    return {
        ...state,
        currentStep: state.steps[state.currentStepIndex],
        stepCount: state.steps.length,
        startSorting,
        pauseSorting,
        generateNewArray,
        setAlgorithm,
        setSpeed: (speed) => dispatch({ type: SET_SPEED, payload: speed }),
        nextStep,
        previousStep,
        onReset,
    };
}