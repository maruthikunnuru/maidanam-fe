export class OddsModel {
    winOdds: string;
    easyOdds: string;
    mediumOdds: string;
    hardOdds: string;


    constructor(winOdds: string, easyOdds: string,
                mediumOdds: string, hardOdds: string) {
        this.winOdds = winOdds;
        this.easyOdds = easyOdds;
        this.mediumOdds = mediumOdds;
        this.hardOdds = hardOdds;
    }
}