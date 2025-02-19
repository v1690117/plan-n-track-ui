import './App.css'

import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import WorkoutList from './views/WorkoutList/WorkoutList';
import Workout from './views/Workout/Workout';
import {Body, Container, Header, NavBar} from "./AppStyles.tsx";
import WorkoutListHeader from "./views/WorkoutList/WorkoutListHeader.tsx";
import Timer from "./views/Timer/Timer.tsx";
import React from "react";
import WorkoutHeader from "./views/Workout/WorkoutHeader.tsx";

const App: React.FC = () => {
    return (
        <Container>
            <Header>
                <Router>
                    <Routes>
                        <Route path="/" element={<WorkoutListHeader/>}/>
                        <Route path="/workout/:id" element={<WorkoutHeader/>}/>
                    </Routes>
                </Router>
            </Header>
            <Body>
                <Router>
                    <Routes>
                        <Route path="/" element={<WorkoutList/>}/>
                        <Route path="/workout/:id" element={<Workout/>}/>
                    </Routes>
                </Router>
            </Body>
            <NavBar>
                <Timer/>
            </NavBar>
        </Container>
    );
};

export default App
