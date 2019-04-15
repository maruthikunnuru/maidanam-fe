import {Injectable} from '@angular/core';
import {Headers, Http, Response} from '@angular/http';
import {Observable} from 'rxjs';
import {ResponseModel} from '../z-models/response.model';
import {AppConstants} from '../app-constants';

@Injectable()
export class PlayerHistoryService {
    constructor(private http: Http) {}

    getPlayerHistory(userId: number, userName: string, groupId: number): Observable<ResponseModel> {
        const headers = new Headers()
        headers.append('X-USER-NAME', userName);
        headers.append('X-USER-ID', String(userId));

        return this.http.get(AppConstants.API_ENDPOINT + '/groups/' + groupId + '/playSummary/', {headers: headers})
            .map(
                (response: Response) => {
                    return <ResponseModel>response.json();
                }
            )
            .catch(
                (error: Response) => {
                    return Observable.throw('Something went wrong with getPlayerHistory');
                }
            );
    }
}
