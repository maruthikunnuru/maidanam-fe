import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import {AuthService, GoogleLoginProvider, SocialUser} from 'angularx-social-login';
import {Router} from '@angular/router';
import {LoginService} from '../../z-services/login.service';
import {Subscription} from 'rxjs';
import {GroupModel} from '../../z-models/group.model';
import {UserModel} from '../../z-models/user.model';


@Component({
  selector: 'app-nav-header',
  templateUrl: './nav-header.component.html',
  styleUrls: ['./nav-header.component.css']
})
export class NavHeaderComponent implements OnInit, OnDestroy {
  @Output() public sideNavToggle = new EventEmitter();

  socialUser: SocialUser;
  user: UserModel;
  loggedIn: boolean;
  showButtons: boolean;
  groups: GroupModel[];
  userSubscription: Subscription;
  groupSubscription: Subscription;
  userGroupSubscription: Subscription;

  constructor(private router: Router,
              private authService: AuthService,
              private loginService: LoginService) { }

  ngOnInit() {
                if (!this.loggedIn) {
                  this.userSubscription = this.authService.authState.subscribe((googleUser) => {
                    this.socialUser = googleUser;
                    this.loggedIn = (googleUser != null);

                    // console.log(this.socialUser);

                    // console.log('loggedIn--->' + this.loggedIn);

                    if (this.loggedIn) {
                      this.groupSubscription = this.loginService.getGroupList(this.socialUser.email)
                          .subscribe((response) => {
                                // console.log(response);

                                if (response.statusCode === 'Y') {
                                  this.groups = response.result as GroupModel[];

                                  this.loginService.setGroups(this.groups);
                                  // console.log(this.groups.map( gp => gp.groupName));
                                  const firstGroupId = this.groups[0].groupId;
                                  // console.log('firstGroupId->' + firstGroupId);

                                  this.userGroupSubscription = this.loginService.getUsersByGroupId(this.socialUser.email, firstGroupId)
                                      .subscribe( (res) => {
                                            // console.log(res);

                                            if (res.statusCode === 'Y') {
                                              const userList = res.result as UserModel[];
                                              // console.log('UserList -->' + JSON.stringify(userList));

                                              this.user = userList.filter(usr => usr.emailId === this.socialUser.email)[0];
                                              // console.log('Final User -->' + JSON.stringify(this.user));
                                              this.loginService.setUser(this.user);
                                              this.showButtons = (this.user != null);
                                              this.router.navigate(['/tournaments']);
                                            } else {
                                               // console.log('Error in getUsersByGroup');
                                            }
                                          },
                                          (error) => console.log(error)
                                      );

                                } else {
                                  this.loginService.setSocialUser(this.socialUser);
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
    // console.log('emit received');
    this.router.navigate(['/home']);
    if (this.loggedIn) {
      this.authService.signOut();
      this.loginService.logout();
      window.location.reload();
    }
  }



  onClickHome() {
    if (this.loggedIn) {
      this.router.navigate(['/tournaments']);
    } else {
      this.router.navigate(['/home']);
    }
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
    this.groupSubscription.unsubscribe();
  }

  public onToggleSidenav() {
    // console.log('clicked!');

    this.sideNavToggle.emit();
  }

}
