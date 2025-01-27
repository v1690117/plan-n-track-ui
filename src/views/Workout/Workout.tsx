import React, {useCallback, useEffect, useMemo} from 'react';
import {formattedDate} from "../../utils";
import {useNavigate, useParams} from "react-router-dom";
import {ISet} from "../../model/ISet"
import {
    AddExerciseButton,
    CloseButton,
    Container,
    ExerciseList,
    Header,
    WorkoutDate,
    WorkoutTitle
} from "./WorkoutStyles";

import Exercise from "./Exercise/Exercise.tsx";

import useAppStore from "../../store/store.ts";
import Timer from "../Timer/Timer.tsx";

interface Exercise {
    name: string;
    sets: ISet[];
}

const Workout: React.FC = () => {
    const navigate = useNavigate();
    const {id} = useParams<{ id: string }>();
    const workout = useAppStore(state => state.workout);
    const sets = useAppStore(state => state.sets);
    const loadWorkout = useAppStore(state => state.loadWorkout);
    const addSet = useAppStore(state => state.addSet);
    const unselectWorkout = useAppStore(state => state.unselectWorkout);

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

    const onClose = useCallback(() => navigate('/'), [navigate]);

    const handleAddExercise = useCallback(async () => {
        const title = prompt("Введите название упражнения");
        if (title) {
            await addSet({
                title,
                load: 0,
                reps: 0,
                rest: 0
            });
        }
    }, [addSet]);

    useEffect(() => {
        if (id) {
            loadWorkout(Number(id));
        }
    }, [id, loadWorkout]);

    useEffect(() => () => unselectWorkout(), [unselectWorkout]);

    const exercisesComponent = useMemo(() => <ExerciseList>
        {exercises.map(exercise => <Exercise name={exercise.name} sets={exercise.sets} key={exercise.name}/>)}
    </ExerciseList>, [exercises]);

    return (
        <Container>
            {workout && <>
                <Header>
                    <WorkoutTitle>{workout?.title}</WorkoutTitle>
                    <WorkoutDate>{workout && formattedDate(workout.date)}</WorkoutDate>
                    <CloseButton onClick={onClose}>Закрыть</CloseButton>
                </Header>
                {exercisesComponent}
                <AddExerciseButton onClick={handleAddExercise}>Добавить упражнение</AddExerciseButton>
            </>}
            <Timer/>
        </Container>
    );
};

export default Workout;
