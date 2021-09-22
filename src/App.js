import React, { useState } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import NavBar from './NavBar';
import WorkoutForm from './WorkoutForm';
import TrainingLog from './TrainingLog';
import Calculator from './Calculator';
import backgroundImage from './images/blob-scene-haikei.svg';
import './styles/App.scss';


function App() {
    const [presets, setPresets] = useState(
        {
            name: 'Bulk Routine - Fuji',
            workouts: [
                {
                    name: 'Upper',
                    frequency: 3,
                    bodyparts: 
                    [
                        { name: 'Chest', sets: 3, exercies: 1},
                        { name: 'Back', sets: 5, exercises: 2},
                        { name: 'Biceps', sets: 5, exercies: 2},
                        { name: 'Triceps', sets: 4, exercies: 2},
                        { name: 'Side delt', sets: 3, exercies: 1},
                        { name: 'Rear delt', sets: 3, exercies: 1}
                    ]
                },

                {
                    name: 'Lower',
                    frequency: 2,
                    bodyparts: 
                    [
                        { name: 'Quads', sets: 6, exercies: 2},
                        { name: 'Hammstrings', sets: 5, exercies: 2},
                        { name: 'Calves', sets: 6, exercies: 2}
                    ]
                }
            ],
        }
    )
    const [workouts, setWorkouts] = useState(
        [
            {
                date: '2021/09/21',
                exercises: [
                    { name: 'Close Grip Bench Press', bodypart: 'Chest', sets: ['80x4', '70x10']},
                    { name: 'Chest Press', bodypart: 'Chest', sets: ['40x15', '40x13']},
                    { name: 'Pulldown', bodypart: 'Back', sets: ['45x15', '60x12', '60x12']},
                    { name: 'Cable Row', bodypart: 'Back', sets: ['55x12', '50x12', '50x12']},
                    { name: 'Side Lat Raise Machine', bodypart: 'Side delt', sets: ['18x12', '18x12', '18x12']},
                    { name: 'Cable Face Pull', bodypart: 'Rear delt', sets: ['30x20', '30x20', '30x20']},
                    { name: 'Cable Triceps Extension', bodypart: 'Triceps', sets: ['35x12', '40x8', '30x15']},
                    { name: 'Seated EZ Bar Curl', bodypart: 'Biceps', sets: ['25x15', '32.5x8', '32.5x7']},
                    { name: 'One-arm Biceps Curl', bodypart: 'Biceps', sets: ['2x10x15', '2x10x15']},
                ],
                scretching: true
            }

        ]
    );
    
    const getExercises = workouts.map((w) => (w.exercises.map(ex => {
        const exercise = {  name: ex.name, bodypart: ex.bodypart };
        return exercise;
    })));
    const [exercises, setExercises] = useState(...getExercises);
    return (
        <div className='App' style={{ backgroundImage: `url(${backgroundImage})`}}>
            <NavBar />
            <div className="container">
                <Switch>
                    <Route exact path='/new' render={() => <WorkoutForm presets={presets} />} />
                    <Route exact path='/log' render={() => <TrainingLog />} />
                    <Route exact path='/calculator' render={() => <Calculator />} />
                    <Redirect to='/new' />
                </Switch>
            </div>
        </div>
    )
}

export default App;
