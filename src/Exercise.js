import React, { useEffect, useState } from 'react';
import Set from './Set';
import { nanoid } from 'nanoid';
import ellipsisSettingsIcon from './images/icons/ellipsis-v-solid.svg';
import './styles/Exercise.scss';



function Exercise(props) {
    const oldSets = props.sets;
    const newSets = () => oldSets.map((set, i) => ( {...set, id: nanoid()} ));
    const [sets, setSets] = useState(newSets);
    const [setsAdded, setSetsAdded] = useState(0);
    const addSet = () => {
        oldSets.push({weight: 0, reps: 0, rpe: 0});
        setSetsAdded(setsAdded + 1);
    }
    useEffect(() => setSets(newSets()), [setsAdded]);


    const displaySets = sets.map((s, i) => {
        return (
            <Set num={i} key={s.id} id={s.id} />
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
            <a className='Exercise-addSet' onClick={addSet}>Add Set</a>
        </div>
    )
}

export default Exercise;
