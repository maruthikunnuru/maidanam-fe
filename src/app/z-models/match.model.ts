import {TeamModel} from './team.model';
import {TournamentModel} from './tournament.model';
import {MaidanamModel} from './maidanam.model';

export class MatchModel {
    public matchId: number;
    public tournamentId: number;
    public tournament: TournamentModel;
    public matchLevel: string;
    public matchStatus: string;
    public team1Id: number;
    public team1: TeamModel;
    public team2Id: number;
    public team2: TeamModel;
    public winnerId: number;
    public winner: TeamModel;
    public localDate: string;
    public localTime: string;
    public maidanamId: number;
    public maidanam: MaidanamModel;
    public matchResult: string;
    public resultType: string;
    public oddsTeam1: string;
    public oddsTeam2: string;
    public lastUpdatedUserId: number;
    public lastUpdatedTs: Date;
    public additionalInfo: string;
    public tourMatchId: number;


    constructor(matchId: number, tournamentId: number, tournament: TournamentModel,
                matchLevel: string, matchStatus: string, team1Id: number, team1: TeamModel,
                team2Id: number, team2: TeamModel, winnerId: number, winner: TeamModel,
                localDate: string, localTime: string, maidanamId: number, maidanam: MaidanamModel,
                matchResult: string, resultType: string, oddsTeam1: string, oddsTeam2: string,
                lastUpdatedUserId: number, lastUpdatedTs: Date, additionalInfo: string, tourMatchId: number) {
        this.matchId = matchId;
        this.tournamentId = tournamentId;
        this.tournament = tournament;
        this.matchLevel = matchLevel;
        this.matchStatus = matchStatus;
        this.team1Id = team1Id;
        this.team1 = team1;
        this.team2Id = team2Id;
        this.team2 = team2;
        this.winnerId = winnerId;
        this.winner = winner;
        this.localDate = localDate;
        this.localTime = localTime;
        this.maidanamId = maidanamId;
        this.maidanam = maidanam;
        this.matchResult = matchResult;
        this.resultType = resultType;
        this.oddsTeam1 = oddsTeam1;
        this.oddsTeam2 = oddsTeam2;
        this.lastUpdatedUserId = lastUpdatedUserId;
        this.lastUpdatedTs = lastUpdatedTs;
        this.additionalInfo = additionalInfo;
        this.tourMatchId = tourMatchId;
    }
}
