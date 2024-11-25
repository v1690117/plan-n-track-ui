import {ISetCreation, ISetParameters} from "../model/ISet";
import Service from "./Service";

export default class SetService extends Service {
    private readonly baseUrl: string = '/api';

    public async updateSet(setId: number, parameters: ISetParameters): Promise<any> {
        return this.fetchWithRedirect(`${this.baseUrl}/sets/${setId}`,{
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(parameters)
        });
    }
}
