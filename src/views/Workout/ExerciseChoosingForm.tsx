import React, {useCallback, useEffect} from 'react';
import styled from "styled-components";
import {TextButton} from "../../components/TextButton/TextButton.tsx";
import useAppStore from "../../store/store.ts";

const CreationFormContainer = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: white;
    display: flex;
    flex-direction: column;
`

const SearchableSelect = styled.div`
    margin: 10px;
    display: flex;
    flex-direction: column;
    cursor: pointer;
    gap: 10px;
`

const Input = styled.input`
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 16px;
`;

const Ul = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`

const Li = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 8px;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
    background-color: white;
    font-size: 16px;
`

const ExerciseTitle = styled.div`
    
`;

const Toolbar = styled.div`
    margin: 0px 10px;
`;

interface WorkoutCreationFormProps {
    onClose: () => void;
}

const ExerciseChoosingForm: React.FC<WorkoutCreationFormProps> = ({onClose}) => {
    const exercises = useAppStore(s => s.exercises);
    const loadExercises = useAppStore(s => s.loadExercises);
    const addSet = useAppStore(state => state.addSet);

    const handleAddExercise = useCallback(async (exerciseId: number) => {
        await addSet({
            exerciseId,
            load: 0,
            reps: 0,
            rest: 0
        });
        onClose();
    }, [addSet]);

    useEffect(() => {
        loadExercises()
    }, [loadExercises]);

    return (
        <CreationFormContainer>
            <SearchableSelect>
                <Input value={"// todo "}/>
                <Ul>
                    {exercises.map(ex => <Li key={ex.id}>
                        <ExerciseTitle>{ex.title}</ExerciseTitle>
                        <TextButton onClick={() => handleAddExercise(ex.id)}>Добавить</TextButton>
                    </Li>)}
                </Ul>
            </SearchableSelect>
            <Toolbar>
                <TextButton type={'negative'} onClick={onClose}>Отмена</TextButton>
            </Toolbar>
        </CreationFormContainer>
    );
};

export default ExerciseChoosingForm;
