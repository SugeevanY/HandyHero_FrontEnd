import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  private baseUrl = "https://localhost:7279/api/";
  constructor(private http:HttpClient) { }

  getMyProjects(userId: any): Observable<any>{
    return this.http.get<any>(`${this.baseUrl}Customer/myProject?id=${localStorage.getItem('Id')}`)
  }
}
