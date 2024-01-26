import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { WalkinAppointmentComponent } from './walkin-appointment/walkin-appointment.component';
import { AppointmentListComponent } from './appointment-list/appointment-list.component';
import { DetailsComponent } from './appointment-list/details/details.component';

const routes: Routes = [
  {path:'', component: DashboardComponent, children:[
    {path:'walkin-appointment', component: WalkinAppointmentComponent},
    {path:'visitor-online', component: AppointmentListComponent},
    { path:'visitor-online', children:[
      {path:':id', component: DetailsComponent}
    ]},
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
