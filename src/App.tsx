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
            <Router>
                <Header>
                    <Routes>
                        <Route path="/" element={<WorkoutListHeader/>}/>
                        <Route path="/workout/:id" element={<WorkoutHeader/>}/>
                    </Routes>
                </Header>
                <Body>
                    <Routes>
                        <Route path="/" element={<WorkoutList/>}/>
                        <Route path="/workout/:id" element={<Workout/>}/>
                    </Routes>
                </Body>
                <NavBar>
                    <Timer/>
                </NavBar>
            </Router>
        </Container>
    );
};

export default App
