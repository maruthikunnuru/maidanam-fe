export class ResponseModel {
    public statusCode: string;
    public statusMessage: string;
    public messageCode: number;
    public result: any[];


    constructor(statusCode: string, statusMessage: string, messageCode: number, result: any[]) {
        this.statusCode = statusCode;
        this.statusMessage = statusMessage;
        this.messageCode = messageCode;
        this.result = result;
    }
}