import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {MatchModel} from "../z-models/match.model";
import {MatchesService} from "../z-services/matches.service";

@Component({
  selector: 'app-predictions',
  templateUrl: './predictions.component.html',
  styleUrls: ['./predictions.component.css']
})
export class PredictionsComponent implements OnInit {

  players: string[] = [ 'Harish', 'Pradi', 'Vinodh', 'Maruthi'];
  slideValue = 0;
  matchId: number;
  selectedMatch: MatchModel;

  changeSlide(slideEvent: any) {
    this.slideValue = slideEvent.value;
    console.log(slideEvent);
  }

  formatLabel(value: number | null) {
    if (!value) {
      return 0;
    }

    if (value >= 1000) {
      return (value / 1000) + ' k';
    }

    return value;
  }

  constructor(private route: ActivatedRoute,
              private router: Router,
              private matchesService: MatchesService) { }

  ngOnInit() {
    console.log('Inside predictions');
    this.route.params
        .subscribe(
            (params: Params) => {
              this.matchId = +params['id'];
              console.log('matchId --->' + this.matchId);

            }
        );

    this.selectedMatch = this.matchesService.getMatchById(7, 111111);
    console.log(this.selectedMatch);
  }

}
