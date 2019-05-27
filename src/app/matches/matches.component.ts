import {Component, OnDestroy, OnInit} from '@angular/core';
import { trigger, state, transition, animate, style, keyframes } from '@angular/animations';
import {Subscription} from 'rxjs';
import {UserModel} from '../z-models/user.model';
import {GroupModel} from '../z-models/group.model';
import {LoginService} from '../z-services/login.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.css'],
  animations: [
    trigger ('flyInOut', [

        transition(':enter', [
            style(
              {transform: 'translateX(-100%)'}
            ) ,
            animate(150, style({transform: 'translateX(0)'}))
        ]),
        transition(':leave', [
            animate(150,
              style({transform: 'scale(0,0)'})
            )
        ])

      ]),
    ]
})
export class MatchesComponent implements OnInit, OnDestroy {

  listView = false;
  currentView = true;

  currentUserSubscription: Subscription;
  currentUserGroupsSubscription: Subscription;
  userGroupSubscription: Subscription;
  user: UserModel;
  selectedUserGroup: UserModel;
  usersList: UserModel[];
  groups: GroupModel[];
  loggedIn: boolean;

  constructor(private loginService: LoginService,
              private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
      this.currentUserSubscription = this.loginService.currentUser
          .subscribe(
              (res) => {
                  this.user = res;
                  this.loggedIn = (this.user != null);
                  // console.log(this.user);
                  if (!this.loggedIn) {
                      this.router.navigate(['/home']);
                  }
              },
              (error) => console.log(error)
          );

      this.currentUserGroupsSubscription = this.loginService.currentUserGroups
          .subscribe(
              (res) => {
                  this.groups = res;
              },
              (error) => console.log(error)
          );
  }

  async changeView ( event: any ) {
    // console.log('method called');
    if (event.target.value === 'current') {
      this.listView = false;
      await this.delay(200);
      this.currentView = true;

    }

    if (event.target.value === 'all') {
      this.currentView = false;
      await this.delay(200);
      this.listView = true;
  }
  }

  private delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  onSelectGroup(groupid: number) {
      console.log(groupid);

      this.userGroupSubscription = this.loginService.getUsersByGroupId(this.user.userName, groupid)
          .subscribe((resp) => {
                  // console.log(resp);
                  if (resp.statusCode === 'N') {
                      alert('No User Data Available');
                  } else {
                      this.usersList = resp.result as UserModel[];
                      // console.log(this.usersList);
                      this.selectedUserGroup = this.usersList.filter( usr => usr.userName === this.user.userName)[0];
                      // console.log(this.selectedUserGroup);

                      this.loginService.setUser(this.selectedUserGroup);

                  }
              },
              (error) => console.log(error)
          );


      this.router.navigateByUrl('/home', {skipLocationChange: true}).then(()=>
          this.router.navigate(['/matches']));
  }


  ngOnDestroy(): void {
      this.currentUserSubscription.unsubscribe();
      this.currentUserGroupsSubscription.unsubscribe();
  }


}
