import React, {useCallback, useEffect} from 'react';

import {useNavigate} from 'react-router-dom';
import {Container, ExerciseItem, ExerciseListWrapper, ExerciseTitle} from "./ExerciseListStyles";
import useAppStore from "../../store/store.ts";

const ExerciseList: React.FC = () => {
    const navigate = useNavigate();

    const exercises = useAppStore(s => s.exercises);
    const loadExercises = useAppStore(s => s.loadExercises);

    const handleExerciseClick = useCallback((id: number) => {
        navigate(`/exercises/${id}`);
    }, [navigate]);

    useEffect(() => {
        loadExercises()
    }, [loadExercises]);

    return (
        <Container>
            <ExerciseListWrapper>
                {exercises.map(ex => (
                    <ExerciseItem key={ex.id} onClick={() => handleExerciseClick(ex.id)}>
                        <ExerciseTitle>{ex.title}</ExerciseTitle>
                    </ExerciseItem>
                ))}
            </ExerciseListWrapper>
        </Container>
    );
};

export default ExerciseList;
