import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordService {

  private baseUrl = "https://localhost:7279/api/";

  constructor(private http: HttpClient) { }

  resetPassword(newPassword: string): Observable<any> {
    return this.http.post(`https://localhost:7279/api/Password/reset-password`, { newPassword });
  }

}
