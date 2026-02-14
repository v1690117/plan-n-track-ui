import React, {useCallback, useEffect, useMemo} from 'react';

import {useNavigate} from 'react-router-dom';
import {Container, ExerciseItem, ExerciseListWrapper, ExerciseTitle} from "./ExerciseListStyles";
import useAppStore from "../../store/store.ts";

const ExerciseList: React.FC = () => {
    const navigate = useNavigate();

    const exercises = useAppStore(s => s.exercises);
    const loadExercises = useAppStore(s => s.loadExercises);
    const filter = useAppStore(s => s.exerciseFilter);

    const handleExerciseClick = useCallback((id: number) => {
        navigate(`/exercises/${id}`);
    }, [navigate]);

    const filteredExercises = useMemo(() => {
        const lc = filter.toLowerCase();
        return exercises.filter(e => !lc || e.title?.toLowerCase().indexOf(lc) >= 0);
    }, [exercises, filter]);

    useEffect(() => {
        loadExercises()
    }, [loadExercises]);

    return (
        <Container>
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
