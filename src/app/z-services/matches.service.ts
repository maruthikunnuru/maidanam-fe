import {Injectable} from '@angular/core';
// import {Headers, Http} from '@angular/http';
import {MatchModel} from '../z-models/match.model';
import {TeamModel} from '../z-models/team.model';


@Injectable()
export class MatchesService {
    constructor() {}

    matches: MatchModel[] = [
        new MatchModel(1, 99999, 'R1', 'S',
            new TeamModel(111, 'Chennai Super Kings', 'CSK', null),
            new TeamModel(222, 'Mumbai Indians', 'MI', null),
            null, '23th Mar', '15:00 IST', null, '', '', null, null, ''),
        new MatchModel(2, 99999, 'R1', 'S',
            new TeamModel(333, 'Rajasthan Royals', 'RR', null),
            new TeamModel(444, 'Sunrisers Hyderabad', 'SRH', null),
            null, '23th Mar', '20:00 IST', null, '', '', null, null, ''),
        new MatchModel(3, 99999, 'R1', 'S',
            new TeamModel(555, 'Kings XI Punjab', 'KXIP', null),
            new TeamModel(666, 'Kolkata Knight Riders', 'KKR', null),
            null, '24th Mar', '15:00 IST', null, '', '', null, null, ''),
        new MatchModel(4, 99999, 'R1', 'S',
            new TeamModel(777, 'Royal Challengers Bangalore', 'RCB', null),
            new TeamModel(888, 'Delhi Capitals', 'DC', null),
            null, '24th Mar', '20:00 IST', null, '', '', null, null, ''),
        new MatchModel(6, 99999, 'R1', 'A',
            new TeamModel(111, 'Chennai Super Kings', 'CSK', null),
            new TeamModel(222, 'Mumbai Indians', 'MI', null),
            null, '25th Mar', '15:00 IST', null, '', '', null, null, ''),
        new MatchModel(7, 99999, 'R1', 'A',
            new TeamModel(333, 'Rajasthan Royals', 'RR', null),
            new TeamModel(444, 'Sunrisers Hyderabad', 'SRH', null),
            null, '26th Mar', '20:00 IST', null, '', '', null, null, ''),
        new MatchModel(8, 99999, 'R1', 'A',
            new TeamModel(555, 'Kings XI Punjab', 'KXIP', null),
            new TeamModel(666, 'Kolkata Knight Riders', 'KKR', null),
            null, '27th Mar', '15:00 IST', null, '', '', null, null, ''),
        new MatchModel(9, 99999, 'R1', 'A',
            new TeamModel(777, 'Royal Challengers Bangalore', 'RCB', null),
            new TeamModel(888, 'Delhi Capitals', 'DC', null),
            null, '28th Mar', '20:00 IST', null, '', '', null, null, '')
    ];

    getMatches(userId: number) {
        // const headers = new Headers({'userId': userId});
        // return this.http.get('http://localhost:8080/matches', {headers: headers});
        return this.matches.slice();
    }
}
