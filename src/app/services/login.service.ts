import {AuthService, GoogleLoginProvider, SocialUser} from 'angularx-social-login';
import {Injectable} from '@angular/core';

@Injectable()
export class LoginService {

    user: SocialUser;
    loggedIn: boolean;

    constructor(private authService: AuthService) {}

    signInWithGoogle(): void {
        this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
    }

    signOut(): void {
        this.authService.signOut();
    }

}
