import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProjectRequestService {

  private apiUrl = 'https://localhost:7279/api/FieldWorker/projects';

  constructor(private http: HttpClient) { }

  getProjects(): Observable<any> {
    const id = localStorage.getItem('Id');
    if (id) {
      const url = `${this.apiUrl}?id=${id}`;
      return this.http.get(url);
    } else {
      throw new Error('No ID found in localStorage');
    }
  }

  acceptProject(project: any): Observable<any> {
    const url = 'https://localhost:7279/api/FieldWorker/acceptProject';
    return this.http.patch(url, project, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  rejectProject(project: any): Observable<any> {
    const url = 'https://localhost:7174/api/FieldWorker/rejectProject';
    return this.http.patch(url, project, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }
}
