import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, NgForm} from '@angular/forms';
import {Subscription} from 'rxjs';
import {UserModel} from '../z-models/user.model';
import {Router} from '@angular/router';
import {LoginService} from '../z-services/login.service';
import {AlertService} from '../z-services/alert.service';
import {GroupModel} from '../z-models/group.model';

@Component({
  selector: 'app-manage-groups',
  templateUrl: './manage-groups.component.html',
  styleUrls: ['./manage-groups.component.css']
})
export class ManageGroupsComponent implements OnInit, OnDestroy {

  joinMode = false;
  createMode = false;
  currentUserSubscription: Subscription;
  joinGpSubscription: Subscription;
  createGpSubscription: Subscription;
  loggedIn: boolean;
  user: UserModel;
  isJoined = false;
  isJoinedErr = false;
  isCreated = false;
  isCreatedErr = false;

  constructor(private router: Router,
              private loginService: LoginService,
              private formBuilder: FormBuilder,
              private alertService: AlertService) { }

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
    console.log(gRefCode);
    console.log('userName->' + this.user.userName);
    console.log('userId->' + this.user.userId);

    this.user.referenceCd = gRefCode;
    if (gRefCode) {
      this.joinGpSubscription = this.loginService.joinGroup(this.user)
          .subscribe((response) => {
                console.log(response);
                if (response.statusCode === 'N') {
                  this.isJoinedErr = true;
                  this.isJoined = false;
                } else {
                  this.isJoinedErr = false;
                  this.isJoined = true;
                }
              },
              (error) => console.log(error)
          );
    }
  }

  onCreate(form: NgForm) {
    const gName = form.value.groupName;
    alert(gName);
    const group: GroupModel = new GroupModel(null, gName, null,
        0, 1, 'ACTIVE', 1700);
    if (gName) {
      this.createGpSubscription = this.loginService.createGroup(this.user.userName, this.user.userId, group)
          .subscribe((response) => {
                console.log(response);
                if (response.statusCode === 'N') {
                  this.isCreatedErr = true;
                  this.isCreated = false;
                } else {
                  this.isCreated = true;
                  this.isCreatedErr = false;
                }
              },
              (error) => console.log(error)
          );
    }

  }

  ngOnDestroy(): void {
    this.currentUserSubscription.unsubscribe();
    // this.joinGpSubscription.unsubscribe();
    // this.createGpSubscription.unsubscribe();
  }
}
