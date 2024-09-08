export interface ISet {
    id: number;
    title: string;
    load: number;
    reps: number;
    index: number;
    rest: number;
    completed: boolean;
}

export interface ISetCreation {
    title: string;
    load: number;
    reps: number;
    rest: number;
}