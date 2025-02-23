import React, {useCallback, useEffect} from 'react';

import {Header, Title} from "./WorkoutListStyles";
import useAppStore from "../../store/store.ts";
import {TextButton} from "../../components/TextButton/TextButton.tsx";

const WorkoutListHeader: React.FC = () => {
    const loadWorkouts = useAppStore(s => s.loadWorkouts);
    const addWorkout = useAppStore(s => s.addWorkout);

    const handleCreateWorkout = useCallback(async () => {
        const title = prompt("Введите название тренировки")?.trim();
        if (title) {
            await addWorkout({title});
        }
    }, [addWorkout]);

    useEffect(() => {
        loadWorkouts()
    }, [loadWorkouts]);

    return (
        <Header>
            <Title>Мои тренировки</Title>
            <TextButton onClick={handleCreateWorkout}>Создать тренировку</TextButton>
        </Header>
    );
};

export default WorkoutListHeader;
