export class LoanProcessModel {
    private _loanRefCode: string;
    public loanAmount: number;
    public adminToken: string;


    constructor(loanRefCode: string, loanAmount: number, adminToken: string) {
        this._loanRefCode = loanRefCode;
        this.loanAmount = loanAmount;
        this.adminToken = adminToken;
    }
}
