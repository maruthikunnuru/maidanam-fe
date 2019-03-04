import {Injectable} from '@angular/core';
// import {Headers, Http} from '@angular/http';
import {ScoresModel} from '../z-models/scores.model';
import {UserModel} from '../z-models/user.model';


@Injectable()
export class ScoreboardService {
    constructor() {}

    private scores: ScoresModel[] = [
        new ScoresModel(new UserModel(111111, 'vinod.aripaka@gmail.com','Vinod','Aripaka','ADMIN'), 1, 4200, 4500, 300),
        new ScoresModel(new UserModel(222222, 'alurisankar@gmail.com','Uma','Sankar','USER'), 2, 4000, 4000, 0),
        new ScoresModel(new UserModel(333333, 'pradeep.mattam@gmail.com','Pradeep','Mattam','APP_ADMIN'), 3, 3500, 4000, 500),
        new ScoresModel(new UserModel(444444, 'harish.chandrakanth@gmail.com','Harish','Chandrakanth','ADMIN'), 4, 3000, 5000, 2000),
        new ScoresModel(new UserModel(555555, 'maruti.kunnuru@gmail.com','Maruti','Kunnuru','USER'), 5, 1000, 6000, 5000)
    ];

    getScoreboard(userId: number, groupId: number): ScoresModel[] {
        // const headers = new Headers({'userId': userId});
        // return this.http.get('http://localhost:8080/groups/' + groupId + '/ranks', {headers: headers});
        return this.scores.slice();
    }
}
