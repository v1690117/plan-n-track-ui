import React, {useCallback, useEffect, useMemo} from 'react';
import {formattedDate} from "../../utils";
import {useNavigate, useParams} from "react-router-dom";
import {ISet} from "../../model/ISet"
import {ExerciseList, Header, HeadingTitle, HeadingToolbar, WorkoutDate, WorkoutTitle} from "./WorkoutStyles";

import Exercise from "./Exercise/Exercise.tsx";

import useAppStore from "../../store/store.ts";
import {TextButton} from "../../components/TextButton/TextButton.tsx";

interface Exercise {
    name: string;
    sets: ISet[];
}

const WorkoutHeader: React.FC = () => {
    const navigate = useNavigate();
    const {id} = useParams<{ id: string }>();
    const workout = useAppStore(state => state.workout);
    const sets = useAppStore(state => state.sets);
    const loadWorkout = useAppStore(state => state.loadWorkout);
    const unselectWorkout = useAppStore(state => state.unselectWorkout);
    const deleteWorkout = useAppStore(state => state.deleteWorkout);

    const exercises = useMemo(() => {
        if (!id) { // todo needed?
            return [];
        }
        const newExercises: Exercise[] = [];
        sets.forEach(set => {
            const exercise = newExercises.find(e => e.name === set.title);
            if (exercise) {
                exercise.sets.push(set);
            } else {
                newExercises.push({
                    name: set.title,
                    sets: [set]
                });
            }
        })
        return newExercises;
    }, [id, sets]);

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
    useMemo(() => <ExerciseList>
        {exercises.map(exercise => <Exercise name={exercise.name} sets={exercise.sets} key={exercise.name}/>)}
    </ExerciseList>, [exercises]);
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
