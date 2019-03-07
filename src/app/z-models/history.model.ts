import {PredictionModel} from './prediction.model';
import {UserModel} from "./user.model";

export class HistoryModel {

    public user: UserModel;
    public prediction: PredictionModel;
    public totalCoinsWon: number;
    public coinsWonByWin: number;
    public coinsWonByMargin: number;
    public coinsWonByChallenge: number;


    constructor(user: UserModel, prediction: PredictionModel, totalCoinsWon: number,
                coinsWonByWin: number, coinsWonByMargin: number, coinsWonByChallenge: number) {
        this.user = user;
        this.prediction = prediction;
        this.totalCoinsWon = totalCoinsWon;
        this.coinsWonByMargin = coinsWonByMargin;
        this.coinsWonByWin = coinsWonByWin;
        this.coinsWonByChallenge = coinsWonByChallenge;
    }
}


