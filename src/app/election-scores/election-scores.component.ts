import {AfterContentInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserModel} from '../z-models/user.model';
import {LoginService} from '../z-services/login.service';
import {Subscription} from 'rxjs';
import {GroupModel} from '../z-models/group.model';
import {ScoresTableInterface} from '../z-models/scores-table.interface';
import {MatSort, MatTableDataSource} from '@angular/material';
import {ElectionsService} from '../z-services/elections.service';
import {ElectionScoreModel} from "../z-models/election-score.model";
import {Location} from "@angular/common";

@Component({
  selector: 'app-election-scores',
  templateUrl: './election-scores.component.html',
  styleUrls: ['./election-scores.component.css']
})
export class ElectionScoresComponent implements OnInit, AfterContentInit, OnDestroy {

  currentUserSubscription: Subscription;
  currentUserGroupsSubscription: Subscription;
  scoresSubscription: Subscription;
  userGroupSubscription: Subscription;
  paramsSubscription: Subscription;
  user: UserModel;
  selectedUserGroup: UserModel;
  scoresList: ElectionScoreModel[];
  usersList: UserModel[];
  loggedIn: boolean;
  pollNameParam: string;
  electionTypeParam: string;
  groups: GroupModel[];
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ['rank', 'player', 'score'];
  scores: ScoresTableInterface[] = [];
  dataSource: MatTableDataSource<ScoresTableInterface>;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private location: Location,
              private loginService: LoginService,
              private electionService: ElectionsService) { }

  ngOnInit(): void {
    this.paramsSubscription = this.route.queryParams.subscribe(params => {
      this.pollNameParam = params['poll'];
      this.electionTypeParam = params['electionType'];
    });
  }

  ngAfterContentInit(): void {

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

    this.scoresSubscription = this.electionService.getElectionScores(this.electionTypeParam, 'ON',
        this.user.userId, this.pollNameParam)
        .subscribe((resp) => {
              // console.log(resp);
              if (resp.statusCode === 'N') {
                alert('No Election Scores Available');
              } else {
                this.scoresList = resp.result as ElectionScoreModel[];
                // console.log(this.scoresList);

                if (this.scoresList.length > 0) {
                  this.scoresList.forEach((score, index) => {
                    // console.log('Inside scores dataSource..');
                    const element: ScoresTableInterface = {
                      rank: score.rank,
                      player: score.user.displayName,
                      score: score.score,
                      coins: null,
                      loan: null,
                      playerId: score.user.userId,
                      changeInCoins: null
                    };
                    this.scores.push(element);
                    this.scores = [...this.scores];

                    // console.log(this.scores);
                  });
                  this.dataSource = new MatTableDataSource(this.scores);
                  setTimeout(() => {
                    this.dataSource.sort = this.sort;

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
                    this.router.navigate(['/elections/scores']));
              }
            },
            (error) => console.log(error)
        );
  }

  goBack() {
    this.location.back();
  }

 ngOnDestroy(): void {
    this.currentUserSubscription.unsubscribe();
    this.currentUserGroupsSubscription.unsubscribe();
    this.scoresSubscription.unsubscribe();
    this.paramsSubscription.unsubscribe();
  }

}
