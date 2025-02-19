import React, {useCallback, useEffect} from 'react';

import {useNavigate} from 'react-router-dom';
import {formattedDate} from "../../utils";
import {Container, WorkoutDate, WorkoutListWrapper, WorkoutTitle, WorkoutItem} from "./WorkoutListStyles";
import useAppStore from "../../store/store.ts";

const WorkoutList: React.FC = () => {
    const navigate = useNavigate();

    const workouts = useAppStore(s => s.workouts);
    const loadWorkouts = useAppStore(s => s.loadWorkouts);

    const handleWorkoutClick = useCallback((id: number) => {
        navigate(`/workout/${id}`);
    }, [navigate]);

    useEffect(() => {
        loadWorkouts()
    }, [loadWorkouts]);

    return (
        <Container>
            <WorkoutListWrapper>
                {workouts.map(workout => (
                    <WorkoutItem key={workout.id} onClick={() => handleWorkoutClick(workout.id)}>
                        <WorkoutTitle>{workout.title}</WorkoutTitle>
                        <WorkoutDate>{formattedDate(workout.date)}</WorkoutDate>
                    </WorkoutItem>
                ))}
            </WorkoutListWrapper>
        </Container>
    );
};

export default WorkoutList;
