import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResenaService {
  private baseUrl = 'http://localhost:5000'; // Flask server base URL

  constructor(private http: HttpClient) {}

  createResena(resena: any): Observable<any> {
    const token = localStorage.getItem('authToken');
    return this.http.post(`${this.baseUrl}/resenas`, resena, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  }

  getResenasEspacio(espacioId: string): Observable<any[]> {
    const token = localStorage.getItem('authToken');
    return this.http.get<any[]>(`${this.baseUrl}/resenas/espacio/${espacioId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  }
}
