import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class SignUpService {

  private baseUrl = "https://localhost:7279/api/";
  constructor(private http:HttpClient) { }

  customerSignup(customerData: any) {
    console.log(customerData);
    return this.http.post(`${this.baseUrl}Customer/create`, customerData, { observe: 'response' });
  }

  fieldWorkerSignup(fieldWorkerData: FormData) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    return this.http.post(`${this.baseUrl}FieldWorker/createAccount`, fieldWorkerData, { observe: 'response' });
  }
}
