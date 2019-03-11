import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService, GoogleLoginProvider, SocialUser} from 'angularx-social-login';
import {Router} from '@angular/router';
import {LoginService} from '../z-services/login.service';
import {Observable, Subscription} from 'rxjs';
import {ResponseModel} from "../z-models/response.model";
import {AlertService} from "../z-services/alert.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  private socialUser: SocialUser;
  private loggedIn: boolean;
  userSubscription: Subscription;
  groupSubscription: Subscription;

  constructor(private router: Router,
              private authService: AuthService,
              private loginService: LoginService,
              private alertService: AlertService) { }

  ngOnInit() {
    if (!this.loggedIn) {
      this.userSubscription = this.authService.authState.subscribe((googleUser) => {
        this.socialUser = googleUser;
        this.loggedIn = (googleUser != null);

        console.log(this.socialUser);

        console.log('loggedIn--->' + this.loggedIn);

        if (this.loggedIn) {
          this.loginService.setUser(this.socialUser);

          this.groupSubscription = this.loginService.getGroupList(this.socialUser.email)
              .subscribe((response) => {
                    console.log(response);

                    if (response.statusCode === 'Y') {
                       // alert('Welcome back ' + this.socialUser.name);
                      // this.alertService.success('Registration successful', true);
                      // this.router.navigate(['/home']);
                    } else {
                       alert('Hey ' + this.socialUser.name + '. You are not a registered User !!');
                      // this.alertService.success('Hey ' + this.socialUser.name + '. You are not a registered User !!', true);
                      this.router.navigate(['/register']);
                    }
                  },
                  (error) => console.log(error)
              );
        }
      });
    }
  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  signOut(): void {
    if (this.loggedIn) {
      // confirm('Do you want to signout Mr.' + this.loginService.getUserProfile().firstName);
      this.authService.signOut();
      this.loginService.logout();
      this.router.navigate(['/home']);
    }
  }


  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
    this.groupSubscription.unsubscribe();
  }

}
