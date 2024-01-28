import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProxyService } from 'src/app/services/services-proxy/proxy.service';

@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.scss']
})
export class AppointmentListComponent implements OnInit {
   appointments:any;
   totalAppointments =0;
  constructor(private router:Router, private service: ProxyService){}

  showDetails(id:number){
    this.router.navigate(['dashboard', 'visitor-online', id])
  }

  ngOnInit(): void {
      this.service.getAppointments().subscribe(data=>{
        this.appointments = data.appointments;
        this.totalAppointments = data.totalAppointments;
        console.log(this.appointments, this.totalAppointments );
        
      })
  }
}
