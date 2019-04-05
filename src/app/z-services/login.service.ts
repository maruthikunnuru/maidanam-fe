import {Injectable} from '@angular/core';
import {SocialUser} from 'angularx-social-login';
import {UserModel} from '../z-models/user.model';
import {Headers, Http, Response} from '@angular/http';
import {ResponseModel} from '../z-models/response.model';
import {BehaviorSubject, Observable} from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {AppConstants} from '../app-constants';
import {GroupModel} from '../z-models/group.model';

@Injectable()
export class LoginService {

    private currentUserSubject: BehaviorSubject<UserModel>;
    public currentUser: Observable<UserModel>;

    private currentSocialUserSubject: BehaviorSubject<SocialUser>;
    public currentSocialUser: Observable<SocialUser>;

    private currentUserGroupsSubject: BehaviorSubject<GroupModel[]>;
    public currentUserGroups: Observable<GroupModel[]>;

    constructor(private http: Http) {

        // const userObj: UserModel = JSON.parse(localStorage.getItem('currentUser'));
        // this.setUser(userObj);

        this.currentUserSubject = new BehaviorSubject<UserModel>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();

        this.currentSocialUserSubject = new BehaviorSubject<SocialUser>(JSON.parse(localStorage.getItem('currentSocialUser')));
        this.currentSocialUser = this.currentSocialUserSubject.asObservable();

        this.currentUserGroupsSubject = new BehaviorSubject<GroupModel[]>(JSON.parse(localStorage.getItem('currentUserGroups')));
        this.currentUserGroups = this.currentUserGroupsSubject.asObservable();
    }

    setUser(user: UserModel) {
        // if (user !== null) {
        //     this.getUsersByUserId(user)
        //         .subscribe((response) => {
        //                 const userResponse = response.result as UserModel;
        //                 if (response.statusCode === 'Y') {
        //                     const currentUser = JSON.stringify(userResponse);
        //                     localStorage.setItem('currentUser', currentUser);
        //                     this.currentUserSubject.next(userResponse);
        //                 } else {
        //                     const currentUser = JSON.stringify(user);
        //                     localStorage.setItem('currentUser', currentUser);
        //                     this.currentUserSubject.next(user);
        //                 }
        //             },
        //             (error) => console.log(error)
        //         );
        // }
        const currentUser = JSON.stringify(user);
        localStorage.setItem('currentUser', currentUser);
        this.currentUserSubject.next(user);
    }

    setSocialUser(socialUser: SocialUser) {
        const currentSocialUser = JSON.stringify(socialUser);
        localStorage.setItem('currentSocialUser', currentSocialUser);
        this.currentSocialUserSubject.next(socialUser);
    }

    setGroups(groups: GroupModel[]) {
        const currentUserGroups = JSON.stringify(groups);
        localStorage.setItem('currentUserGroups', currentUserGroups);
        this.currentUserGroupsSubject.next(groups);
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);

        // remove user groups from local storage to log user out
        localStorage.removeItem('currentUserGroups');
        this.currentUserGroupsSubject.next(null);

        // remove social user from local storage to log user out
        localStorage.removeItem('currentSocialUser');
        this.currentSocialUserSubject.next(null);
    }

    getGroupList(username: string): Observable<ResponseModel> {
        const headers = new Headers({'X-USER-NAME': username});
        return this.http.get(AppConstants.API_ENDPOINT + '/groups/', {headers: headers})
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

    getUsersByUserId(user: UserModel): Observable<ResponseModel> {
        const headers = new Headers({'X-USER-NAME': user.userName});
        return this.http.get(AppConstants.API_ENDPOINT + '/groups/' + user.groupId + '/users/' + user.userId + '/', {headers: headers})
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
        return this.http.post(AppConstants.API_ENDPOINT + '/groups/user/', user, {headers: headers})
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
        const headers = new Headers();
        headers.append('X-USER-NAME', user.userName);
        headers.append('X-USER-ID', String(user.userId));

        return this.http.post(AppConstants.API_ENDPOINT + '/groups/user/' + user.referenceCd + '/', null, {headers: headers})
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

    createGroup(username: string, userId: number, group: GroupModel): Observable<ResponseModel> {
        const headers = new Headers();
        headers.append('X-USER-NAME', username);
        headers.append('X-USER-ID', String(userId));
        return this.http.post(AppConstants.API_ENDPOINT + '/groups/', group, {headers: headers})
            .map(
                (response: Response) => {
                    return <ResponseModel>response.json();
                }
            )
            .catch(
                (error: Response) => {
                    return Observable.throw('Something went wrong with createGroup');
                }
            );
    }

}
