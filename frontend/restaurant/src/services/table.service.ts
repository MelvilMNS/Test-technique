import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Table {
  id: number;
  capacity: number;
  occupied: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class TableService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getTables(): Observable<Table[]> {
    return this.http.get<Table[]>(`${this.apiUrl}/tables`);
  }

  reservation(size: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/reservation`, { size });
  }

  liberation(id: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/liberation`, { id });
  }
}
