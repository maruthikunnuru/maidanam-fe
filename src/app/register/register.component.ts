import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormGroup, Validators, FormBuilder} from '@angular/forms';
import {Router} from '@angular/router';
import {LoginService} from '../z-services/login.service';
import {UserModel} from '../z-models/user.model';
import {Subscription} from 'rxjs';
import {MatStepper} from '@angular/material';
import {AlertService} from "../z-services/alert.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {

  @ViewChild('stepper') stepper: MatStepper;

  isLinear = true;
  user: UserModel;
  refSubscription: Subscription;
  dpSubscription: Subscription;
  currentUserSubscription: Subscription;
  refCode: string;
  validRef: boolean;
  loggedIn: boolean;

  refFormGroup: FormGroup;
  dpFormGroup: FormGroup;

  constructor(private router: Router,
              private loginService: LoginService,
              private formBuilder: FormBuilder,
              private alertService: AlertService) { }

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

    this.refFormGroup = this.formBuilder.group({
      refCode: ['', Validators.required]
    });

    this.dpFormGroup = this.formBuilder.group({
      displayName: ['', Validators.required]
    });
  }

  onRegister() {
    const displayNm = this.dpFormGroup.value.displayName;
    const refCd = this.refFormGroup.value.refCode;

    this.user.referralCode = refCd;
    this.user.displayName = displayNm;
    this.user.userRole = 'USER';
    console.log(this.user);
    if (displayNm) {
      this.dpSubscription = this.loginService.registerUser(this.user)
          .subscribe((response) => {
                console.log(response);

                if (response.statusCode === 'N') {
                  alert('Registration Failed');
                } else {
                  alert('Registration Successful');
                  this.router.navigate(['/groups']);
                }
              },
              (error) => console.log(error)
          );
    }

}

  checkRefCode() {
    console.log(this.refFormGroup.value.refCode);
    const refCd = this.refFormGroup.value.refCode;
    if (refCd) {
      this.refSubscription = this.loginService.validateReferralCode('', refCd)
          .subscribe((response) => {
                console.log(response);

                if (response.statusCode === 'N') {
                  alert('Invalid Referral Code');
                  // this.alertService.error('Invalid Referral Code');
                  this.validRef = false;
                } else {
                  this.validRef = true;
                }
              },
              (error) => console.log(error)
          );
    }
  }

  ngOnDestroy(): void {
     // this.refSubscription.unsubscribe();
     // this.dpSubscription.unsubscribe();
    this.currentUserSubscription.unsubscribe();
    this.loginService.logout();
  }
}

