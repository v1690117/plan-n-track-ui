import React from "react";
import {Checkbox, Input, SetRow} from "../WorkoutStyles";
import {ISet} from "../../../model/ISet";

interface SetProps {
    set: ISet;
}

const Set: React.FC<SetProps> = (props) => {
    const {set} = props;
    return <SetRow>
        <Checkbox type="checkbox" checked={set?.completed} onChange={() => {
            // const newSets = exercise.sets.map((s, i) => i === index ? {
            //     ...s,
            //     completed: !s.completed
            // } : s);
            // setExercises(exercises.map(e => e.name === exercise.name ? {
            //     ...e,
            //     sets: newSets
            // } : e));
        }}/>
        <Input type="number" placeholder="Вес" value={set.load} onChange={(e) => {
            // const newSets = exercise.sets.map((s, i) => i === index ? {
            //     ...s,
            //     load: e.target.value
            // } : s);
            // setExercises(exercises.map(e => e.name === exercise.name ? {
            //     ...e,
            //     sets: newSets
            // } : e));
        }}/>
        <Input type="number" placeholder="Повторения" value={set.reps}
               // onChange={(e) => {
               //     const newSets = exercise.sets.map((s, i) => i === index ? {
               //         ...s,
               //         reps: e.target.value
               //     } : s);
                   // setExercises(exercises.map(e => e.id === exercise.id ? {
                   //     ...e,
                   //     sets: newSets
                   // } : e));
        />
        <Input type="number" placeholder="Отдых" value={set.rest} onChange={(e) => {
            // const newSets = exercise.sets.map((s, i) => i === index ? {
            //     ...s,
            //     rest: e.target.value
            // } : s);
            // setExercises(exercises.map(e => e.id === exercise.id ? {
            //     ...e,
            //     sets: newSets
            // } : e));
        }}/>
    </SetRow>
}
export default Set;