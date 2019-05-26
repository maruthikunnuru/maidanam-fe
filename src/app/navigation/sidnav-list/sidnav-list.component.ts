import { AfterContentInit, Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import {Subscription} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {LoginService} from '../../z-services/login.service';
import {UserModel} from '../../z-models/user.model';
import {AuthService} from 'angularx-social-login';
// import { EventEmitter } from 'events';

@Component({
  selector: 'app-sidnav-list',
  templateUrl: './sidnav-list.component.html',
  styleUrls: ['./sidnav-list.component.css']
})
export class SidnavListComponent implements AfterContentInit, OnInit, OnDestroy {
  @Output() sideNavClose = new EventEmitter();
  @Output() public signOutEmit = new EventEmitter();

  currentUserSubscription: Subscription;

  user: UserModel;
  loggedIn: boolean;
  showButtons: boolean;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private loginService: LoginService,
    private authService: AuthService) { }

  ngOnInit() {
  }

  ngAfterContentInit() {
    // console.log('Inside Player History');
    this.currentUserSubscription = this.loginService.currentUser
        .subscribe(
            (res) => {
                this.user = res;
                this.loggedIn = (this.user != null);

                if (!this.loggedIn) {
                    this.showButtons = false;
                    this.router.navigate(['/home']);
                } else {
                  this.showButtons = true;
                }
            },
            (error) => console.log(error)
        );
  }

  signout(): void {
    // console.log('emit received');
    this.router.navigate(['/home']);
    if (this.loggedIn) {
      this.authService.signOut();
      this.loginService.logout();
      window.location.reload();
    }
  }

  public onSideNavClose() {
    this.sideNavClose.emit();
  }

  ngOnDestroy(): void {
    this.currentUserSubscription.unsubscribe();
  }
}
