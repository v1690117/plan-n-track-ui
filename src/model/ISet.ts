import {IExercise} from "./IExercise.ts";

export interface ISet {
    id: number;
    // title: string;
    load: number;
    reps: number;
    index: number;
    rest: number;
    completed: boolean;
    exercise: IExercise;
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