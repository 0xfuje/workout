import React, { useState, useEffect } from 'react';
import { Fragment } from 'react/cjs/react.development';
import { nanoid } from 'nanoid';

import './styles/WorkoutForm.scss';
import settingsIcon from './images/icons/cog-solid.svg';
import backArrow from './images/icons/long-arrow-alt-left-solid.svg';

import Exercise from './Exercise';
import './styles/Exercise.scss';

function WorkoutForm(props) {
    const getExercises = () => {
        const oldExercises =  props.workoutRoutines.filter((w) => w.name === currentWorkout).map((w) => w.exercises)[0];
        const newExercises = oldExercises.map((ex, i) => ({ name: ex.name, sets: Array(ex.sets).fill(0), id: nanoid(), pos: i}));
        return newExercises;
    };
    const [currentWorkout, setCurrentWorkout] = useState('Upper');
    const [exercises, setExercises] = useState(getExercises());

    // Set exercises on change of currentWorkout
    useEffect(() => setExercises(getExercises()), [currentWorkout]);
    
    

    // Functions passed down
    const addSet = (id) => {
        const newExercise = exercises.filter((ex) => ex.id === id)[0];
        newExercise.sets.push(0);
        const exercisesNew = exercises.filter((ex) => ex.id !== id);
        exercisesNew.push(newExercise);
        exercisesNew.sort((a, b) =>  a.pos - b.pos);
        setExercises(exercisesNew);
    }
    const removeSet = () => {

    }
    const replaceEx = () => {

    }
    const removeEx = () => {

    }

    // Event Handlers
    const handleChange = (e) => {
        e.preventDefault();
        setCurrentWorkout(e.target.value);
    }
    const handleAddExercise = (e) => {
        e.preventDefault();
    }
    const handleCancelWorkout = (e) => {
        e.preventDefault();
    }
    const handleFinishWorkout = (e) => {
        e.preventDefault();
    }

    // Display variables
    const displayOptions = props.workoutRoutines.map((w) => {
        return <option className="WorkoutForm-selector-option" value={w.name}>{w.name}</option>;
    });
    const displayExercises = exercises.map((ex) => {
        return <Exercise 
            name={ex.name} 
            sets={ex.sets}
            id={ex.id} 
            key={ex.id} 
            pos={ex.pos} 
            addSet={addSet}
            removeSet={removeSet}
            replaceEx={replaceEx}
            removeEx={removeEx}
        />
    });
    const displayButtons = 
    <Fragment>
        <a onClick={handleAddExercise} className="WorkoutForm-button WorkoutForm-addExercise">add exercise</a>
        <a onClick={handleCancelWorkout} className="WorkoutForm-button WorkoutForm-cancelWorkout">cancel workout</a>
        <a onClick={handleFinishWorkout} className="WorkoutForm-button WorkoutForm-finishWorkout">finish workout</a>
    </Fragment>

    
    return (
        <div className='WorkoutForm'>
            <div className="flex">
                <h2 className='WorkoutForm-title title'>New Workout Log</h2>
                <div className="WorkoutForm-icons">
                <a href='/new' className='WorkoutForm-settings'>
                    <img src={backArrow} alt="settings" />
                </a>
                <a href='/new' className='WorkoutForm-settings'>
                    <img src={settingsIcon} alt="settings" />
                </a>
                </div>
            </div>
            <select name='workout-selector' className="WorkoutForm-selector" onChange={handleChange}>
                {displayOptions}
            </select>
            {displayExercises}
            {displayButtons}
           
        </div>
    )
}

export default WorkoutForm;
