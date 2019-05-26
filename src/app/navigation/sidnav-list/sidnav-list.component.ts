import { Component, OnInit, Output, EventEmitter } from '@angular/core';
// import { EventEmitter } from 'events';

@Component({
  selector: 'app-sidnav-list',
  templateUrl: './sidnav-list.component.html',
  styleUrls: ['./sidnav-list.component.css']
})
export class SidnavListComponent implements OnInit {
  @Output() sideNavClose = new EventEmitter();
  @Output() public signOutEmit = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  signout() {
    // console.log('signout');
    this.signOutEmit.emit();
  }

  public onSideNavClose() {
    this.sideNavClose.emit();
  }
}
