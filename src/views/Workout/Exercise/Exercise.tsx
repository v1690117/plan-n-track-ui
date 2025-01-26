import {
    AddSetButton,
    ExerciseCard,
    ExerciseDetails,
    ExerciseHeader,
    ExerciseName,
    SetsInfo
} from "./ExerciseStyles.tsx";
import Set from "../Set/Set.tsx";
import React, {useCallback, useMemo, useState} from "react";
import {ISet} from "../../../model/ISet.ts";
import useAppStore from "../../../store/store.ts";

interface ExerciseProps {
    name: string;
    sets: ISet[];
}

const Exercise: React.FC<ExerciseProps> = (exercise) => {
    const [expansion, setExpansion] = useState<Record<string, boolean>>({}); // todo use store?
    const addSet = useAppStore(state => state.addSet);

    const completedExercices = useMemo(() => exercise.sets?.filter(e => e.completed).length, [exercise.sets.length]);

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

    return <ExerciseCard key={exercise.name}>
        <ExerciseHeader onClick={() => handleToggleExpand(exercise.name)}>
            <ExerciseName>{exercise.name}</ExerciseName>
            <SetsInfo>{completedExercices}/{exercise.sets.length}</SetsInfo>
        </ExerciseHeader>
        {expansion[exercise.name] && (
            <ExerciseDetails>
                {exercise.sets.map((set, index) => <Set set={set} key={index}/>)}
                <AddSetButton onClick={() => handleAddSet(exercise.name)}>Добавить
                    подход</AddSetButton>
            </ExerciseDetails>
        )}
    </ExerciseCard>
}

export default Exercise;
