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

    const handleDoneSet = () => {
        console.log(weight, reps, rpe);
    }
    const handleDeleteSet = () => {
        
    }
    return (
        <div className={`Set Set-${props.num}`}>
            <p className='Set-number'>{props.num+1}</p>
            <input name='weight' onChange={handleWeightChange} className='Set-input input' type="number" min="0" max="999"/>
            <input name='reps' onChange={handleRepsChange} className='Set-input input' type="number" min="0" max="50"/>
            <input name='rpe' onChange={handleRpeChange} className='Set-input input' type="number" min="0" max="10"/>
            <div className="Set-icons">
                <a onClick={handleDoneSet} className="Set-check">
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
