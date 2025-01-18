import {IWorkout, IWorkoutCreation} from "../model/IWorkout";
import {ISet, ISetCreation} from "../model/ISet";
import Service from "./Service";

export default class WorkoutService extends Service {
    private readonly baseUrl: string = '/api';

    public async findById(id: number): Promise<IWorkout> {
        return this.fetchWithRedirect(`${this.baseUrl}/workouts/${id}`).then(r => r.json());
    }

    public async findAll(): Promise<IWorkout[]> {
        return this.fetchWithRedirect(`${this.baseUrl}/workouts`).then(r => r.json());
    }

    public async create(workout: IWorkoutCreation): Promise<IWorkout> {
        return this.fetchWithRedirect(`${this.baseUrl}/workouts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(workout)
        }).then(r => r.json());
    }

    public async getSets(workout: string): Promise<ISet[]> {
        return this.fetchWithRedirect(`${this.baseUrl}/workouts/${workout}/sets`).then(r => r.json());
    }

    public async addSet(workout: string, set: ISetCreation): Promise<unknown> {
        return this.fetchWithRedirect(`${this.baseUrl}/workouts/${workout}/sets`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(set)
        });
    }
}
