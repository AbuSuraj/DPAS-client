import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-walkin-appointment',
  templateUrl: './walkin-appointment.component.html',
  styleUrls: ['./walkin-appointment.component.scss']
})
export class WalkinAppointmentComponent implements OnInit {
  appointmentForm!: FormGroup;
    bangladeshiMobilePattern = /^(?:\+?88)?01[3-9]\d{8}$/;
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
      this.formInitialise();
  }

  formInitialise(){
    this.appointmentForm = this.formBuilder.group({
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

  submit(){
    this.appointmentForm.markAllAsTouched();
    if(this.appointmentForm.invalid) return;
    console.log(this.appointmentForm.value);
    
  }
}
