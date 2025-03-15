import {IExercise} from "./IExercise.ts";
import {IWorkout} from "./IWorkout.ts";

export interface ISet {
    id: number;
    // title: string;
    load: number;
    reps: number;
    index: number;
    rest: number;
    completed: boolean;
    exercise: IExercise;
    workout: IWorkout;
}

export interface ISetCreation {
    title?: string;
    load: number;
    reps: number;
    rest: number;
    exerciseId: number;
}

export interface ISetParameters {
    load?: number;
    reps?: number;
    rest?: number;
    completed?: boolean;
}