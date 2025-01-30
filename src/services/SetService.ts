import {ISetParameters} from "../model/ISet";
import Service from "./Service";

export default class SetService extends Service {
    private readonly baseUrl: string = '/api';

    public async updateSet(setId: number, parameters: ISetParameters): Promise<void> {
        await this.fetchWithRedirect(`${this.baseUrl}/sets/${setId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(parameters)
        });
    }

    public async deleteSet(setId: number): Promise<void> {
        await this.fetchWithRedirect(`${this.baseUrl}/sets/${setId}`, {
            method: 'DELETE'
        });
    }
}
