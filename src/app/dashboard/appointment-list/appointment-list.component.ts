import { Component, OnInit,AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

import { ProxyService } from 'src/app/services/services-proxy/proxy.service';
@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.scss']
})
export class AppointmentListComponent implements   OnInit{
   appointments:any;
   totalAppointments =0;
   searchControl = new FormControl();
   page = 1;
   pageSize = 5;
   searchKey = ''
  constructor(private router:Router, private service: ProxyService){}

  showDetails(id:number){
    this.router.navigate(['dashboard', 'visitor-online', id])
  }

  ngOnInit(): void {
       this.getData()
       this.search();
  }
 
  getData(){
  this.service.getAppointments(this.searchKey, this.page, this.pageSize).subscribe((data: any) => {
      this.appointments = data.appointments;
      this.totalAppointments = data.totalAppointments;
    });
 }

  search(){
    this.searchControl.valueChanges.pipe(
      debounceTime(300),  
      distinctUntilChanged(),  
      switchMap((searchValue: string) => {
         this.searchKey = searchValue;
        return this.service.getAppointments(this.searchKey, this.page, this.pageSize);
      })
    ).subscribe((data: any) => {
      
      this.appointments = data.appointments;
      this.totalAppointments = data.totalAppointments;
    });
  }
  details(id:number){

  }
}
