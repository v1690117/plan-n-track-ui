export interface Workout {
    id: number;
    title: string;
    date: number
}

export interface WorkoutCreation {
    title: string;
    date?: number
}