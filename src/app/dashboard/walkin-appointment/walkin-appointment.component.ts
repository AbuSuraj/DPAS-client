import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProxyService } from 'src/app/services/services-proxy/proxy.service';

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
  problems: string[] = ['Malnutrition', 'Infectious Diseases', 'Maternal and Child Health', 'Non-Communicable Diseases'];
  departments: string[] = ['Medicine', 'Pediatrics', 'Ophthalmology', 'Orthopedics', 'Gynecology', 'EYE'];
  doctors: string[] = ['Abu Kamran Rahul', 'Nurul Huda', 'Ayesha Akhter', 'Alomghir kabir'];
  sex: string[] = ['Male', 'Female'];

  // Selected options
  selectedProblem = '';
  selectedDepartment = '';
  selectedDoctor = '';

  constructor(private formBuilder: FormBuilder, private elementRef: ElementRef,private service: ProxyService, private toastr: ToastrService, private router: Router) { }

  ngOnInit(): void {
      this.formInitialise();
  }

  formInitialise(){
    this.appointmentForm = this.formBuilder.group({
      problem: [''],
      department: [''],
      doctor: [''],
      arrival_date: ['' ],
      arrival_time: ['00:00:00', [Validators.pattern(/^([01]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/)]],
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
    this.service.createAppointment(this.appointmentForm.value).subscribe(res =>{
      this.toastr.success('Apointment created successfully', 'Success');
      this.router.navigate(['/dashboard/visitor-online']);
    },
    (error)=>{
      console.error('failed', error);
      this.toastr.error('Failed to create appointment', 'Login failed');
    }
    )
  }
}
