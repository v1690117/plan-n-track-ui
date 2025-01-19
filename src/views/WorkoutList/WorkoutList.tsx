import React, {useEffect, useRef} from 'react';

import {useNavigate} from 'react-router-dom';
import {formattedDate} from "../../utils";
import WorkoutService from "../../services/WorkoutService";
import {Container, CreateButton, Title, WorkoutDate, WorkoutListWrapper, WorkoutTitle, WorkoutItem} from "./WorkoutListStyles";
import useAppStore from "../../store/store.ts";

const WorkoutList: React.FC = () => {
    const navigate = useNavigate();
    // const [workouts, setWorkouts] = useState<IWorkout[]>([]);
    const service = useRef(new WorkoutService());

    const workouts = useAppStore(s => s.workouts);
    const loadWorkouts = useAppStore(s => s.loadWorkouts);

    const handleCreateWorkout = () => {
        const title = prompt("Введите название тренировки");
        if(title) {
            service.current.create(
                {
                    title
                }
            ).then(loadWorkouts);
        }
    };

    const handleWorkoutClick = (id: number) => {
        navigate(`/workout/${id}`);
    };

    useEffect(() => {
        loadWorkouts()
    }, [loadWorkouts]);

    return (
        <Container>
            <Title>Мои тренировки</Title>
            <WorkoutListWrapper>
                {workouts.map(workout => (
                    <WorkoutItem key={workout.id} onClick={() => handleWorkoutClick(workout.id)}>
                        <WorkoutTitle>{workout.title}</WorkoutTitle>
                        <WorkoutDate>{formattedDate(workout.date)}</WorkoutDate>
                    </WorkoutItem>
                ))}
            </WorkoutListWrapper>
            <CreateButton onClick={handleCreateWorkout}>Создать тренировку</CreateButton>
        </Container>
    );
};

export default WorkoutList;
