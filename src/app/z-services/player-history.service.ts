import {Injectable} from '@angular/core';
import {HistoryModel} from '../z-models/history.model';
// import {Headers, Http} from '@angular/http';

@Injectable()
export class PlayerHistoryService {
    constructor() {}

  getPlayerHistory(userId: number, groupId: number): HistoryModel[] {
        return null;
    }
}
