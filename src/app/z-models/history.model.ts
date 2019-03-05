import {MatchModel} from './match.model';

export class HistoryModel {

    public userName: string;
    public firstName: string;
    public lastName: string;
    public match: MatchModel;
    public coinMovement: number;
    public movementType: string;


    constructor(userName: string, firstName: string, lastName: string, match: MatchModel, coinMovement: number, movementType: string) {
        this.userName = userName;
        this.firstName = firstName;
        this.lastName = lastName;
        this.match = match;
        this.coinMovement = coinMovement;
        this.movementType = movementType;
    }
}


