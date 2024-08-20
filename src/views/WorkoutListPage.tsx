import React, {useCallback, useEffect, useRef, useState} from 'react';
import styled from 'styled-components';
import {useNavigate} from 'react-router-dom';
import {formattedDate} from "../utils";
import {Workout} from "../model/Workout";
import WorkoutService from "../services/WorkoutService";

const WorkoutListPage: React.FC = () => {
    const navigate = useNavigate();
    const [workouts, setWorkouts] = useState<Workout[]>([]);
    const service = useRef(new WorkoutService());

    const requestWorkouts = useCallback(() => service.current.findAll().then(setWorkouts), [
        service.current, setWorkouts
    ]);

    const handleCreateWorkout = () => {
        let title = prompt("Введите название тренировки");
        if(title) {
            service.current.create(
                {
                    title: title || ''
                    // date: Date.now(),
                }
            ).then(requestWorkouts);
        }
    };

    const handleWorkoutClick = (id: number) => {
        navigate(`/workout/${id}`);
    };

    useEffect(() => {
        requestWorkouts()
    }, []);

    return (
        <Container>
            <Title>Мои тренировки</Title>
            <WorkoutList>
                {workouts.map(workout => (
                    <WorkoutItem key={workout.id} onClick={() => handleWorkoutClick(workout.id)}>
                        <WorkoutTitle>{workout.title}</WorkoutTitle>
                        <WorkoutDate>{formattedDate(workout.date)}</WorkoutDate>
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
