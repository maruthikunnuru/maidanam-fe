import {TeamStatsModel} from "./team-stats.model";
import {ChallengeStatsModel} from "./challenge-stats.model";
import {MatchStatsModel} from "./match-stats.model";

export class PlayerModel {
    public name: string;
    public group: string;
    public rank: number;
    public successRate: number;
    public coins: number;
    public loan: number;
    public winners: number;
    public bonus: number;
    public challenges: number;
    public teamStats: TeamStatsModel[];
    public challengeStats: ChallengeStatsModel[];
    public matchStats: MatchStatsModel[];


    constructor(name: string,
                group: string,
                rank: number,
                successRate: number,
                coins: number,
                loan: number,
                winners: number,
                bonus: number,
                challenges: number,
                teamStats: TeamStatsModel[],
                challengeStats: ChallengeStatsModel[],
                matchStats: MatchStatsModel[]) {
        this.name = name;
        this.group = group;
        this.rank = rank;
        this.successRate = successRate;
        this.coins = coins;
        this.loan = loan;
        this.winners = winners;
        this.bonus = bonus;
        this.challenges = challenges;
        this.teamStats = teamStats;
        this.challengeStats = challengeStats;
        this.matchStats = matchStats;
    }
}
