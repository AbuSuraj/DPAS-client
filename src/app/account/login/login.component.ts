import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
 
import { HttpService } from '../../services/service.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';


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
  constructor(private formBuilder: FormBuilder, private elementRef: ElementRef, private service: HttpService, private toastr: ToastrService, private router: Router) {}

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
        console.log('login successfull', res);
        this.toastr.success('Login successful', 'Success');
        this.router.navigate(['']);
      },
      (error)=>{
        console.error('login failed', error);
        this.toastr.error('Wrong password or UserId', 'Login failed');
      })
    }
  }
}
