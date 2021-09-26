import React, { useState } from 'react';
import { Fragment } from 'react/cjs/react.development';
import ellipsisSettingsIcon from './images/icons/ellipsis-v-solid.svg';
import trashCanIcon from './images/icons/trash-solid.svg';
import checkSolidIcon from './images/icons/check-square-solid.svg';
import checkIcon from './images/icons/check-square-regular.svg';
import './styles/Exercise.scss';



function Exercise(props) {
    const [sets, setSets] = useState(props.sets);
    const handleAddSet = () => {
        props.addSet(props.id);
    }
    const handleDoneSet = () => {
        props.doneSet(props.id);
    }
    const handleDeleteSet = () => {

    }
    const displaySets = props.sets.map((s, i) => {
        return (
            <div className={`Exercise-grid-set Exercise-grid-set-${i}`}>
                <p className='Exercise-grid-number'>{i+1}</p>
                <input name='weight' className='Exercise-grid-input input' type="number" min="0" max="999"/>
                <input name='reps' className='Exercise-grid-input input' type="number" min="0" max="50"/>
                <input name='rpe' className='Exercise-grid-input input' type="number" min="0" max="10"/>
                <div className="Exercise-grid-icons">
                    <a onClick={handleDoneSet} className="Exercise-grid-check">
                        <img src={checkSolidIcon} alt="checkmark" />
                    </a>
                    <a onClick={handleDeleteSet} className="Exercise-grid-delete">
                        <img src={trashCanIcon} alt="checkmark" />
                    </a>
                </div>
            </div>
        )
    })
    
    return (
        <div className={`Exercise Exercise-${props.pos}`}>
            <div className="flex">
                <h2 className='Exercise-name'>{props.name}</h2>
                <a href="/new" className="Exercise-settings">
                    <img src={ellipsisSettingsIcon} alt="Exercise settings" />
                </a>
            </div>
            <div className="Exercise-grid">
                <div className='Exercise-grid-head'>
                    <p className='Exercise-grid-head-item Exercise-grid-head-item-sets'>sets</p>
                    <p className='Exercise-grid-head-item'>kg</p>
                    <p className='Exercise-grid-head-item'>reps</p>
                    <p className='Exercise-grid-head-item'>rpe</p>
                    <div className='Exercise-grid-head-item'></div>
                </div>
                <div className="Exercise-grid-sets">
                    {displaySets}
                </div>
            </div>
            <a className='Exercise-addSet' onClick={handleAddSet}>Add Set</a>
        </div>
    )
}

export default Exercise;
