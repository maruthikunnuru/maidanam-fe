export class OddsModel {
    public winOdds: number;
    public easyOdds: number;
    public mediumOdds: number;
    public hardOdds: number;

    constructor(winOdds: number, easyOdds: number, mediumOdds: number, hardOdds: number) {
        this.winOdds = winOdds;
        this.easyOdds = easyOdds;
        this.mediumOdds = mediumOdds;
        this.hardOdds = hardOdds;
    }
}