import { Component, OnInit } from '@angular/core';
import {MatchModel} from "../../z-models/match.model";
import {MatchesService} from "../../z-services/matches.service";

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.css']
})
export class ListViewComponent implements OnInit {

  constructor(private matchesService: MatchesService) { }

  allMatches: MatchModel[];

  ngOnInit() {
    this.allMatches = this.matchesService.getMatches(111111);
    console.log(this.allMatches);
  }

}
