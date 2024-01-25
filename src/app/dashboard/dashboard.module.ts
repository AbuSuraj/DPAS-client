import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { WalkinAppointmentComponent } from './walkin-appointment/walkin-appointment.component';
import { AppointmentListComponent } from './appointment-list/appointment-list.component';
import { DetailsComponent } from './appointment-list/details/details.component';


@NgModule({
  declarations: [
    DashboardComponent,
    SidebarComponent,
    WalkinAppointmentComponent,
    AppointmentListComponent,
    DetailsComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
