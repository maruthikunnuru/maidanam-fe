import {SeatModel} from './seat.model';

export class SeatListModel {
    predictions: SeatModel[];

    constructor(predictions: SeatModel[]) {
        this.predictions = predictions;
    }
}