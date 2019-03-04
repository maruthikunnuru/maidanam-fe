import {Injectable} from '@angular/core';
import {SocialUser} from 'angularx-social-login';
import {UserModel} from '../z-models/user.model';

@Injectable()
export class LoginService {

    user: UserModel;
    private users: string[] = [
        'vinod.aripaka@gmail.com',
        'alurisankar@gmail.com'
    ];

    constructor() { }

    isRegisteredUser(username: string) {
        if (this.users.includes(username)) {
            return true;
        } else {
            return false;
        }
    }

    setUserProfile(socialUser: SocialUser) {
        this.user = new UserModel(null,
            socialUser.email,
            socialUser.firstName,
            socialUser.lastName,
            'USER');
    }

    getUserProfile() {
        return this.user;
    }

    registerUser(username: string) {
        this.users.push(username);
    }

    getRegisteredUsers() {
        return this.users.slice();
    }
}
