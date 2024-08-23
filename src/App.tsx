import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import WorkoutListPage from './views/WorkoutListPage';
import WorkoutPage from './views/WorkoutPage';

const App: React.FC = () => {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<WorkoutListPage />} />
          <Route path="/workout/:id" element={<WorkoutPage />} />
        </Routes>
      </Router>
  );
};

export default App;
