import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {map, Observable, throwError} from "rxjs";
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MakeComplaintService {

  private baseUrl = "https://localhost:7279/api/";

  constructor(private http: HttpClient) { }


  makeComplaint(complanantId: number, accused: string, complaint: string): Observable<HttpResponse<any>> {
    let complaintData = {complanantId, accused, complaint};
    let role = localStorage.getItem('role');

    if (role == 'customer') {
      return this.http.post(`${this.baseUrl}Customer/complaint`, complaintData, { observe: 'response' })
        .pipe(
          catchError(error => {
            // Handle error here
            console.error('Error making complaint:', error);
            return throwError(error);
          })
        );
    } else if (role == 'field worker') {
      return this.http.post(`${this.baseUrl}FieldWorker/complaint`, complaintData, { observe: 'response' })
        .pipe(
          catchError(error => {
            // Handle error here
            console.error('Error making complaint:', error);
            return throwError(error);
          })
        );
    } else {
      const errorMessage = 'Invalid role';
      console.error(errorMessage);
      return throwError(errorMessage);
    }
  }

  getAllComplaint(): Observable<HttpResponse<any>> {
    return this.http.get<any[]>(`${this.baseUrl}Admin/complaints`, { observe: 'response' })
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
