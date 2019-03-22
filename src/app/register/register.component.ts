import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormGroup, Validators, FormBuilder} from '@angular/forms';
import {Router} from '@angular/router';
import {LoginService} from '../z-services/login.service';
import {UserModel} from '../z-models/user.model';
import {Subscription} from 'rxjs';
import {MatStepper} from '@angular/material';
import {AlertService} from '../z-services/alert.service';
import { trigger, transition, style, animate, keyframes } from '@angular/animations';
import {SocialUser} from 'angularx-social-login';
import {GroupModel} from '../z-models/group.model';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
    // animations: [
    //     trigger ('registerIn', [
    //
    //         transition(':enter', [
    //             style(
    //                 {transform: 'translateX(-100%)'}
    //             ) ,
    //             animate('3.2s', keyframes([
    //                     style({transform: 'translateX(-100%)', offset: 0}),
    //                     style({transform: 'translateX(-100%)', offset: 0.95}),
    //                     style({transform: 'translateX(0%)', offset: 1})
    //                 ])
    //             )
    //
    //         ])
    //     ]),
    //     trigger ('progressOut', [
    //
    //         transition(':leave', [
    //             animate('3s', keyframes([
    //                 style({transform: 'translateX(0%)', offset: 0}),
    //                 style({transform: 'translateX(0%)', offset: 0.9}),
    //                 style({transform: 'translateX(100%)', offset: 1})
    //
    //             ]))
    //             /*
    //               animate(2000,
    //                 style({transform: 'translateX(100%)'})
    //               )
    //             */
    //         ])
    //
    //     ])
    // ]
})
export class RegisterComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('stepper') stepper: MatStepper;

  isLinear = true;
  user: UserModel;
  socialUser: SocialUser;
  refSubscription: Subscription;
  dpSubscription: Subscription;
  currentSocialUserSubscription: Subscription;
  validRef: boolean;
  loggedIn: boolean;
  refGroup: GroupModel;

  incomingView = true;
  registerView = false;

  refFormGroup: FormGroup;
  dpFormGroup: FormGroup;

  constructor(private router: Router,
              private loginService: LoginService,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
        this.currentSocialUserSubscription = this.loginService.currentSocialUser
            .subscribe(
                (res) => {
                  this.socialUser = res;
                  this.loggedIn = (this.socialUser != null);

                  if (!this.loggedIn) {
                    this.router.navigate(['/home']);
                  }
                },
                (error) => console.log(error)
            );

        this.refFormGroup = this.formBuilder.group({
          refCodeCtrl: ['', Validators.required]
        });

        this.dpFormGroup = this.formBuilder.group({
          displayName: ['', [Validators.required, Validators.minLength(2)]]
        });
   }

    ngAfterViewInit() {
        this.incomingView = false;
        this.registerView = true;
    }

    onRegister() {
        const displayNm = this.dpFormGroup.value.displayName;
        const refCd = this.refFormGroup.value.refCodeCtrl;

        this.user = new UserModel(null, this.socialUser.email, this.socialUser.firstName,
            this.socialUser.lastName, displayNm, this.socialUser.email, this.refGroup.groupId,
            this.refGroup, refCd, null, null, null, null);

        console.log(this.user);
        if (displayNm) {
          this.dpSubscription = this.loginService.registerUser(this.user)
              .subscribe((response) => {
                    console.log(response);
                    if (response.statusCode === 'N') {
                      alert('Registration Failed');
                    } else {
                      alert('Registration Successful');
                      this.user = response.result as UserModel;
                      this.loginService.setUser(this.user);
                      this.router.navigate(['/matches']);
                    }
                  },
                  (error) => console.log(error)
              );
        }
}

  checkRefCode() {
    console.log(this.refFormGroup.value.refCodeCtrl);
    const refCd = this.refFormGroup.value.refCodeCtrl;
    if (refCd) {
      this.refSubscription = this.loginService.validateReferralCode('', refCd)
          .subscribe((response) => {
                console.log(response);

                if (response.statusCode === 'N') {
                    this.validRef = true;
                    // this.refFormGroup.value.refCodeCtrl.setErrors({'refvalid': true}); 
                    this.stepper.selectedIndex = 1;  
                } else {
                    this.stepper.selectedIndex = 2;
                    this.validRef = false;
                    this.refGroup = <GroupModel>response.result;
                    console.log(this.refGroup);
                }
              },
              (error) => console.log(error)
          );
    }
  }

  ngOnDestroy(): void {
     this.refSubscription.unsubscribe();
     this.dpSubscription.unsubscribe();
     this.currentSocialUserSubscription.unsubscribe();
     this.loginService.logout();
  }
}

