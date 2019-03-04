import { Component, OnInit } from '@angular/core';
import {ScoresModel} from '../z-models/scores.model';
import {ScoreboardService} from '../z-services/scoreboard.service';

@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.css']
})
export class ScoreboardComponent implements OnInit {

  scores: ScoresModel[] = [];


  constructor(private scoreService: ScoreboardService) { }

  ngOnInit() {
   this.scores = this.scoreService.getScoreboard(111111, 111);
  }

}
