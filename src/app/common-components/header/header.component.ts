import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isLoggedIn = false;
   
  constructor(private authenticationService: AuthenticationService){}
  
   ngOnInit(): void {
    this.authenticationService.loggedIn$.subscribe((loggedIn) => {
      this.isLoggedIn = loggedIn;
    });
   }

}
