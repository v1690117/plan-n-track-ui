export interface Set {
    id: number;
    title: string;
    load: number;
    reps: number;
    index: number;
    rest: number;
    completed: boolean;
}

export interface SetCreation {
    title: string;
    load: number;
    reps: number;
    rest: number;
}