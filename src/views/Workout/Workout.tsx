import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {useParams} from "react-router-dom";
import {ISet} from "../../model/ISet"
import {Container, ExerciseList, Toolbar} from "./WorkoutStyles";

import Exercise from "./Exercise/Exercise.tsx";

import useAppStore from "../../store/store.ts";
import {TextButton} from "../../components/TextButton/TextButton.tsx";
import ExerciseChoosingForm from "./ExerciseChoosingForm.tsx";

interface Exercise {
    name: string;
    exerciseId: number;
    sets: ISet[];
}

const Workout: React.FC = () => {
    const {id} = useParams<{ id: string }>();
    const workout = useAppStore(state => state.workout);
    const sets = useAppStore(state => state.sets);
    const loadWorkout = useAppStore(state => state.loadWorkout);
    const unselectWorkout = useAppStore(state => state.unselectWorkout);
    const [showExCreationForm, setShowExCreationForm] = useState(false);

    const exercises = useMemo(() => {
        if (!id) { // todo needed?
            return [];
        }
        const newExercises: Exercise[] = [];
        sets.forEach(set => {
            const exercise = newExercises.find(e => e.name === set.exercise?.title);
            if (exercise) {
                exercise.sets.push(set);
            } else {
                newExercises.push({
                    name: set.exercise?.title,
                    sets: [set],
                    exerciseId: set.exercise?.id
                });
            }
        })
        return newExercises;
    }, [id, sets]);

    const handleAddExercise = useCallback(async () => {
        setShowExCreationForm(true);
    }, [setShowExCreationForm]);

    const exercisesComponent = useMemo(() => <ExerciseList>
        {exercises.map(exercise => <Exercise exerciseId={exercise.exerciseId} name={exercise.name} sets={exercise.sets}
                                             key={exercise.name}/>)}
    </ExerciseList>, [exercises]);

    const closeExCreation = useCallback(() => {
        setShowExCreationForm(false);
    }, [setShowExCreationForm]);

    useEffect(() => {
        if (id) {
            loadWorkout(Number(id));
        }
    }, [id, loadWorkout]);

    useEffect(() => () => unselectWorkout(), [unselectWorkout]);

    return (
        <Container>
            {workout && <>
                {exercisesComponent}
                    <Toolbar>
                        <TextButton onClick={handleAddExercise}>Добавить упражнение</TextButton>
                    </Toolbar>
            </>}
            {showExCreationForm && <ExerciseChoosingForm onClose={closeExCreation}/>}
        </Container>
    );
};

export default Workout;
