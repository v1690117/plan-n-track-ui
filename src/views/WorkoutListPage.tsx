import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const WorkoutListPage: React.FC = () => {
    const navigate = useNavigate();
    const [workouts, setWorkouts] = useState<{ id: number, title: string, date: string }[]>([
        {
            id: 1,
            title: 'Ноги 1',
            date: "13/10/2024"
        },
        {
            id: 2,
            title: 'Руки 1',
            date: "15/10/2024"
        },
        {
            id: 3,
            title: 'Грудь',
            date: "18/10/2024"
        },
        {
            id: 4,
            title: 'Плечи',
            date: "21/10/2024"
        }
    ]);

    const handleCreateWorkout = () => {
        const newWorkout = {
            id: Date.now(),
            title: prompt("Введите название тренировки") || `Тренировка ${workouts.length + 1}`,
            date: new Date().toLocaleString(),
        };
        setWorkouts([...workouts, newWorkout]);
    };

    const handleWorkoutClick = (id: number) => {
        navigate(`/workout/${id}`);
    };

    return (
        <Container>
            <Title>Мои тренировки</Title>
            <WorkoutList>
                {workouts.map(workout => (
                    <WorkoutItem key={workout.id} onClick={() => handleWorkoutClick(workout.id)}>
                        <WorkoutTitle>{workout.title}</WorkoutTitle>
                        <WorkoutDate>{workout.date}</WorkoutDate>
                    </WorkoutItem>
                ))}
            </WorkoutList>
            <CreateButton onClick={handleCreateWorkout}>Создать тренировку</CreateButton>
        </Container>
    );
};

const Container = styled.div`
    padding: 20px;
`;

const Title = styled.h1`
    text-align: center;
`;

const WorkoutList = styled.div`
    margin-top: 20px;
`;

const WorkoutItem = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 10px;
    border-bottom: 1px solid #ccc;
    cursor: pointer;

    &:hover {
        background-color: #f0f0f0;
    }
`;

const WorkoutTitle = styled.div`
    font-weight: bold;
`;

const WorkoutDate = styled.div`
    color: #888;
`;

const CreateButton = styled.button`
    margin-top: 20px;
    padding: 10px;
    width: 100%;
    background-color: #007BFF;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
`;

export default WorkoutListPage;
