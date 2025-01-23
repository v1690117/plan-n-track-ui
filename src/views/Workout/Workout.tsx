import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {formattedDate} from "../../utils";
import {useNavigate, useParams} from "react-router-dom";
import {ISet} from "../../model/ISet"
import {
    AddExerciseButton,
    AddSetButton,
    CloseButton,
    Container,
    ExerciseCard,
    ExerciseDetails,
    ExerciseHeader,
    ExerciseList,
    ExerciseName,
    Header,
    SetsInfo,
    WorkoutDate,
    WorkoutTitle
} from "./WorkoutStyles";

import Set from "./Set/Set"
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
    const [expansion, setExpansion] = useState<Record<string, boolean>>({}); // todo use store?

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

    const handleToggleExpand = (name: string) => {
        const newExpansion = {...expansion};
        newExpansion[name] = !newExpansion[name];
        setExpansion(newExpansion);
    };

    const handleAddSet = useCallback(async (title: string) => {
        await addSet({
            title,
            load: 0,
            reps: 0,
            rest: 0
        });
    }, [addSet]);

    useEffect(() => {
        if (id) {
            loadWorkout(Number(id));
        }
    }, [id, loadWorkout]);

    useEffect(() => () => unselectWorkout(), [unselectWorkout]);

    return (
        <Container>
            {workout && <>
                <Header>
                    <WorkoutTitle>{workout?.title}</WorkoutTitle>
                    <WorkoutDate>{workout && formattedDate(workout.date)}</WorkoutDate>
                    <CloseButton onClick={onClose}>Закрыть</CloseButton>
                </Header>
                <ExerciseList>
                    {exercises.map(exercise => (
                        // todo move to component
                        <ExerciseCard key={exercise.name}>
                            <ExerciseHeader onClick={() => handleToggleExpand(exercise.name)}>
                                <ExerciseName>{exercise.name}</ExerciseName>
                                <SetsInfo>{exercise.sets.length}/{exercise.sets.length}</SetsInfo>
                            </ExerciseHeader>
                            {expansion[exercise.name] && (
                                <ExerciseDetails>
                                    {exercise.sets.map((set, index) => <Set set={set} key={index}/>)}
                                    <AddSetButton onClick={() => handleAddSet(exercise.name)}>Добавить
                                        подход</AddSetButton>
                                </ExerciseDetails>
                            )}
                        </ExerciseCard>
                    ))}
                </ExerciseList>
                <AddExerciseButton onClick={handleAddExercise}>Добавить упражнение</AddExerciseButton>
            </>}
            <Timer/>
        </Container>
    );
};

export default Workout;
