import React  from 'react';
import { Fragment } from 'react/cjs/react.development';
import ellipsisSettingsIcon from './images/icons/ellipsis-v-solid.svg';
import trashCanIcon from './images/icons/trash-solid.svg';
import checkSolidIcon from './images/icons/check-square-solid.svg';
import checkIcon from './images/icons/check-square-regular.svg';
import './styles/Exercise.scss';

function Exercise(props) {
    const sets = Array(parseInt(props.sets)).fill();
    const displaySets = sets.map((s, i) => {
        return (
            <Fragment>
                <p className='Exercise-grid-number'>{i+1}</p>
                <input className='Exercise-grid-input input' type="number" min="0" max="999"/>
                <input className='Exercise-grid-input input' type="number" min="0" max="50"/>
                    <input className='Exercise-grid-input input' type="number" min="0" max="10"/>
                <div className="Exercise-grid-icons">
                    <a href='/new' className="Exercise-grid-check">
                        <img src={checkSolidIcon} alt="checkmark" />
                    </a>
                    <a href='/new' className="Exercise-grid-delete">
                        <img src={trashCanIcon} alt="checkmark" />
                    </a>
                </div>
            </Fragment>
        )
    })
    return (
        <div className="Exercise">
            <div className="flex">
                <h2 className='Exercise-name'>{props.name}</h2>
                <a href="/new" className="Exercise-settings">
                    <img src={ellipsisSettingsIcon} alt="Exercise settings" />
                </a>
            </div>
            <div className="Exercise-grid">
                <p className='Exercise-grid-head'>set</p>
                <p className='Exercise-grid-head'>kg</p>
                <p className='Exercise-grid-head'>reps</p>
                <p className='Exercise-grid-head'>rpe</p>
                <div className="Exercise-grid-empty"></div>
                {displaySets}
            </div>
            <a className='Exercise-addSet' onClick={props.addSet}>Add Set</a>
        </div>
    )
}

export default Exercise;
