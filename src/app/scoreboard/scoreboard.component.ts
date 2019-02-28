import { Component, OnInit } from '@angular/core';
import {ScoresModel} from "../shared/scores.model";

@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.css']
})
export class ScoreboardComponent implements OnInit {

  scores: ScoresModel[] = [
    new ScoresModel(1, 'Uma', 5000, 500),
    new ScoresModel(2, 'Vinod', 4000, 300),
    new ScoresModel(3, 'Pradeep', 3000, -200),
    new ScoresModel(4, 'Harish', 2000, 100),
    new ScoresModel(5, 'Viswa', 1000, 0),
    new ScoresModel(6, 'Venkat', 500, -500),
    new ScoresModel(7, 'PC', 200, -700)
  ]
  constructor() { }

  ngOnInit() {
  }

}
