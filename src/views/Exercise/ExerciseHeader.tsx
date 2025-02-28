import React, {useCallback, useEffect} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {ExerciseTitle, Header, HeadingTitle, HeadingToolbar} from "./ExerciseStyles";

import useAppStore from "../../store/store.ts";
import {TextButton} from "../../components/TextButton/TextButton.tsx";


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
    return (<Header>
        <HeadingTitle>
            <ExerciseTitle>{exercise?.title}</ExerciseTitle>
        </HeadingTitle>
        <HeadingToolbar>
            <TextButton onClick={handleDeleteExercise} type={'negative'}>Удалить</TextButton>
        </HeadingToolbar>
    </Header>);
};

export default ExerciseHeader;
