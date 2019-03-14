export class MaidanamModel {
    public maidanamId: number;
    public maidanamName: string;
    public location: string;
    public country: string;
    public timeZone: string;
    public lastUpdatedUserId: number;


    constructor(maidanamId: number, maidanamName: string, location: string,
                country: string, timeZone: string, lastUpdatedUserId: number) {
        this.maidanamId = maidanamId;
        this.maidanamName = maidanamName;
        this.location = location;
        this.country = country;
        this.timeZone = timeZone;
        this.lastUpdatedUserId = lastUpdatedUserId;
    }
}