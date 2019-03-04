import {Injectable} from '@angular/core';
// import {Headers, Http} from '@angular/http';
import {PlayerModel} from '../z-models/player.model';
import {TeamStatsModel} from '../z-models/team-stats.model';
import {ChallengeStatsModel} from '../z-models/challenge-stats.model';
import {MatchStatsModel} from '../z-models/match-stats.model';

@Injectable()
export class PlayerHistoryService {
    constructor() {}

    player: PlayerModel = new PlayerModel(
        'Vinod Aripaka', 'JNTU', 1, 90, 2500, 1000, 500, 500 , 1500,
        [ new TeamStatsModel('MI', 5),
            new TeamStatsModel('CSK', 3),
            new TeamStatsModel('KKR', 4),
            new TeamStatsModel('SRH', 2),
            new TeamStatsModel('RCB', 1),
            new TeamStatsModel('RR', 4),
            new TeamStatsModel('DD', 3),
            new TeamStatsModel('KXIP', 2)
        ],
        [ new ChallengeStatsModel('Uma', 2),
            new ChallengeStatsModel('Harish', 3),
            new ChallengeStatsModel('Pradeep', 1),
            new ChallengeStatsModel('Viswa', 0)
        ],
        [ new MatchStatsModel('CSK vs MI', 'MI', 1000),
            new MatchStatsModel('RR vs RCB', 'RCB', 1000),
            new MatchStatsModel('KXIP vs KKR', 'KKR', 500),
            new MatchStatsModel('SRH vs DD', 'SRH', 700)
        ]
    );

    // getUserCoinHistory(userId: number, groupId: number) {
    //     const headers = new Headers({'userId': userId});
    //     // return this.http.get('http://localhost:8080/groups/' + groupId + '/users/' + userId + '/userCoinHistory', {headers: headers});
    // }
    //
    // getPlayerHistory(userId: number, groupId: number) {
    //     const headers = new Headers({'userId': userId});
    //     // return this.http.get('http://localhost:8080/groups/' + groupId + '/users/' + userId, {headers: headers});
    // }
}
