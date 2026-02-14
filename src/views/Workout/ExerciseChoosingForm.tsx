import React, {useCallback, useEffect, useMemo, useState} from 'react';
import styled from "styled-components";
import {IconButton} from "../../components/IconButton/IconButton.tsx";
import {Plus, X} from "lucide-react";
import useAppStore from "../../store/store.ts";

const CreationFormContainer = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #f0fdf4;
    display: flex;
    flex-direction: column;
    z-index: 20;
`

const SearchableSelect = styled.div`
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 12px;
    flex: 1;
    overflow-y: auto;
`

const Input = styled.input`
    padding: 10px 14px;
    border: 1px solid #d1e7dd;
    border-radius: 10px;
    font-size: 15px;
    color: #134e4a;
    background: #fff;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
    transition: border-color 0.15s ease;

    &:focus {
        outline: none;
        border-color: #0d9488;
        box-shadow: 0 0 0 3px rgba(13, 148, 136, 0.1);
    }
`;

const Ul = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
`

const Li = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 12px;
    padding: 12px 14px;
    background: #fff;
    border-radius: 10px;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
    font-size: 15px;
`

const ExerciseTitle = styled.div`
    font-weight: 500;
    color: #134e4a;
`;

const Toolbar = styled.div`
    padding: 12px 16px;
    background: #fff;
    border-top: 1px solid #d1e7dd;
`;

interface WorkoutCreationFormProps {
    onClose: () => void;
}

const ExerciseChoosingForm: React.FC<WorkoutCreationFormProps> = ({onClose}) => {
    const exercises = useAppStore(s => s.exercises);
    const loadExercises = useAppStore(s => s.loadExercises);
    const addSet = useAppStore(state => state.addSet);

    const [filter, setFilter] = useState('');

    const handleAddExercise = useCallback(async (exerciseId: number) => {
        await addSet({
            exerciseId,
            load: 0,
            reps: 0,
            rest: 0
        });
        onClose();
    }, [addSet]);

    const handleFilterChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setFilter(e.currentTarget.value);
    }, []);

    const filteredExercises = useMemo(() => {
        return exercises.filter(ex => !filter || ex.title.toLowerCase().indexOf(filter.toLowerCase()) >= 0);
    }, [exercises, filter]);

    useEffect(() => {
        loadExercises()
    }, [loadExercises]);

    return (
        <CreationFormContainer>
            <SearchableSelect>
                <Input value={filter} onChange={handleFilterChange}/>
                <Ul>
                    {filteredExercises.map(ex => <Li key={ex.id}>
                        <ExerciseTitle>{ex.title}</ExerciseTitle>
                        <IconButton onClick={() => handleAddExercise(ex.id)}><Plus/></IconButton>
                    </Li>)}
                </Ul>
            </SearchableSelect>
            <Toolbar>
                <IconButton type={'negative'} onClick={onClose}><X/></IconButton>
            </Toolbar>
        </CreationFormContainer>
    );
};

export default ExerciseChoosingForm;
