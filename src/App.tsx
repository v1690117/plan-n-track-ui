import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import WorkoutList from './views/WorkoutList/WorkoutList';
import Workout from './views/Workout/Workout';
import {Body, Container, Header, NavBar} from "./AppStyles.tsx";
import WorkoutListHeader from "./views/WorkoutList/WorkoutListHeader.tsx";
import Timer from "./views/Timer/Timer.tsx";
import React from "react";
import WorkoutHeader from "./views/Workout/WorkoutHeader.tsx";
import Navigation from "./views/Navigation/Navigation.tsx";

const App: React.FC = () => {
    return (
        <Container>
            <Router>
                <Routes>
                    <Route path="/" element={
                        <>
                            <Header><WorkoutListHeader/></Header>
                            <Body><WorkoutList/></Body>
                        </>
                    }/>
                    <Route path="/workout/:id" element={
                        <>
                            <Header><WorkoutHeader/></Header>
                            <Body><Workout/></Body>
                        </>
                    }/>
                </Routes>
                <Timer/>
                <NavBar>
                    <Navigation/>
                </NavBar>
            </Router>
        </Container>
    );
};

export default App
