import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {ResponseModel} from '../z-models/response.model';
import {Headers, Http, Response} from '@angular/http';
import {AppConstants} from '../app-constants';
import {ElectionPredictionModel} from '../z-models/election-prediction.model';


@Injectable()
export class ElectionsService {
    constructor(private http: Http) {}

    getElectionPredictions(electionType: string, userId: number): Observable<ResponseModel> {
        const headers = new Headers();
        headers.append('X-ELECTION-TYPE', electionType);

        return this.http.get(AppConstants.API_ENDPOINT + '/elections/predictions/users/' + userId, {headers: headers})
            .map(
                (response: Response) => {
                    return <ResponseModel>response.json();
                }
            )
            .catch(
                (error: Response) => {
                    return Observable.throw('Something went wrong with getElectionPredictions');
                }
            );
    }

    submitElectionPredictions(userId: number, electionType: string,
                      electionPredictions: ElectionPredictionModel[]): Observable<ResponseModel> {

        const headers = new Headers();
        headers.append('X-ELECTION-TYPE', electionType);
        headers.append('X-USER-ID', String(userId));

        return this.http.post(AppConstants.API_ENDPOINT + '/elections/predictions', electionPredictions,
            {headers: headers})
            .map(
                (response: Response) => {
                    return <ResponseModel>response.json();
                }
            )
            .catch(
                (error: Response) => {
                    return Observable.throw('Something went wrong with submitElectionPredictions');
                }
            );
    }

    getElectionScores(electionType: string, simMode: string,
                      userId: number, pollType: string): Observable<ResponseModel> {
        const headers = new Headers();
        headers.append('X-ELECTION-TYPE', electionType);
        headers.append('X-SIMULATION-MODE', simMode);
        headers.append('X-USER-ID', String(userId));
        headers.append('X-POLL-ORG', pollType);

        return this.http.get(AppConstants.API_ENDPOINT + '/elections/scores' , {headers: headers})
            .map(
                (response: Response) => {
                    return <ResponseModel>response.json();
                }
            )
            .catch(
                (error: Response) => {
                    return Observable.throw('Something went wrong with getElectionScores');
                }
            );
    }
}
