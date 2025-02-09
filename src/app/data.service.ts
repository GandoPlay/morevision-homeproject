import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private baseUrl = 'http://localhost:3001/api';

  constructor(private http: HttpClient) {}
  getData(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/fleet/getVehicles/${id}`);
  }

  getFleets(): Observable<any> {
    return this.http.get(`${this.baseUrl}/fleet`);
  }
}
