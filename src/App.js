import React, { useState } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import NavBar from './NavBar';
import WorkoutForm from './WorkoutForm';
import TrainingLog from './TrainingLog';
import Calculator from './Calculator';
import backgroundImage from './images/blob-scene-haikei.svg';
import './styles/App.scss';


function App() {
    const [workoutRoutines, setWorkoutRoutines] = useState(
        [
            {
                name: 'Upper',
                frequency: 3,
                exercises: 
                [
                    { name: 'Chest', sets: 4 },
                    { name: 'Vertical Pull', sets: 3},
                    { name: 'Horizontal Pull', sets: 2},
                    { name: 'Biceps - 1', sets: 3 },
                    { name: 'Biceps - 2', sets: 2 },
                    { name: 'Triceps - 1', sets: 2 },
                    { name: 'Triceps - 2', sets: 2 },
                    { name: 'Side delt', sets: 3 },
                    { name: 'Rear delt', sets: 3 }
                ]
            },

            {
                name: 'Lower',
                frequency: 3,
                exercises: 
                [
                    { name: 'Quads - 1', sets: 3},
                    { name: 'Quads - 2', sets: 3},
                    { name: 'Hammstrings - 1', sets: 3},
                    { name: 'Hammstrings - 2', sets: 3},
                    { name: 'Calves - 1', sets: 3},
                    { name: 'Calves - 2', sets: 3},
                    { name: 'Calves - 3', sets: 2}
                ]
            }
        ]
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
            },
            {
                date: '2021/09/22',
                exercises: [
                    { name: 'Leg Press', bodypart: 'Quads', sets: ['100x20', '120x12', '120x12']},
                    { name: 'Romanian Deadlift', bodypart: 'Hammstrings', sets: ['80x13', '80x13']},
                    { name: 'Leg Extension', bodypart: 'Quads', sets: ['27x20', '27x20']},
                    { name: 'Hammstring Curl', bodypart: 'Hammstrings', sets: ['22x20', '22x20']},
                    { name: 'Horizontal Calf Machine', bodypart: 'Calf', sets: ['45x20', '45x20', '45x20', '2x18x20', '2x18x20']},
                ],
                scretching: false
            }

        ]
    );
    let exercisesArr = [];
    workouts.map((w) => ([...w.exercises].map(ex => {
        const exercise = {  name: ex.name, bodypart: ex.bodypart };
        exercisesArr.push(exercise);
    })));

    const addExercise = () => {
        
    }
    
    const removeExercise = () => {

    }
    
    const [exercises, setExercises] = useState(exercisesArr);

    
    return (
        <div className='App' style={{ backgroundImage: `url(${backgroundImage})`}}>
            <NavBar />
            <div className="container">
                <Switch>
                    <Route exact path='/new' render={() => <WorkoutForm 
                        workoutRoutines={workoutRoutines}
                        exercises={exercises}
                        addExercise={addExercise}
                        removeExercise={removeExercise} />} />
                    <Route exact path='/log' render={() => <TrainingLog />} />
                    <Route exact path='/calculator' render={() => <Calculator />} />
                    <Redirect to='/new' />
                </Switch>
            </div>
        </div>
    )
}

export default App;
