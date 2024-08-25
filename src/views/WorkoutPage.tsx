import React, {useCallback, useEffect, useRef, useState} from 'react';
import styled from 'styled-components';
import {formattedDate} from "../utils";
import {useNavigate, useParams} from "react-router-dom";
import WorkoutService from "../services/WorkoutService";
import {Workout} from "../model/Workout";
import {Set} from "../model/Set"

interface Exercise {
    name: string;
    sets: Set[];
    expanded: boolean;
}

const WorkoutPage: React.FC = () => {
    const navigate = useNavigate();
    const {id} = useParams<{ id: string }>();
    const service = useRef(new WorkoutService());
    const [exercises, setExercises] = useState<Exercise[]>([]);
    const [workout, setWorkout] = useState<Workout>();

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
    }, [id]);

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
    }, []);

    useEffect(() => {
        if(id) {
            service.current.findById(Number(id)).then(setWorkout);
        }
    }, [id]);

    useEffect(() => {
        loadSets();
    }, []);

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
                                {exercise.sets.map((set, index) => (
                                    <SetRow key={index}>
                                        <Checkbox type="checkbox" checked={set.completed} onChange={() => {
                                            const newSets = exercise.sets.map((s, i) => i === index ? {
                                                ...s,
                                                completed: !s.completed
                                            } : s);
                                            setExercises(exercises.map(e => e.name === exercise.name ? {
                                                ...e,
                                                sets: newSets
                                            } : e));
                                        }}/>
                                        <Input type="number" placeholder="Вес" value={set.load} onChange={(e) => {
                                            const newSets = exercise.sets.map((s, i) => i === index ? {
                                                ...s,
                                                load: e.target.value
                                            } : s);
                                            // setExercises(exercises.map(e => e.name === exercise.name ? {
                                            //     ...e,
                                            //     sets: newSets
                                            // } : e));
                                        }}/>
                                        <Input type="number" placeholder="Повторения" value={set.reps}
                                               onChange={(e) => {
                                                   const newSets = exercise.sets.map((s, i) => i === index ? {
                                                       ...s,
                                                       reps: e.target.value
                                                   } : s);
                                                   // setExercises(exercises.map(e => e.id === exercise.id ? {
                                                   //     ...e,
                                                   //     sets: newSets
                                                   // } : e));
                                               }}/>
                                        <Input type="number" placeholder="Отдых" value={set.rest} onChange={(e) => {
                                            const newSets = exercise.sets.map((s, i) => i === index ? {
                                                ...s,
                                                rest: e.target.value
                                            } : s);
                                            // setExercises(exercises.map(e => e.id === exercise.id ? {
                                            //     ...e,
                                            //     sets: newSets
                                            // } : e));
                                        }}/>
                                    </SetRow>
                                ))}
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

const Container = styled.div`
    padding: 20px;
`;

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
`;

const WorkoutTitle = styled.h1`
    font-size: 24px;
`;

const WorkoutDate = styled.div`
    color: #888;
`;

const CloseButton = styled.button`
    background-color: #f44336;
    color: white;
    border: none;
    padding: 10px;
    border-radius: 5px;
    cursor: pointer;
`;

const ExerciseList = styled.div`
    margin-top: 20px;
`;

const ExerciseCard = styled.div`
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    overflow: hidden;
`;

const ExerciseHeader = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 10px;
    background-color: #f0f0f0;
    cursor: pointer;
`;

const ExerciseName = styled.div`
    font-weight: bold;
`;

const SetsInfo = styled.div`
    color: #888;
`;

const ExerciseDetails = styled.div`
    padding: 10px;
    background-color: #fff;
`;

const SetRow = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 10px;
`;

const Checkbox = styled.input`
    margin-right: 10px;
    padding: 5px;
    border: 1px solid #ccc;
    border-radius: 5px;
`
const Input = styled.input`
    margin-right: 10px;
    padding: 5px;
    border: 1px solid #ccc;
    border-radius: 5px;
    width: 30%;
`

const AddSetButton = styled.button`
    background-color: #007BFF;
    color: white;
    padding: 5px 10px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
`;

const AddExerciseButton = styled.button`
    margin-top: 20px;
    padding: 10px;
    width: 100%;
    background-color: #007BFF;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
`;

export default WorkoutPage;
