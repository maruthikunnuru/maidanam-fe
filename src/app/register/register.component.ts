import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  @ViewChild('r') loginForm: NgForm;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  onRegister(form: NgForm) {
    const value = form.value;
    const referralCode = value.refcode;

    if(referralCode === '12345'){
      this.router.navigate(['/predictions']);
    } else {
      this.router.navigate(['/error']);
    }

  }
}
