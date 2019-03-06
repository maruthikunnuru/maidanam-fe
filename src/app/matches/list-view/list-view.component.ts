import { Component, OnInit } from '@angular/core';
import {MatchModel} from "../../z-models/match.model";
import {MatchesService} from "../../z-services/matches.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.css']
})
export class ListViewComponent implements OnInit {

  selectedMatch: MatchModel;

  constructor(private matchesService: MatchesService,
              private router: Router) { }

  allMatches: MatchModel[];

  ngOnInit() {
    this.allMatches = this.matchesService.getMatches(111111);
  }

  onMatchClick(matchId: number) {
    this.selectedMatch = this.matchesService.getMatchById(matchId, 111111);
    console.log(this.selectedMatch);
    this.router.navigate(['/predictions']);
  }

}
