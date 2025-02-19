import React, {useCallback, useEffect} from 'react';

import {CreateButton, Header, Title} from "./WorkoutListStyles";
import useAppStore from "../../store/store.ts";

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
            <CreateButton onClick={handleCreateWorkout}>Создать тренировку</CreateButton>
        </Header>
    );
};

export default WorkoutListHeader;
