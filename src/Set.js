import React, {useState} from 'react';
import trashCanIcon from './images/icons/trash-solid.svg';
import checkSolidIcon from './images/icons/check-square-solid.svg';
import checkIcon from './images/icons/check-square-regular.svg';
import './styles/Set.scss';

function Set(props) {
    const [weight, setWeight] = useState();
    const [reps, setReps] = useState();
    const [rpe, setRpe] = useState();
    const handleWeightChange = (e) => setWeight(e.target.value);
    const handleRepsChange = (e) => setReps(e.target.value);
    const handleRpeChange = (e) => setRpe(e.target.value);

    const handleCheckSet = () => {
        const setData = [weight, reps, rpe];
        props.checkSet(props.pos, setData);
    }
    const handleDeleteSet = () => {
        props.deleteSet(props.pos);
    }
    
    
    return (
        <div className={`Set Set-${props.pos}`}>
            <p className='Set-number'>{props.pos+1}</p>
            <input placeholder={(props.weight === 0) ? '' : props.weight} name='weight' onChange={handleWeightChange} className='Set-input input' type="number" min="0" max="999"/>
            <input placeholder={(props.reps === 0) ? '' : props.reps} name='reps' onChange={handleRepsChange} className='Set-input input' type="number" min="0" max="50"/>
            <input placeholder={(props.rpe === 0) ? '' : props.rpe} name='rpe' onChange={handleRpeChange} className='Set-input input' type="number" min="0" max="10"/>
            <div className="Set-icons">
                <a onClick={handleCheckSet} className="Set-check">
                    <img src={checkSolidIcon} alt="checkmark" />
                </a>
                <a onClick={handleDeleteSet} className="Set-delete">
                    <img src={trashCanIcon} alt="checkmark" />
                </a>
            </div>
        </div>
    )
}

export default Set;
