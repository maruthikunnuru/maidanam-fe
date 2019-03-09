import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService, GoogleLoginProvider, SocialUser} from 'angularx-social-login';
import {Router} from '@angular/router';
import {LoginService} from '../z-services/login.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  private socialUser: SocialUser;
  private loggedIn: boolean;
  subscription: Subscription;

  constructor(private router: Router,
              private authService: AuthService,
              private loginService: LoginService) { }

  ngOnInit() {
    this.subscription = this.authService.authState.subscribe((googleUser) => {
      this.socialUser = googleUser;
      this.loggedIn = (googleUser != null);

      console.log(this.socialUser);
      if (this.loggedIn) {
        this.loginService.setUserProfile(this.socialUser);

        if (this.loginService.isRegisteredUser(this.socialUser.email)) {
          alert('Welcome back ' + this.socialUser.name);
          this.router.navigate(['/predictions']);
        } else {
          alert('Hey ' + this.socialUser.name + '. You are not a registered User !!');
          this.router.navigate(['/register']);
        }
      } else {
        this.router.navigate(['/home']);
      }
    });
  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  signOut(): void {
    if (this.loggedIn) {
      confirm('Do you want to signout Mr.' + this.loginService.getUserProfile().firstName);
      this.authService.signOut();
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
