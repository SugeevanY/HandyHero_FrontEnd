import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ForgotPasswordService {

  private baseUrl = "https://localhost:7279/api/";

  constructor(private http: HttpClient) { }

  sendVerificationCode(email: string): Observable<any> {
    return this.http.post('https://localhost:7279/api/Password/forgot-password', { email });
  }
}
