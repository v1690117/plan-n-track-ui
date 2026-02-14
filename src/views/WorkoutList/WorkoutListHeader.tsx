import React, {useCallback, useEffect} from 'react';
import {WorkoutFilter} from "./WorkoutListStyles";
import useAppStore from "../../store/store.ts";
import {IconButton} from "../../components/IconButton/IconButton.tsx";
import {Plus} from "lucide-react";

const WorkoutListHeader: React.FC = () => {
    const loadWorkouts = useAppStore(s => s.loadWorkouts);
    const addWorkout = useAppStore(s => s.addWorkout);
    const workoutFilter = useAppStore(s => s.workoutFilter);
    const setWorkoutFilter = useAppStore(s => s.setWorkoutFilter);

    const handleCreateWorkout = useCallback(async () => {
        const title = prompt("Введите название тренировки")?.trim();
        if (title) {
            await addWorkout({title});
        }
    }, [addWorkout]);

    const handleFilterChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setWorkoutFilter(e.currentTarget.value);
    }, [setWorkoutFilter]);

    useEffect(() => {
        loadWorkouts()
    }, [loadWorkouts]);

    return (
        <>
            <WorkoutFilter
                placeholder="Поиск..."
                value={workoutFilter}
                onChange={handleFilterChange}
            />
            <IconButton onClick={handleCreateWorkout}><Plus/></IconButton>
        </>
    );
};

export default WorkoutListHeader;
