import { Component, OnInit } from '@angular/core';

export interface PeriodicElement {
  player: string;
  prediction: string;
  challenged: string;
  coins: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {player: 'Harish', prediction: 'CSK (Medium)', challenged: 'Maruthi', coins: 700},
  {player: 'Vinodh', prediction: 'MI  (Hard)', challenged: 'Harish', coins: 800},
  {player: 'Pradi', prediction: 'MI  (Easy)', challenged: 'Vinodh', coins: 500},
  {player: 'Maruthi', prediction: 'CSK  (Medium)', challenged: 'Harish', coins: 1200},
  {player: 'Uma', prediction: 'CSK (Hard)', challenged: 'Maruthi', coins: 600},
  ];

@Component({
  selector: 'app-predictions',
  templateUrl: './predictions.component.html',
  styleUrls: ['./predictions.component.css']
})
export class PredictionsComponent implements OnInit {

  players: string[] = [ 'Harish', 'Pradi', 'Vinodh', 'Maruthi'];
  slideValue = 0;

  displayedColumns: string[] = ['player', 'prediction', 'challenged', 'coins'];
  dataSource = ELEMENT_DATA;


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
