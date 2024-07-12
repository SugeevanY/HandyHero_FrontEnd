import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {map} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FieldWorkersService {
  private baseUrl = "https://localhost:7279/api/";
  constructor(private http: HttpClient) { }

  getAllWorkers(){
    return this.http.get<any[]>(`${this.baseUrl}Admin/fieldWorkers`, { observe: 'response' })
      .pipe(
        map(response => new HttpResponse({
          body: response.body,
          headers: response.headers,
          status: response.status,
          statusText: response.statusText
        }))
      );
  }

  getRequests() {

  }
}
