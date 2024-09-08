export interface IWorkout {
    id: number;
    title: string;
    date: number
}

export interface IWorkoutCreation {
    title: string;
    date?: number
}