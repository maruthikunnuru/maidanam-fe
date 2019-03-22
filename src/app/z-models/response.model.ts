export class ResponseModel {
    public statusCode: string;
    public statusMessage: string;
    public messageCode: number;
    public result: any;
    public validationErrors: string[];


    constructor(statusCode: string, statusMessage: string,
                messageCode: number, result: any, validationErrors: string[]) {
        this.statusCode = statusCode;
        this.statusMessage = statusMessage;
        this.messageCode = messageCode;
        this.result = result;
        this.validationErrors = validationErrors;
    }
}