import {Injectable} from '@angular/core';
import {SocialUser} from "angularx-social-login";
import {UserModel} from "../shared/user.model";

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
        this.user = new UserModel(socialUser.name,
            socialUser.firstName,
            socialUser.lastName,
            socialUser.email,
            socialUser.photoUrl, []);
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
