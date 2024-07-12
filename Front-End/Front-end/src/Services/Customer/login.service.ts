import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private baseUrl = "https://localhost:7279/api/";

  constructor(private http: HttpClient) {}

  login(email: string, password: string, role: string): Observable<HttpResponse<any>> {
    const loginData = { email, password };
    if (role == 'customer') {
      return this.http.post<any>(this.baseUrl + "Customer/login", loginData, { observe: 'response' });
    } else if (role == 'fieldWorker') {
      return this.http.post<any>(this.baseUrl + "FieldWorker/login", loginData, { observe: 'response' });
    } else {
      return this.http.post<any>(this.baseUrl + "Admin/adminLogin", loginData, { observe: 'response' });
    }
  }
}
