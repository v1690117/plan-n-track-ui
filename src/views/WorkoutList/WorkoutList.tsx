import React, {useCallback, useEffect, useMemo} from 'react';

import {useNavigate} from 'react-router-dom';
import {formattedDate} from "../../utils";
import {
    Container,
    WorkoutDate,
    WorkoutItem,
    WorkoutListWrapper,
    WorkoutTitle
} from "./WorkoutListStyles";
import useAppStore from "../../store/store.ts";

const WorkoutList: React.FC = () => {
    const navigate = useNavigate();

    const workouts = useAppStore(s => s.workouts);
    const loadWorkouts = useAppStore(s => s.loadWorkouts);
    const filter = useAppStore(s => s.workoutFilter);

    const handleWorkoutClick = useCallback((id: number) => {
        navigate(`/workout/${id}`);
    }, [navigate]);

    const filteredWorkouts = useMemo(() => {
        const lc = filter.toLowerCase();
        return workouts.filter(w => !lc || w.title?.toLowerCase().indexOf(lc) >= 0);
    }, [workouts, filter]);

    useEffect(() => {
        loadWorkouts()
    }, [loadWorkouts]);

    return (
        <Container>
            <WorkoutListWrapper>
                {filteredWorkouts.map(workout => (
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
