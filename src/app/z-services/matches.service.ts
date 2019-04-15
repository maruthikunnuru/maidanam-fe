import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {ResponseModel} from '../z-models/response.model';
import {Headers, Http, Response} from '@angular/http';
import {AppConstants} from '../app-constants';


@Injectable()
export class MatchesService {
    constructor(private http: Http) {}

   getMatches(username: string): Observable<ResponseModel> {
        const headers = new Headers({'X-USER-NAME': username});

        return this.http.get(AppConstants.API_ENDPOINT + '/matches/', {headers: headers})
            .map(
                (response: Response) => {
                    return <ResponseModel>response.json();
                }
            )
            .catch(
                (error: Response) => {
                    return Observable.throw('Something went wrong with getGroupList');
                }
            );
    }

    getMatchById(matchId: number, username: string): Observable<ResponseModel> {
        const headers = new Headers({'X-USER-NAME': username});
        return this.http.get(AppConstants.API_ENDPOINT + '/matches/' + matchId + '/', {headers: headers})
            .map(
                (response: Response) => {
                    return <ResponseModel>response.json();
                }
            )
            .catch(
                (error: Response) => {
                    return Observable.throw('Something went wrong with getGroupList');
                }
            );
    }
}
