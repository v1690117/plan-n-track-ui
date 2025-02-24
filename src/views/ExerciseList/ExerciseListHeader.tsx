import React, {useCallback, useEffect} from 'react';

import {Header, Title} from "./ExerciseListStyles";
import useAppStore from "../../store/store.ts";
import {TextButton} from "../../components/TextButton/TextButton.tsx";

const ExerciseListHeader: React.FC = () => {
    const loadExercises = useAppStore(s => s.loadExercises);
    const addExercise = useAppStore(s => s.addExercise);

    const handleCreateExercise = useCallback(async () => {
        const title = prompt("Введите название тренировки")?.trim();
        if (title) {
            await addExercise({title});
        }
    }, [addExercise]);

    useEffect(() => {
        loadExercises()
    }, [loadExercises]);

    return (
        <Header>
            <Title>Мои упражнения</Title>
            <TextButton onClick={handleCreateExercise}>Добавить упражнение</TextButton>
        </Header>
    );
};

export default ExerciseListHeader;
