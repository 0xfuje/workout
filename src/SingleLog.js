import React from 'react';
import './styles/SingleLog.scss';

import backArrow from './images/icons/long-arrow-alt-left-solid.svg';

function SingleLog(props) {
    const workoutDate = props.routeProps.location.pathname.slice(5);
    const workout = props.workoutLog.filter(log => log.date === workoutDate)[0];
    console.log(workout);
    const displayExercises = workout.exercises.map((ex) => {
        return (
            <div className="SingleLog-exercise">
                <h2 className='SingleLog-exercise-name'>{ex.name} — ({ex.bodypart})</h2>
                <ul className="SingleLog-exercise-sets">
                    {ex.sets.map((set, i) => {
                        return (
                            <li className='SingleLog-exercise-sets-set'>
                                <span className='SingleLog-exercise-sets-set-number'>{i + 1}</span>
                                <span className='SingleLog-exercise-sets-set-weight'>{set}</span>
                            </li>
                        )
                    })}
                </ul>
            </div>
            
        )
    })
    return (
        <div className='SingleLog'>
            <div className="flex">
                <h2 className='SingleLog-title title'>Workout - {workout.date}</h2>
                    <a href='/log' className='SingleLog-settings'>
                        <img src={backArrow} className='SingleLog-icon' alt="settings" />
                    </a>
            </div>
            <div className="SingleLog-exercises">
                {displayExercises}
            </div>
        </div>
        
    )
}

export default SingleLog;
