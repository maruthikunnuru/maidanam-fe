import { Component, OnInit } from '@angular/core';
import {PlayerHistoryService} from '../z-services/player-history.service';
import {HistoryModel} from '../z-models/history.model';


@Component({
  selector: 'app-player-history',
  templateUrl: './player-history.component.html',
  styleUrls: ['./player-history.component.css']
})
export class PlayerHistoryComponent implements OnInit {


  historyList: HistoryModel[] = [];

  constructor(private historyService: PlayerHistoryService) { }

  ngOnInit() {
      this.historyList = this.historyService.getPlayerHistory(111111, 111);
      console.log(this.historyList);
  }


}
