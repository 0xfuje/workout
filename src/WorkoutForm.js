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
        const newExercises = oldExercises.map((ex, i) => (
            { name: ex.name, sets: Array(ex.sets).fill({weight: 0, reps: 0, rpe: 0}), id: nanoid(), pos: i}
        ));
        return newExercises;
    };

    // States
    const [currentWorkout, setCurrentWorkout] = useState('Upper');
    const [exercises, setExercises] = useState(getExercises());
    const [bodyparts, setBodyparts] = useState([...new Set (getExercises().map(ex => ex.name))]);
    const [showNewExInput, setShowNexExInput] = useState(false);
    const [newEx, setNewEx] = useState();

    
    // Set exercises on change of currentWorkout
    useEffect(() => setExercises(getExercises()), [currentWorkout]);
    
    // Functions passed down
    const renameEx = (id, newName) => {
        const exToRename = exercises.filter(ex => ex.id === id)[0];
        const newExercises = exercises.filter(ex => ex.id !== id);
        exToRename.name = newName;
        newExercises.push(exToRename);
        newExercises.sort((a, b) => a.pos - b.pos);
        setExercises(newExercises);
    }
    const removeEx = (id) => {
        const newExercises = exercises.filter(ex => ex.id !== id);
        setExercises(newExercises);
    }

    // Event Handlers
    const handleChange = (e) => { 
        setCurrentWorkout(e.target.value);
    }
    const handleShowNewExInput = (e) => {
        setShowNexExInput(!showNewExInput)
    }
    const handleAddExercise = () => {
        if (!newEx) return;
        const addEx = {name: newEx, sets: Array(3).fill({weight: 0, reps: 0, rpe: 0}), id: nanoid(), pos: exercises.length};
        const newExercises = [...exercises, addEx];
        setExercises(newExercises);
        setShowNexExInput(false);
    }
    const handleNewExChange = (e) => {
        setNewEx(e.target.value);
    }
    const handleCancelWorkout = (e) => {
        
    }
    const handleFinishWorkout = (e) => {
        const today = new Date();
        const date = `${today.getFullYear()}/${today.getMonth()}/${today.getDate()}`;
        props.logWorkout(date, exercises);
    } 

    // Display variables
    const displayOptions = props.workoutRoutines.map((w) => {
        return <option className="WorkoutForm-selector-option" value={w.name}>{w.name}</option>;
    });
    
    const displayExercises = exercises.map((ex) => {
        return (
        <Exercise 
            name={ex.name}
            bodyparts={bodyparts}
            sets={ex.sets}
            id={ex.id} 
            key={ex.id} 
            pos={ex.pos}
            renameEx={renameEx}
            removeEx={removeEx}
        />)
    });

    const displayButtons = 
    <Fragment>
        {(!showNewExInput) ? <span onClick={handleShowNewExInput} className="WorkoutForm-button WorkoutForm-addExercise">add exercise</span> : ''}
        <span onClick={handleCancelWorkout} className="WorkoutForm-button WorkoutForm-cancelWorkout">cancel workout</span>
        <span onClick={handleFinishWorkout} className="WorkoutForm-button WorkoutForm-finishWorkout">finish workout</span>
    </Fragment>

    const displayNewExInput = 
    <div className="WorkoutForm-newEx">
        <input className='WorkoutForm-newEx-input input' onChange={handleNewExChange} placeholder='New Exercise Name'/>
        <span className='WorkoutForm-newEx-button-add button' onClick={handleAddExercise}>Add New Exercise</span>
        <span className='WorkoutForm-newEx-button-cancel button' onClick={handleShowNewExInput}>Cancel New Exercise</span>
    </div>
    
    
    
    return (
        <div className='WorkoutForm'>
            <div className="flex">
                <h2 className='WorkoutForm-title title'>New Workout Log</h2>
                <div className="WorkoutForm-icons">
                    <a href='/new' className='WorkoutForm-settings'>
                        <img src={backArrow} className='WorkoutForm-icon' alt="settings" />
                    </a>
                    <a href='/new' className='WorkoutForm-settings'>
                        <img src={settingsIcon} className='WorkoutForm-icon' alt="settings" />
                    </a>
                </div>
            </div>
            <select name='workout-selector' className="WorkoutForm-selector" onChange={handleChange}>
                {displayOptions}
            </select>
            {displayExercises}
            {(showNewExInput) ? displayNewExInput : ''}
            {displayButtons}
           
        </div>
    )
}

export default WorkoutForm;
