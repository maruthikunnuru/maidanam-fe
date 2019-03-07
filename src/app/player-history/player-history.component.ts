import { Component, OnInit } from '@angular/core';
import {PlayerHistoryService} from '../z-services/player-history.service';
import {HistoryModel} from '../z-models/history.model';
import {MatchesService} from "../z-services/matches.service";
import {ActivatedRoute, Router} from "@angular/router";


@Component({
  selector: 'app-player-history',
  templateUrl: './player-history.component.html',
  styleUrls: ['./player-history.component.css']
})
export class PlayerHistoryComponent implements OnInit {


  historyList: HistoryModel[] = [];

  constructor(private historyService: PlayerHistoryService,
              private matchesService: MatchesService,
              private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
      this.historyList = this.historyService.getPlayerHistory(111111, 111);
      console.log(this.historyList);
  }

    onMatchClick(matchId: number) {
        this.router.navigate([matchId + '/predictions'], {relativeTo: this.route});
        // this.router.navigate(['/predictions']);
    }

}
