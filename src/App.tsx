import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import WorkoutList from './views/WorkoutList/WorkoutList';
import Workout from './views/Workout/Workout';

const App: React.FC = () => {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<WorkoutList />} />
          <Route path="/workout/:id" element={<Workout />} />
        </Routes>
      </Router>
  );
};

export default App;
