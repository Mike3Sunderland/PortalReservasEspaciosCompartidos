import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EspacioService {
  private baseUrl = 'http://localhost:5000'; // Flask server base URL

  constructor(private http: HttpClient) {}

  createEspacio(espacio: any): Observable<any> {
    const token = localStorage.getItem('authToken');
    return this.http.post(`${this.baseUrl}/espacios`, espacio, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  }

  getEspacios(): Observable<any[]> {
    const token = localStorage.getItem('authToken');
    return this.http.get<any[]>(`${this.baseUrl}/espacios`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  }

  getEspacio(espacioId: string): Observable<any> {
    const token = localStorage.getItem('authToken');
    return this.http.get(`${this.baseUrl}/espacios/${espacioId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  }

  updateEspacio(espacioId: string, espacio: any): Observable<any> {
    const token = localStorage.getItem('authToken');
    return this.http.put(`${this.baseUrl}/espacios/${espacioId}`, espacio, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  }

  deleteEspacio(espacioId: string): Observable<any> {
    const token = localStorage.getItem('authToken');
    return this.http.delete(`${this.baseUrl}/espacios/${espacioId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  }
}
