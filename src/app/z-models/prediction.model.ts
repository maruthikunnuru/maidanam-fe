import {MatchModel} from './match.model';
import {TeamModel} from './team.model';
import {UserModel} from './user.model';

export class PredictionModel {
    public predictionId: number;
    public userId: number;
    public groupId: number;
    public match: MatchModel;
    public coinsAtPlay: number;
    public winnerChosen: TeamModel;
    public marginChosen: string;
    public challengedUser: UserModel;


    constructor(predictionId: number, userId: number, groupId: number, match: MatchModel,
                coinsAtPlay: number, winnerChosen: TeamModel, marginChosen: string, challengedUser: UserModel) {
        this.predictionId = predictionId;
        this.userId = userId;
        this.groupId = groupId;
        this.match = match;
        this.coinsAtPlay = coinsAtPlay;
        this.winnerChosen = winnerChosen;
        this.marginChosen = marginChosen;
        this.challengedUser = challengedUser;
    }
}