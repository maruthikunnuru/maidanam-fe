import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {ResponseModel} from '../z-models/response.model';
import {Headers, Http, Response} from '@angular/http';
import {AppConstants} from '../app-constants';
import {MatchResultModel} from '../z-models/match-result.model';
import {LoanModel} from "../z-models/loan.model";


@Injectable()
export class AdminService {
    constructor(private http: Http) {}

    submitMatchResult(matchResult: MatchResultModel): Observable<ResponseModel> {

        return this.http.post(AppConstants.API_ENDPOINT + '/nimda/match', matchResult)
            .map(
                (response: Response) => {
                    // console.log(response);
                    return <ResponseModel>response.json();
                }
            )
            .catch(
                (error: Response) => {
                    return Observable.throw('Something went wrong with submitMatchResult');
                }
            );
    }

    getLoanRef(exRate: number, username: string, groupid: number): Observable<ResponseModel> {
        const headers = new Headers()
        headers.append('X-USER-NAME', username);
        headers.append('X-GROUP-ID', String(groupid));

        return this.http.post(AppConstants.API_ENDPOINT + '/loan-request/',
            new LoanModel(0, null, exRate, '', '', null, null), {headers: headers})
            .map(
                (response: Response) => {
                    return <ResponseModel>response.json();
                }
            )
            .catch(
                (error: Response) => {
                    return Observable.throw('Something went wrong with getLoanRef');
                }
            );
    }
}
