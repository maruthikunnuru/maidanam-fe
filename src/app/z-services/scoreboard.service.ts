import {Injectable} from '@angular/core';
// import {Headers, Http} from '@angular/http';
import {ScoresModel} from '../z-models/scores.model';
import {UserModel} from '../z-models/user.model';


@Injectable()
export class ScoreboardService {
    constructor() {}

    private scores: ScoresModel[] = [
        new ScoresModel(new UserModel('vinod.aripaka@gmail.com',  'Vinod', 'Aripaka', 'vinod.aripaka@gmail.com', 'ADMIN'),
            1, 4200, 4500, 300),
        new ScoresModel(new UserModel('alurisankar@gmail.com', 'Uma', 'Sankar', 'alurisankar@gmail.com', 'USER'),
            2, 4000, 4000, 0),
        new ScoresModel(new UserModel('pradeep.mattam@gmail.com',  'Pradeep', 'Mattam', 'pradeep.mattam@gmail.com', 'APP_ADMIN'),
            3, 3500, 4000, 500),
        new ScoresModel(new UserModel('harish.chandrakanth@gmail.com', 'Harish', 'Chandrakanth', 'harish.chandrakanth@gmail.com', 'ADMIN'),
            4, 3000, 5000, 2000),
        new ScoresModel(new UserModel('maruti.kunnuru@gmail.com', 'Maruti', 'Kunnuru', 'maruti.kunnuru@gmail.com', 'USER'),
            5, 1000, 6000, 5000)
    ];

    getScoreboard(userId: number, groupId: number): ScoresModel[] {
        // const headers = new Headers({'userId': userId});
        // return this.http.get('http://localhost:8080/groups/' + groupId + '/ranks', {headers: headers});
        return this.scores.slice();
    }
}
