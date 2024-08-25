import {Workout, WorkoutCreation} from "../model/Workout";
import {Set, SetCreation} from "../model/Set";

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

    public async getSets(workout: string): Promise<Set[]> {
        return fetch(`${this.baseUrl}/workouts/${workout}/sets`).then(r => r.json());
    }

    public async addSet(workout: string, set: SetCreation): Promise<any> {
        return fetch(`${this.baseUrl}/workouts/${workout}/sets`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(set)
        });
    }
}
