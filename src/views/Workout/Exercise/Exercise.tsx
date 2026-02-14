import {ExerciseCard, ExerciseDetails, ExerciseHeader, ExerciseName, SetsInfo} from "./ExerciseStyles.tsx";
import Set from "../Set/Set.tsx";
import React, {useCallback, useState} from "react";
import {ISet} from "../../../model/ISet.ts";
import useAppStore from "../../../store/store.ts";
import {IconButton} from "../../../components/IconButton/IconButton.tsx";
import {Plus} from "lucide-react";

interface ExerciseProps {
    name: string;
    sets: ISet[];
    exerciseId: number;
}

const Exercise: React.FC<ExerciseProps> = ({name, sets, exerciseId}) => {
    const [expansion, setExpansion] = useState<Record<string, boolean>>({}); // todo use store?
    const addSet = useAppStore(state => state.addSet);

    const handleToggleExpand = (name: string) => {
        const newExpansion = {...expansion};
        newExpansion[name] = !newExpansion[name];
        setExpansion(newExpansion);
    };

    const handleAddSet = useCallback(async (exerciseId: number) => {
        await addSet({
            exerciseId,
            load: 0,
            reps: 0,
            rest: 0
        });
    }, [addSet]);

    const totalWeight = sets?.filter(e => e.completed).reduce((acc, cur) => acc + cur.load * cur.reps, 0);

    return <ExerciseCard key={name}>
        <ExerciseHeader onClick={() => handleToggleExpand(name)}>
            <ExerciseName>{name} {totalWeight > 0 && `(${totalWeight})`}</ExerciseName>
            <SetsInfo>{sets?.filter(e => e.completed).length}/{sets.length}</SetsInfo>
        </ExerciseHeader>
        {expansion[name] && (
            <ExerciseDetails>
                {sets.map((set, index) => <Set set={set} key={index}/>)}
                <IconButton onClick={() => handleAddSet(exerciseId)}><Plus/></IconButton>
            </ExerciseDetails>
        )}
    </ExerciseCard>
}

export default Exercise;
