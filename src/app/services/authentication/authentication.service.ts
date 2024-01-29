import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private loggedInSubject: BehaviorSubject<boolean>;
  loggedIn$: Observable<boolean>;
  
  constructor() { 
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    this.loggedInSubject = new BehaviorSubject<boolean>(isLoggedIn);
    this.loggedIn$ = this.loggedInSubject.asObservable();
  }
  
  setLoggedIn(value: boolean): void {
    this.loggedInSubject.next(value);
    localStorage.setItem('isLoggedIn', value ? 'true' : 'false');
  }
}
