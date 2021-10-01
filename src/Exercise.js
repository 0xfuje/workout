import React, { useEffect, useState } from 'react';
import Set from './Set';
import { nanoid } from 'nanoid';
import ellipsisSettingsIcon from './images/icons/ellipsis-v-solid.svg';
import './styles/Exercise.scss';



function Exercise(props) {
    // Sets logic
    const oldSets = props.sets;
    const newSets = () => oldSets.map((set, i) => ( {...set, id: nanoid()} ));

    // Set states
    const [sets, setSets] = useState(newSets);
    const [plusSets, setPlusSets] = useState(oldSets.length);

    // Setting states
    const [isSettingsDisplayed, setIsSettingsDisplayed] = useState(false);
    const [isRenameDisplayed, setIsRenameDisplayed] = useState(false);
    const [rename, setRename] = useState();
    
    useEffect(() => setSets(newSets()), [plusSets]);
    if (plusSets === 0)  props.removeEx(props.id);

    // Functions in this comp - Handling functions
    const handleAddSet = () => {
        addSet();
    }
    const handleSettingsClick = () => {
        setIsSettingsDisplayed(!isSettingsDisplayed);
    }
    const handleSettingsChange = (e) => {
        if (e.target.value === 'rename') setIsRenameDisplayed(true);
        if (e.target.value === 'remove') props.removeEx(props.id);
        setIsSettingsDisplayed(false);
    }
    const handleRenameChange = (e) => {
        setRename(e.target.value);
    }
    
    const handleRenameClick = (e) => {
        props.renameEx(props.id, rename);
        setIsRenameDisplayed(false);
    }

    // Functions in this comp
    const addSet = () => {
        oldSets.push({weight: 0, reps: 0, rpe: 0});
        setPlusSets(plusSets + 1);
    }

    // Functions passed down
    const checkSet = (pos, setData) => {
        const [weight, reps, rpe] = setData;
        oldSets[pos] = {weight, reps, rpe};
        setPlusSets(plusSets + 1);
    }
    const deleteSet = (pos) => {
        oldSets.splice(pos, 1);
        setPlusSets(plusSets - 1);
    }

    // Display variables
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

    const displayExSettings = 
    <select className='Exercise-settings-selector' onChange={handleSettingsChange}>
        <option className='Exercise-settings-selector-option' value="none">Select One 🠗</option>
        <option className='Exercise-settings-selector-option' value="rename">Rename Exercise</option>
        <option className='Exercise-settings-selector-option' value="remove">Remove Exercise</option>
    </select>

    const displayRename = 
    <div className="Exercise-settings-rename">
        <input className='Exercise-settings-rename-input input' onChange={handleRenameChange} placeholder='New Name'/>
        <span className='Exercise-settings-rename-button button' onClick={handleRenameClick}>Rename</span>
    </div>
    
    
    return (
        <div className={`Exercise Exercise-${props.pos}`}>
            <div className="flex">
                <h2 className='Exercise-name'>{props.name}</h2>
                <img src={ellipsisSettingsIcon} onClick={handleSettingsClick} className="Exercise-settings" alt="Exercise settings"/>
            </div>
            {isSettingsDisplayed ? displayExSettings : ''}
            {isRenameDisplayed ? displayRename : ''}
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
            <span className='Exercise-addSet' onClick={handleAddSet}>Add Set</span>
        </div>
    )
}

export default Exercise;
