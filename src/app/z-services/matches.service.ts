import {Injectable} from '@angular/core';
// import {Headers, Http} from '@angular/http';
import {MatchModel} from '../z-models/match.model';
import {TeamModel} from '../z-models/team.model';


@Injectable()
export class MatchesService {
    constructor() {}

    matches: MatchModel[] = [
        new MatchModel(1, 'R1', 'S',
            new TeamModel(111, 'CSK'), new TeamModel(222, 'MI'),
            null, '23th Mar', '15:00 IST', null, null,  null, null, ''),
        new MatchModel(2, 'R1', 'S',
            new TeamModel(333, 'RR'), new TeamModel(444, 'SRH'),
            null, '23th Mar', '20:00 IST', null, null, null, null, ''),
        new MatchModel(3,  'R1', 'S',
            new TeamModel(555,  'KXIP'), new TeamModel(666,  'KKR'),
            null, '24th Mar', '15:00 IST', null, null, null, null, ''),
        new MatchModel(4, 'R1', 'S',
            new TeamModel(777,  'RCB'), new TeamModel(888, 'DC'),
            null, '24th Mar', '20:00 IST', null,  null, null, null, ''),
        new MatchModel(6, 'R1', 'A',
            new TeamModel(111,  'CSK'), new TeamModel(222,  'MI'),
            null, '25th Mar', '15:00 IST', null,  null, null, null, ''),
        new MatchModel(7,  'R1', 'A',
            new TeamModel(333,  'RR'), new TeamModel(444,  'SRH'),
            null, '26th Mar', '20:00 IST', null,  null, null, null, ''),
        new MatchModel(8,  'R1', 'A',
            new TeamModel(555, 'KXIP'), new TeamModel(666,  'KKR'),
            null, '27th Mar', '15:00 IST', null,  null, null, null, ''),
        new MatchModel(9, 'R1', 'A',
            new TeamModel(777,  'RCB'), new TeamModel(888,  'DC'),
            null, '28th Mar', '20:00 IST', null,  null, null, null, '')
    ];

    getMatches(userId: number) {
        // const headers = new Headers({'userId': userId});
        // return this.http.get('http://localhost:8080/matches', {headers: headers});
        return this.matches.slice();
    }
}
