import React, { useState } from 'react';
import styled from 'styled-components';

const WorkoutPage: React.FC<{ workout: { id: number, title: string, date: string }, onClose: () => void }> = ({ workout, onClose }) => {
    const [exercises, setExercises] = useState<{ id: number, name: string, sets: { weight: string, reps: string, rest: string, completed: boolean, comment: string }[], expanded: boolean }[]>([]);

    const handleAddExercise = () => {
        const newExercise = {
            id: Date.now(),
            name: prompt("Введите название упражнения") || `Упражнение ${exercises.length + 1}`,
            sets: [],
            expanded: false
        };
        setExercises([...exercises, newExercise]);
    };

    const handleToggleExpand = (id: number) => {
        setExercises(exercises.map(exercise =>
            exercise.id === id ? { ...exercise, expanded: !exercise.expanded } : exercise
        ));
    };

    const handleAddSet = (exerciseId: number) => {
        setExercises(exercises.map(exercise =>
            exercise.id === exerciseId ? {
                ...exercise,
                sets: [...exercise.sets, { weight: '', reps: '', rest: '', completed: false, comment: '' }]
            } : exercise
        ));
    };

    return (
        <Container>
            <Header>
                <WorkoutTitle>{workout.title}</WorkoutTitle>
                <WorkoutDate>{workout.date}</WorkoutDate>
                <CloseButton onClick={onClose}>Закрыть</CloseButton>
            </Header>
            <ExerciseList>
                {exercises.map(exercise => (
                    <ExerciseCard key={exercise.id}>
                        <ExerciseHeader onClick={() => handleToggleExpand(exercise.id)}>
                            <ExerciseName>{exercise.name}</ExerciseName>
                            <SetsInfo>{exercise.sets.length}/{exercise.sets.length}</SetsInfo>
                        </ExerciseHeader>
                        {exercise.expanded && (
                            <ExerciseDetails>
                                {exercise.sets.map((set, index) => (
                                    <SetRow key={index}>
                                        <input type="checkbox" checked={set.completed} onChange={() => {
                                            const newSets = exercise.sets.map((s, i) => i === index ? { ...s, completed: !s.completed } : s);
                                            setExercises(exercises.map(e => e.id === exercise.id ? { ...e, sets: newSets } : e));
                                        }} />
                                        <input type="text" placeholder="Вес" value={set.weight} onChange={(e) => {
                                            const newSets = exercise.sets.map((s, i) => i === index ? { ...s, weight: e.target.value } : s);
                                            setExercises(exercises.map(e => e.id === exercise.id ? { ...e, sets: newSets } : e));
                                        }} />
                                        <input type="text" placeholder="Повторения" value={set.reps} onChange={(e) => {
                                            const newSets = exercise.sets.map((s, i) => i === index ? { ...s, reps: e.target.value } : s);
                                            setExercises(exercises.map(e => e.id === exercise.id ? { ...e, sets: newSets } : e));
                                        }} />
                                        <input type="text" placeholder="Отдых" value={set.rest} onChange={(e) => {
                                            const newSets = exercise.sets.map((s, i) => i === index ? { ...s, rest: e.target.value } : s);
                                            setExercises(exercises.map(e => e.id === exercise.id ? { ...e, sets: newSets } : e));
                                        }} />
                                        <input type="text" placeholder="Комментарий" value={set.comment} onChange={(e) => {
                                            const newSets = exercise.sets.map((s, i) => i === index ? { ...s, comment: e.target.value } : s);
                                            setExercises(exercises.map(e => e.id === exercise.id ? { ...e, sets: newSets } : e));
                                        }} />
                                    </SetRow>
                                ))}
                                <AddSetButton onClick={() => handleAddSet(exercise.id)}>Добавить подход</AddSetButton>
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

    input {
        margin-right: 10px;
        padding: 5px;
        border: 1px solid #ccc;
        border-radius: 5px;
    }
`;

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
