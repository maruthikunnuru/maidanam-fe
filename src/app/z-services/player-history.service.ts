import {Injectable} from '@angular/core';
import {MatchModel} from '../z-models/match.model';
import {TeamModel} from '../z-models/team.model';
import {HistoryModel} from '../z-models/history.model';

// import {Headers, Http} from '@angular/http';

@Injectable()
export class PlayerHistoryService {
    constructor() {}

    private history: HistoryModel[] = [
        new HistoryModel('vinod.aripaka@gmail.com', 'Vinod', 'Aripaka',
            new MatchModel(1, 'R1', 'C',
                new TeamModel(111, 'CSK'), new TeamModel(222, 'MI'),
                new TeamModel(222, 'MI'),
                '23th Mar', '15:00 IST', 'Won by 3 wickets', 'R', null, null, ''),
            1000, 'BONUS'),
        new HistoryModel('vinod.aripaka@gmail.com', 'Vinod', 'Aripaka',
            new MatchModel(2, 'R1', 'C',
                new TeamModel(333, 'RR'), new TeamModel(444, 'KXIP'),
                new TeamModel(444, 'KXIP'),
                '23th Mar', '20:00 IST', 'Won by 20 runs', 'R', null, null, ''),
            500, 'BONUS'),
        new HistoryModel('vinod.aripaka@gmail.com', 'Vinod', 'Aripaka',
            new MatchModel(3, 'R1', 'C',
                new TeamModel(555, 'RCB'), new TeamModel(666, 'DC'),
                new TeamModel(555, 'RCB'),
                '24th Mar', '15:00 IST', 'Won by 50 runs', 'R', null, null, ''),
            800, 'BONUS'),
        new HistoryModel('vinod.aripaka@gmail.com', 'Vinod', 'Aripaka',
            new MatchModel(3, 'R1', 'C',
                new TeamModel(777, 'SRH'), new TeamModel(888, 'KKR'),
                new TeamModel(777, 'SRH'),
                '24th Mar', '20:00 IST', 'Won by 3 wickets', 'R', null, null, ''),
            1500, 'BONUS')
    ];

    getPlayerHistory(userId: number, groupId: number) {
        // const headers = new Headers({'userId': userId})
        // return this.http.get('http://localhost:8080/groups/' + groupId + '/users/' + userId, {headers: headers});
        return this.history.slice();
    }
}
