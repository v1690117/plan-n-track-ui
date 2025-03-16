import React, {useEffect, useMemo} from 'react';
import {Container} from "./ExerciseStyles";
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

const Exercise: React.FC = () => {
    const {id} = useParams<{ id: string }>();
    const sets = useAppStore(s => s.exerciseSets);
    const loadSets = useAppStore(s => s.loadExerciseSets);

    const data: Series[] = useMemo(() => {
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
        console.log(grouppedSets);
        return Object.keys(grouppedSets).map((reps) => ({
            label: reps,
            data: grouppedSets[reps].map(s => ({
                date: new Date(s.workout.date),
                load: s.load,
                radius: s.reps
            }))
        }));
        // [{
        //     label: 'Load',
        //     data: sets
        //         .filter(s => !!s.workout?.date && !!s.load && s.completed)
        //         .sort((a, b) => b.workout.date - a.workout.date)

        // }];
    }, [sets]);


    const primaryAxis = React.useMemo(
        (): AxisOptions<Set> => ({
            getValue: datum => datum.date,
            scaleType: 'time'
        }),
        []
    )

    const secondaryAxes = React.useMemo(
        (): AxisOptions<Set>[] => [
            {
                getValue: datum => datum.load,
                elementType: 'bubble'
            },
        ],
        []
    )

    useEffect(() => {
        loadSets(Number(id));
    }, [id, loadSets]);

    console.log(data)

    return (
        <Container>
            {data?.length > 0 && data[0].data.length > 0 && <Chart
                options={{
                    data,
                    primaryAxis,
                    secondaryAxes,
                    interactionMode: "closest",
                    // tooltip: {
                    //     render: (datum) => datum.focusedDatum?.originalDatum.radius
                    // },
                    getDatumStyle: (datum) =>
                        ({
                            circle: {r: datum.originalDatum.radius},

                        } as never),
                }}
            />}
        </Container>
    );
};

export default Exercise;
