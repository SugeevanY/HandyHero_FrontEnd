import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class HireService {
  private apiURL = "https://localhost:7279/api/Customer/requestWork"
  constructor(private http: HttpClient) { }

  hire(hireData: FormData){
    return this.http.post(this.apiURL, hireData, { observe: 'response' });
  }
}
