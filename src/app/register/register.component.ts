import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';
import {LoginService} from '../z-services/login.service';
import {UserModel} from "../z-models/user.model";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  @ViewChild('r') loginForm: NgForm;


  user: UserModel;
  registeredUsers: string[];

  constructor(private router: Router,
              private loginService: LoginService) { }

  ngOnInit() {
  }

  onRegister(form: NgForm) {
    const value = form.value;
    const referralCode = value.refCode;

    if (referralCode === '12345') {

      this.loginService.getGroupList()
          .subscribe(
              (response) => console.log(response),
              (error) => console.log(error)
          );


      // this.user = this.loginService.getUserProfile();
      // this.registeredUsers = this.loginService.getRegisteredUsers();
      //
      // if (this.registeredUsers.includes(this.user.userName)) {
      //   alert('You are already a registered User');
      //
      // } else {
      //   this.loginService.registerUser(this.user.userName, this.user.firstName, this.user.lastName, '12345');
      //   alert('You are successfully registered into Maidanam');
      // }
      this.router.navigate(['/home']);
    } else {
      this.router.navigate(['/error']);
    }

  }
}
