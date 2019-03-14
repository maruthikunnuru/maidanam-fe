import {MatchModel} from './match.model';
import {TeamModel} from './team.model';
import {UserModel} from './user.model';

export class PredictionModel {
    public predictionId: number;
    public userId: number;
    public user: UserModel;
    public matchId: number;
    public match: MatchModel;
    public coinsAtPlay: number;
    public winnerId: number;
    public winner: TeamModel;
    public margin: string;
    public challengedUserId: number;
    public challengedUser: UserModel;
    public updatedCount: number;
    public lastUpdatedTs: Date;

    constructor(predictionId: number, userId: number, user: UserModel, matchId: number,
                match: MatchModel, coinsAtPlay: number, winnerId: number, winner: TeamModel,
                margin: string, challengedUserId: number, challengedUser: UserModel,
                updatedCount: number, lastUpdatedTs: Date) {
        this.predictionId = predictionId;
        this.userId = userId;
        this.user = user;
        this.matchId = matchId;
        this.match = match;
        this.coinsAtPlay = coinsAtPlay;
        this.winnerId = winnerId;
        this.winner = winner;
        this.margin = margin;
        this.challengedUserId = challengedUserId;
        this.challengedUser = challengedUser;
        this.updatedCount = updatedCount;
        this.lastUpdatedTs = lastUpdatedTs;
    }
}