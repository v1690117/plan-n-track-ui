import React, {useCallback, useEffect, useRef, useState} from 'react';

import {useNavigate} from 'react-router-dom';
import {formattedDate} from "../../utils";
import {IWorkout} from "../../model/IWorkout";
import WorkoutService from "../../services/WorkoutService";
import {Container, CreateButton, Title, WorkoutDate, WorkoutListWrapper, WorkoutTitle, WorkoutItem} from "./WorkoutListStyles";

const WorkoutList: React.FC = () => {
    const navigate = useNavigate();
    const [workouts, setWorkouts] = useState<IWorkout[]>([]);
    const service = useRef(new WorkoutService());

    const requestWorkouts = useCallback(() => service.current.findAll().then(setWorkouts), []);

    const handleCreateWorkout = () => {
        let title = prompt("Введите название тренировки");
        if(title) {
            service.current.create(
                {
                    title
                }
            ).then(requestWorkouts);
        }
    };

    const handleWorkoutClick = (id: number) => {
        navigate(`/workout/${id}`);
    };

    useEffect(() => {
        requestWorkouts()
    }, [requestWorkouts]);

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
        </Container>
    );
};

export default WorkoutListWrapper;
