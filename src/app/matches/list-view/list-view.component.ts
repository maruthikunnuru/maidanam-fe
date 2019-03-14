import { Component, OnInit } from '@angular/core';
import {MatchModel} from '../../z-models/match.model';
import {MatchesService} from '../../z-services/matches.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {UserModel} from "../../z-models/user.model";
import {LoginService} from "../../z-services/login.service";

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.css']
})
export class ListViewComponent implements OnInit {

  allMatches: MatchModel[];
  currentUserSubscription: Subscription;
  matchSubscription: Subscription;
  user: UserModel;
  loggedIn: boolean;

  constructor(private matchesService: MatchesService,
              private loginService: LoginService,
              private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.currentUserSubscription = this.loginService.currentUser
      .subscribe(
          (res) => {
              this.user = res;
              this.loggedIn = (this.user != null);

              if (!this.loggedIn) {
                  this.router.navigate(['/home']);
              }

              console.log('Current User -->' + JSON.stringify(this.user));
          },
          (error) => console.log(error)
      );

    this.matchSubscription = this.matchesService.getMatches('aripakavinodh@gmail.com')
        .subscribe((response) => {
              // console.log(response);
              if (response.statusCode === 'N') {
                alert('No Match Data Available');
              } else {
                this.allMatches = response.result as MatchModel[];
                // console.log(this.allMatches);
              }
            },
            (error) => console.log(error)
        );
  }

  onMatchClick(matchId: number) {
    this.router.navigate([matchId + '/predictions'], {relativeTo: this.route});
  }

}
