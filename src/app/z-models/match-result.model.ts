export class MatchResultModel {
    public toMatchStatus: string;
    public resultType: string;
    public matchResult: string;
    public localMatchDate: string;
    public winnerTeamName: string;
    public adminToken: string;


    constructor(toMatchStatus: string, resultType: string, matchResult: string,
                localMatchDate: string, winnerTeamName: string, adminToken: string) {
        this.toMatchStatus = toMatchStatus;
        this.resultType = resultType;
        this.matchResult = matchResult;
        this.localMatchDate = localMatchDate;
        this.winnerTeamName = winnerTeamName;
        this.adminToken = adminToken;
    }
}
