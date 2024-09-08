import {ISetCreation, ISetParameters} from "../model/ISet";

export default class SetService {
    private readonly baseUrl: string = '/api';

    public async updateSet(setId: number, parameters: ISetParameters): Promise<any> {
        return fetch(`${this.baseUrl}/sets/${setId}`,{
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(parameters)
        });
    }
}
