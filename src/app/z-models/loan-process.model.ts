export class LoanProcessModel {
    public loanRefCode: string;
    public adminToken: string;


    constructor(loanRefCode: string, adminToken: string) {
        this.loanRefCode = loanRefCode;
        this.adminToken = adminToken;
    }
}
