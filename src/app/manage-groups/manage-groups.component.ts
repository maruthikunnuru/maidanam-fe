import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { Location } from '@angular/common';
import {NgForm} from '@angular/forms';
import {Observable, Subscription} from 'rxjs';
import {UserModel} from '../z-models/user.model';
import {Router} from '@angular/router';
import {LoginService} from '../z-services/login.service';
import {GroupModel} from '../z-models/group.model';
import {MatSort, MatTableDataSource} from '@angular/material';
import {GroupsTableInterface} from '../z-models/groups-table.interface';

@Component({
  selector: 'app-manage-groups',
  templateUrl: './manage-groups.component.html',
  styleUrls: ['./manage-groups.component.css']
})
export class ManageGroupsComponent implements OnInit, OnDestroy {

  joinMode = false;
  createMode = false;
  currentUserSubscription: Subscription;
  currentUserGroupsSubscription: Subscription;
  joinGpSubscription: Subscription;
  createGpSubscription: Subscription;
  groupSubscription: Subscription;
  loggedIn: boolean;
  user: UserModel;
  groups: GroupModel[];
  groupList: GroupModel[];
  isJoined = false;
  isJoinedErr = false;
  isCreated = false;
  isCreatedErr = false;

  displayedColumns: string[] = ['groupName', 'referralCd'];
  groupRefs: GroupsTableInterface[] = [];
  finalGroupRefs: GroupsTableInterface[] = [];
  dataSource: MatTableDataSource<GroupsTableInterface>;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private router: Router,
              private loginService: LoginService,
              private location: Location) { }

  ngOnInit() {
    this.currentUserSubscription = this.loginService.currentUser
        .subscribe(
            (res) => {
              this.user = res;
              this.loggedIn = (this.user != null);
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

                  if (this.groups && this.groups.length > 0) {
                      this.groups.forEach((group) => {
                          if (!this.groupRefs.some(x => (x.groupName === group.groupName))) {
                              // console.log('Inside dataSource..');
                              const element: GroupsTableInterface = {
                                  groupName: group.groupName,
                                  referralCd: group.referenceCds
                              };
                              this.groupRefs.push(element);
                              this.groupRefs = [...this.groupRefs];
                          }
                      });

                      // console.log(this.groupRefs);
                      this.dataSource = new MatTableDataSource(this.groupRefs);
                      setTimeout(() => {
                          this.dataSource.sort = this.sort;

                      });
                  }
              },
              (error) => console.log(error)
          );
  }

  joinGroup() {
    this.joinMode = true;
    this.createMode = false;
  }

  createGroup() {
    this.createMode = true;
    this.joinMode = false;
  }

  onJoin(form: NgForm) {
    const gRefCode = form.value.groupRefCd;
    // console.log(gRefCode);
    // console.log('userName->' + this.user.userName);
    // console.log('userId->' + this.user.userId);

    this.user.referenceCd = gRefCode;
    if (gRefCode) {
      this.joinGpSubscription = this.loginService.joinGroup(this.user)
          .subscribe((response) => {
                // console.log(response);
                if (response.statusCode === 'N') {
                  this.isJoinedErr = true;
                  this.isJoined = false;
                } else {
                  this.isJoinedErr = false;
                  this.isJoined = true;
                  this.updateUserGroups(this.user.userName);
                }
              },
              (error) => console.log(error)
          );
    }
  }

  onCreate(form: NgForm) {
    const gName = form.value.groupName;
    const group: GroupModel = new GroupModel(null, gName, null,
        0, 1, 'ACTIVE', 500);
    if (gName) {
      this.createGpSubscription = this.loginService.createGroup(this.user.userName, this.user.userId, group)
          .subscribe((response) => {
                // console.log(response);
                if (response.statusCode === 'N') {
                  this.isCreatedErr = true;
                  this.isCreated = false;
                } else {
                  this.isCreated = true;
                  this.isCreatedErr = false;
                  this.updateUserGroups(this.user.userName);
                }
              },
              (error) => console.log(error)
          );
    }

  }

  updateUserGroups(username: string) {
      this.groupSubscription = this.loginService.getGroupList(username)
          .subscribe((resp) => {

                  if (resp.statusCode === 'Y') {
                      this.groupList = resp.result as GroupModel[];
                      this.loginService.setGroups(this.groupList);
                  }
              },
              (error) => console.log(error)
          );
  }
  ngOnDestroy() {
    this.currentUserSubscription.unsubscribe();
    this.currentUserGroupsSubscription.unsubscribe();
    // this.groupSubscription.unsubscribe();
    // this.joinGpSubscription.unsubscribe();
    // this.createGpSubscription.unsubscribe();
  }
}
