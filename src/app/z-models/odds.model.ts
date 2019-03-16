export class OddsModel {
    private easyOdds: string;
    private mediumOdds: string;
    private hardOdds: string;


    constructor(easyOdds: string, mediumOdds: string, hardOdds: string) {
        this.easyOdds = easyOdds;
        this.mediumOdds = mediumOdds;
        this.hardOdds = hardOdds;
    }
}