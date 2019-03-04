export class TeamModel {
    public teamId: number;
    public teamName: string;
    public teamShortName: string;
    public teamProfile: string;


    constructor(teamId: number, teamName: string, teamShortName: string, teamProfile: string) {
        this.teamId = teamId;
        this.teamName = teamName;
        this.teamShortName = teamShortName;
        this.teamProfile = teamProfile;
    }
}
