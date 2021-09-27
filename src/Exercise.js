import React, { useEffect, useState } from 'react';
import Set from './Set';
import { nanoid } from 'nanoid';
import ellipsisSettingsIcon from './images/icons/ellipsis-v-solid.svg';
import './styles/Exercise.scss';



function Exercise(props) {
    const oldSets = props.sets;
    const newSets = () => oldSets.map((set, i) => ( {...set, id: nanoid()} ));
    const [sets, setSets] = useState(newSets);
    const [plusSets, setPlusSets] = useState(0);
    
    useEffect(() => setSets(newSets()), [plusSets]);
    
    const addSet = () => {
        oldSets.push({weight: 0, reps: 0, rpe: 0});
        setPlusSets(plusSets + 1);
    }

    const checkSet = (pos, setData) => {
        const [weight, reps, rpe] = setData;
        oldSets[pos] = {weight, reps, rpe};
        setPlusSets(plusSets + 1);
    }

    const deleteSet = (pos) => {
        oldSets.splice(pos, 1);
        setPlusSets(plusSets - 1);
    }

    const displaySets = sets.map((s, i) => {
        return (
            <Set
                weight={s.weight}
                reps={s.reps}
                rpe={s.rpe}
                pos={i} 
                key={s.id} 
                id={s.id}
                checkSet={checkSet}
                deleteSet={deleteSet}
            />
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
