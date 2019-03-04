import {UserModel} from './user.model';

export class ScoresModel {
    public user: UserModel;
    public rankNumber: number;
    public effectiveCoins: number;
    public totalCoins: number;
    public totalLoan: number;


    constructor(user: UserModel, rankNumber: number,
                effectiveCoins: number, totalCoins: number, totalLoan: number) {
        this.user = user;
        this.rankNumber = rankNumber;
        this.effectiveCoins = effectiveCoins;
        this.totalCoins = totalCoins;
        this.totalLoan = totalLoan;
    }
}