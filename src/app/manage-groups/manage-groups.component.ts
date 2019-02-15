import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-manage-groups',
  templateUrl: './manage-groups.component.html',
  styleUrls: ['./manage-groups.component.css']
})
export class ManageGroupsComponent implements OnInit {

  joinMode = false;
  createMode = false;

  constructor() { }

  ngOnInit() {
  }

  joinGroup() {
    this.joinMode = true;
    this.createMode = false;
  }

  createGroup() {
    this.createMode = true;
    this.joinMode = false;

  }

  onJoin(form: NgForm) {
    const gCode = form.value.groupCode;
    alert('You successfully joined into ' + gCode + ' group');
  }

  onCreate(form: NgForm) {
    const gCode = form.value.groupCode;
    alert('You successfully created ' + gCode + ' group');
  }
}
