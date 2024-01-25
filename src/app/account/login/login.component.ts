import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
 
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ProxyService } from 'src/app/services/services-proxy/proxy.service';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  signInForm!: FormGroup;
  loginOptions = [
    { label: 'Patient', value: 'Patient' },
    { label: 'Doctor', value: 'Doctor' },
    { label: 'Employee', value: 'Employee' },
    { label: 'Receptionist', value: 'Receptionist' },
    { label: 'Admin', value: 'Admin' },
    { label: 'Vistor', value: 'Vistor' },
  ];
  isDropdownOpen: boolean = false;
  constructor(private formBuilder: FormBuilder, private elementRef: ElementRef, private service: ProxyService, private toastr: ToastrService, private router: Router, private authService: AuthenticationService) {}

  ngOnInit() {
    this.signInForm = this.formBuilder.group({
      selectedOption: ['Select Role', Validators.required], 
      userId: ['', Validators.required], 
      password: ['', Validators.required], 
    });
  }

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  selectDropdownOption(option: any): void {
    console.log(option.value);
    this.signInForm?.get('selectedOption')?.setValue(option.value);
    this.isDropdownOpen = false;
  }

  @HostListener('document:click', ['$event'])
  clickOutsideDropdown(event: Event) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.isDropdownOpen = false;
    }
  }
  signIn(): void {
    this.signInForm.markAllAsTouched();
    if(this.signInForm.invalid) return;
    else {
      const {selectedOption, userId, password} = this.signInForm.value
       
      this.service.login(userId, password).subscribe((res)=>{
        // console.log('login successfull', res);
        this.authService.setLoggedIn(true);
        this.toastr.success('Login successful', 'Success');
        this.router.navigate(['/dashboard']);
      },
      (error)=>{
        console.error('login failed', error);
        this.toastr.error('Wrong password or UserId', 'Login failed');
      })
    }
  }
}
