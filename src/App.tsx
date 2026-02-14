import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import WorkoutList from './views/WorkoutList/WorkoutList';
import Workout from './views/Workout/Workout';
import {Body, Container, Header, NavBar} from "./AppStyles.tsx";
import Timer from "./views/Timer/Timer.tsx";
import React from "react";
import WorkoutHeader from "./views/Workout/WorkoutHeader.tsx";
import Navigation from "./views/Navigation/Navigation.tsx";
import ExerciseList from "./views/ExerciseList/ExerciseList.tsx";
import ExerciseListHeader from "./views/ExerciseList/ExerciseListHeader.tsx";
import ExerciseHeader from "./views/Exercise/ExerciseHeader.tsx";
import Exercise from "./views/Exercise/Exercise.tsx";
import WorkoutListHeader from "./views/WorkoutList/WorkoutListHeader.tsx";

const App: React.FC = () => {
    return (
        <Router>
            <Container>
                <Header>
                    <Routes>
                        <Route path="/" element={<WorkoutListHeader/>}/>
                        <Route path="/workout/:id" element={<WorkoutHeader/>}/>
                        <Route path="/exercises" element={<ExerciseListHeader/>}/>
                        <Route path="/exercises/:id" element={<ExerciseHeader/>}/>
                    </Routes>
                </Header>
                <Body>
                    <Routes>
                        <Route path="/" element={<WorkoutList/>}/>
                        <Route path="/workout/:id" element={<Workout/>}/>
                        <Route path="/exercises" element={<ExerciseList/>}/>
                        <Route path="/exercises/:id" element={<Exercise/>}/>
                    </Routes>
                </Body>
                <Timer/>
                <NavBar>
                    <Navigation/>
                </NavBar>
            </Container>
        </Router>
    );
};

export default App
