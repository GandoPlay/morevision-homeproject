import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VehicleService {
  private baseUrl = 'http://localhost:3001/api';

  constructor(private http: HttpClient) {}

  deleteVehicle(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  getHistoryStatus(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/vehicle/getHistoryStatus/${id}`);
  }

  updateStatus(id: string, status: any): Observable<any> {
    return this.http.patch(`${this.baseUrl}/vehicle/updateStatus/${id}`, {
      status,
    });
  }
  update(id: string, vehicle: any): Observable<any> {
    return this.http
      .put(`${this.baseUrl}/vehicle/${id}`, {
        ...vehicle,
      })
      .pipe(
        catchError((error: any) => {
          // You can handle the error based on status codes or the error type
          if (error.status === 409) {
            alert('Conflict error license plate already exists');
          } else {
            alert('An error occurred: ' + error.message);
          }
          // Rethrow or return an empty observable to allow chaining
          return throwError(error);
        })
      );
  }
  create(fleetId: any, vehicle: any): Observable<any> {
    return this.http
      .post(`${this.baseUrl}/fleet/addVehicles/${fleetId}`, {
        vehicles: [{ ...vehicle }],
      })
      .pipe(
        catchError((error: any) => {
          // You can handle the error based on status codes or the error type
          if (error.status === 409) {
            alert('Conflict error license plate already exists');
          } else {
            alert('An error occurred: ' + error.message);
          }
          // Rethrow or return an empty observable to allow chaining
          return throwError(error);
        })
      );
  }

  createFleet(name: any): Observable<any> {
    return this.http
      .post(`${this.baseUrl}/fleet`, {
        name,
        vehicles: [],
      })
      .pipe(
        catchError((error: any) => {
          // You can handle the error based on status codes or the error type
          if (error.status === 409) {
            alert('Conflict error license plate already exists');
          } else {
            alert('An error occurred: ' + error.message);
          }
          // Rethrow or return an empty observable to allow chaining
          return throwError(error);
        })
      );
  }

  getData(id: string, status?: any): Observable<any> {
    let params = {};
    if (status) {
      params = { status };
    }
    return this.http.get(`${this.baseUrl}/fleet/getVehicles/${id}`, {
      params,
    });
  }

  getFleets(): Observable<any> {
    return this.http.get(`${this.baseUrl}/fleet`);
  }

  getPrefix(): Observable<any> {
    {
      return this.http.get(`${this.baseUrl}/fleet/getPrefix`, {
        params: {
          prefix: '111',
        },
      });
    }
  }
}
