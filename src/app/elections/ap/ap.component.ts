import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {UserModel} from '../../z-models/user.model';
import {ActivatedRoute, Router} from '@angular/router';
import {LoginService} from '../../z-services/login.service';
import {AdminService} from '../../z-services/admin.service';
import {Location} from '@angular/common';
import {NgForm} from '@angular/forms';
import {ElectionPredictionModel} from '../../z-models/election-prediction.model';
import {SeatListModel} from '../../z-models/seat-list.model';
import {SeatModel} from '../../z-models/seat.model';
import {Ng4LoadingSpinnerService} from 'ng4-loading-spinner';
import {ElectionsService} from '../../z-services/elections.service';
import {GroupModel} from '../../z-models/group.model';
import {MatDialog} from '@angular/material';
import {ConfirmationDialogComponent} from "../../components/shared/confirmation-dialog/confirmation-dialog.component";

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
              private route: ActivatedRoute,
              private electionsService: ElectionsService,
              public dialog: MatDialog,
              private spinnerService: Ng4LoadingSpinnerService) { }

  currentUserSubscription: Subscription;
  currentUserGroupsSubscription: Subscription;
  userGroupSubscription: Subscription;
  submitApElectionPredictionSubscription: Subscription;
  getApElectionPredictionSubscription: Subscription;
  getTimeSubscription: Subscription;
  loggedIn: boolean;
  user: UserModel;
  groups: GroupModel[];
  usersList: UserModel[];
  selectedUserGroup: UserModel;
  username: string;
  isFailure = false;
  isSuccess = false;
  isSeatCountFail = false;
  seatCountFailProvince: string;
  totalSeatsTdp = 0;
  totalSeatsYcp = 0;
  totalSeatsOth = 0;
  disableSim = false;
  disableSimButtons = false;
  pointsToLose: number;
  noSubmitMsgFlag: boolean;

    constituencies = [
      'Anantapur', 'Chittoor', 'East Godavari', 'Guntur', 'Kadapa',
      'Krishna', 'Kurnool', 'Nellore', 'Prakasam', 'Srikakulam',
      'Visakhapatnam', 'Vizianagaram', 'West Godavari'
  ];

    counts = [14, 14, 19, 17, 10, 16, 14, 10, 12, 10, 15, 9, 15];


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
      this.noSubmitMsgFlag = false;
    this.currentUserSubscription = this.loginService.currentUser
        .subscribe(
            (res) => {
              this.user = res;
                this.loggedIn = (this.user != null);
                this.username = this.user.userName;
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
                  // this.loggedIn = (this.user != null);
              },
              (error) => console.log(error)
          );

      this.spinnerService.show();
      this.getApElectionPredictionSubscription = this.electionsService.getElectionPredictions('AP', this.user.userId)
          .subscribe((resp) => {
                  this.spinnerService.hide();
                  if (resp.statusCode === 'N') {
                      alert('No Predictions Available');
                  } else {
                      this.currentApElectionPredictions = resp.result as ElectionPredictionModel[];
                       // console.log(this.currentApElectionPredictions);

                      if (this.currentApElectionPredictions.length  === 0 ) {

                          const electionPredictionArr: ElectionPredictionModel[] = [];

                          this.constituencies.forEach( (province) => {
                              const seatModel: SeatModel[] = [];

                              seatModel.push(new SeatModel('TDP', 0));
                              seatModel.push(new SeatModel('YCP', 0));
                              seatModel.push(new SeatModel('OTHERS', 0));

                              const seatPredictionObject: SeatListModel = new SeatListModel(seatModel);

                              const tmpElectionPrediction: ElectionPredictionModel =
                                  new ElectionPredictionModel(null, this.user.userId, this.user, 'AP',
                                      province, seatPredictionObject);

                              electionPredictionArr.push(tmpElectionPrediction);

                              this.currentApElectionPredictions = electionPredictionArr;
                          });
                      } else {
                          this.disableSimButtons = true;

                          this.currentApElectionPredictions.forEach( pred => {
                              this.totalSeatsTdp = this.totalSeatsTdp +
                                  (pred.seatPredictionObject.predictions
                                    .filter(pre => pre.partyName === 'TDP') ? pred.seatPredictionObject.predictions
                                      .filter(pre => pre.partyName === 'TDP')[0].numberOfSeats : 0 );
                              this.totalSeatsYcp = this.totalSeatsYcp +
                                  (pred.seatPredictionObject.predictions
                                  .filter(pre => pre.partyName === 'YCP') !== null ? pred.seatPredictionObject.predictions
                                      .filter(pre => pre.partyName === 'YCP')[0].numberOfSeats : 0 );
                              this.totalSeatsOth = this.totalSeatsOth +
                                  (pred.seatPredictionObject.predictions
                                  .filter(pre => pre.partyName === 'OTHERS') !== null ? pred.seatPredictionObject.predictions
                                      .filter(pre => pre.partyName === 'OTHERS')[0].numberOfSeats : 0 );

                          });
                      }
                  }
              },
              (error) => console.log(error)
          );
  }

    openDialog(apPredForm: NgForm): void {
        const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
            width: '350px',
            data: 'You will loose ' + this.pointsToLose + ' points if u submit now. Are you sure ?'
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                console.log('Yes clicked');
                this.submitPredictions(apPredForm);
            }
        });
    }
  onSubmitResult(apPredForm: NgForm) {
      this.isSuccess = false;
      this.isFailure = false;
      this.isSeatCountFail = false;
      let totalSeatsByProvince = 0;
      this.totalSeatsTdp = 0;
      this.totalSeatsYcp = 0;
      this.totalSeatsOth = 0;

      this.constituencies.forEach( (province, i) => {
          totalSeatsByProvince = totalSeatsByProvince + apPredForm.value[province + '-TDP'] +
              apPredForm.value[province + '-YCP'] +
              apPredForm.value[province + '-OTHERS'];

          this.totalSeatsTdp = this.totalSeatsTdp + apPredForm.value[province + '-TDP'];
          this.totalSeatsYcp = this.totalSeatsYcp + apPredForm.value[province + '-YCP'];
          this.totalSeatsOth = this.totalSeatsOth + apPredForm.value[province + '-OTHERS'];

          // if (totalSeatsByProvince > this.counts[i]) {
          if (totalSeatsByProvince > 175) {
              this.isSeatCountFail = true;
              // this.seatCountFailProvince = province;
              return;
          }
      });

      if (this.isSeatCountFail) {
          return;
      } else {
          this.getTimeSubscription = this.electionsService.getTime()
              .subscribe((response) => {
                      console.log(response);
                      if (response.statusCode === 'Y') {
                        this.pointsToLose =  response.result;
                        if (this.pointsToLose < 0) {
                            this.submitPredictions(apPredForm);
                        } else if (this.pointsToLose > 0 && this.pointsToLose <= 60) {
                            this.openDialog(apPredForm);
                        } else {
                            if (this.user.userId === 83) {
                                this.submitPredictions(apPredForm);
                            } else {
                                this.noSubmitMsgFlag = true;
                            }
                        }
                      }
                  },
                  (error) => console.log(error)
              );
      }

  }

  submitPredictions(apPredForm1: NgForm) {
      this.submitApElectionPredictions = this.convertToElectionPrediction(apPredForm1.value);

      // console.log(this.submitApElectionPredictions);

      this.spinnerService.show();
      this.submitApElectionPredictionSubscription = this.electionsService.submitElectionPredictions(this.user.userId,
          'AP', this.submitApElectionPredictions)
          .subscribe((resps) => {
                  this.spinnerService.hide();
                  // console.log(resps);
                  if (resps.statusCode === 'Y') {
                      this.isSuccess = true;
                      this.isFailure = false;
                      this.isSeatCountFail = false;
                  } else {
                      this.isSuccess = false;
                      this.isFailure = true;
                      this.isSeatCountFail = false;
                  }
              },
              (error) => console.log(error)
          );
  }

    onSelectGroup(groupid: number) {
        // console.log(groupid);

        this.userGroupSubscription = this.loginService.getUsersByGroupId(this.user.userName, groupid)
            .subscribe((resp) => {
                    // console.log(resp);
                    if (resp.statusCode === 'N') {
                        alert('No User Data Available');
                    } else {
                        this.usersList = resp.result as UserModel[];
                        // console.log(this.usersList);
                        this.selectedUserGroup = this.usersList.filter( usr => usr.userName === this.username)[0];
                        // console.log(this.selectedUserGroup);

                        this.loginService.setUser(this.selectedUserGroup);

                    }
                },
                (error) => console.log(error)
            );
        this.router.navigateByUrl('/home', {skipLocationChange: true}).then(() =>
            this.router.navigate(['tournaments/']));
    }
  goBack() {
    this.location.back();
  }

    onSelectPoll(event) {
        if (event.target.value !== '') {
            this.disableSim = true;
        } else {
            this.disableSim = false;
        }
    }
  onSimulate(simForm: NgForm) {
       this.router.navigate(['elections/scores'],
           {queryParams: {poll: simForm.value.exitpoll, electionType: 'AP'}});
  }

    onClear(){
       this.totalSeatsTdp = 0;
       this.totalSeatsOth = 0;
       this.totalSeatsYcp = 0;
    }
  ngOnDestroy(): void {
    this.currentUserSubscription.unsubscribe();
      this.currentUserGroupsSubscription.unsubscribe();
   }
}
