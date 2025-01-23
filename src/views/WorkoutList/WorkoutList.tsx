import React, {useCallback, useEffect} from 'react';

import {useNavigate} from 'react-router-dom';
import {formattedDate} from "../../utils";
import {Container, CreateButton, Title, WorkoutDate, WorkoutListWrapper, WorkoutTitle, WorkoutItem} from "./WorkoutListStyles";
import useAppStore from "../../store/store.ts";
import Timer from "../Timer/Timer.tsx";

const WorkoutList: React.FC = () => {
    const navigate = useNavigate();

    const workouts = useAppStore(s => s.workouts);
    const loadWorkouts = useAppStore(s => s.loadWorkouts);
    const addWorkout = useAppStore(s => s.addWorkout);

    const handleCreateWorkout = useCallback(async () => {
        const title = prompt("Введите название тренировки")?.trim();
        if(title) {
           await addWorkout({title});
        }
    }, [addWorkout]);

    const handleWorkoutClick = useCallback((id: number) => {
        navigate(`/workout/${id}`);
    }, [navigate]);

    useEffect(() => {
        loadWorkouts()
    }, [loadWorkouts]);

    return (
        <Container>
            <Title>Мои тренировки</Title>
            <WorkoutListWrapper>
                {workouts.map(workout => (
                    <WorkoutItem key={workout.id} onClick={() => handleWorkoutClick(workout.id)}>
                        <WorkoutTitle>{workout.title}</WorkoutTitle>
                        <WorkoutDate>{formattedDate(workout.date)}</WorkoutDate>
                    </WorkoutItem>
                ))}
            </WorkoutListWrapper>
            <CreateButton onClick={handleCreateWorkout}>Создать тренировку</CreateButton>
            <Timer/>
        </Container>
    );
};

export default WorkoutList;
