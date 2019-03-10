import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, NgForm} from '@angular/forms';
import {Subscription} from 'rxjs';
import {UserModel} from '../z-models/user.model';
import {Router} from "@angular/router";
import {LoginService} from "../z-services/login.service";
import {AlertService} from "../z-services/alert.service";

@Component({
  selector: 'app-manage-groups',
  templateUrl: './manage-groups.component.html',
  styleUrls: ['./manage-groups.component.css']
})
export class ManageGroupsComponent implements OnInit, OnDestroy {

  joinMode = false;
  createMode = false;
  currentUserSubscription: Subscription;
  loggedIn: boolean;
  user: UserModel;

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

              // if (!this.loggedIn) {
              //   this.router.navigate(['/home']);
              // }
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
    const gCode = form.value.groupCode;
    alert('You successfully joined into ' + gCode + ' group');
  }

  onCreate(form: NgForm) {
    const gCode = form.value.groupCode;
    alert('You successfully created ' + gCode + ' group');
  }

  ngOnDestroy(): void {
    this.currentUserSubscription.unsubscribe();
    this.loginService.logout();
  }
}
