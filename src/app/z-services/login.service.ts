import {Injectable} from '@angular/core';
import {SocialUser} from 'angularx-social-login';
import {UserModel} from '../z-models/user.model';
import {Headers, Http, Response} from '@angular/http';
import {ResponseModel} from '../z-models/response.model';
import {BehaviorSubject, Observable} from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {UserGroupModel} from '../z-models/usergroup.model';
import {AppConstants} from '../app-constants';
import {GroupModel} from "../z-models/group.model";

@Injectable()
export class LoginService {

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
        return this.http.get(AppConstants.API_ENDPOINT + '/groups/',{headers: headers})
            .map(
                (response: Response) => {
                    return <ResponseModel>response.json();
                }
            )
            .catch(
                (error: Response) => {
                    return Observable.throw('Something went wrong with getGroupList');
                }
            );
    }

    validateReferralCode(username: string, refCode: string): Observable<ResponseModel> {
        const headers = new Headers({'X-USER-NAME': username});
        return this.http.get(AppConstants.API_ENDPOINT + '/groups/ref/' + refCode + '/', {headers: headers})
            .map(
                (response: Response) => {
                    return <ResponseModel>response.json();
                }
            )
            .catch(
                (error: Response) => {
                    return Observable.throw('Something went wrong with validateReferralCode');
                }
            );
    }

    getUsersByGroupId(username: string, groupId: number): Observable<ResponseModel> {
        const headers = new Headers({'X-USER-NAME': username});
        return this.http.get(AppConstants.API_ENDPOINT + '/groups/' + groupId + '/users/', {headers: headers})
            .map(
                (response: Response) => {
                    return <ResponseModel>response.json();
                }
            )
            .catch(
                (error: Response) => {
                    return Observable.throw('Something went wrong with getUsersByGroupId');
                }
            );
    }

    registerUser(user: UserModel): Observable<ResponseModel> {
        const headers = new Headers({'X-USER-NAME': user.userName});
        const userGroup: UserGroupModel = new UserGroupModel(null, user.userName, user.firstName, user.lastName, user.displayName,
            user.emailId, -1, null, user.referralCode, null, null, null, user.userRole);
        console.log(userGroup);
        return this.http.post(AppConstants.API_ENDPOINT + '/groups/user/', userGroup, {headers: headers})
            .map(
                (response: Response) => {
                    return <ResponseModel>response.json();
                }
            )
            .catch(
                (error: Response) => {
                    return Observable.throw('Something went wrong with registerUser');
                }
            );
    }

    joinGroup(user: UserModel): Observable<ResponseModel> {
        const headers = new Headers({'X-USER-NAME': user.userName});
        return this.http.post(AppConstants.API_ENDPOINT + '/groups/user/' + user.referralCode + '/', null, {headers: headers})
            .map(
                (response: Response) => {
                    return <ResponseModel>response.json();
                }
            )
            .catch(
                (error: Response) => {
                    return Observable.throw('Something went wrong with joinGroup');
                }
            );
    }

    createGroup(username: string, group: GroupModel): Observable<ResponseModel> {
        const headers = new Headers({'X-USER-NAME': username});
        return this.http.post(AppConstants.API_ENDPOINT + '/groups/', group, {headers: headers})
            .map(
                (response: Response) => {
                    return <ResponseModel>response.json();
                }
            )
            .catch(
                (error: Response) => {
                    return Observable.throw('Something went wrong with joinGroup');
                }
            );
    }

}
