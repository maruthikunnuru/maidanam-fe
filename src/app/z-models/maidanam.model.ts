export class MaidanamModel {
    public maidanamId: number;
    public maidanamName: string;
    public location: string;
    public country: string;
    public timeZone: string;


    constructor(maidanamId: number, maidanamName: string, location: string, country: string, timeZone: string) {
        this.maidanamId = maidanamId;
        this.maidanamName = maidanamName;
        this.location = location;
        this.country = country;
        this.timeZone = timeZone;
    }
}
