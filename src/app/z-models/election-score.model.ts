import {UserModel} from './user.model';
import {TournamentModel} from './tournament.model';

export class ElectionScoreModel {
    public rankingId: number;
    public tournamentId: number;
    public tournament: TournamentModel;
    public userId: number;
    public user: UserModel;
    public groupId: number;
    public rank: number;
    public score: number;


    constructor(rankingId: number, tournamentId: number,
                tournament: TournamentModel, userId: number, user: UserModel,
                groupId: number, rank: number, score: number) {
        this.rankingId = rankingId;
        this.tournamentId = tournamentId;
        this.tournament = tournament;
        this.userId = userId;
        this.user = user;
        this.groupId = groupId;
        this.rank = rank;
        this.score = score;
    }
}