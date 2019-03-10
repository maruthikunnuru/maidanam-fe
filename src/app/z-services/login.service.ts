import {Injectable} from '@angular/core';
import {SocialUser} from 'angularx-social-login';
import {UserModel} from '../z-models/user.model';
import {Headers, Http, Response} from '@angular/http';
import {ResponseModel} from '../z-models/response.model';
import {BehaviorSubject, Observable} from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {UserGroupModel} from "../z-models/usergroup.model";

@Injectable()
export class LoginService {

    baseUrl = 'http://13.58.124.107:8081';

    user: UserModel;

    private currentUserSubject: BehaviorSubject<UserModel>;
    public currentUser: Observable<UserModel>;

    constructor(private http: Http) {
        this.currentUserSubject = new BehaviorSubject<UserModel>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    setUser(socialUser: SocialUser) {

        this.user = new UserModel(
            socialUser.email, socialUser.firstName,
            socialUser.lastName, socialUser.email,
            null, null, null);

        localStorage.setItem('currentUser', JSON.stringify(this.user));
        this.currentUserSubject.next(this.user);
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }

    getGroupList(username: string): Observable<ResponseModel> {
        const headers = new Headers({'X-USER-NAME': username});
        return this.http.get(this.baseUrl + '/groups/',{headers: headers})
            .map(
                (response: Response) => {
                    return <ResponseModel>response.json();
                }
            )
            .catch(
                (error: Response) => {
                    return Observable.throw('Something went wrong');
                }
            );
    }

    validateReferralCode(username: string, refCode: string): Observable<ResponseModel> {
        const headers = new Headers({'X-USER-NAME': username});
        return this.http.get(this.baseUrl + '/groups/ref/' + refCode + '/', {headers: headers})
            .map(
                (response: Response) => {
                    return <ResponseModel>response.json();
                }
            )
            .catch(
                (error: Response) => {
                    return Observable.throw('Something went wrong');
                }
            );
    }

    getUsersByGroupId(username: string, groupId: number): Observable<ResponseModel> {
        const headers = new Headers({'X-USER-NAME': username});
        return this.http.get(this.baseUrl + '/groups/' + groupId + '/users/', {headers: headers})
            .map(
                (response: Response) => {
                    return <ResponseModel>response.json();
                }
            )
            .catch(
                (error: Response) => {
                    return Observable.throw('Something went wrong');
                }
            );
    }

    registerUser(user: UserModel): Observable<ResponseModel> {
        const headers = new Headers({'X-USER-NAME': user.userName});
        const userGroup: UserGroupModel = new UserGroupModel(null, user.userName, user.firstName, user.lastName, user.displayName,
            user.emailId, null, null, user.referralCode, null, null, null, user.userRole);

        return this.http.post(this.baseUrl + '/groups/user/', userGroup,{headers: headers})
            .map(
                (response: Response) => {
                    return <ResponseModel>response.json();
                }
            )
            .catch(
                (error: Response) => {
                    return Observable.throw('Something went wrong');
                }
            );
    }

}
