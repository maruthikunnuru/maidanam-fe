import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-predictions',
  templateUrl: './predictions.component.html',
  styleUrls: ['./predictions.component.css']
})
export class PredictionsComponent implements OnInit {

  players: string[] = [ 'Harish', 'Pradi', 'Vinodh', 'Maruthi'];
  slideValue = 0;

  changeSlide(slideEvent: any) {
    this.slideValue = slideEvent.value;
    console.log(slideEvent);
  }

  formatLabel(value: number | null) {
    if (!value) {
      return 0;
    }

    if (value >= 1000) {
      return (value / 1000) + ' k';
    }

    return value;
  }

  constructor() { }

  ngOnInit() {
  }

}
