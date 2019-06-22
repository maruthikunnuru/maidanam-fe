import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {MatchResultModel} from '../z-models/match-result.model';
import {Subscription} from 'rxjs';
import {LoginService} from '../z-services/login.service';
import {UserModel} from '../z-models/user.model';
import {Router} from '@angular/router';
import {AdminService} from '../z-services/admin.service';
import {Location} from '@angular/common';
import {LoanProcessModel} from '../z-models/loan-process.model';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit, OnDestroy {

  submitMsSubscription: Subscription;
  submitLpSubscription: Subscription;
  currentUserSubscription: Subscription;
  loggedIn: boolean;
  user: UserModel;
  isFailure = false;
  isSuccess = false;
  isFailure1 = false;
  isSuccess1 = false;

  matchResult: MatchResultModel;
  loanProcess: LoanProcessModel;

  constructor(private router: Router,
              private loginService: LoginService,
              private adminService: AdminService,
              private location: Location) { }

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
  }

  onSubmitResult(matchResultForm: NgForm) {

    this.matchResult = matchResultForm.value;
    this.matchResult.toMatchStatus = 'RESULT';

    // console.log(this.matchResult);

    this.submitMsSubscription = this.adminService.submitMatchResult(this.matchResult)
        .subscribe((response) => {
              // console.log(response);
              if (response.statusCode === 'N') {
                this.isFailure = true;
                this.isSuccess = false;
              } else {
                this.isFailure = false;
                this.isSuccess = true;
              }
            },
            (error) => console.log(error)
        );
  }

  onSubmitLoan(loanProcessForm: NgForm) {

     this.loanProcess = loanProcessForm.value;

     // console.log(this.loanProcess);

      this.submitLpSubscription = this.adminService.processLoan(this.loanProcess)
          .subscribe((response) => {
                console.log(response);
                if (response.statusCode === 'N') {
                    this.isFailure1 = true;
                    this.isSuccess1 = false;
                } else {
                    this.isFailure1 = false;
                    this.isSuccess1 = true;
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
