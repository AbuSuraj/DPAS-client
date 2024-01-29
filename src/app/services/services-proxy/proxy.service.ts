import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ProxyService {
  private apiUrl = 'http://localhost:5000/api'; // Replace with your API URL

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    
    });
    return headers;
  }

  login(userId: string, password: string): Observable<any> {
    const url = `${this.apiUrl}/auth/login`;
    const headers = this.getHeaders();
    const body = {userId, password };

    return this.http.post(url, body, { headers });
  }

  logout(): Observable<any> {
    const url = `${this.apiUrl}/auth/logout`;
    const headers = this.getHeaders();

    return this.http.post(url, { headers });
  }

   createAppointment(appointment:any): Observable<any> {
    const url = `${this.apiUrl}/appointments/`;
    const headers = this.getHeaders();
    return this.http.post(url,appointment ,{ headers });
  }

   getAppointments(s:string, page:number, pageSize:number): Observable<any> {
    const url = `${this.apiUrl}/appointments/?q=${s}&page=${page}&pageSize=${pageSize}`;
    const headers = this.getHeaders();
    return this.http.get(url ,{ headers });
  }

   getAppointmentDetails(id:string): Observable<any> {
    const url = `${this.apiUrl}/appointments/${id}`;
    const headers = this.getHeaders();
    return this.http.get(url ,{ headers });
  }
  updateAppointment(appointment:any):Observable<any> {  
    console.log(appointment);
    
    const url = `${this.apiUrl}/appointments/${appointment.appointment_id}`;
    const headers = this.getHeaders();
    return this.http.patch(url, appointment,{ headers });
  }
}
