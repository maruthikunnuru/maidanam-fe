export class TeamModel {
    public teamId: number;
    public teamName: string;
    public teamProfile: string;
    public lastUpdatedUserId: number;


    constructor(teamId: number, teamName: string, teamProfile: string, lastUpdatedUserId: number) {
        this.teamId = teamId;
        this.teamName = teamName;
        this.teamProfile = teamProfile;
        this.lastUpdatedUserId = lastUpdatedUserId;
    }
}
