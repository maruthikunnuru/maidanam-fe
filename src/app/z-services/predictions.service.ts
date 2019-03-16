import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {ResponseModel} from '../z-models/response.model';
import {Headers, Http, Response} from '@angular/http';
import {AppConstants} from '../app-constants';
import {PredictionModel} from '../z-models/prediction.model';


@Injectable()
export class PredictionsService {
    constructor(private http: Http) {}

    getPredictions(matchId: number, groupId: number, userId: number, username: string): Observable<ResponseModel> {
        const headers = new Headers()
        headers.append('X-USER-NAME', username);
        headers.append('X-USER-ID', String(userId));

        return this.http.get(AppConstants.API_ENDPOINT + '/predictions/groups/' + groupId + '/matches/' + matchId + '/', {headers: headers})
            .map(
                (response: Response) => {
                    return <ResponseModel>response.json();
                }
            )
            .catch(
                (error: Response) => {
                    return Observable.throw('Something went wrong with getPredictions');
                }
            );
    }

    submitPredictions(userId: number, username: string,
                      prediction: PredictionModel): Observable<ResponseModel> {

        const headers = new Headers()
        headers.append('X-USER-NAME', username);
        headers.append('X-USER-ID', String(userId));

        return this.http.post(AppConstants.API_ENDPOINT + '/predictions/', prediction,
            {headers: headers})
            .map(
                (response: Response) => {
                    return <ResponseModel>response.json();
                }
            )
            .catch(
                (error: Response) => {
                    return Observable.throw('Something went wrong with submitPredictions');
                }
            );
    }
}
