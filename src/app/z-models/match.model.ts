import {TeamModel} from './team.model';
import {OddsModel} from "./odds.model";

export class MatchModel {
    public matchId: number;
    public matchLevel: string;
    public matchStatus: string;
    public team1: TeamModel;
    public team2: TeamModel;
    public winner: TeamModel;
    public localDate: string;
    public localTime: string;
    public matchResult: string;
    public resultType: string;
    public oddsTeam1: OddsModel;
    public oddsTeam2: OddsModel;
    public additionalInfo: string;


    constructor(matchId: number, matchLevel: string, matchStatus: string, team1: TeamModel, team2: TeamModel, winner: TeamModel, localDate: string, localTime: string, matchResult: string, resultType: string, oddsTeam1: OddsModel, oddsTeam2: OddsModel, additionalInfo: string) {
        this.matchId = matchId;
        this.matchLevel = matchLevel;
        this.matchStatus = matchStatus;
        this.team1 = team1;
        this.team2 = team2;
        this.winner = winner;
        this.localDate = localDate;
        this.localTime = localTime;
        this.matchResult = matchResult;
        this.resultType = resultType;
        this.oddsTeam1 = oddsTeam1;
        this.oddsTeam2 = oddsTeam2;
        this.additionalInfo = additionalInfo;
    }
}
