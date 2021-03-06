import {AfterContentInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserModel} from '../z-models/user.model';
import {LoginService} from '../z-services/login.service';
import {Subscription} from 'rxjs';
import {GroupModel} from '../z-models/group.model';
import {ScoresTableInterface} from '../z-models/scores-table.interface';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.css']
})
export class ScoreboardComponent implements AfterContentInit, OnDestroy {

  currentUserSubscription: Subscription;
  currentUserGroupsSubscription: Subscription;
  scoresSubscription: Subscription;
  userGroupSubscription: Subscription;
  user: UserModel;
  selectedUserGroup: UserModel;
  scoresList: UserModel[];
  usersList: UserModel[];
  loggedIn: boolean;
  groups: GroupModel[];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  showInOOOs: boolean;
  divideByOOOor1: number;
    showInOOOOOs: boolean;
    divideByOOOOOor1: number;
  decimal1: number;
  decimal2: number;

  displayedColumns: string[] = ['rank', 'player', 'score', 'coins', 'loan', 'change'];
  scores: ScoresTableInterface[] = [];
  dataSource: MatTableDataSource<ScoresTableInterface>;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private loginService: LoginService) { }

  ngAfterContentInit(): void {
    // console.log('Inside Scoreboard');
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
              // this.loggedIn = (this.user != null);
            },
            (error) => console.log(error)
        );

    this.scoresSubscription = this.loginService.getUsersByGroupId(this.user.userName, this.user.groupId)
        .subscribe((resp) => {
              // console.log(resp);
              if (resp.statusCode === 'N') {
                alert('No Scores Available');
              } else {
                this.scoresList = resp.result as UserModel[];
                // console.log(this.scoresList);

                if (this.scoresList.length > 0) {

                    const maxValueOfEffCoins = Math.max(...this.scoresList.map(o => o.effectiveCoins), 0);
                    // console.log(maxValueOfEffCoins.toString().length);

                    this.showInOOOOOs = maxValueOfEffCoins.toString().length > 7;
                    this.divideByOOOOOor1 = this.showInOOOOOs ? 100000 : 1 ;
                    this.showInOOOs = maxValueOfEffCoins.toString().length > 5 && maxValueOfEffCoins.toString().length <= 7;
                    this.divideByOOOor1 = this.showInOOOs ? 1000 : 1 ;
                    this.decimal1 = this.showInOOOOOs ? 1 : this.showInOOOs ? 1 : 0 ;
                    this.decimal2 = this.showInOOOOOs ? 2 : this.showInOOOs ? 2 : 0 ;

                    this.scoresList.forEach((score, index) => {
                    // console.log('Inside scores dataSource..');
                      const element: ScoresTableInterface = {
                        rank: index + 1,
                        player: score.displayName,
                        score: this.showInOOOOOs ? (score.effectiveCoins / this.divideByOOOOOor1 ).toFixed(this.decimal1) :
                            (score.effectiveCoins / this.divideByOOOor1 ).toFixed(this.decimal1),
                        coins: this.showInOOOOOs ? (score.totalCoins / this.divideByOOOOOor1 ).toFixed(this.decimal1) :
                            (score.totalCoins / this.divideByOOOor1 ).toFixed(this.decimal1),
                        loan: this.showInOOOOOs ? (score.totalLoan / this.divideByOOOOOor1 ).toFixed(this.decimal1) :
                            (score.totalLoan / this.divideByOOOor1 ).toFixed(this.decimal1),
                        playerId: score.userId,
                        changeInCoins: this.showInOOOOOs ? (score.changeInTotalCoins / this.divideByOOOOOor1 ).toFixed(this.decimal2) :
                            (score.changeInTotalCoins / this.divideByOOOor1 ).toFixed(this.decimal2)
                      };
                      this.scores.push(element);
                      this.scores = [...this.scores];

                      // console.log(this.scores);
                  });
                  this.dataSource = new MatTableDataSource(this.scores);
                    setTimeout(() => {
                        this.dataSource.sort = this.sort;
                        this.dataSource.paginator = this.paginator;
                    });
                }
              }
            },
            (error) => console.log(error)
        );

  }

  applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onSelectGroup(groupid: number) {
    // console.log(groupid);

    this.userGroupSubscription = this.loginService.getUsersByGroupId(this.user.userName, groupid)
      .subscribe((resp) => {
              // console.log(resp);
              if (resp.statusCode === 'N') {
                  // alert('No User Data Available');
              } else {
                  this.usersList = resp.result as UserModel[];
                  // console.log(this.usersList);
                  this.selectedUserGroup = this.usersList.filter( usr => usr.userName === this.user.userName)[0];
                  // console.log(this.selectedUserGroup);

                  this.loginService.setUser(this.selectedUserGroup);
                  this.router.navigateByUrl('/home', {skipLocationChange: true}).then(() =>
                      this.router.navigate(['/scoreboard']));
              }
          },
          (error) => console.log(error)
      );
  }

    onClickUser(selectedUserId) {
        this.router.navigate(['profile'],
            {queryParams: {profileUserId: selectedUserId}});

    }

    onBuyLoan() {
        this.router.navigate(['/loan']);
    }

  ngOnDestroy(): void {
    this.currentUserSubscription.unsubscribe();
    this.currentUserGroupsSubscription.unsubscribe();
    this.scoresSubscription.unsubscribe();
    // this.userGroupSubscription.unsubscribe();
  }

}
