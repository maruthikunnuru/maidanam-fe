import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {UserModel} from '../../z-models/user.model';
import {Router} from '@angular/router';
import {LoginService} from '../../z-services/login.service';
import {AdminService} from '../../z-services/admin.service';
import {Location} from '@angular/common';
import {NgForm} from '@angular/forms';
import {ElectionPredictionModel} from '../../z-models/election-prediction.model';
import {SeatListModel} from '../../z-models/seat-list.model';
import {SeatModel} from '../../z-models/seat.model';
import {Ng4LoadingSpinnerService} from 'ng4-loading-spinner';
import {ElectionsService} from '../../z-services/elections.service';

@Component({
  selector: 'app-ap',
  templateUrl: './ap.component.html',
  styleUrls: ['./ap.component.css']
})
export class ApComponent implements OnInit, OnDestroy {

  constructor(private router: Router,
              private loginService: LoginService,
              private adminService: AdminService,
              private location: Location,
              private electionsService: ElectionsService,
              private spinnerService: Ng4LoadingSpinnerService) { }

  currentUserSubscription: Subscription;
  submitApElectionPredictionSubscription: Subscription;
  getApElectionPredictionSubscription: Subscription;
  loggedIn: boolean;
  user: UserModel;
  isFailure = false;
  isSuccess = false;
  constituencies = [
      'Anantapur', 'Chittoor', 'East Godavari', 'Guntur', 'Kadapa',
      'Krishna', 'Kurnool', 'Nellore', 'Prakasam', 'Srikakulam',
      'Visakhapatnam', 'Vizianagaram', 'West Godavari'
  ];



  submitApElectionPredictions: ElectionPredictionModel[];
  currentApElectionPredictions: ElectionPredictionModel[];

   convertToElectionPrediction(apPredForm): ElectionPredictionModel[] {
      const electionPredictionArr: ElectionPredictionModel[] = [];

      this.constituencies.forEach( (province) => {
          const seatModel: SeatModel[] = [];

          seatModel.push(new SeatModel('TDP', apPredForm[province + '-TDP'] === '' ? 0 : apPredForm[province + '-TDP']));
          seatModel.push(new SeatModel('YCP', apPredForm[province + '-YCP'] === '' ? 0 : apPredForm[province + '-YCP']));
          seatModel.push(new SeatModel('OTHERS', apPredForm[province + '-OTHERS'] === '' ? 0 : apPredForm[province + '-OTHERS']));

          const seatPredictionObject: SeatListModel = new SeatListModel(seatModel);

          const tmpElectionPrediction: ElectionPredictionModel =
              new ElectionPredictionModel(null, this.user.userId, this.user, 'AP',
                  province, seatPredictionObject);

          electionPredictionArr.push(tmpElectionPrediction);
      });

      return electionPredictionArr;
  }

  ngOnInit() {
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

      this.spinnerService.show();
      this.getApElectionPredictionSubscription = this.electionsService.getApElectionPredictions('AP', this.user.userId)
          .subscribe((resp) => {
                  this.spinnerService.hide();
                  if (resp.statusCode === 'N') {
                      alert('No Predictions Available');
                  } else {
                      this.currentApElectionPredictions = resp.result as ElectionPredictionModel[];
                      console.log(this.currentApElectionPredictions);

                      if (this.currentApElectionPredictions.length > 0) {

                          this.constituencies.forEach( (prov) => {
                            const abc = this.currentApElectionPredictions.filter( pred => pred.province === prov);

                          });
                      }
                  }
              },
              (error) => console.log(error)
          );
  }

  onSubmitResult(apPredForm: NgForm) {

    this.submitApElectionPredictions = this.convertToElectionPrediction(apPredForm.value);

    console.log(this.submitApElectionPredictions);

      this.spinnerService.show();
      this.submitApElectionPredictionSubscription = this.electionsService.submitApElectionPredictions(this.user.userId,
          'AP', this.submitApElectionPredictions)
          .subscribe((resps) => {
                  this.spinnerService.hide();
                  console.log(resps);
                  if (resps.statusCode === 'Y') {
                      this.isSuccess = true;
                      this.isFailure = false;
                  } else {
                      this.isSuccess = false;
                      this.isFailure = true;
                  }
              },
              (error) => console.log(error)
          );

  }

  goBack() {
    this.location.back();
  }

  ngOnDestroy(): void {
    this.currentUserSubscription.unsubscribe();
  }
}
