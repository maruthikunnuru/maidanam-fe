import {AfterContentInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {PlayerHistoryService} from '../z-services/player-history.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {UserModel} from '../z-models/user.model';
import {GroupModel} from '../z-models/group.model';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {LoginService} from '../z-services/login.service';
import {PickSummaryModel} from '../z-models/pick-summary.model';
import {SpendSummaryModel} from '../z-models/spend-summary.model';
import {ProfileTableInterface} from '../z-models/profile-table.interface';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, AfterContentInit, OnDestroy {


  currentUserSubscription: Subscription;
  currentUserGroupsSubscription: Subscription;
  pickSubscription: Subscription;
  spendSubscription: Subscription;
  userGroupSubscription: Subscription;
  paramsSubscription: Subscription;
  user: UserModel;
  selectedUserGroup: UserModel;
  pickSummaryList: PickSummaryModel[];
  spendSummaryList: SpendSummaryModel[];
  spendSummary: SpendSummaryModel;
  usersList: UserModel[];
  loggedIn: boolean;
  headerName: string;
  groups: GroupModel[];
  profileUserIdParam: number;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  showInOOOs: boolean;
  divideByOOOor1: number;
    showInOOOOOs: boolean;
    divideByOOOOOor1: number;
  decimal1: number;
  decimal2: number;
  favPred: number;
  udPred: number;

  displayedColumns: string[] = ['team', 'pick', 'avg-coins', 'e-m-h', 'won', 'lost', 'net'];
  picks: ProfileTableInterface[] = [];
  dataSource: MatTableDataSource<ProfileTableInterface>;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private loginService: LoginService,
              private historyService: PlayerHistoryService) { }

  ngOnInit(): void {
    this.paramsSubscription = this.route.queryParams.subscribe(params => {
        this.profileUserIdParam = params['profileUserId'];
        // console.log(this.histUserIdParam);
    });
  }

  ngAfterContentInit() {
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
            },
            (error) => console.log(error)
        );

    this.spendSubscription = this.historyService.getSpendSummary(
        this.profileUserIdParam != null ? this.profileUserIdParam : this.user.userId,
        this.user.userName, this.user.groupId)
        .subscribe((resp) => {
              if (resp.statusCode === 'N') {
              } else {
                this.spendSummaryList = resp.result as SpendSummaryModel[];
                this.spendSummary = this.spendSummaryList[0];

                  if (this.spendSummaryList.length > 0) {
                      this.headerName = this.spendSummary.user.firstName + ' '
                          + this.spendSummary.user.lastName
                          + ' (' + this.spendSummary.user.displayName + ')';
                      this.favPred = this.spendSummary.favPredPercent;
                      this.udPred = 100 - this.spendSummary.favPredPercent;

                  } else {
                      this.headerName = null;
                  }
              }
            },
            (error) => console.log(error)
        );

    this.pickSubscription = this.historyService.getPickSummary(
        this.profileUserIdParam != null ? this.profileUserIdParam : this.user.userId,
        this.user.userName, this.user.groupId)
        .subscribe((resp) => {
              if (resp.statusCode === 'N') {
              } else {
                this.pickSummaryList = resp.result as PickSummaryModel[];

                if (this.pickSummaryList.length > 0) {

                    const maxValueOfEffCoins = Math.max(...this.pickSummaryList.map(o => o.winCoins), 0);
                    // console.log(maxValueOfEffCoins.toString().length);

                    this.showInOOOOOs = maxValueOfEffCoins.toString().length > 7;
                    this.divideByOOOOOor1 = this.showInOOOOOs ? 100000 : 1 ;
                    this.showInOOOs = maxValueOfEffCoins.toString().length > 5 && maxValueOfEffCoins.toString().length <= 7;
                    this.divideByOOOor1 = this.showInOOOs ? 1000 : 1 ;
                    this.decimal1 = this.showInOOOOOs ? 1 : this.showInOOOs ? 1 : 0 ;
                    this.decimal2 = this.showInOOOOOs ? 2 : this.showInOOOs ? 2 : 0 ;

                    this.pickSummaryList.forEach(pick => {
                    const element: ProfileTableInterface = {
                      teamName: pick.teamName,
                      pick: pick.picksPercent + '%',
                      avgCoins: this.showInOOOOOs ? (pick.avgCoinsPlayed / this.divideByOOOOOor1).toFixed(this.decimal1) :
                          (pick.avgCoinsPlayed / this.divideByOOOor1).toFixed(this.decimal1),
                      emh: pick.marginEasy + ' / ' + pick.marginMedium + ' / ' + pick.marginHard,
                      won: this.showInOOOOOs ? (pick.winCoins / this.divideByOOOOOor1).toFixed(this.decimal1) :
                          (pick.winCoins / this.divideByOOOor1).toFixed(this.decimal1),
                      lost: this.showInOOOOOs ? (pick.lossCoins / this.divideByOOOOOor1).toFixed(this.decimal1) :
                          (pick.lossCoins / this.divideByOOOor1).toFixed(this.decimal1),
                      net: this.showInOOOOOs ? ((pick.winCoins + pick.lossCoins) / this.divideByOOOOOor1).toFixed(this.decimal1) :
                          ((pick.winCoins + pick.lossCoins) / this.divideByOOOor1).toFixed(this.decimal1),
                      bonus_fasak: (pick.bonusCoins == null ? 0 : pick.bonusCoins) + ' - ' +
                          (pick.fasakCoins == null ? 0 : pick.fasakCoins),
                    };
                    this.picks.push(element);
                    this.picks = [...this.picks];
                  });
                  this.dataSource = new MatTableDataSource(this.picks);
                  setTimeout(() => {
                    this.dataSource.sort = this.sort;
                  });
                }
              }
            },
            (error) => console.log(error)
        );
  }

  onClickHistory() {
      this.router.navigate(['history'],
          {queryParams: {histUserId: this.profileUserIdParam}});

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
                    this.router.navigate(['/profile']));
              }
            },
            (error) => console.log(error)
        );
  }

  ngOnDestroy(): void {
    this.currentUserSubscription.unsubscribe();
    this.currentUserGroupsSubscription.unsubscribe();
    this.pickSubscription.unsubscribe();
    this.spendSubscription.unsubscribe();
  }

}
