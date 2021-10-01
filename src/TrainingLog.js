import React from 'react';
import { Link } from 'react-router-dom';
import './styles/TrainingLog.scss';

import backArrow from './images/icons/long-arrow-alt-left-solid.svg';

function TrainingLog(props) {
    const dailyLogs = props.workoutLog.map((log) => {
        return <Link className='TrainingLog-link' to={`/log/${log.date}`}>{log.date}</Link>
    })
    return (
        <div className='TrainingLog'>
            <div className="flex">
                <h2 className='TrainingLog-title title'>Training Log</h2>
                <a href='/new' className='TrainingLog-back'>
                    <img src={backArrow} alt="Go Back To Main Page" />
                </a>
            </div>
            <h3 className='TrainingLog-subtitle'>Latest workouts:</h3>
            {dailyLogs}
        </div>
    )
}

export default TrainingLog
