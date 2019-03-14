import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {MatchModel} from '../../z-models/match.model';
import {MatchesService} from '../../z-services/matches.service';
import {Subscription} from 'rxjs';
import {UserModel} from '../../z-models/user.model';
import {LoginService} from '../../z-services/login.service';
import {GroupModel} from '../../z-models/group.model';
import {PredictionsService} from '../../z-services/predictions.service';
import {PredictionModel} from '../../z-models/prediction.model';

export interface PeriodicElement {
  player: string;
  prediction: string;
  challenged: string;
  coins: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {player: 'Harish', prediction: 'CSK (Medium)', challenged: 'Maruthi', coins: 700},
  {player: 'Vinodh', prediction: 'MI  (Hard)', challenged: 'Harish', coins: 800},
  {player: 'Pradi', prediction: 'MI  (Easy)', challenged: 'Vinodh', coins: 500},
  {player: 'Maruthi', prediction: 'CSK  (Medium)', challenged: 'Harish', coins: 1200},
  {player: 'Uma', prediction: 'CSK (Hard)', challenged: 'Maruthi', coins: 600},
  ];

@Component({
  selector: 'app-predictions',
  templateUrl: './predictions.component.html',
  styleUrls: ['./predictions.component.css']
})
export class PredictionsComponent implements OnInit, OnDestroy {

  players: string[] = [ 'Harish', 'Pradi', 'Vinodh', 'Maruthi'];
  slideValue = 0;
  matchId: number;
  selectedMatch: MatchModel;
  currentMatchPrediction: PredictionModel;
  matchSubscription: Subscription;
  predictionSubscription: Subscription;
  currentUserSubscription: Subscription;
  currentUserGroupsSubscription: Subscription;
  user: UserModel;
  groups: GroupModel[];
  loggedIn: boolean;
  showOthersPredictions = false;

  displayedColumns: string[] = ['player', 'prediction', 'challenged', 'coins'];
  dataSource = ELEMENT_DATA;


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
              private loginService: LoginService,
              private matchesService: MatchesService,
              private predictionService: PredictionsService) { }

  ngOnInit() {
    console.log('Inside predictions');
    this.route.params
        .subscribe(
            (params: Params) => {
              this.matchId = +params['id'];
              console.log('matchId --->' + this.matchId);

            }
        );

    this.currentUserSubscription = this.loginService.currentUser
        .subscribe(
            (res) => {
              this.user = res;
              this.loggedIn = (this.user != null);

              if (!this.loggedIn) {
                this.router.navigate(['/home']);
              }
            },
            (error) => console.log(error)
        );

    this.currentUserGroupsSubscription = this.loginService.currentUserGroups
        .subscribe(
        (res) => {
              this.groups = res;
              this.loggedIn = (this.user != null);
            },
          (error) => console.log(error)
        );

    this.matchSubscription = this.matchesService.getMatchById(this.matchId, this.user.userName)
        .subscribe((response) => {
              if (response.statusCode === 'N') {
                alert('No Match Data Available');
              } else {
                this.selectedMatch = response.result as MatchModel;
                console.log(this.selectedMatch.localDate);
              }
            },
            (error) => console.log(error)
        );

      this.predictionSubscription = this.predictionService.getPredictions(this.matchId,
                                                                          this.user.groupId,
                                                                          this.user.userId,
                                                                          this.user.userName)
          .subscribe((response) => {
                  if (response.statusCode === 'N') {
                      // alert('No Predictions Available');
                  } else {
                      this.currentMatchPrediction = response.result as PredictionModel;
                      console.log(this.currentMatchPrediction);


                      if(this.currentMatchPrediction.match.matchStatus !== 'SCHEDULED') {
                          this.showOthersPredictions = true;
                      }
                  }
              },
              (error) => console.log(error)
          );
  }

  ngOnDestroy(): void {
      this.currentUserSubscription.unsubscribe();
      this.currentUserGroupsSubscription.unsubscribe();
      this.matchSubscription.unsubscribe();
      this.predictionSubscription.unsubscribe();
  }

}
