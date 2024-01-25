import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { WalkinAppointmentComponent } from './walkin-appointment/walkin-appointment.component';
import { AppointmentListComponent } from './appointment-list/appointment-list.component';

const routes: Routes = [
  {path:'', component: DashboardComponent},
  {path:'walkin-appointment', component: WalkinAppointmentComponent},
  {path:'appointment-list', component: AppointmentListComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
