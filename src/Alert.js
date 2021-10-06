import React from 'react';
import './styles/Alert.scss';

function Alert(props) {
    return (
        <div className='Alert'>
            <p>{props.text}</p>
        </div>
    )
}

export default Alert
