import { Component, OnInit } from '@angular/core';
import { trigger, state, transition, animate, style, keyframes } from '@angular/animations';

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.css'],
  animations: [
    trigger ('flyInOut', [

        transition(':enter', [
            style(
              {transform: 'translateX(-100%)'}
            ) ,
            animate(250, style({transform: 'translateX(0)'}))
        ]),
        transition(':leave', [
            animate(250,
              style({transform: 'scale(0,0)'})
            )
        ])

      ]),
    ]
})
export class MatchesComponent implements OnInit {

  listView = false;
  currentView = true;

  constructor() { }

  ngOnInit() {
  }

  async changeView ( event: any ) {
    // console.log('method called');
    if (event.target.value === 'current') {
      this.listView = false;
      await this.delay(200);
      this.currentView = true;

    }

    if (event.target.value === 'all') {
      this.currentView = false;
      await this.delay(200);
      this.listView = true;
  }
  }

  private delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }


}
