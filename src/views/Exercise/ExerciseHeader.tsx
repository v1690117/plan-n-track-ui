import React, {useCallback, useEffect} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {ExerciseTitle} from "./ExerciseStyles";

import useAppStore from "../../store/store.ts";
import {IconButton} from "../../components/IconButton/IconButton.tsx";
import {Trash2} from "lucide-react";

const ExerciseHeader: React.FC = () => {
    const navigate = useNavigate();
    const {id} = useParams<{ id: string }>();
    const exercise = useAppStore(state => state.exercise);
    const loadExercise = useAppStore(state => state.loadExercise);

    const unselectExercise = useAppStore(state => state.unselectExercise);
    const deleteExercise = useAppStore(state => state.deleteExercise);

    const handleDeleteExercise = useCallback(async () => {
        if (confirm("Вся информация об упражнении будет удалена. Продолжить?")) {
            await deleteExercise(Number(id));
            navigate('/');
        }
    }, [deleteExercise, id, navigate]);

    useEffect(() => {
        if (id) {
            loadExercise(Number(id));
        }
    }, [id, loadExercise]);

    useEffect(() => () => unselectExercise(), [unselectExercise]);

    return (
        <>
            <ExerciseTitle>{exercise?.title}</ExerciseTitle>
            <IconButton onClick={handleDeleteExercise} type={'negative'}><Trash2/></IconButton>
        </>
    );
};

export default ExerciseHeader;
