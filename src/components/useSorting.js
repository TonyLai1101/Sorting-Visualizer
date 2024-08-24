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

// Reducer function
function sortingReducer(state, action) {
    switch (action.type) {
        case NEXT_STEP:
            if (state.currentStepIndex < state.steps.length - 1) {
                const nextIndex = state.currentStepIndex + 1;
                const step = state.steps[nextIndex];
                return {
                    ...state,
                    currentStepIndex: nextIndex,
                    array: step.array,
                    sortedIndices: step.type === 'sorted' 
                        ? [...state.sortedIndices, ...step.indices]
                        : state.sortedIndices,
                    completed: nextIndex === state.steps.length - 1
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
            return { ...state, sorting: true, paused: false };

        case PAUSE_SORTING:
            return { ...state, paused: true };

        case NEW_ARRAY:
            return {
                ...state,
                array: action.payload.newArray,
                steps: action.payload.newSteps,
                currentStepIndex: 0,
                completed: false,
                sorting: false,
                paused: true,
                sortedIndices: []
            };
        
        case RESET_ARRAY:
            return {
                ...state,
                array: action.payload.initialArray,

                steps: action.payload.newSteps,
                currentStepIndex: 0,
                completed: false,
                sorting: false,
                paused: true,
                sortedIndices: []
            };



        case SET_ALGORITHM:
            console.log("Run SET ALGO Reducer playlaode:", action.payload)

            return { 
                ...state, 
                algorithm: action.payload,
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
        sorting: false,
        completed: false,
        algorithm: 'bubbleSort',
        speed: 50,
        steps: [],
        currentStepIndex: 0,
        paused: true,
        sortedIndices: [],
    }));

    const timeoutRef = useRef(null);

    const generateSteps = useCallback((array, algorithm) => {
        console.log("generateSteps function is called with algorithm:", algorithm);
        const newSteps = algorithms[algorithm](array.slice());
        return [{ array: array.slice(), type: 'initial' }, ...newSteps];
    }, []);


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

    const generateNewArray = useCallback(() => {
        console.log("Running generateNewArray");
        const newArray = generateRandomArray(10);
        const newSteps = generateSteps(newArray, state.algorithm);
        dispatch({ type: NEW_ARRAY, payload: { newArray, newSteps } });
    }, []);

    const resetArray = useCallback((algo) => {
        console.log("Running resetArray:", algo);
        if (state.steps.length > 0) {
            const initialArray = state.steps[0].array;
            const newSteps = generateSteps(initialArray, algo);
            dispatch({ type: RESET_ARRAY, payload: {initialArray, newSteps } });
        }
    }, [state.steps, state.algorithm, generateSteps]);


    const setAlgorithm = (newAlgorithm) => {
        console.log("Setting new algorithm:", newAlgorithm);
        dispatch({ type: SET_ALGORITHM, payload: newAlgorithm});
        resetArray(newAlgorithm)
    }



    useEffect(() => {
        generateNewArray();
    }, [generateNewArray]);

    useEffect(() => {
        console.log("Running useEffect for sorting steps");
        if (!state.paused && state.sorting && state.currentStepIndex < state.steps.length - 1) {
            timeoutRef.current = setTimeout(nextStep, state.speed);
        }
        return () => clearTimeout(timeoutRef.current);
    }, [state.paused, state.sorting, state.currentStepIndex, state.steps.length, state.speed, nextStep]);


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
        resetArray
    };
}