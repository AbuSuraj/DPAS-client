import { Component, OnInit } from '@angular/core';
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
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.signInForm = this.formBuilder.group({
      selectedOption: ['Select Role', Validators.required],
    });
  }
  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  selectDropdownOption(option: any): void {
    this.signInForm?.get('selectedOption')?.setValue(option.value);
    this.isDropdownOpen = false;
  }
}
