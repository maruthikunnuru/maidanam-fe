import {UserModel} from './user.model';
import {SeatListModel} from './seat-list.model';

export class ElectionPredictionModel {
    public predictionId: number;
    public userId: number;
    public user: UserModel;
    public electionType: string;
    public province: string;
    public seatPredictionObject: SeatListModel;


    constructor(predictionId: number, userId: number, user: UserModel,
                electionType: string, province: string,
                seatPredictionObject: SeatListModel) {
        this.predictionId = predictionId;
        this.userId = userId;
        this.user = user;
        this.electionType = electionType;
        this.province = province;
        this.seatPredictionObject = seatPredictionObject;
    }
}