import {UserModel} from './user.model';

export class PickSummaryModel {
    public userPickId: number;
    public userId: number;
    public user: UserModel;
    public teamId: number;
    public teamName: string;
    public totalPred: number;
    public totalPicks: number;
    public picksPercent: number;
    public avgCoinsPlayed: number;
    public marginEasy: number;
    public marginMedium: number;
    public marginHard: number;
    public coinsWon: number;
    public winCoins: number;
    public bonusCoins: number;
    public lossCoins: number;
    public fasakCoins: number;


    constructor(userPickId: number, userId: number, user: UserModel,
                teamId: number, teamName: string, totalPred: number,
                totalPicks: number, picksPercent: number, avgCoinsPlayed: number,
                marginEasy: number, marginMedium: number, marginHard: number, coinsWon: number,
                winCoins: number, bonusCoins: number, lossCoins: number, fasakCoins: number) {
        this.userPickId = userPickId;
        this.userId = userId;
        this.user = user;
        this.teamId = teamId;
        this.teamName = teamName;
        this.totalPred = totalPred;
        this.totalPicks = totalPicks;
        this.picksPercent = picksPercent;
        this.avgCoinsPlayed = avgCoinsPlayed;
        this.marginEasy = marginEasy;
        this.marginMedium = marginMedium;
        this.marginHard = marginHard;
        this.coinsWon = coinsWon;
        this.winCoins = winCoins;
        this.bonusCoins = bonusCoins;
        this.lossCoins = lossCoins;
        this.fasakCoins = fasakCoins;
    }
}
