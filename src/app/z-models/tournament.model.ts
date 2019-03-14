export class TournamentModel {
    public tournamentId: number;
    public tournamentName: string;
    public tournamentYear: string;
    public tournamentType: string;
    public sport: string;
    public startDt: string;
    public endDt: string;
    public shortDesc: string;
    public additionalInfo: string;
    public lastUpdatedUserId: number;
    public lastUpdatedTs: Date;


    constructor(tournamentId: number, tournamentName: string,
                tournamentYear: string, tournamentType: string,
                sport: string, startDt: string, endDt: string,
                shortDesc: string, additionalInfo: string,
                lastUpdatedUserId: number, lastUpdatedTs: Date) {
        this.tournamentId = tournamentId;
        this.tournamentName = tournamentName;
        this.tournamentYear = tournamentYear;
        this.tournamentType = tournamentType;
        this.sport = sport;
        this.startDt = startDt;
        this.endDt = endDt;
        this.shortDesc = shortDesc;
        this.additionalInfo = additionalInfo;
        this.lastUpdatedUserId = lastUpdatedUserId;
        this.lastUpdatedTs = lastUpdatedTs;
    }
}