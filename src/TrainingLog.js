import React from 'react';
import { Link } from 'react-router-dom';
import { nanoid } from 'nanoid';
import './styles/TrainingLog.scss';

import backArrow from './images/icons/long-arrow-alt-left-solid.svg';
import settingsIcon from './images/icons/cog-solid.svg';

function TrainingLog(props) {
    const dailyLogs = props.workoutLog.map((log) => {
        return <Link className='TrainingLog-link' to={`/log/${log.date}`} key={nanoid()}>{log.date}</Link>
    });

    return (
        <div className='TrainingLog'>
            <div className="flex">
                <h2 className='TrainingLog-title title'>Training Log</h2>
                <div className="TrainingLog-icons">
                    <a href='/' className='TrainingLog-back'>
                        <img src={backArrow} className='TrainingLog-icon' alt="Go Back To Main Page" />
                    </a>
                    <a href="/" className='TrainingLog-settings'>
                        <img src={settingsIcon} className='TrainingLog-icon' alt="Settings" />
                    </a>
                </div>
            </div>
            <h3 className='TrainingLog-subtitle'>Latest workouts:</h3>
            {dailyLogs}
        </div>
    )
}

export default TrainingLog;
