import {TeamModel} from './team.model';
import {MaidanamModel} from './maidanam.model';

export class MatchModel {
    public matchId: number;
    public tournamentId: number;
    public matchLevel: string;
    public matchStatus: string;
    public team1: TeamModel;
    public team2: TeamModel;
    public winner: TeamModel;
    public localDate: string;
    public localTime: string;
    public maidanam: MaidanamModel;
    public matchResult: string;
    public resultType: string;
    public oddsTeam1: TeamModel;
    public oddsTeam2: TeamModel;
    public additionalInfo: string;


    constructor(matchId: number, tournamentId: number, matchLevel: string, matchStatus: string, team1: TeamModel, team2: TeamModel, winner: TeamModel, localDate: string, localTime: string, maidanam: MaidanamModel, matchResult: string, resultType: string, oddsTeam1: TeamModel, oddsTeam2: TeamModel, additionalInfo: string) {
        this.matchId = matchId;
        this.tournamentId = tournamentId;
        this.matchLevel = matchLevel;
        this.matchStatus = matchStatus;
        this.team1 = team1;
        this.team2 = team2;
        this.winner = winner;
        this.localDate = localDate;
        this.localTime = localTime;
        this.maidanam = maidanam;
        this.matchResult = matchResult;
        this.resultType = resultType;
        this.oddsTeam1 = oddsTeam1;
        this.oddsTeam2 = oddsTeam2;
        this.additionalInfo = additionalInfo;
    }
}
