import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import WorkoutList from './views/WorkoutList/WorkoutList';
import Workout from './views/Workout/Workout';
import {Body, Container, Content, Header, NavBar} from "./AppStyles.tsx";
import Timer from "./views/Timer/Timer.tsx";
import React from "react";
import WorkoutHeader from "./views/Workout/WorkoutHeader.tsx";
import Navigation from "./views/Navigation/Navigation.tsx";
import ExerciseList from "./views/ExerciseList/ExerciseList.tsx";
import ExerciseHeader from "./views/Exercise/ExerciseHeader.tsx";
import Exercise from "./views/Exercise/Exercise.tsx";

const App: React.FC = () => {
    return (
        <Router>
            <Container>
                <Content>
                    <Routes>
                        <Route path="/" element={
                            <Body><WorkoutList/></Body>
                        }/>
                        <Route path="/workout/:id" element={
                            <>
                                <Header><WorkoutHeader/></Header>
                                <Body><Workout/></Body>
                            </>
                        }/>
                        <Route path="/exercises" element={
                            <Body><ExerciseList/></Body>
                        }/>
                        <Route path="/exercises/:id" element={
                            <>
                                <Header><ExerciseHeader/></Header>
                                <Body><Exercise/></Body>
                            </>
                        }/>
                    </Routes>
                </Content>
                <Timer/>
                <NavBar>
                    <Navigation/>
                </NavBar>
            </Container>
        </Router>
    );
};

export default App
