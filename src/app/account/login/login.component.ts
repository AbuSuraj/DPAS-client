import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  signInForm!: FormGroup;
  dropdownOptions = [
    { label: 'Patient', value: 'Patient' },
    { label: 'Doctor', value: 'Doctor' },
    { label: 'Employee', value: 'Employee' },
    { label: 'Receptionist', value: 'Receptionist' },
    { label: 'Admin', value: 'Admin' },
    { label: 'Vistor', value: 'Vistor' },
  ];
  isDropdownOpen: boolean = false;
  constructor(private formBuilder: FormBuilder, private elementRef: ElementRef) {}

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
      console.log('Form Values:', this.signInForm.value);
      console.log('Signing in...');
    }
  }
}
