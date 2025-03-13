import React, {useCallback, useEffect, useMemo, useState} from 'react';

import {useNavigate} from 'react-router-dom';
import {Container, ExerciseFilter, ExerciseItem, ExerciseListWrapper, ExerciseTitle} from "./ExerciseListStyles";
import useAppStore from "../../store/store.ts";

const ExerciseList: React.FC = () => {
    const navigate = useNavigate();

    const [filter, setFilter] = useState('');

    const exercises = useAppStore(s => s.exercises);
    const loadExercises = useAppStore(s => s.loadExercises);

    const handleExerciseClick = useCallback((id: number) => {
        navigate(`/exercises/${id}`);
    }, [navigate]);

    const handleFilterChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setFilter(e.currentTarget.value?.toLowerCase());
    }, []);

    const filteredExercises = useMemo(() => {
        return exercises.filter(e => !filter || e.title?.toLowerCase().indexOf(filter) >= 0);
    }, [exercises, filter]);

    useEffect(() => {
        loadExercises()
    }, [loadExercises]);

    return (
        <Container>
            <ExerciseFilter value={filter} onChange={handleFilterChange}/>
            <ExerciseListWrapper>
                {filteredExercises.map(ex => (
                    <ExerciseItem key={ex.id} onClick={() => handleExerciseClick(ex.id)}>
                        <ExerciseTitle>{ex.title}</ExerciseTitle>
                    </ExerciseItem>
                ))}
            </ExerciseListWrapper>
        </Container>
    );
};

export default ExerciseList;
