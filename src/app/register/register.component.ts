import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';
import {LoginService} from '../services/login.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  @ViewChild('r') loginForm: NgForm;


  username: string;
  registeredUsers: string[];

  constructor(private router: Router,
              private loginService: LoginService) { }

  ngOnInit() {
  }

  onRegister(form: NgForm) {
    const value = form.value;
    const referralCode = value.refCode;

    if(referralCode === '12345') {

      this.username = this.loginService.getUserProfile().email;
      this.registeredUsers = this.loginService.getRegisteredUsers();

      if (this.registeredUsers.includes(this.username)) {
        alert('You are already a registered User');

      } else {
        this.loginService.registerUser(this.username);
        alert('You are successfully registered into Maidanam');
      }
      this.router.navigate(['/home']);
    } else {
      this.router.navigate(['/error']);
    }

  }
}
