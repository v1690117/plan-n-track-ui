import {Workout, WorkoutCreation} from "../model/Workout";

export default class WorkoutService {
    private readonly baseUrl: string = '/api';

    public async findById(id: number): Promise<Workout> {
        return fetch(`${this.baseUrl}/workouts/${id}`).then(r => r.json());
    }

    public async findAll(): Promise<Workout[]> {
        return fetch(`${this.baseUrl}/workouts`).then(r => r.json());
    }

    public async create(workout: WorkoutCreation): Promise<Workout> {
        return fetch(`${this.baseUrl}/workouts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(workout)
        }).then(r => r.json());
    }
}
