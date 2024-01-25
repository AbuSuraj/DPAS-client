import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { ProxyService } from 'src/app/services/services-proxy/proxy.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent { 
     constructor(private toastr: ToastrService, private router: Router, private authService: AuthenticationService,private service: ProxyService){}
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
    // this.navigate.emit(item);
    if(item ==='logout'){
      this.logout();
    }
    else{
      this.router.navigate(['/dashboard', item])
    }
  }

  logout(){
    this.service.logout().subscribe(res =>{
      this.authService.setLoggedIn(false);
      this.toastr.success('Logout successful', 'Success');
      this.router.navigate(['']);
    },
    (error)=>{
      console.error('logout failed', error);
      this.toastr.error('Logout Failed', 'Error');
    })
    
  }
}
