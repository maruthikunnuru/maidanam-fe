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
import {GroupModel} from '../../z-models/group.model';

@Component({
  selector: 'app-india',
  templateUrl: './india.component.html',
  styleUrls: ['./india.component.css']
})
export class IndiaComponent implements OnInit, OnDestroy {

  constructor(private router: Router,
              private loginService: LoginService,
              private adminService: AdminService,
              private location: Location,
              private electionsService: ElectionsService,
              private spinnerService: Ng4LoadingSpinnerService) { }

  currentUserSubscription: Subscription;
  currentUserGroupsSubscription: Subscription;
  userGroupSubscription: Subscription;
  submitIndiaElectionPredictionSubscription: Subscription;
  getIndiaElectionPredictionSubscription: Subscription;
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
  constituencies = [
    'Uttar Pradesh',
    'Maharashtra',
    'Telangana',
    'West Bengal',
    'Bihar',
    'Tamil Nadu',
    'Madhya Pradesh',
    'Karnataka',
    'Gujarat',
    'Rajasthan',
    'Odisha',
    'Kerala',
    'Assam',
    'Jharkhand',
    'Punjab',
    'Chhattisgarh',
    'Haryana',
    'NCT OF Delhi',
    'Jammu & Kashmir',
    'Uttarakhand',
    'Himachal Pradesh',
    'Arunachal Pradesh',
    'Goa',
    'Manipur',
    'Meghalaya',
    'Tripura',
    'Mizoram',
    'Nagaland',
    'Sikkim',
    'Andaman & Nicobar Islands',
    'Chandigarh',
    'Dadra & Nagar Haveli',
    'Daman & Diu',
    'Lakshadweep',
    'Puducherry',
    'Andhra Pradesh'
  ];

  counts = [80, 48, 17, 42, 40, 39, 29, 28, 26, 25, 21, 20, 14,
    14, 13, 11, 10, 7, 6, 5, 4, 2, 2, 2, 2, 2,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 25];


  submitIndiaElectionPredictions: ElectionPredictionModel[];
  currentIndiaElectionPredictions: ElectionPredictionModel[];

  convertToElectionPrediction(apPredForm): ElectionPredictionModel[] {
    const electionPredictionArr: ElectionPredictionModel[] = [];

    this.constituencies.forEach( (province) => {
      const seatModel: SeatModel[] = [];

      seatModel.push(new SeatModel('NDA', apPredForm[province + '-NDA'] === '' ? 0 : apPredForm[province + '-NDA']));
      seatModel.push(new SeatModel('UPA', apPredForm[province + '-UPA'] === '' ? 0 : apPredForm[province + '-UPA']));
      seatModel.push(new SeatModel('OTHERS', apPredForm[province + '-OTHERS'] === '' ? 0 : apPredForm[province + '-OTHERS']));

      const seatPredictionObject: SeatListModel = new SeatListModel(seatModel);

      const tmpElectionPrediction: ElectionPredictionModel =
          new ElectionPredictionModel(null, this.user.userId, this.user, 'GENERAL',
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
    this.getIndiaElectionPredictionSubscription = this.electionsService.getElectionPredictions('GENERAL', this.user.userId)
        .subscribe((resp) => {
              this.spinnerService.hide();
              if (resp.statusCode === 'N') {
                alert('No India Predictions Available');
              } else {
                this.currentIndiaElectionPredictions = resp.result as ElectionPredictionModel[];
                console.log(this.currentIndiaElectionPredictions.length);

                if (this.currentIndiaElectionPredictions.length  !== 36 ) {

                  const electionPredictionArr: ElectionPredictionModel[] = [];

                  this.constituencies.forEach( (province) => {
                    const seatModel: SeatModel[] = [];

                    seatModel.push(new SeatModel('NDA', 0));
                    seatModel.push(new SeatModel('UPA', 0));
                    seatModel.push(new SeatModel('OTHERS', 0));

                    const seatPredictionObject: SeatListModel = new SeatListModel(seatModel);

                    const tmpElectionPrediction: ElectionPredictionModel =
                        new ElectionPredictionModel(null, this.user.userId, this.user, 'GENERAL',
                            province, seatPredictionObject);

                    electionPredictionArr.push(tmpElectionPrediction);

                    this.currentIndiaElectionPredictions = electionPredictionArr;
                  });
                }
              }
            },
            (error) => console.log(error)
        );
  }

  onSubmitResult(indiaPredForm: NgForm) {
    this.isSuccess = false;
    this.isFailure = false;
    this.isSeatCountFail = false;

    this.constituencies.forEach( (province, i) => {
      const totalSeatsByProvince = indiaPredForm.value[province + '-NDA'] +
          indiaPredForm.value[province + '-UPA'] +
          indiaPredForm.value[province + '-OTHERS'];

      if (totalSeatsByProvince > this.counts[i]) {
        this.isSeatCountFail = true;
        this.seatCountFailProvince = province;
        return;
      }
    });

    if (this.isSeatCountFail) {
      return;
    } else {
      this.submitIndiaElectionPredictions = this.convertToElectionPrediction(indiaPredForm.value);

      this.spinnerService.show();
      this.submitIndiaElectionPredictionSubscription = this.electionsService.submitElectionPredictions(this.user.userId,
          'GENERAL', this.submitIndiaElectionPredictions)
          .subscribe((resps) => {
                this.spinnerService.hide();
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

  }

  onSelectGroup(groupid: number) {
    console.log(groupid);

    this.userGroupSubscription = this.loginService.getUsersByGroupId(this.user.userName, groupid)
        .subscribe((resp) => {
              console.log(resp);
              if (resp.statusCode === 'N') {
                alert('No User Data Available');
              } else {
                this.usersList = resp.result as UserModel[];
                console.log(this.usersList);
                this.selectedUserGroup = this.usersList.filter( usr => usr.userName === this.username)[0];
                console.log(this.selectedUserGroup);

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

  ngOnDestroy(): void {
    this.currentUserSubscription.unsubscribe();
    this.currentUserGroupsSubscription.unsubscribe();
  }
}
