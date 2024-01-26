import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.scss']
})
export class AppointmentListComponent {
  constructor(private router:Router){}
  showDetails(id:number){
    this.router.navigate(['dashboard', 'visitor-online', id])
  }
}
