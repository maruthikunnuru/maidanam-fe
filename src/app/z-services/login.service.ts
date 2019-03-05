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
            return true; //groups data
        } else {
            return false; //null groups
        }
    }

    setUserProfile(socialUser: SocialUser) {

        // groups = api call(socialUser.email)

        this.user = new UserModel(socialUser.email,
            socialUser.firstName,
            socialUser.lastName,
            socialUser.email,
            'USER', []);


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
