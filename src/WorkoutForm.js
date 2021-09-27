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
    const replaceEx = (id) => {
        const exToReplace = exercises.filter(ex => ex.id === id)[0];
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
    }

    // Display variables
    const displayOptions = props.workoutRoutines.map((w) => {
        return <option className="WorkoutForm-selector-option" value={w.name}>{w.name}</option>;
    });
    
    const displayExercises = exercises.map((ex) => {
        return (
        <Exercise 
            name={ex.name} 
            sets={ex.sets}
            id={ex.id} 
            key={ex.id} 
            pos={ex.pos}
            renameEx={renameEx}
            replaceEx={replaceEx}
            removeEx={removeEx}
        />)
    });

    const displayButtons = 
    <Fragment>
        {(!showNewExInput) ? <a onClick={handleShowNewExInput} className="WorkoutForm-button WorkoutForm-addExercise">add exercise</a> : ''}
        <a onClick={handleCancelWorkout} className="WorkoutForm-button WorkoutForm-cancelWorkout">cancel workout</a>
        <a onClick={handleFinishWorkout} className="WorkoutForm-button WorkoutForm-finishWorkout">finish workout</a>
    </Fragment>

    const displayNewExInput = 
    <div className="WorkoutForm-newEx">
        <input className='WorkoutForm-newEx-input input' onChange={handleNewExChange} placeholder='New Exercise Name'/>
        <a className='WorkoutForm-newEx-button-add button' onClick={handleAddExercise}>Add New Exercise</a>
        <a className='WorkoutForm-newEx-button-cancel button' onClick={handleShowNewExInput}>Cancel New Exercise</a>
    </div>
    
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
            {(showNewExInput) ? displayNewExInput : ''}
            {displayButtons}
           
        </div>
    )
}

export default WorkoutForm;
