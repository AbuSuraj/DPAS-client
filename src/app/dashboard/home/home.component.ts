import { Component } from '@angular/core';
import { cardsData } from './data';

@Component({
  selector: 'dashboard-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
 cardsData = cardsData
}
