import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProxyService } from 'src/app/services/services-proxy/proxy.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
 visitorId ='' ;
 appointment:any;
  constructor(private activeRouter: ActivatedRoute, private service: ProxyService){}

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
}
