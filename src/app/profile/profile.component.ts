import {AfterContentInit, Component, OnDestroy, ViewChild} from '@angular/core';
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
export class ProfileComponent implements AfterContentInit, OnDestroy {


  currentUserSubscription: Subscription;
  currentUserGroupsSubscription: Subscription;
  pickSubscription: Subscription;
  spendSubscription: Subscription;
  userGroupSubscription: Subscription;
  user: UserModel;
  selectedUserGroup: UserModel;
  pickSummaryList: PickSummaryModel[];
  spendSummaryList: SpendSummaryModel[];
  spendSummary: SpendSummaryModel;
  usersList: UserModel[];
  loggedIn: boolean;
  groups: GroupModel[];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns: string[] = ['team', 'pick', 'avg-coins', 'e-m-h', 'won', 'lost', 'net', 'bonus-fasak'];
  picks: ProfileTableInterface[] = [];
  dataSource: MatTableDataSource<ProfileTableInterface>;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private loginService: LoginService,
              private historyService: PlayerHistoryService) { }

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
        this.user.userId,
        this.user.userName, this.user.groupId)
        .subscribe((resp) => {
              if (resp.statusCode === 'N') {
              } else {
                this.spendSummaryList = resp.result as SpendSummaryModel[];
                this.spendSummary = this.spendSummaryList[0];
              }
            },
            (error) => console.log(error)
        );

    this.pickSubscription = this.historyService.getPickSummary(
        this.user.userId,
        this.user.userName, this.user.groupId)
        .subscribe((resp) => {
              if (resp.statusCode === 'N') {
              } else {
                this.pickSummaryList = resp.result as PickSummaryModel[];

                if (this.pickSummaryList.length > 0) {
                  this.pickSummaryList.forEach(pick => {
                    const element: ProfileTableInterface = {
                      teamName: pick.teamName,
                      pick: pick.picksPercent + '%',
                      avgCoins: (pick.avgCoinsPlayed / 1000).toFixed(1),
                      emh: pick.marginEasy + '% / ' + pick.marginMedium + '% / ' + pick.marginHard + '% ',
                      won: (pick.winCoins / 1000).toFixed(1),
                      lost: (pick.lossCoins / 1000).toFixed(1),
                      net: ( (pick.winCoins + pick.lossCoins) / 1000).toFixed(1),
                      bonus_fasak: (pick.bonusCoins == null ? 0 : pick.bonusCoins) + '% - ' +
                          (pick.fasakCoins == null ? 0 : pick.fasakCoins) + '%',
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
