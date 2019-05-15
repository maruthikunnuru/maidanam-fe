import { Component, OnInit } from '@angular/core';
import {LoginService} from "../z-services/login.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-tournaments',
  templateUrl: './tournaments.component.html',
  styleUrls: ['./tournaments.component.css']
})
export class TournamentsComponent implements OnInit {

  constructor(private loginService: LoginService,
              private router: Router) { }

  ngOnInit() {
  }

  onSelectIpl() {
    this.router.navigate(['/matches']);
  }

  onSelectAp() {
    this.router.navigate(['/elections/ap']);
  }

  onSelectNational() {
    this.router.navigate(['/elections/india']);
  }
}

