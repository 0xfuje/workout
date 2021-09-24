import React, { useState, useEffect } from 'react';
import { Fragment } from 'react/cjs/react.development';
import { nanoid } from 'nanoid';

import './styles/WorkoutForm.scss';
import settingsIcon from './images/icons/cog-solid.svg';
import backArrow from './images/icons/long-arrow-alt-left-solid.svg';

import Exercise from './Exercise';
import './styles/Exercise.scss';

function WorkoutForm(props) {
    const [currentWorkout, setCurrentWorkout] = useState('Upper');
    const getExercises = () => {
        return props.workoutRoutines.filter((w) => w.name === currentWorkout).map((w) => w.exercises)[0]
    };

    const [workoutExercises, setWorkoutExercises] = 
    useState(getExercises().map((ex) => 
        ({ name: ex.name, sets: Array(ex.sets).fill(0), id: nanoid()})
    ));
    

    console.log(workoutExercises);
    
    useEffect(() => setWorkoutExercises(getExercises().map((ex) => 
    ({ name: ex.name, sets: Array(ex.sets).fill(0), id: nanoid()})
    )), [currentWorkout]);
    
    
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

    const displayOptions = props.workoutRoutines.map((w) => {
        return <option className="WorkoutForm-selector-option" value={w.name}>{w.name}</option>;
    });
    
    const displayExercises = workoutExercises.map((ex) => {
        return <Exercise name={ex.name} sets={ex.sets} id={ex.id} key={ex.id} />
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
