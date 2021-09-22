import React, { useState } from 'react';
import './styles/WorkoutForm.scss';
import settingsIcon from './images/icons/cog-solid.svg';
import Exercise from './Exercise';
import './styles/Exercise.scss'

function WorkoutForm(props) {
    console.log(props.presets.workouts[0].bodyparts);
    return (
        <div className='WorkoutForm'>
            <div className="flex">
                <h2 className='WorkoutForm-title title'>New Workout Log</h2>
                <a href='/new' className='WorkoutForm-settings'>
                    <img src={settingsIcon} alt="settings" />
                </a>
            </div>
            <Exercise name='Barbell Bench Press' sets='3' addSet=''/>
            <Exercise name='Pendlay Row' sets='3' addSet='' />
            <Exercise name='Biceps curl' sets='3' addSet='' />
            <a href='/' className="WorkoutForm-button WorkoutForm-addExercise">add exercise</a>
            <a href='/' className="WorkoutForm-button WorkoutForm-cancelWorkout">cancel workout</a>
            <a href='/' className="WorkoutForm-button WorkoutForm-finishWorkout">finish workout</a>
        </div>
    )
}

export default WorkoutForm;
