import React, {useCallback, useEffect} from 'react';
import {formattedDate} from "../../utils";
import {useNavigate, useParams} from "react-router-dom";
import {Header, HeadingTitle, HeadingToolbar, WorkoutDate, WorkoutTitle} from "./WorkoutStyles";


import useAppStore from "../../store/store.ts";
import {IconButton} from "../../components/IconButton/IconButton.tsx";
import {Copy, Trash2} from "lucide-react";

const WorkoutHeader: React.FC = () => {
    const navigate = useNavigate();
    const {id} = useParams<{ id: string }>();
    const workout = useAppStore(state => state.workout);
    const loadWorkout = useAppStore(state => state.loadWorkout);
    const unselectWorkout = useAppStore(state => state.unselectWorkout);
    const deleteWorkout = useAppStore(state => state.deleteWorkout);
    const copyWorkout = useAppStore(state => state.copyWorkout);

    const handleDeleteWorkout = useCallback(async () => {
        if (confirm("Вся информация о тренировке будет удалена. Продолжить?")) {
            await deleteWorkout(Number(id));
            navigate('/');
        }
    }, [deleteWorkout, id, navigate]);

    const handleCopyWorkout = useCallback(async () => {
        if (confirm("Тренировка, подходы и их параметры буду продублированы. Продолжить?")) {
            const newWo = await copyWorkout(Number(id));
            navigate(`/workout/${newWo}`);
        }
    }, [deleteWorkout, id, navigate]);

    useEffect(() => {
        if (id) {
            loadWorkout(Number(id));
        }
    }, [id, loadWorkout]);

    useEffect(() => () => unselectWorkout(), [unselectWorkout]);
    return (<Header>
        <HeadingTitle>
            <WorkoutTitle>{workout?.title}</WorkoutTitle>
            <WorkoutDate>{workout && formattedDate(workout.date)}</WorkoutDate>
        </HeadingTitle>
        <HeadingToolbar>
            <IconButton onClick={handleCopyWorkout}><Copy/></IconButton>
            <IconButton onClick={handleDeleteWorkout} type={'negative'}><Trash2/></IconButton>
        </HeadingToolbar>
    </Header>);
};

export default WorkoutHeader;
