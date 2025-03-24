import React, {useEffect, useLayoutEffect, useMemo, useRef, useState} from 'react';
import {ChartContainer, Container} from "./ExerciseStyles";
import useAppStore from "../../store/store.ts";
import {useParams} from "react-router-dom";
import {ISet} from "../../model/ISet.ts";
import {CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis} from "recharts";
import {formattedDate} from "../../utils.ts";

function prepareDateGroupped(sets: ISet[]) {
    const reps: { [key: string]: number } = {};
    const byDate: { [key: number]: { [key: number]: number } } = {};
    sets.forEach(s => {
        if (!s.workout || !s.workout.date || !s.load || !s.completed) {
            return;
        }
        if (!byDate[s.workout.date]) {
            byDate[s.workout.date] = {};
        }
        const currentVal = byDate[s.workout.date][s.reps];
        if (!currentVal || currentVal < s.load) {
            reps[s.reps] = s.reps;
            byDate[s.workout.date][s.reps] = s.load;
        }
    });
    return [
        Object.keys(reps),
        Object.keys(byDate).map((k: unknown) => {
            const date: number = k as number;
            return {
                date,
                ...byDate[date]
            }
        }).sort((a, b) => b.date - a.date)
    ] as [string[], { date: number }[]];
}

const Exercise: React.FC = () => {
    const targetRef = useRef<HTMLDivElement>();
    const {id} = useParams<{ id: string }>();
    const sets = useAppStore(s => s.exerciseSets);
    const loadSets = useAppStore(s => s.loadExerciseSets);
    const [dimensions, setDimensions] = useState({ width:0, height: 0 });

    const [reps, data]: [string[], { date: number }[]] = useMemo(() => {
        return prepareDateGroupped(sets)
    }, [sets]);

    const lines = useMemo(() => reps.map(
        re => <Line type='linear' dataKey={re}  activeDot={{r: 8}} dot={{r: Number(re) / 2}} connectNulls={true}/>
    ), [reps]);


    useLayoutEffect(() => {
        if (targetRef.current) {
            setDimensions({
                width: targetRef.current.offsetWidth,
                height: targetRef.current.offsetHeight
            });
        }
    }, []);

    useEffect(() => {
        loadSets(Number(id));
    }, [id, loadSets]);


    return (
        <Container>
            <ChartContainer ref={targetRef  as never}>
                <LineChart
                    width={dimensions.width}
                    height={dimensions.height}
                    data={data}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="10 10"/>
                    <XAxis dataKey="date" tickFormatter={d => `${formattedDate(Number(d))}`}/>
                    <YAxis/>
                    <Tooltip labelFormatter={d => `${formattedDate(Number(d))}`}/>
                    <Legend/>
                    {lines}
                </LineChart>
            </ChartContainer>
        </Container>
    );
};

export default Exercise;
