export class SeatModel {
    partyName: string;
    numberOfSeats: number;

    constructor(partyName: string, numberOfSeats: number) {
        this.partyName = partyName;
        this.numberOfSeats = numberOfSeats;
    }
}