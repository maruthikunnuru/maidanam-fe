import {UserModel} from './user.model';

export class LoanModel {
    userId: number;
    user: UserModel;
    exchangeRate: number;
    referenceCode: string;
    status: string;
    lastUpdatedTs: Date;
    requestId: number;


    constructor(userId: number, user: UserModel, exchangeRate: number,
                referenceCode: string, status: string, lastUpdatedTs: Date,
                requestId: number) {
        this.userId = userId;
        this.user = user;
        this.exchangeRate = exchangeRate;
        this.referenceCode = referenceCode;
        this.status = status;
        this.lastUpdatedTs = lastUpdatedTs;
        this.requestId = requestId;
    }
}