import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OtpverificationService {

  private baseUrl = "https://localhost:7279/api/";

  constructor(private http: HttpClient) { }

  verifyOtp(verificationCode: string): Observable<any> {
    return this.http.post("https://localhost:7279/api/Password/verify-otp", { verificationCode });
  }
}
