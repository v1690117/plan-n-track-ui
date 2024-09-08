import React, {useCallback, useEffect, useRef, useState} from 'react';
import styled from 'styled-components';
import {formattedDate} from "../../utils";
import {useNavigate, useParams} from "react-router-dom";
import WorkoutService from "../../services/WorkoutService";
import {IWorkout} from "../../model/IWorkout";
import {ISet} from "../../model/ISet"
import {
    AddExerciseButton,
    AddSetButton,
    CloseButton,
    Container,
    ExerciseCard, ExerciseDetails,
    ExerciseHeader,
    ExerciseList, ExerciseName,
    Header, Input, SetRow, SetsInfo,
    WorkoutDate,
    WorkoutTitle
} from "./WorkoutStyles";

import Set from "./Set/Set"

interface Exercise {
    name: string;
    sets: ISet[];
    expanded: boolean;
}

const Workout: React.FC = () => {
    const navigate = useNavigate();
    const {id} = useParams<{ id: string }>();
    const service = useRef(new WorkoutService());
    const [exercises, setExercises] = useState<Exercise[]>([]);
    const [workout, setWorkout] = useState<IWorkout>();

    const onClose = useCallback(() => navigate('/'), [navigate]);

    const loadSets = useCallback(async () => {
        if(!id) {
            return;
        }
        var sets = await service.current.getSets(id);
        const exercises: Exercise[] = [];
        sets.forEach(set => {
            const exercise = exercises.find(e => e.name === set.title);
            if(exercise) {
                exercise.sets.push(set);
            } else {
                exercises.push({
                    name: set.title,
                    expanded: false,
                    sets: [set]
                });
            }
        })
        setExercises(exercises);
    }, [id]);

    const handleAddExercise = useCallback(async () => {
        const title = prompt("Введите название упражнения");
        if(id && title) {
            await service.current.addSet(id, {
                title,
                load: 0,
                reps: 0,
                rest: 0
            });
            loadSets();
        }
    }, [id, loadSets]);

    const handleToggleExpand = (name: string) => {
        setExercises(exercises.map(exercise =>
            exercise.name === name ? {...exercise, expanded: !exercise.expanded} : exercise
        ));
    };

    const handleAddSet = useCallback(async (title: string) => {
        if(id) {
            await service.current.addSet(id, {
                title,
                load: 0,
                reps: 0,
                rest: 0
            });
            loadSets();
        }
    }, [id, loadSets]);

    useEffect(() => {
        if(id) {
            service.current.findById(Number(id)).then(setWorkout);
        }
    }, [id]);

    useEffect(() => {
        loadSets();
    }, [loadSets]);

    return (
        <Container>
            <Header>
                <WorkoutTitle>{workout?.title}</WorkoutTitle>
                <WorkoutDate>{workout && formattedDate(workout.date)}</WorkoutDate>
                <CloseButton onClick={onClose}>Закрыть</CloseButton>
            </Header>
            <ExerciseList>
                {exercises.map(exercise => (
                    <ExerciseCard key={exercise.name}>
                        <ExerciseHeader onClick={() => handleToggleExpand(exercise.name)}>
                            <ExerciseName>{exercise.name}</ExerciseName>
                            <SetsInfo>{exercise.sets.length}/{exercise.sets.length}</SetsInfo>
                        </ExerciseHeader>
                        {exercise.expanded && (
                            <ExerciseDetails>
                                {exercise.sets.map((set, index) => <Set set={set} key={index}/>)}
                                <AddSetButton onClick={() => handleAddSet(exercise.name)}>Добавить подход</AddSetButton>
                            </ExerciseDetails>
                        )}
                    </ExerciseCard>
                ))}
            </ExerciseList>
            <AddExerciseButton onClick={handleAddExercise}>Добавить упражнение</AddExerciseButton>
        </Container>
    );
};

export default Workout;
