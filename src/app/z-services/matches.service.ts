import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {ResponseModel} from '../z-models/response.model';
import {Headers, Http, Response} from '@angular/http';
import {AppConstants} from '../app-constants';


@Injectable()
export class MatchesService {
    constructor(private http: Http) {}

    // matches: MatchModel[] = [
    //     new MatchModel(1, 'R1', 'S',
    //         new TeamModel(111, 'CSK'), new TeamModel(222, 'MI'),
    //         null, '23th Mar', '15:00 IST', null, null,
    //         new OddsModel(2,1,1.33,1.5), new OddsModel(1.5, 1, 1.5, 2), ''),
    //     new MatchModel(2, 'R1', 'S',
    //         new TeamModel(333, 'RR'), new TeamModel(444, 'SRH'),
    //         null, '23th Mar', '20:00 IST', null, null,
    //         new OddsModel(2,1,1.33,1.5), new OddsModel(1.5, 1, 1.5, 2), ''),
    //     new MatchModel(3,  'R1', 'S',
    //         new TeamModel(555,  'KXIP'), new TeamModel(666,  'KKR'),
    //         null, '24th Mar', '15:00 IST', null, null,
    //         new OddsModel(2,1,1.33,1.5), new OddsModel(1.5, 1, 1.5, 2), ''),
    //     new MatchModel(4, 'R1', 'S',
    //         new TeamModel(777,  'RCB'), new TeamModel(888, 'DC'),
    //         null, '24th Mar', '20:00 IST', null,  null,
    //         new OddsModel(2,1,1.33,1.5), new OddsModel(1.5, 1, 1.5, 2), ''),
    //     new MatchModel(5, 'R1', 'A',
    //         new TeamModel(111,  'CSK'), new TeamModel(222,  'MI'),
    //         null, '25th Mar', '15:00 IST', null,  null,
    //         new OddsModel(2,1,1.33,1.5), new OddsModel(1.5, 1, 1.5, 2), ''),
    //     new MatchModel(6,  'R1', 'A',
    //         new TeamModel(333,  'RR'), new TeamModel(444,  'SRH'),
    //         null, '26th Mar', '20:00 IST', null,  null,
    //         new OddsModel(2,1,1.33,1.5), new OddsModel(1.5, 1, 1.5, 2), ''),
    //     new MatchModel(7,  'R1', 'A',
    //         new TeamModel(555, 'KXIP'), new TeamModel(666,  'KKR'),
    //         null, '27th Mar', '15:00 IST', null,  null,
    //         new OddsModel(2,1,1.33,1.5), new OddsModel(1.5, 1, 1.5, 2), ''),
    //     new MatchModel(8, 'R1', 'A',
    //         new TeamModel(777,  'RCB'), new TeamModel(888,  'DC'),
    //         null, '28th Mar', '20:00 IST', null,  null,
    //         new OddsModel(2,1,1.33,1.5), new OddsModel(1.5, 1, 1.5, 2), ''),
    // ];

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
