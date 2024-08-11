import React from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate, useParams } from 'react-router-dom';
import WorkoutListPage from './views/WorkoutListPage';
import WorkoutPage from './views/WorkoutPage';

const App: React.FC = () => {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<WorkoutListPage />} />
          <Route path="/workout/:id" element={<WorkoutDetail />} />
        </Routes>
      </Router>
  );
};

const WorkoutDetail: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const workout = { id: Number(id), title: `Тренировка ${id}`, date: new Date().toLocaleString() };

  return <WorkoutPage workout={workout} onClose={() => navigate('/')} />;
};

export default App;
