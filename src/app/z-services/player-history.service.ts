import {Injectable} from '@angular/core';
import {MatchModel} from '../z-models/match.model';
import {UserModel} from '../z-models/user.model';
import {OddsModel} from '../z-models/odds.model';
import {TeamModel} from '../z-models/team.model';
import {HistoryModel} from '../z-models/history.model';
import {PredictionModel} from '../z-models/prediction.model';

// import {Headers, Http} from '@angular/http';

@Injectable()
export class PlayerHistoryService {
    constructor() {}

    private history: HistoryModel[] = [
        new HistoryModel(new UserModel('vinod.aripaka@gmail.com', 'Vinod', 'Aripaka','vinod.aripaka@gmail.com', 'ADMIN'),
            new PredictionModel(900, 111111, 123456,
                new MatchModel(1, 'R1', 'C',
                    new TeamModel(111, 'CSK'),
                    new TeamModel(222, 'MI'),
                    new TeamModel(222, 'MI'),
                '23th Mar', '15:00 IST', 'Won by 3 wickets', 'R',
                new OddsModel(1.5, 2, 1, 1.5), new OddsModel(1.33, 1.5, 2, 1), ''),
                 1000, new TeamModel(222, 'MI'), 'E',
                new UserModel('alurisankar@gmail.com', 'Uma', 'Sankar', 'alurisankar@gmail.com', 'USER')),
            1000, 200, 300, 500),
        new HistoryModel(new UserModel('vinod.aripaka@gmail.com', 'Vinod', 'Aripaka', 'vinod.aripaka@gmail.com', 'ADMIN'),
            new PredictionModel(901, 111111, 123456,
                new MatchModel(1, 'R1', 'C',
                    new TeamModel(333, 'RR'),
                    new TeamModel(444, 'SRH'),
                    new TeamModel(333, 'RR'),
                    '23th Mar', '15:00 IST', 'Won by 50 runs', 'R',
                    new OddsModel(1.5, 2, 1, 1.5), new OddsModel(1.33, 1.5, 2, 1), ''),
                 1000, new TeamModel(444, 'SRH'), 'H',
                new UserModel('harish.addanki@gmail.com', 'Harish', 'Chandrakanth', 'harish.addanki@gmail.com', 'ADMIN')),
            -1000, -200, -300, -500),
        new HistoryModel(new UserModel('vinod.aripaka@gmail.com', 'Vinod', 'Aripaka', 'vinod.aripaka@gmail.com', 'ADMIN'),
            new PredictionModel(901, 111111, 123456,
                new MatchModel(1, 'R1', 'C',
                    new TeamModel(555, 'KXIP'),
                    new TeamModel(666, 'KKR'),
                    new TeamModel(666, 'KKR'),
                    '23th Mar', '15:00 IST', 'Won by 1 wicket', 'R',
                    new OddsModel(1.5, 2, 1, 1.5), new OddsModel(1.33, 1.5, 2, 1), ''),
                 1000, new TeamModel(555, 'KKR'), 'M',
                new UserModel('maruti.kunnuru@gmail.com', 'Maruti', 'Kunnuru', 'maruti.kunnuru@gmail.com', 'USER')),
            -200, 200, 100, -500),
        new HistoryModel(new UserModel('vinod.aripaka@gmail.com', 'Vinod', 'Aripaka', 'vinod.aripaka@gmail.com', 'ADMIN'),
            new PredictionModel(903, 111111, 123456,
                new MatchModel(1, 'R1', 'C',
                    new TeamModel(777, 'DC'),
                    new TeamModel(888, 'RCB'),
                    new TeamModel(777, 'DC'),
                    '23th Mar', '15:00 IST', 'Won by 15 runs', 'R',
                    new OddsModel(1.5, 2, 1, 1.5), new OddsModel(1.33, 1.5, 2, 1), ''),
                1000, new TeamModel(777, 'DC'), 'E',
                new UserModel( 'alurisankar@gmail.com', 'Uma', 'Sankar', 'alurisankar@gmail.com', 'USER')),
            500, 400, 200, -100)
    ];

    getPlayerHistory(userId: number, groupId: number): HistoryModel[] {
        // const headers = new Headers({'userId': userId})
        // return this.http.get('http://localhost:8080/groups/' + groupId + '/users/' + userId, {headers: headers});
        return this.history.slice();
    }
}
