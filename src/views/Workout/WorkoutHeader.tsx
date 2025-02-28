import React, {useCallback, useEffect} from 'react';
import {formattedDate} from "../../utils";
import {useNavigate, useParams} from "react-router-dom";
import {Header, HeadingTitle, HeadingToolbar, WorkoutDate, WorkoutTitle} from "./WorkoutStyles";


import useAppStore from "../../store/store.ts";
import {TextButton} from "../../components/TextButton/TextButton.tsx";

const WorkoutHeader: React.FC = () => {
    const navigate = useNavigate();
    const {id} = useParams<{ id: string }>();
    const workout = useAppStore(state => state.workout);
    const loadWorkout = useAppStore(state => state.loadWorkout);
    const unselectWorkout = useAppStore(state => state.unselectWorkout);
    const deleteWorkout = useAppStore(state => state.deleteWorkout);

    const handleDeleteWorkout = useCallback(async () => {
        if (confirm("Вся информация о тренировке будет удалена. Продолжить?")) {
            await deleteWorkout(Number(id));
            navigate('/');
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
            <TextButton onClick={handleDeleteWorkout} type={'negative'}>Удалить</TextButton>
        </HeadingToolbar>
    </Header>);
};

export default WorkoutHeader;
