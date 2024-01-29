import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProxyService } from 'src/app/services/services-proxy/proxy.service';
import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
 visitorId ='' ;
 appointment:any;
  constructor(private activeRouter: ActivatedRoute, private service: ProxyService, private router: Router, private toaster: ToastrService){}

ngOnInit(): void {
 this.getId();
 this.getAppointmentInfo()
}

getId(){
  this.activeRouter.params.subscribe(params => {
    this.visitorId = params['id'];
});
}

getAppointmentInfo(){
  this.service.getAppointmentDetails(this.visitorId).subscribe((data:any)=>{
    this.appointment = data.appointmentDetails;
    console.log(data);
    
  })
}

updte(){

}

approveOrReject(stts: string){
  const status = stts;
  const data = {...this.appointment, status}
this.service.updateAppointment(data).subscribe((res:any)=>{
  console.log(res);
  this.toaster.success(`Appointment ${stts} successfully`, 'success');
  this.router.navigate(['/dashboard/visitor-online']);
})
}
}
