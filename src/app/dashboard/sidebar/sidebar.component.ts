import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  @Output() navigate = new EventEmitter<string>();
     constructor(private router: Router){}
  menuItems = [
   {name:'ONLINE APPOINTMENT', value: 'online-appointment'}, 
   {name:'WALKIN APPOINTMENT', value: 'walkin-appointment'}, 
   {name:'ACCOUNTS', value: 'account'}, 
   {name:'PROFILE SETTING', value: 'profile-setting'}, 
   {name:'VISITOR APPOINTMENT', value: 'visitor-appointment'}, 
   {name:'HOSPITAL ADMISSION', value: 'HOSPITAL ADMISSION'}, 
   {name:'Logout', value: 'logout'}
  ];

  onItemClick(item: string): void {
    this.navigate.emit(item);
    this.router.navigate(['/dashboard', item])
  }
}
