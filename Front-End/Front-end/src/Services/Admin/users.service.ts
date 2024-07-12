import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {map} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private baseUrl = "https://localhost:7279/api/";
  constructor(private http:HttpClient) { }

  getUsers(){
    return this.http.get<any[]>(`${this.baseUrl}Admin/customers`, { observe: 'response' })
      .pipe(
        map(response => new HttpResponse({
          body: response.body,
          headers: response.headers,
          status: response.status,
          statusText: response.statusText
        }))
      );
  }
}
