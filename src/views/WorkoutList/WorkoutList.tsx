import React, {useCallback, useEffect, useMemo, useState} from 'react';

import {useNavigate} from 'react-router-dom';
import {formattedDate} from "../../utils";
import {
    Container,
    Toolbar,
    WorkoutDate,
    WorkoutFilter,
    WorkoutItem,
    WorkoutListWrapper,
    WorkoutTitle
} from "./WorkoutListStyles";
import useAppStore from "../../store/store.ts";
import {IconButton} from "../../components/IconButton/IconButton.tsx";
import {Plus} from "lucide-react";

const WorkoutList: React.FC = () => {
    const navigate = useNavigate();

    const workouts = useAppStore(s => s.workouts);
    const loadWorkouts = useAppStore(s => s.loadWorkouts);
    const addWorkout = useAppStore(s => s.addWorkout);

    const [filter, setFilter] = useState('');

    const handleWorkoutClick = useCallback((id: number) => {
        navigate(`/workout/${id}`);
    }, [navigate]);

    const handleFilterChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setFilter(e.currentTarget.value?.toLowerCase());
    }, []);

    const handleCreateWorkout = useCallback(async () => {
        const title = prompt("Введите название тренировки")?.trim();
        if (title) {
            await addWorkout({title});
        }
    }, [addWorkout]);

    const filteredWorkouts = useMemo(() => {
        return workouts.filter(w => !filter || w.title?.toLowerCase().indexOf(filter) >= 0);
    }, [workouts, filter]);

    useEffect(() => {
        loadWorkouts()
    }, [loadWorkouts]);

    return (
        <Container>
            <Toolbar>
                <WorkoutFilter onChange={handleFilterChange} value={filter}/>
                <IconButton onClick={handleCreateWorkout}><Plus/></IconButton>
            </Toolbar>
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
