import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
   constructor(private authenticationService: AuthenticationService){}
   isLoggedIn = false;
   ngOnInit(): void {
    this.authenticationService.loggedIn$.subscribe((loggedIn) => {
      this.isLoggedIn = loggedIn;
    });
   }

}
