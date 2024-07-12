import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FieldWorkerService {

  private fieldWorkerUrl = 'your-api-url-here/fieldworker'; // Replace with your actual API URL

  constructor(private http: HttpClient) { }

  getFieldWorkerReviews(): Observable<any> {
    const fieldWorkerId = localStorage.getItem('Id'); // Assuming you store the field worker's ID in localStorage
    return this.http.get(`${this.fieldWorkerUrl}/reviews/${fieldWorkerId}`);
  }
  
}
