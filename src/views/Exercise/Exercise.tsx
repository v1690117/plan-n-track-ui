import React, {ChangeEvent, useEffect, useMemo, useState} from 'react';
import {ChartContainer, Container, ModeOption, ModeSelect} from "./ExerciseStyles";
import useAppStore from "../../store/store.ts";
import {useParams} from "react-router-dom";
import {AxisOptions, Chart} from "react-charts";
import {ISet} from "../../model/ISet.ts";

type Set = {
    date: Date,
    load: number,
    radius: number
}

type Series = {
    label: string,
    data: Set[]
}


function prepareDetailedData(sets: ISet[]) {
    const grouppedSets: { [key: string]: ISet[] } = {};
    sets.forEach(s => {
        if (!s.workout || !s.workout.date || !s.load || !s.completed) {
            return;
        }
        if (!grouppedSets["" + s.reps]) {
            grouppedSets["" + s.reps] = [];
        }
        grouppedSets[s.reps].push(s);
    });
    return Object.keys(grouppedSets).map((r) => {
        const reps = Number(r);
        return {
            label: `${reps}`,
            data: grouppedSets[reps].map(s => ({
                date: new Date(s.workout.date),
                load: s.load,
                radius: s.reps
            }))
        }
    });
}

function prepareBasicData(sets: ISet[]) {
    const repsToDateGroup: { [key: number]: { [key: number]: ISet } } = {};
    sets.forEach(s => {
        if (!s.workout || !s.workout.date || !s.load || !s.completed) {
            return;
        }
        if (!repsToDateGroup[s.reps]) {
            repsToDateGroup[s.reps] = {};
        }
        const existingSet = repsToDateGroup[s.reps][s.workout.date];
        if (!existingSet || existingSet.load < s.load) {
            repsToDateGroup[s.reps][s.workout.date] = s;
        }
    });

    return Object.keys(repsToDateGroup).map((r: string) => {
            const reps = Number(r);
            return {
                label: `${reps}`,
                data: Object.values(repsToDateGroup[reps])
                    .sort((a, b) => b.workout.date - a.workout.date)
                    .map(s => ({
                        date: new Date(s.workout.date),
                        load: s.load,
                        radius: s.reps
                    }))
            }
        }
    );
}

const Exercise: React.FC = () => {
    const {id} = useParams<{ id: string }>();
    const sets = useAppStore(s => s.exerciseSets);
    const loadSets = useAppStore(s => s.loadExerciseSets);

    const [mode, setMode] = useState<'detailed' | 'basic'>('basic');

    const data: Series[] = useMemo(() => {
        return mode === 'detailed' ? prepareDetailedData(sets) : prepareBasicData(sets);
    }, [mode, sets]);


    const primaryAxis = React.useMemo(
        (): AxisOptions<Set> => ({
            getValue: datum => datum.date,
            scaleType: 'localTime'
        }),
        []
    )

    const secondaryAxes = React.useMemo(
        (): AxisOptions<Set>[] => [
            {
                getValue: datum => datum.load,
                elementType: mode === 'detailed' ? 'bubble' : 'line',
                // min: 0
            }
        ],
        [mode]
    )

    const handleModeChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const value = e.currentTarget.value;
        if (value === 'basic' || value === 'detailed') {
            setMode(value)
        }
    }

    useEffect(() => {
        loadSets(Number(id));
    }, [id, loadSets]);


    return (
        <Container>
            <ModeSelect onChange={handleModeChange}>
                <ModeOption value='detailed' selected={mode === 'detailed'}>Подробный</ModeOption>
                <ModeOption value='line' selected={mode === 'basic'}>Простой</ModeOption>
            </ModeSelect>
            <ChartContainer>
                {data?.length > 0 && data[0].data.length > 0 && <Chart
                    options={{
                        data,
                        primaryAxis,
                        secondaryAxes,
                        interactionMode: "closest",
                        getDatumStyle: (datum) =>
                            ({
                                circle: {r: datum.originalDatum.radius},

                            } as never),
                    }}
                />}
            </ChartContainer>
        </Container>
    );
};

export default Exercise;
