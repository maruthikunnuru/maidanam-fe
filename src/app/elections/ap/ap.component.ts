import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {UserModel} from '../../z-models/user.model';
import {MatchResultModel} from '../../z-models/match-result.model';
import {Router} from '@angular/router';
import {LoginService} from '../../z-services/login.service';
import {AdminService} from '../../z-services/admin.service';
import {Location} from '@angular/common';
import {NgForm} from '@angular/forms';
import {ElectionPredictionModel} from "../../z-models/election-prediction.model";

@Component({
  selector: 'app-ap',
  templateUrl: './ap.component.html',
  styleUrls: ['./ap.component.css']
})
export class ApComponent implements OnInit, OnDestroy {

  currentUserSubscription: Subscription;
  loggedIn: boolean;
  user: UserModel;
  isFailure = false;
  isSuccess = false;
  constituencies = [
      'Adilabad', 'Amalapuram', 'Anakapalli', 'Anantapur', 'Araku', 'Bapatla',
      'Bhongir', 'Chelvella', 'Chittoor', 'Eluru', 'Guntur', 'Hindupur', 'Hyderabad',
      'Kadapa', 'Kakinada', 'Karimnagar', 'Khammam', 'Kurnool', 'Machilipatnam',
      'Mahabubabad', 'Mahabubnagar', 'Malkajgiri', 'Medak', 'Nagarkurnool', 'Nalgonda',
      'Nandyal', 'Narasapur', 'Narasaraopet', 'Nellore', 'Nizamabad', 'Ongole', 'Peddapalli',
      'Rajahmundry', 'Rajampet', 'Secunderabad', 'Srikakulam', 'Tirupati', 'Vijayawada',
      'Visakhapatnam', 'Vizianagaram', 'Warangal', 'Zahirabad'
  ];

  matchResult: MatchResultModel;

  electionPrediction: ElectionPredictionModel;

  constructor(private router: Router,
              private loginService: LoginService,
              private adminService: AdminService,
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
  }

  onSubmitResult(matchResultForm: NgForm) {

    this.matchResult = matchResultForm.value;

    console.log(this.matchResult);

  }

  goBack() {
    this.location.back();
  }

  ngOnDestroy(): void {
    this.currentUserSubscription.unsubscribe();
  }
}
