import React, { useEffect, useState, useReducer } from 'react';
import Set from './Set';
import { nanoid } from 'nanoid';
import ellipsisSettingsIcon from './images/icons/ellipsis-v-solid.svg';
import './styles/Exercise.scss';
import Alert from './Alert';



function Exercise(props) {
    // Sets logic
    const oldSets = props.sets;
    const newSets = () => oldSets.map((set, i) => ( {...set, id: nanoid()} ));

    // Set states
    const [sets, setSets] = useState(newSets);
    const [plusSets, setPlusSets] = useState(oldSets.length);

    // Showing settings via state
    const [isSettingsDisplayed, setIsSettingsDisplayed] = useState(false);
    const [isRenameDisplayed, setIsRenameDisplayed] = useState(false);
    const [isBodypartDisplayed, setIsBodypartDisplayed] = useState(false);

    // Alert states
    const [alert, setAlert] = useState(false);
    const [alertText, setAlertText] = useState();

    // Rename and new bodypart
    const [rename, setRename] = useState();
    const [bodypart, setBodypart] = useState(props.name);

    useEffect(() => {
        const alertTimer = setTimeout(() => {
            setAlert(false);
        }, 3000);
        return () => clearTimeout(alertTimer);
    }, [alert])
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
        if (e.target.value === 'bodypart') setIsBodypartDisplayed(true);
        if (e.target.value === 'remove') props.removeEx(props.id);
        setIsSettingsDisplayed(false);
    }
    const handleRenameChange = (e) => {
        setRename(e.target.value);
    }
    const handleBodypartChange = (e) => {
        setBodypart(e.target.value);
        setIsBodypartDisplayed(false);
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
        if (weight === 0) {
            setAlertText('Add a valid number to weights');
            return setAlert(true);
        };
        if (reps === 0) {
            setAlertText('Add a valid number to reps');
            return setAlert(true);
        };
        oldSets[pos] = {weight, reps, rpe};
        setPlusSets(plusSets + '');
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
        <option className='Exercise-settings-selector-option' value="bodypart">Change Bodypart</option>
    </select>

    const displayRename = 
    <div className="Exercise-settings-rename">
        <input className='Exercise-settings-rename-input input' onChange={handleRenameChange} placeholder='New Name'/>
        <span className='Exercise-settings-rename-button button' onClick={handleRenameClick}>Rename</span>
    </div>
    
    const displayBodypartChange =
    <select className="Exercise-settings-bodypart" onChange={handleBodypartChange}>
        {props.bodyparts.map((bp) => {
            return <option className='Exercise-settings-bodypart-option' value={bp}>{bp}</option>
        })}
    </select>

    return (
        <div className={`Exercise Exercise-${props.pos}`}>
            <div className="flex">
                <h2 className='Exercise-name'>{props.name}</h2>
                <img src={ellipsisSettingsIcon} onClick={handleSettingsClick} className="Exercise-settings" alt="Exercise settings"/>
            </div>
            {alert ? <Alert text={alertText} /> : ''}
            {isSettingsDisplayed ? displayExSettings : ''}
            {isRenameDisplayed ? displayRename : ''}
            {isBodypartDisplayed ? displayBodypartChange : ''}
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
