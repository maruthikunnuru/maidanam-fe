import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {UserModel} from '../z-models/user.model';
import {GroupModel} from '../z-models/group.model';
import {ActivatedRoute, Router} from '@angular/router';
import {LoginService} from '../z-services/login.service';
import {MatchesService} from '../z-services/matches.service';
import {PredictionsService} from '../z-services/predictions.service';
import {Location} from '@angular/common';
import {Ng4LoadingSpinnerService} from 'ng4-loading-spinner';
import {NgForm} from '@angular/forms';
import {AdminService} from "../z-services/admin.service";
import {PredictionModel} from "../z-models/prediction.model";
import {LoanModel} from "../z-models/loan.model";

@Component({
  selector: 'app-loan',
  templateUrl: './loan.component.html',
  styleUrls: ['./loan.component.css']
})
export class LoanComponent implements OnInit, OnDestroy {

  currentUserSubscription: Subscription;
  currentUserGroupsSubscription: Subscription;
  loanRefSubscription: Subscription;
  user: UserModel;
  loggedIn: boolean;
  groups: GroupModel[];
  exchangeRate: number;
  selectGroup = false;
  submitFail = false;
  submitPass = false;
  loanResponse: LoanModel;
  refKey: string;
  errorMessage: string;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private loginService: LoginService,
              private adminService: AdminService,
              private location: Location,
              private spinnerService: Ng4LoadingSpinnerService) { }

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

    this.currentUserGroupsSubscription = this.loginService.currentUserGroups
        .subscribe(
            (res) => {
              this.groups = res;
            },
            (error) => console.log(error)
        );
  }

  goBack() {
    this.location.back();
  }

  onSelectGp(group: GroupModel) {
    this.submitFail = false;
    this.submitPass = false;
    if (group === null) {
      this.exchangeRate = null;
      this.selectGroup = false;
    } else {
      this.exchangeRate = group.averageScore;
      this.selectGroup = true;
    }
  }

  submitLoan(loanForm: NgForm) {
    const groupid = loanForm.value.gpName;

    this.spinnerService.show();
    this.loanRefSubscription = this.adminService.getLoanRef(this.exchangeRate, this.user.userName, groupid)
        .subscribe((resps) => {
              this.spinnerService.hide();
              if (resps.statusCode === 'N') {
                this.submitFail = true;
                this.submitPass = false;
                this.errorMessage = resps.validationErrors[0];
              } else {
                this.loanResponse = <LoanModel>resps.result;
                this.submitFail = false;
                this.submitPass = true;
                this.refKey = this.loanResponse.referenceCode;
              }
            },
            (error) => console.log(error)
        );
  }

  ngOnDestroy(): void {
    this.currentUserSubscription.unsubscribe();
    this.currentUserGroupsSubscription.unsubscribe();
    // this.loanRefSubscription.unsubscribe();
  }

}
