import {UserModel} from './user.model';

export class SpendSummaryModel {
    public userId: number;
    public user: UserModel;
    public predAccuracy: number;
    public favPred: number;
    public favPredPercent: number;
    public maxCoins: number;
    public minCoins: number;
    public avgCoins: number;
    public maxScore: number;
    public currentScore: number;


    constructor(userId: number, user: UserModel, predAccuracy: number, favPred: number,
                favPredPercent: number, maxCoins: number, minCoins: number, avgCoins: number,
                maxScore: number, currentScore: number) {
        this.userId = userId;
        this.user = user;
        this.predAccuracy = predAccuracy;
        this.favPred = favPred;
        this.favPredPercent = favPredPercent;
        this.maxCoins = maxCoins;
        this.minCoins = minCoins;
        this.avgCoins = avgCoins;
        this.maxScore = maxScore;
        this.currentScore = currentScore;
    }
}
