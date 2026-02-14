import React, {useCallback, useEffect} from 'react';
import {ExerciseFilter} from "./ExerciseListStyles";
import useAppStore from "../../store/store.ts";
import {IconButton} from "../../components/IconButton/IconButton.tsx";
import {Plus} from "lucide-react";

const ExerciseListHeader: React.FC = () => {
    const loadExercises = useAppStore(s => s.loadExercises);
    const addExercise = useAppStore(s => s.addExercise);
    const exerciseFilter = useAppStore(s => s.exerciseFilter);
    const setExerciseFilter = useAppStore(s => s.setExerciseFilter);

    const handleCreateExercise = useCallback(async () => {
        const title = prompt("Введите название упражнения")?.trim();
        if (title) {
            await addExercise({title});
        }
    }, [addExercise]);

    const handleFilterChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setExerciseFilter(e.currentTarget.value);
    }, [setExerciseFilter]);

    useEffect(() => {
        loadExercises()
    }, [loadExercises]);

    return (
        <>
            <ExerciseFilter
                placeholder="Поиск..."
                value={exerciseFilter}
                onChange={handleFilterChange}
            />
            <IconButton onClick={handleCreateExercise}><Plus/></IconButton>
        </>
    );
};

export default ExerciseListHeader;
