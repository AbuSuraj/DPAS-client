import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-walkin-appointment',
  templateUrl: './walkin-appointment.component.html',
  styleUrls: ['./walkin-appointment.component.scss']
})
export class WalkinAppointmentComponent implements OnInit {
  appointmentForm!: FormGroup;
    bangladeshiMobilePattern = /^(?:\+?88)?01[3-9]\d{8}$/;

  isProblemDropdownOpen = false;
  isDepartmentDropdownOpen = false;
  isDoctorDropdownOpen = false;
  isDropdownOpen = false;
  // Dropdown options
  problems: string[] = ['Problem 1', 'Problem 2', 'Problem 3'];
  departments: string[] = ['Department 1', 'Department 2', 'Department 3'];
  doctors: string[] = ['Doctor 1', 'Doctor 2', 'Doctor 3'];

  // Selected options
  selectedProblem = '';
  selectedDepartment = '';
  selectedDoctor = '';

  constructor(private formBuilder: FormBuilder, private elementRef: ElementRef) { }

  ngOnInit(): void {
      this.formInitialise();
  }

  formInitialise(){
    this.appointmentForm = this.formBuilder.group({
      problem: [''],
      department: [''],
      doctor: [''],
      arrival_date: ['' ],
      arrival_time: ['' ],
      patient_name_english: [''],
      patient_name_bangla: [''],
      patient_father_name_english: [''],
      patient_father_name_bangla: [''],
      patient_mother_name_english: [''],
      patient_mother_name_bangla: [''],
      present_address: [''],
      permanent_address: [''],
      mobile_number: ['', [Validators.required, Validators.pattern(this.bangladeshiMobilePattern)]],
      email: ['', Validators.email],
      nid_or_birth_certificate_no: ['', Validators.required],
      sex: [''],
      age: ['', Validators.required],
      weight: [''],
    });
  }

  toggleProblemDropdown(): void {
   
    this.isProblemDropdownOpen = !this.isProblemDropdownOpen;

  }

  // Toggle Department dropdown
  toggleDepartmentDropdown(): void {
    this.isDepartmentDropdownOpen = !this.isDepartmentDropdownOpen;
  }

  // Toggle Doctor dropdown
  toggleDoctorDropdown(): void {
    this.isDoctorDropdownOpen = !this.isDoctorDropdownOpen;
  }

  // Select problem
  selectProblem(problem: string) {
    this.selectedProblem = problem;
    this.appointmentForm?.get('problem')?.setValue(problem)
    console.log(problem);
    this.isProblemDropdownOpen = false; // Close the dropdown
    
  }

  // Select department
  selectDepartment(department: string): void {
    this.selectedDepartment = department;
    this.appointmentForm?.get('department')?.setValue(department);
    console.log(department);
    
    this.isDepartmentDropdownOpen = false;  
  }

  // Select doctor
  selectDoctor(doctor: string): void {
    this.selectedDoctor = doctor;
    this.isDoctorDropdownOpen = false;  
    this.appointmentForm?.get('doctor')?.setValue(doctor);
    console.log(doctor);
    
  }

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  @HostListener('document:click', ['$event'])
  clickOutsideDropdown(event: Event) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.isProblemDropdownOpen = false;
      this.isDepartmentDropdownOpen = false;
      this.isDoctorDropdownOpen = false; 
      // this.isDropdownOpen = false;
    }
  }

  submit(){
    this.appointmentForm.markAllAsTouched();
    if(this.appointmentForm.invalid) return;
    console.log(this.appointmentForm.value);
  }
}
