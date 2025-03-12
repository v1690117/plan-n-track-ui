import React, {useCallback, useEffect, useMemo, useState} from 'react';

import {useNavigate} from 'react-router-dom';
import {formattedDate} from "../../utils";
import {
    Container,
    WorkoutDate,
    WorkoutFilter,
    WorkoutItem,
    WorkoutListWrapper,
    WorkoutTitle
} from "./WorkoutListStyles";
import useAppStore from "../../store/store.ts";

const WorkoutList: React.FC = () => {
    const navigate = useNavigate();

    const workouts = useAppStore(s => s.workouts);
    const loadWorkouts = useAppStore(s => s.loadWorkouts);

    const [filter, setFilter] = useState('');

    const handleWorkoutClick = useCallback((id: number) => {
        navigate(`/workout/${id}`);
    }, [navigate]);

    const handleFilterChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setFilter(e.currentTarget.value?.toLowerCase());
    }, []);

    const filteredWorkouts = useMemo(() => {
        return workouts.filter(w => !filter || w.title?.toLowerCase().indexOf(filter) >= 0);
    }, [workouts, filter]);

    useEffect(() => {
        loadWorkouts()
    }, [loadWorkouts]);

    return (
        <Container>
            <WorkoutFilter onChange={handleFilterChange} value={filter}/>
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
