import { useReducer, useEffect, useRef, useCallback } from 'react';
import * as algorithms from '../algorithms';
import { generateRandomArray } from '../helper/generateArray.js';

// Action types
const SET_ARRAY = 'SET_ARRAY';
const SET_SORTING = 'SET_SORTING';
const SET_COMPLETED = 'SET_COMPLETED';
const SET_ALGORITHM = 'SET_ALGORITHM';
const SET_SPEED = 'SET_SPEED';
const SET_STEPS = 'SET_STEPS';
const SET_CURRENT_STEP_INDEX = 'SET_CURRENT_STEP_INDEX';
const SET_PAUSED = 'SET_PAUSED';
const SET_SORTED_INDICES = 'SET_SORTED_INDICES';

// Reducer function
function sortingReducer(state, action) {
    switch (action.type) {
        case SET_ARRAY:
            return { ...state, array: action.payload };
        case SET_SORTING:
            return { ...state, sorting: action.payload };
        case SET_COMPLETED:
            return { ...state, completed: action.payload };
        case SET_ALGORITHM:
            return { ...state, algorithm: action.payload };
        case SET_SPEED:
            return { ...state, speed: action.payload };
        case SET_STEPS:
            return { ...state, steps: action.payload };
        case SET_CURRENT_STEP_INDEX:
            return { ...state, currentStepIndex: action.payload };
        case SET_PAUSED:
            return { ...state, paused: action.payload };
        case SET_SORTED_INDICES:
            return { ...state, sortedIndices: action.payload };
        default:
            return state;
    }
}

export function useSorting(initialSize = 10) {
    const [state, dispatch] = useReducer(sortingReducer, initialSize, () => ({
        test: 0,
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

    const generateSteps = useCallback((array) => {
        console.log("generateSteps function is called");
        const newSteps = algorithms[state.algorithm](array.slice());
        return [{ array: array.slice(), type: 'initial' }, ...newSteps];
    }, [state.algorithm, state.steps]);

    const nextStep = useCallback(() => {
        console.log("Running nextStep");
        if (state.currentStepIndex < state.steps.length - 1) {
            const nextIndex = state.currentStepIndex + 1;
            const step = state.steps[nextIndex];
            dispatch({ type: SET_CURRENT_STEP_INDEX, payload: nextIndex });
            dispatch({ type: SET_ARRAY, payload: step.array });
            if (step.type === 'sorted') {
                dispatch({ type: SET_SORTED_INDICES, payload: [...state.sortedIndices, ...step.indices] });
            }
        } else {
            dispatch({ type: SET_COMPLETED, payload: true });
        }
    }, [state.currentStepIndex, state.steps, state.sortedIndices]);

    const previousStep = useCallback(() => {
        console.log("Running previousStep");
        if (state.currentStepIndex > 0) {
            const newIndex = state.currentStepIndex - 1;
            dispatch({ type: SET_CURRENT_STEP_INDEX, payload: newIndex });
            dispatch({ type: SET_ARRAY, payload: state.steps[newIndex].array });
            dispatch({
                type: SET_SORTED_INDICES,
                payload: state.steps.slice(0, newIndex + 1)
                    .filter(step => step.type === 'sorted')
                    .flatMap(step => step.indices)
            });
        }
    }, [state.currentStepIndex, state.steps]);

    const startSorting = useCallback(() => {
        console.log("Running startSorting");
        dispatch({ type: SET_SORTING, payload: true });
        dispatch({ type: SET_PAUSED, payload: false });
    }, []);

    const pauseSorting = useCallback(() => {
        console.log("Running pauseSorting");
        dispatch({ type: SET_PAUSED, payload: true });
        clearTimeout(timeoutRef.current);
    }, []);

    const resetArray = useCallback((size = initialSize) => {
        console.log("Running resetArray");
        const newArray = generateRandomArray(size);
        const newSteps = generateSteps(newArray);
        dispatch({ type: SET_ARRAY, payload: newArray });
        dispatch({ type: SET_STEPS, payload: newSteps });
        dispatch({ type: SET_CURRENT_STEP_INDEX, payload: 0 });
        dispatch({ type: SET_COMPLETED, payload: false });
        dispatch({ type: SET_SORTED_INDICES, payload: [] });
        dispatch({ type: SET_PAUSED, payload: true });
        dispatch({ type: SET_SORTING, payload: false });
    }, []);

    useEffect(() => {
        resetArray();
    }, [state.algorithm]);

    useEffect(() => {
        console.log("Running useEffect for sorting steps");
        if (!state.paused && state.sorting && state.currentStepIndex < state.steps.length - 1) {
            timeoutRef.current = setTimeout(() => {
                nextStep();
            }, state.speed);
        }
        return () => clearTimeout(timeoutRef.current);
    }, [state.paused, state.sorting, state.currentStepIndex, state.speed]);

    return {
        ...state,
        currentStep: state.steps[state.currentStepIndex],
        stepCount: state.steps.length,
        startSorting,
        pauseSorting,
        resetArray,
        setAlgorithm: (algo) => dispatch({ type: SET_ALGORITHM, payload: algo }),
        setSpeed: (speed) => dispatch({ type: SET_SPEED, payload: speed }),
        nextStep,
        previousStep,
    };
}
