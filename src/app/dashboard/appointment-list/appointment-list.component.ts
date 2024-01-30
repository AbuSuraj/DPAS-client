import { Component, OnInit,AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
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
   pageSizeControl = new FormControl();
   page = 1;
   currentPage = 1
   pageSize = 5;
   searchKey = ''
   startItem = 0;
   endItem = 0;
   itemsLen = 1;
  constructor(private router:Router, private service: ProxyService){}
  public labels: any = {
    previousLabel: '<',
    nextLabel: '>',
    screenReaderPaginationLabel: 'Pagination',
    screenReaderPageLabel: 'page',
    screenReaderCurrentLabel: `You're on page`
}; 

ngOnInit(): void {
  this.fetchData();
  this.searchControl.valueChanges.subscribe(searchValue => {
    this.searchKey = searchValue;
    this.fetchData();
  });
  this.pageSizeControl.valueChanges.subscribe(size => {
    this.pageSize = size;
    this.fetchData();
  });
}

fetchData(): void {
  this.service.getAppointments(this.searchKey, this.currentPage, this.pageSize)
    .subscribe((data: any) => {
      this.appointments = data.appointments ;
      this.totalAppointments = data.totalAppointments;
      this.itemsLen = this.appointments.length
      this.calculateRange();
    });
}

getData(page: number): void {
  this.currentPage = page;
  this.fetchData();
}

calculateRange(): void {
  const startIndex = (this.currentPage - 1) * this.pageSize + 1;
  let endIndex = this.currentPage * this.pageSize;

  if (this.appointments.length < this.pageSize) {
    endIndex = startIndex + this.appointments.length - 1;
  }

  this.startItem = startIndex;
  this.endItem = endIndex;
}

changePageSize(size: number): void {
  console.log(size);
  
  this.pageSize = size;
  this.currentPage = 1;  
  this.fetchData();
}

}
