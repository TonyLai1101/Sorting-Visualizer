import { useState, useEffect, useRef, useCallback } from 'react';
import * as algorithms from '../algorithms';
import {generateRandomArray} from '../helper/generateArray.js'

export function useSorting(initialSize = 10) {

    
    const [array, setArray] = useState(generateRandomArray(initialSize));
    const [sorting, setSorting] = useState(false);
    const [completed, setCompleted] = useState(false);
    const [algorithm, setAlgorithm] = useState('bubbleSort');
    const [speed, setSpeed] = useState(50);
    const [steps, setSteps] = useState([]);
    const [currentStepIndex, setCurrentStepIndex] = useState(-1);
    const [paused, setPaused] = useState(true);
    const [sortedIndices, setSortedIndices] = useState([]);
    const timeoutRef = useRef(null);

    const generateSteps = useCallback(() => {                           
        console.log("generateSteps function is called");
        const newSteps = algorithms[algorithm](array.slice());
        return [{ array: array.slice(), type: 'initial' }, ...newSteps];
    }, [algorithm]);

   

        useEffect(() => {
        console.log("Running useEffect generateSteps")
        const newSteps = generateSteps();
        setSteps(newSteps);
        setCurrentStepIndex(0);
        setCompleted(false);
        setSortedIndices([]);
    }, [algorithm, array]);;



    const nextStep = useCallback(() => {
        console.log("Running nextStep")

        if (currentStepIndex < steps.length - 1) {
            const nextIndex = currentStepIndex + 1;
            const step = steps[nextIndex];
            setCurrentStepIndex(nextIndex);
            setArray(step.array);
            if (step.type === 'sorted') {
                setSortedIndices((prev) => [...prev, ...step.indices]);
            }
        } else {
            setCompleted(true);
        }
    }, [currentStepIndex, steps]);



    const previousStep = useCallback(() => {
        if (currentStepIndex > 0) {
            setCurrentStepIndex(currentStepIndex - 1);
            setArray(steps[currentStepIndex - 1].array);
        }
    }, [currentStepIndex, steps]);

    const startSorting = useCallback(() => {
        setSorting(true);
        setPaused(false);
    }, []);

    const pauseSorting = useCallback(() => {
        setPaused(true);
        clearTimeout(timeoutRef.current);
    }, []);

    useEffect(() => {
        console.log("Running useEffect 1")

        if (!paused && sorting && currentStepIndex < steps.length - 1) {
            timeoutRef.current = setTimeout(() => {
                nextStep();
            }, speed);
        }
    }, [paused, sorting, currentStepIndex, steps, speed, nextStep]);



    

    

  const resetArray = useCallback((size = initialSize) => {
    const newArray = generateRandomArray(size);
    setArray(newArray);
    setSteps([]);
    setCurrentStepIndex(-1);
    setCompleted(false);
    setSortedIndices([]);
    setPaused(true);
    setSorting(false);
    // This will trigger the useEffect to regenerate steps
  }, [initialSize]);
    

    

    return {
        array,
        sorting,
        paused,
        completed,
        algorithm,
        speed,
        currentStep: steps[currentStepIndex],
        stepCount: steps.length,
        currentStepIndex,
        startSorting,
        pauseSorting,
        resetArray,
        setAlgorithm,
        setSpeed,
        nextStep,
        previousStep,
        sortedIndices,
    };
}       