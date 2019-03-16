import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {MatchModel} from '../../z-models/match.model';
import {MatchesService} from '../../z-services/matches.service';
import {Subscription} from 'rxjs';
import {UserModel} from '../../z-models/user.model';
import {LoginService} from '../../z-services/login.service';
import {GroupModel} from '../../z-models/group.model';
import {PredictionsService} from '../../z-services/predictions.service';
import {PredictionModel} from '../../z-models/prediction.model';
import {NgForm} from '@angular/forms';

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

  slideValue = 0;
  matchId: number;
  selectedMatch: MatchModel;
  predictions: PredictionModel[];
  currentUserPrediction: PredictionModel;
  userPredictionToSubmit: PredictionModel;
  matchSubscription: Subscription;
  getPredictionSubscription: Subscription;
  submitPredictionSubscription: Subscription;
  currentUserSubscription: Subscription;
  currentUserGroupsSubscription: Subscription;
  user: UserModel;
  groups: GroupModel[];
  loggedIn: boolean;
  showOthersPredictions = false;
  targetSubscription: Subscription;
  targetList: UserModel[];

  @ViewChild('p') predictionForm: NgForm;
  oddsEnum: string[] = ['EASY', 'MEDIUM', 'HARD'];
  teamsEnum: string[];


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
                // this.router.navigate(['/home']);
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
                this.selectedMatch = <MatchModel>response.result;
                this.teamsEnum = [this.selectedMatch.team1.teamName, this.selectedMatch.team2.teamName];
                console.log(JSON.parse(this.selectedMatch.additionalInfo));
              }
            },
            (error) => console.log(error)
        );

      this.targetSubscription = this.loginService.getUsersByGroupId(this.user.userName, this.user.groupId)
          .subscribe((resp) => {
                  if (resp.statusCode === 'N') {
                      alert('No User Data Available');
                  } else {
                      this.targetList = resp.result as UserModel[];
                      console.log(this.targetList);
                  }
              },
              (error) => console.log(error)
          );

      this.getPredictionSubscription = this.predictionService.getPredictions(this.matchId,
                                                                          this.user.groupId,
                                                                          this.user.userId,
                                                                          this.user.userName)
          .subscribe((response) => {
                  if (response.statusCode === 'N') {
                      // alert('No Predictions Available');
                  } else {
                      this.predictions = <PredictionModel[]>response.result;
                      console.log(this.predictions);

                      if (this.predictions.length > 0) {

                          this.currentUserPrediction = this.predictions.filter( pred => pred.userId === this.user.userId)[0];
                          console.log(this.currentUserPrediction);

                          if (this.currentUserPrediction.match.matchStatus !== 'SCHEDULED') {
                              this.showOthersPredictions = true;
                          }
                      }
                  }
              },
              (error) => console.log(error)
          );
  }

  submitPrediction() {
   console.log(this.predictionForm.value);

   this.userPredictionToSubmit = this.currentUserPrediction;

   this.userPredictionToSubmit.margin = this.predictionForm.value.marginOption != null ?
       this.predictionForm.value.marginOption : this.userPredictionToSubmit.margin;
   this.userPredictionToSubmit.challengedUserId = this.predictionForm.value.targetUser != null ?
       this.predictionForm.value.targetUser : this.userPredictionToSubmit.challengedUserId;
   this.userPredictionToSubmit.winnerId = this.predictionForm.value.winner != null ?
       this.predictionForm.value.winner : this.userPredictionToSubmit.winnerId;
   this.userPredictionToSubmit.coinsAtPlay = this.predictionForm.value.coinsInvested != null ?
       this.predictionForm.value.coinsInvested : this.userPredictionToSubmit.coinsAtPlay;

   this.userPredictionToSubmit.challengedUser = null;
   this.userPredictionToSubmit.winner = null;

   console.log(this.userPredictionToSubmit);

   this.submitPredictionSubscription = this.predictionService.submitPredictions(this.user.userId,
       this.user.userName, this.userPredictionToSubmit)
       .subscribe((resps) => {
               console.log(resps);
               if (resps.statusCode === 'N') {
                   alert('Prediction Submission Failed');
               } else {
                   alert('Prediction Submitted Successfully');
               }
           },
           (error) => console.log(error)
       );
  }

  ngOnDestroy(): void {
      this.currentUserSubscription.unsubscribe();
      this.currentUserGroupsSubscription.unsubscribe();
      this.matchSubscription.unsubscribe();
      this.getPredictionSubscription.unsubscribe();
      // this.submitPredictionSubscription.unsubscribe();
  }

}
