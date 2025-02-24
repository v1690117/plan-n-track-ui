import Service from "./Service";
import {IExercise, IExerciseCreation} from "../model/IExercise.ts";

export default class ExerciseService extends Service {
    private readonly baseUrl: string = '/api';

    public async findById(id: number): Promise<IExercise> {
        return this.fetchWithRedirect(`${this.baseUrl}/exercises/${id}`).then(r => r.json());
    }

    public async findAll(): Promise<IExercise[]> {
        return this.fetchWithRedirect(`${this.baseUrl}/exercises`).then(r => r.json());
    }

    public async create(exercise: IExerciseCreation): Promise<IExercise> {
        return this.fetchWithRedirect(`${this.baseUrl}/exercises`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(exercise)
        }).then(r => r.json());
    }

    public async delete(id: number): Promise<void> {
        await this.fetchWithRedirect(`${this.baseUrl}/exercises/${id}`, {
            method: 'DELETE'
        })
    }
}
